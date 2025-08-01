'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import axios from 'axios';

interface BookmarkContextType {
  bookmarks: any[];
  addBookmark: (job: any) => Promise<void>;
  removeBookmark: (jobId: string) => Promise<void>;
  isBookmarked: (jobId: string) => boolean;
  showLoginModal: boolean;
  setShowLoginModal: (value: boolean) => void;
}

const BookmarkContext = createContext<BookmarkContextType | undefined>(undefined);

export const BookmarkProvider = ({ children }: { children: React.ReactNode }) => {
  const [bookmarks, setBookmarks] = useState<any[]>([]);
  const [showLoginModal, setShowLoginModal] = useState(false);

  useEffect(() => {
    const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
    if (!token) return;

    const fetchBookmarks = async () => {
      try {
        const res = await axios.get('https://akil-backend.onrender.com/bookmarks', {
          headers: { Authorization: `Bearer ${token}` },
        });

        const ids = res.data.data || [];

        const jobs = await Promise.all(
          ids.map(async (item: any) => {
            try {
              const jobRes = await axios.get(`https://akil-backend.onrender.com/jobs/${item.eventID}`);
              return jobRes.data;
            } catch (err) {
              console.warn(`Failed to fetch job ${item.eventID}`, err);
              return null;
            }
          })
        );

        setBookmarks(jobs.filter(Boolean));
      } catch (err) {
        console.error('Failed to fetch bookmarks:', err);
      }
    };

    fetchBookmarks();
  }, []);

  const addBookmark = async (job: any) => {
    const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
    if (!token) {
      setShowLoginModal(true);
      return;
    }

    if (!job?.id) {
      console.warn('Invalid job object passed to addBookmark:', job);
      return;
    }

    if (bookmarks.some((b) => b.id === job.id)) {
      console.warn('Job is already bookmarked.');
      return;
    }

    try {
      await axios.post(
        `https://akil-backend.onrender.com/bookmarks/${job.id}`,
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      setBookmarks((prev) => [...prev, job]);
    } catch (err: any) {
      if (axios.isAxiosError(err)) {
        if (err.response?.status === 409) {
          console.warn('Backend: Bookmark already exists');
        } else if (err.response?.status === 401) {
          console.warn('Unauthorized. Token may be expired.');
          setShowLoginModal(true);
        } else {
          console.error('Failed to add bookmark:', err);
        }
      }
    }
  };

  const removeBookmark = async (jobId: string) => {
    const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
    if (!token) {
      setShowLoginModal(true);
      return;
    }

    try {
      await axios.delete(`https://akil-backend.onrender.com/bookmarks/${jobId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setBookmarks((prev) => prev.filter((b) => b.id !== jobId));
    } catch (err: any) {
      if (axios.isAxiosError(err) && err.response?.status === 401) {
        console.warn('Unauthorized. Token may be expired.');
        setShowLoginModal(true);
      } else {
        console.error('Failed to remove bookmark:', err);
      }
    }
  };

  const isBookmarked = (jobId: string) => {
    return bookmarks.some((b) => b.id === jobId);
  };

  return (
    <BookmarkContext.Provider
      value={{
        bookmarks,
        addBookmark,
        removeBookmark,
        isBookmarked,
        showLoginModal,
        setShowLoginModal,
      }}
    >
      {children}
    </BookmarkContext.Provider>
  );
};

export const useBookmarks = () => {
  const context = useContext(BookmarkContext);
  if (!context) {
    throw new Error('useBookmarks must be used within a BookmarkProvider');
  }
  return context;
};

export const useJobBookmarkStatus = (jobId: string) => {
  const context = useContext(BookmarkContext);
  if (!context) {
    throw new Error('useJobBookmarkStatus must be used within a BookmarkProvider');
  }

  const { bookmarks } = context;
  const [bookmarked, setBookmarked] = useState(false);

  useEffect(() => {
    const isBookmarked = bookmarks.some((b) => b.id === jobId);
    setBookmarked(isBookmarked);
  }, [bookmarks, jobId]);

  return bookmarked;
};
