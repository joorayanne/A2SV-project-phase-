'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import axios from 'axios';
import Modal from '@/app/components/Modal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

export default function BookmarksPage() {
  const [bookmarks, setBookmarks] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showLoginModal, setShowLoginModal] = useState(false);

  const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;

  useEffect(() => {
    if (!token) {
      setShowLoginModal(true);
      setLoading(false);
      return;
    }

    const fetchBookmarks = async () => {
      try {
        const res = await axios.get('https://akil-backend.onrender.com/bookmarks', {
          headers: { Authorization: `Bearer ${token}` },
        });

        const jobs = res.data?.data || [];
        setBookmarks(jobs);
      } catch (err) {
        console.error('Error loading bookmarks:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchBookmarks();
  }, [token]);

  const handleDelete = async (jobId: string) => {
    if (!token) {
      setShowLoginModal(true);
      return;
    }

    try {
      await axios.delete(`https://akil-backend.onrender.com/bookmarks/${jobId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setBookmarks((prev) => prev.filter((b) => b.eventID !== jobId));
    } catch (err) {
      console.error('Failed to remove bookmark:', err);
    }
  };

  if (loading) return <p className="p-4">Loading bookmarks...</p>;

  if (!bookmarks.length)
    return <p className="p-4 text-gray-500">No bookmarked jobs yet.</p>;

  return (
    <div className="p-4 max-w-2xl mx-auto mt-8">
      <h1 className="text-2xl font-bold mb-6 text-blue-700">Bookmarked Jobs</h1>
      <div className="space-y-3">
        {bookmarks.map((job) => (
          <div
            key={job.eventID}
            className="relative border p-3 rounded-xl hover:bg-gray-50 transition"
          >
            <button
              onClick={() => handleDelete(job.eventID)}
              className="absolute top-3 right-3 text-red-500 hover:text-red-800"
              title="Remove bookmark"
            >
              <FontAwesomeIcon icon={faTrash} className="w-4 h-4" />
            </button>

            <Link href={`/job/${job.eventID}`} className="block">
              <div className="flex items-start gap-4">
                <img
                  src={job.logoUrl || '/placeholder.png'}
                  alt={job.title}
                  className="w-12 h-12 object-cover rounded-full"
                />
                <div>
                  <h2 className="text-lg font-medium">{job.title}</h2>
                  <p className="text-sm text-gray-600">
                    {job.opType} • {job.location}
                  </p>
                  <p className="text-sm text-gray-500 mt-1">{job.orgName}</p>
                </div>
              </div>
            </Link>
          </div>
        ))}
      </div>

      {showLoginModal && (
        <Modal
          message="You must be logged in to view your bookmarks."
          onConfirm={() => (window.location.href = '/login')}
          onCancel={() => setShowLoginModal(false)}
        />
      )}
    </div>
  );
}
