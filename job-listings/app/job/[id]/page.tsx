import JobSidebar from '../../components/JobSidebar';
import { FaMapMarkerAlt } from "react-icons/fa";

type Props = {
  params: { id: string };
};

export default async function JobDetail({ params }: Props) {
  const res = await fetch(`https://akil-backend.onrender.com/opportunities/${params.id}`);
  
  if (!res.ok) {
    return <p className="p-4 text-red-500">Job not found</p>;
  }

  const {data: job} = await res.json();

  return (
    <main className="p-6 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
      {/* Main Content */}
      <section className="lg:col-span-2 space-y-8">
        <section>
          <h2 className="text-xl font-black mb-2">Description</h2>
          <p>{job.description}</p>
        </section>

        {job.responsibilities && (
          <section>
            <h2 className="text-xl font-black mb-2">Responsibilities</h2>
            <ul className="list-disc list-inside space-y-1">
              {job.responsibilities.split("\n").map((r: string, i: number) => (
                <li key={i}>{r}</li>
              ))}
            </ul>
          </section>
        )}

        {job.idealCandidate && (
          <section>
            <h2 className="text-xl font-black mb-2">Ideal Candidate</h2>
            <p>{job.idealCandidate}</p>
          </section>
        )}

        {job.whenAndWhere && (
          <section>
            <h2 className="text-xl font-black mb-2">When & Where</h2>
            <div className="flex flex-wrap gap-3">
              <FaMapMarkerAlt className="text-blue-500 mt-1" />
              <p>{job.whenAndWhere}</p>
            </div>
          </section>
        )}
      </section>

      {/* Sidebar */}
      <JobSidebar
        about={{
          posted_on: job.datePosted,
          deadline: job.deadline,
          location: job.location,
          start_date: job.startDate,
          end_date: job.endDate,
          categories: job.categories,
          required_skills: job.requiredSkills,
        }}
      />
    </main>
  );
}
