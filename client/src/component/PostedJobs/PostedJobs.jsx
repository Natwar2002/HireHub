import { useState } from "react";
import { Pencil, Trash2 } from "lucide-react";
import PostJobModal from "../Modal/PostJobModal";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";

export default function ManageJobPosts() {
  const [postedJobs, setPostedJobs] = useState([
    {
      id: 1,
      company: "TechCorp",
      jobTitle: "Frontend Developer",
      jobDescription: ["Build responsive UI components", "Integrate REST APIs"],
      tags: ["#frontend", "#react", "#javascript"],
      requiredSkills: ["React", "JavaScript", "HTML", "CSS"],
      location: "Remote",
      experience: "2+ years",
      responsibilities: ["Write clean code", "Participate in code reviews"],
      salary: {
        min: 60000,
        max: 90000,
      },
      jobType: "Full-time",
      deadLine: new Date("2025-07-01"),
    },
  ]);

  const [isEditOpen, setIsEditOpen] = useState(false);
  const [selectedJob, setSelectedJob] = useState(null);

  const handleDelete = (id) => {
    const confirmDelete = confirm("Are you sure you want to delete this job?");
    if (confirmDelete) {
      setPostedJobs(postedJobs.filter((job) => job.id !== id));
    }
  };

  const handleEdit = (job) => {
    setSelectedJob(job);
    setIsEditOpen(true);
  };

  return (
    <div className="p-6 ">
      <h2 className="text-2xl font-bold mb-6 px-6">Your Posted Jobs</h2>
      {postedJobs.length === 0 ? (
        <p>No jobs posted yet.</p>
      ) : (
        <div className="p-6 ">
          {postedJobs.map((job) => (
            <motion.div
              key={job.id}
              whileHover={{ scale: 1.03 }}
              className="p-6 rounded-xl bg-gradient-to-b from-[#471a69] via-[#8139e0] to-indigo-600 shadow-lg transition duration-300 hover:shadow-xl"
            >
              <div className="flex justify-between items-start mb-3">
                <div>
                  <h3 className="text-xl font-semibold ">{job.jobTitle}</h3>
                  <p className=" text-sm">
                    {job.company} • {job.location}
                  </p>
                  <p className="text-sm mt-1 ">Experience: {job.experience}</p>
                  <p className="text-sm ">Type: {job.jobType}</p>
                  <p className="text-sm ">
                    Salary: ${job.salary.min.toLocaleString()} - $
                    {job.salary.max.toLocaleString()}
                  </p>
                  <p className="text-sm ">
                    Deadline: {new Date(job.deadLine).toLocaleDateString()}
                  </p>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleEdit(job)}
                    className="text-blue-600 hover:text-blue-800"
                  >
                    <Pencil className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => handleDelete(job.id)}
                    className="text-red-600 hover:text-red-800"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              </div>
              <div className="flex items-center gap-10">
                <div className="mt-2">
                  <p className="font-semibold text-sm ">Description:</p>
                  <ul className="list-disc ml-5 text-sm ">
                    {job.jobDescription.map((desc, i) => (
                      <li key={i}>{desc}</li>
                    ))}
                  </ul>
                </div>

                <div className="mt-2">
                  <p className="font-semibold text-sm ">Responsibilities:</p>
                  <ul className="list-disc ml-5 text-sm ">
                    {job.responsibilities.map((resp, i) => (
                      <li key={i}>{resp}</li>
                    ))}
                  </ul>
                </div>
              </div>
              <div className="flex items-center gap-10 mt-5" >
                <div className="mt-2">
                  <p className="font-semibold text-sm ">Skills:</p>
                  <div className="flex flex-wrap gap-2 mt-1">
                    {job.requiredSkills.map((skill, i) => (
                      <span
                        key={i}
                        className="px-2 py-1 text-xs bg-purple-200 text-purple-700 rounded-full"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="mt-2">
                  <p className="font-semibold text-sm ">Tags:</p>
                  <div className="flex flex-wrap gap-2 mt-1">
                    {job.tags.map((tag, i) => (
                      <span
                        key={i}
                        className="px-2 py-1 text-xs font-semibold bg-blue-200 text-blue-700 rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {isEditOpen && (
        <PostJobModal
          isOpen={isEditOpen}
          onOpenChange={setIsEditOpen}
          jobData={selectedJob}
          onSave={(updatedJob) => {
            setPostedJobs((prevJobs) =>
              prevJobs.map((job) =>
                job.id === updatedJob.id ? updatedJob : job
              )
            );
            setIsEditOpen(false);
          }}
        />
      )}
    </div>
  );
}
