import jobData from '@/data/jobData.json';
import JobSidebar from '../../components/JobSidebar';
import { FaCalendarAlt, FaMapMarkerAlt, FaFireAlt, FaRegClock } from "react-icons/fa";

type Props = {
  params: { id: string };
};

export default function JobDetail({ params }: Props) {
  const job = jobData.job_postings[parseInt(params.id)];

  if (!job) {
    return <p className="p-4 text-red-500">Job not found</p>;
  }

  return (
    <main className="p-6 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
      {/* Main Content */}
      <section className="lg:col-span-2 space-y-8">    

        <section>
          <h2 className="text-xl font-black mb-2">Description</h2>
          <p>{job.description}</p>
        </section>

        <section>
          <h2 className="text-xl font-black mb-2">Responsibilities</h2>
          <ul className="list-disc list-inside space-y-1">
            {job.responsibilities.map((r, i) => (
              <li key={i}>{r}</li>
            ))}
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-black mb-2">Ideal Candidate</h2>
          <ul className="list-disc list-inside space-y-1">
            {job.ideal_candidate.traits.map((trait, i) => (
              <li key={i}>{trait}</li>
            ))}
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-black mb-2">When & Where</h2>
          <div className='flex flex-wrap gap-3'>
            <FaMapMarkerAlt className="text-blue-500 mt-1" />
          <p>{job.when_where}</p>
          </div>
        </section>
      </section>

      {/* Sidebar */}
      <JobSidebar about={job.about} />
    </main>
  );
}
