import Link from 'next/link';
import jobData from '@/data/jobData.json';
import { FaChevronDown } from 'react-icons/fa';
import JobCard from './components/JobCard';



export default async function Home() {
  const res = await fetch(' https://akil-backend.onrender.com/opportunities/search');
  const {data: jobs} = await res.json();

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
        {jobs.map((job:any, index:number) => (
          <JobCard key={index} job={job} index={index} />
        ))}
      </div>
    </main>
  );
}
