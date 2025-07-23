'use client';

import { getCategoryColor } from "@/utils/getCategoryColor";
import {
  FaCalendarAlt,
  FaMapMarkerAlt,
  FaFireAlt,
  FaRegClock,
} from "react-icons/fa";

type JobSidebarProps = {
  about: {
    posted_on: string;
    deadline: string;
    location: string;
    start_date: string;
    end_date: string;
    categories: string[];
    required_skills: string[];
  };
};

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  });
}

export default function JobSidebar({ about }: JobSidebarProps) {
  return (
    <aside className="w-full rounded-xl p-5 space-y-6 text-sm">
      {/* About Section */}
      <section>
        <h2 className="font-black text-lg mb-4">About</h2>
        <div className="space-y-4">
          <div className="flex items-start gap-3">
            <FaRegClock className="text-blue-500 mt-1" />
            <div>
              <p className="text-gray-500">Posted On</p>
              <p className="font-semibold">{formatDate(about.posted_on)}</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <FaFireAlt className="text-orange-500 mt-1" />
            <div>
              <p className="text-gray-500">Deadline</p>
              <p className="font-semibold">{formatDate(about.deadline)}</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <FaMapMarkerAlt className="text-pink-500 mt-1" />
            <div>
              <p className="text-gray-500">Location</p>
              <p className="font-semibold">{about.location}</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <FaCalendarAlt className="text-blue-400 mt-1" />
            <div>
              <p className="text-gray-500">Start Date</p>
              <p className="font-semibold">{formatDate(about.start_date)}</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <FaCalendarAlt className="text-blue-400 mt-1" />
            <div>
              <p className="text-gray-500">End Date</p>
              <p className="font-semibold">{formatDate(about.end_date)}</p>
            </div>
          </div>
        </div>
      </section>

      <hr />

      {/* Categories */}
      <section>
        <h2 className="font-black text-lg mb-3">Categories</h2>
        <div className="flex flex-wrap gap-2">
          {(about.categories || []).map((category, i) => (
            <span
              key={i}
              className={`${getCategoryColor(
                category
              )} px-3 py-1 rounded-full text-xs font-medium`}
            >
              {category}
            </span>
          ))}
        </div>
      </section>

      <hr />

      {/* Required Skills */}
      <section>
        <h2 className="font-black text-lg mb-3">Required Skills</h2>
        <div className="flex flex-wrap gap-2">
          {(about.required_skills || []).map((skill, i) => (
            <span
              key={i}
              className="bg-indigo-50 text-indigo-600 px-3 py-1 rounded-md text-xs font-medium"
            >
              {skill}
            </span>
          ))}
        </div>
      </section>
    </aside>
  );
}
