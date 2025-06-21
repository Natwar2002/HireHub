import { useState } from "react";
import JobCard from "../../component/JobCard/JobCard";
import { tags } from "../../utils/constants";
import { useGetAllJobs } from "../../hooks/jobPost/useGetAllJobs";

export default function JobsPage() {
  const [selectedTag, setSelectedTag] = useState("All");

  const { jobs } = useGetAllJobs();


  const filteredJobs =
    selectedTag === "All"
      ? jobs
      : jobs.filter((jobs) => jobs.tag === selectedTag);

  return (
    <div className="min-h-screen px-4 py-10 text-white">
      <h1 className="text-2xl font-bold text-center mb-10">
        Explore Opportunities at HireHub
      </h1>

      <div className="flex justify-center flex-wrap gap-4 mb-8">
        {tags?.map((tag) => (
          <span
            key={tag}
            onClick={() => setSelectedTag(tag)}
            className={`cursor-pointer px-4 py-1 rounded-full transition-all duration-300 ${
              selectedTag === tag
                ? "bg-gradient-to-b from-[#CE9FFC] via-[#A582F7] to-[#7367F0] text-white"
                : "bg-[#343750] hover:bg-[#454866]"
            }`}
          >
            {tag}
          </span>
        ))}
      </div>

      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto">
        {filteredJobs?.map((job) => (
          <div className="" key={job?.id}>
            <JobCard job={job} />
          </div>
        ))}
      </div>
    </div>
  );
}
