// app/page.tsx
import Link from 'next/link';
import jobData from '@/data/jobData.json';
import { FaChevronDown } from 'react-icons/fa';

const getCategoryColor = (category: string) => {
  const colors: Record<string, string> = {
    Marketing: 'bg-green-100 text-green-700',
    Design: 'bg-pink-100 text-pink-700',
    IT: 'bg-purple-100 text-purple-700',
    Development: 'bg-blue-100 text-blue-800',
    Art: 'bg-red-100 text-red-700',
    'Data Science': 'bg-yellow-100 text-yellow-800',
    Analytics: 'bg-teal-100 text-teal-800',
    'Customer Service': 'bg-indigo-100 text-indigo-700',
    Support: 'bg-orange-100 text-orange-700'
  };
  return colors[category] || 'bg-gray-100 text-gray-800';
};

export default function Home() {
  const jobs = jobData.job_postings;

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
        {jobs.map((job, index) => (
          <Link
            href={`/job/${index}`}
            key={index}
            className="border rounded-xl p-5 hover:shadow transition bg-white"
          >
            <div className="flex items-start gap-4">
              <img src={job.image} alt={job.title} className="w-12 h-12 rounded-full object-cover" />
              <div className="flex-1">
                <h2 className="text-xl font-semibold">{job.title}</h2>
                <p className="text-gray-600">{job.company} • {job.about.location}</p>
                <p className="text-sm mt-2 text-gray-700 line-clamp-2">{job.description}</p>

                <div className="flex flex-wrap gap-2 mt-3">
                  <span className="bg-green-100 text-green-700 text-sm px-3 py-1 rounded-full">
                    {job.work_type}
                  </span>
                  <div className="w-px h-6 bg-gray-400"></div> 
                  {job.about.categories.map((category: string, i: number) => (
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
        ))}
      </div>
    </main>
  );
}
