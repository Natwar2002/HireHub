import { useState } from "react";
import { Pencil, Trash2 } from "lucide-react";

export default function ManageJobPosts() {
  const [jobs, setJobs] = useState([
    {
      id: 1,
      company: "TechCorp",
      jobTitle: "Frontend Developer",
      jobDescription: ["Build responsive UI", "Integrate APIs"],
      tags: ["#react", "#frontend"],
      requiredSkills: ["React", "JS", "HTML", "CSS"],
      location: "Remote",
      experience: "2+ years",
      responsibilities: ["Write clean code", "Review PRs"],
      salary: { min: 60000, max: 90000 },
      jobType: "Full-time",
      deadLine: new Date("2025-07-01"),
    },
    {
      id: 2,
      company: "InnoTech",
      jobTitle: "Backend Developer",
      jobDescription: ["Design REST APIs", "Database modeling"],
      tags: ["#node", "#backend"],
      requiredSkills: ["Node.js", "MongoDB", "Express"],
      location: "Hybrid",
      experience: "3+ years",
      responsibilities: ["Design architecture", "Write APIs"],
      salary: { min: 70000, max: 95000 },
      jobType: "Part-time",
      deadLine: new Date("2025-08-15"),
    },
  ]);

  const [selectedJob, setSelectedJob] = useState(jobs[0]);

  const handleDelete = (id) => {
    if (confirm("Delete this job post?")) {
      setJobs((prev) => prev.filter((j) => j.id !== id));
      setSelectedJob(jobs[0]);
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 h-[90vh] px-6 py-10 bg-[#0f0f0f] text-white">
      {/* LEFT COLUMN: JOB LIST */}
      <div className="md:col-span-1 border-r border-gray-700 pr-4 overflow-y-auto">
        <h2 className="text-2xl font-bold mb-6">Your Job Posts</h2>
        <div className="space-y-4">
          {jobs.map((job) => (
            <div
              key={job.id}
              onClick={() => setSelectedJob(job)}
              className={`cursor-pointer border p-4 rounded-xl hover:bg-gray-800 transition ${
                selectedJob?.id === job.id ? "bg-gray-800" : "bg-[#1a1a1a]"
              }`}
            >
              <h3 className="text-lg font-semibold">{job.jobTitle}</h3>
              <p className="text-sm text-gray-400">{job.company}</p>
              <p className="text-sm text-gray-500">
                {job.location} • {job.jobType}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* RIGHT COLUMN: DETAILS */}
      <div className="md:col-span-2 overflow-y-auto pl-6">
        {selectedJob ? (
          <div>
            <div className="flex justify-between items-start mb-6">
              <div>
                <h2 className="text-3xl font-bold">{selectedJob.jobTitle}</h2>
                <p className="text-gray-400 text-sm mt-1">
                  {selectedJob.company} • {selectedJob.location}
                </p>
                <p className="text-gray-500 text-sm">
                  Deadline:{" "}
                  {new Date(selectedJob.deadLine).toLocaleDateString()}
                </p>
              </div>
              <div className="flex gap-3">
                <button className="bg-blue-600 px-3 py-1.5 rounded flex items-center gap-1 text-sm hover:bg-blue-700">
                  <Pencil size={16} /> Edit
                </button>
                <button
                  onClick={() => handleDelete(selectedJob.id)}
                  className="bg-red-600 px-3 py-1.5 rounded flex items-center gap-1 text-sm hover:bg-red-700"
                >
                  <Trash2 size={16} /> Delete
                </button>
              </div>
            </div>

            <div className="grid gap-6">
              <div>
                <h4 className="text-lg font-semibold mb-2">Job Description</h4>
                <ul className="list-disc list-inside text-gray-300 space-y-1">
                  {selectedJob.jobDescription.map((item, idx) => (
                    <li key={idx}>{item}</li>
                  ))}
                </ul>
              </div>

              <div>
                <h4 className="text-lg font-semibold mb-2">Responsibilities</h4>
                <ul className="list-disc list-inside text-gray-300 space-y-1">
                  {selectedJob.responsibilities.map((item, idx) => (
                    <li key={idx}>{item}</li>
                  ))}
                </ul>
              </div>

              <div className="flex flex-wrap gap-4">
                <div>
                  <h4 className="text-lg font-semibold mb-1">Skills</h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedJob.requiredSkills.map((skill, idx) => (
                      <span
                        key={idx}
                        className="bg-purple-800/30 border border-purple-500 text-purple-200 text-xs px-3 py-1 rounded-full"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="text-lg font-semibold mb-1">Tags</h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedJob.tags.map((tag, idx) => (
                      <span
                        key={idx}
                        className="bg-blue-800/30 border border-blue-500 text-blue-200 text-xs px-3 py-1 rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <p className="text-gray-400">
                <strong>Salary:</strong> ${selectedJob.salary.min.toLocaleString()} - ${selectedJob.salary.max.toLocaleString()}
              </p>
            </div>
          </div>
        ) : (
          <p className="text-gray-500">Select a job to view details</p>
        )}
      </div>
    </div>
  );
}