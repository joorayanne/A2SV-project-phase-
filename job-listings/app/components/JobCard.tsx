'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import axios from 'axios';
import Modal from './Modal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBookmark as solidBookmark } from '@fortawesome/free-solid-svg-icons';
import { faBookmark as regularBookmark } from '@fortawesome/free-regular-svg-icons';
import { getCategoryColor } from '@/utils/getCategoryColor';

interface JobCardProps {
  job: any;
}

export default function JobCard({ job }: JobCardProps) {
  const [bookmarked, setBookmarked] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);

  const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;

  useEffect(() => {
    const fetchBookmarkStatus = async () => {
      if (!token || !job?.id) return;
      try {
        const res = await axios.get('https://akil-backend.onrender.com/bookmarks', {
          headers: { Authorization: `Bearer ${token}` },
        });
        const ids = res.data?.data?.map((b: any) => b.eventID) || [];
        setBookmarked(ids.includes(job.id));
      } catch (err) {
        console.error('Error fetching bookmark status:', err);
      }
    };

    fetchBookmarkStatus();
  }, [job?.id]);

  const toggleBookmark = async (e: React.MouseEvent) => {
    e.preventDefault();
    if (!token) {
      setShowLoginModal(true);
      return;
    }

    try {
      if (bookmarked) {
        await axios.delete(`https://akil-backend.onrender.com/bookmarks/${job.id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setBookmarked(false);
      } else {
        await axios.post(
          `https://akil-backend.onrender.com/bookmarks/${job.id}`,
          {},
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setBookmarked(true);
      }
    } catch (err) {
      console.error('Bookmark toggle failed:', err);
    }
  };

  return (
    <>
      <Link
        href={`/job/${job.id}`}
        className="relative border rounded-xl p-5 hover:shadow transition bg-white"
      >
        <button
          onClick={toggleBookmark}
          className="absolute top-4 right-4 text-blue-600 text-xl"
          aria-label="Toggle bookmark"
        >
          <FontAwesomeIcon
            icon={bookmarked ? solidBookmark : regularBookmark}
            className="w-5 h-5"
          />
        </button>

        <div className="flex items-start gap-4">
          <img
            src={job.logoUrl || '/placeholder.png'}
            alt={job.title}
            className="w-12 h-12 rounded-full object-cover"
          />
          <div className="flex-1">
            <h2 className="text-xl font-semibold">{job.title}</h2>
            <p className="text-gray-600">
              {job.orgName} • {job.location?.join(', ')}
            </p>
            <p className="text-sm mt-2 text-gray-700 line-clamp-2">{job.description}</p>
            <div className="flex flex-wrap gap-2 mt-3">
              {job.opType && (
                <>
                  <span className="bg-green-100 text-green-700 text-sm px-3 py-1 rounded-full">
                    {job.opType}
                  </span>
                  <div className="w-px h-6 bg-gray-400"></div>
                </>
              )}
              {job.categories?.map((category: string, i: number) => (
                <span
                  key={i}
                  className={`text-sm px-3 py-1 rounded-full ${getCategoryColor(category)}`}
                >
                  {category}
                </span>
              ))}
            </div>
          </div>
        </div>
      </Link>

      {showLoginModal && (
        <Modal
          message="You must be logged in to bookmark this job."
          onConfirm={() => (window.location.href = '/login')}
          onCancel={() => setShowLoginModal(false)}
        />
      )}
    </>
  );
}
