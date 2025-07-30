'use client';

import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FaChevronDown } from 'react-icons/fa';

import { fetchJobs } from '../redux/features/jobSlice';
import { AppDispatch, RootState } from '../redux/store';
import JobCard from './JobCard';

export default function HomeContent() {
  const dispatch = useDispatch<AppDispatch>();
  const { jobs, status, error } = useSelector((state: RootState) => state.jobs);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchJobs());
    }
  }, [status, dispatch]);

  if (status === 'loading') return <p className="p-4">Loading jobs...</p>;
  if (status === 'failed') return <p className="p-4 text-red-600">Error: {error}</p>;

  return (
    <main className="p-6">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-3xl font-bold">Opportunities</h1>

        <div className="flex items-center gap-2 text-sm text-gray-700 cursor-pointer select-none">
          <span className="font-medium text-gray-800">Sort by:</span>
          <span className="flex items-center gap-1 font-semibold">
            Most Relevant
            <FaChevronDown className="text-xs mt-0.5" />
          </span>
        </div>
      </div>

      <p className="text-gray-500 mb-6">Showing {jobs.length} results</p>

      
      <div className="flex flex-col gap-6">
        {jobs.map((job: any, index: number) => (
          <JobCard key={index} job={job} index={index} />
        ))}
      </div>
    </main>
  );
}
