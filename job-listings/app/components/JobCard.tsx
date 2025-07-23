import { getCategoryColor } from '@/utils/getCategoryColor';
import Link from 'next/link';

interface JobCardProps {
  job: any;
  index: number;
}

export default function JobCard({ job, index }: JobCardProps) {
  return (
    <Link
      href={`/job/${job.id}`}
      className="border rounded-xl p-5 hover:shadow transition bg-white"
    >
      <div className="flex items-start gap-4">
        <img
          src={job.logoUrl || null}
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
  );
}
