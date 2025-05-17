import CommonButton from "../../component/Button/Button";
import NavBar from "../../component/NavigationBar/NavBar";
import PlayIcon from "../../assets/video-square.png";
import Partner from "../../assets/Group (4).png";
import Companies from "../../assets/Group (1).png";
import companiesImage from "../../assets/Group (5).png";
import PeoplesImage from "../../assets/Group (6).png";
import Logo from "../../assets/job-search.png";
import JobCard from "../../component/JobCard/JobCard";
import store from "../../redux/store";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { jobsHome, tags } from "../../utils/constants";

export const Home = () => {

  const navigate = useNavigate();
  const [selectedTag, setSelectedTag] = useState("All");
  const { user, token } = store.getState().auth;

  const filteredJobs = selectedTag === "All" ? jobsHome : jobsHome.filter((job) => job.tag === selectedTag);

  function handleGetStartedClick() {
    if(user && token) {
      navigate('/jobs');
    } else {
      navigate('/auth/signin');
    }
  }

  function handleHireFromUsClick() {
    if(user && token) {
      navigate('/recruiter/signin');
    } else {
      navigate('/auth/signin');
    }
  }

  return (
    <>
      <div className="w-full h-screen mt-12 flex flex-col items-center justify-center relative">
        <div className="text-center ">
          <h2 className="font-cabinet text-9xl max-xl:text-7xl font-bold ">
            One step closer to
          </h2>
          <h2 className="font-cabinet text-9xl max-xl:text-7xl font-bold text-transparent bg-clip-text bg-gradient-to-b from-[#535353] to-white">
            your dream job
          </h2>
        </div>
        <div className="my-10">
          <span>let us help you find a job that suits you the best!</span>
        </div>
        <div className="flex items-center gap-10">
          <CommonButton 
            onClickHandler={handleGetStartedClick}
            text={"Get Started"} 
          />
          <div className="flex items-center">
            <img src={PlayIcon} alt="play-icon" />
            <p>Our Story</p>
          </div>
        </div>
        <div className="flex mt-20 items-center gap-14">
          <div className="flex flex-col items-center justify-center">
            <h3 className="text-3xl font-cabinet font-bold">20M+</h3>
            <span className="font-extralight text-center">Users</span>
          </div>
          <div className="flex flex-col items-center justify-center">
            <h3 className="text-3xl font-cabinet font-bold">500K+</h3>
            <span className="font-extralight text-center">Jobs</span>
          </div>
          <div className="flex flex-col items-center justify-center">
            <h3 className="text-3xl font-cabinet font-bold">200+</h3>
            <span className="font-extralight text-center">Partners</span>
          </div>
        </div>
        <div className="relative top-32 w-full h-[200px] flex items-center overflow-hidden">
          <div className="w-[100vw] -rotate-2 flex justify-center h-28 bg-gradient-to-b from-[#CE9FFC] via-[#A582F7] to-[#7367F0] ">
            <div className="w-[100vw] rotate-3 flex justify-center h-28 bg-gradient-to-b from-[#CE9FFC] via-[#A582F7] to-[#7367F0] overflow-hidden absolute shadow-large"></div>
          </div>
          <img
            src={Partner}
            alt="partner-logos"
            className="absolute top-14 left-[50%] -translate-x-1/2 -rotate-1"
          />
        </div>
      </div>
      <div className="w-[80vw] mt-52 flex justify-center gap-20 items-center m-auto">
        <div className="">
          <img src={Companies} alt="" />
        </div>
        <div className="w-[400px]">
          <h3 className="text-4xl font-cabinet font-bold mb-4">
            Work With <span className="text-purple-400">Exciting</span> <br />{" "}
            Companies
          </h3>
          <p className="mb-6 font-extralight">
            Land your dream role with determination, showcasing skills and
            confidence every single time
          </p>
          <CommonButton
            onClickHandler={handleGetStartedClick} 
            text={"Get Started"} 
          />
        </div>
      </div>
      <div className="mt-40">
        <div className="text-center ">
          <h3 className="text-4xl font-cabinet font-bold">
            Newest <span className="text-purple-400">Jobs</span> for You
          </h3>
          <p className="mb-4 font-extralight">
            Get the fastest application so that your name is above other
            application
          </p>
          <div className="flex justify-center flex-wrap gap-4 mb-8 my-12">
            {tags.map((tag) => (
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
        </div>
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto mt-12">
          {filteredJobs.map(job => (
            <JobCard key={job.id} job={job} />
          ))}
        </div>
      </div>
      <div className="text-center mt-40">
        <h3 className="text-4xl font-cabinet font-bold mb-4">
          Explore By <span className="text-purple-400">Categories</span>
        </h3>
        <p className="mb-4 font-extralight">
          This customization helps you to explore on your preferred skills
        </p>
        <div className="">
          <div className="">
            <h4 className="text-2xl mt-10 font-cabinet font-light">
              Popular Categories
            </h4>
            <div className="flex justify-center gap-5 mt-10">
              <p className="border px-4 py-1 rounded-full cursor-pointer hover:bg-purple-700 transition-all">
                Mobile Developer
              </p>
              <p className="border px-4 py-1 rounded-full cursor-pointer hover:bg-purple-700 transition-all">
                Software Developer
              </p>
              <p className="border px-4 py-1 rounded-full cursor-pointer hover:bg-purple-700 transition-all">
                Full Stack Developer
              </p>
              <p className="border px-4 py-1 rounded-full cursor-pointer hover:bg-purple-700 transition-all">
                Frontend Developer
              </p>
              <p className="border px-4 py-1 rounded-full cursor-pointer hover:bg-purple-700 transition-all">
                Backend Developer
              </p>
              <p className="border px-4 py-1 rounded-full cursor-pointer hover:bg-purple-700 transition-all">
                Could Developer
              </p>
            </div>
            <div></div>
          </div>
          <div className=""></div>
        </div>
      </div>
      <div className="flex flex-col justify-center items-center mt-20">
        <h3 className="text-4xl font-cabinet font-bold mb-4">
          Work with exciting 100+{" "}
          <span className="text-purple-400">Companies</span> in the world
        </h3>
        <img src={companiesImage} alt="logo" className="block" />
      </div>
      <div className="w-[80vw] mt-52 flex justify-center gap-20 items-center m-auto">
        <div className="w-[400px]">
          <h3 className="text-4xl font-cabinet font-bold mb-4">
            So Many People are <span className="text-purple-400">engaged </span>
            all over the world Companies
          </h3>
          <p className="mb-6 font-extralight">
            Land your dream role with determination, showcasing skills and
            confidence every single time
          </p>
          <CommonButton 
            onClickHandler={handleHireFromUsClick}
            text={"Hire From Us"} 
          />
        </div>
        <div className="">
          <img src={PeoplesImage} alt="" />
        </div>
      </div>
      <div className="mt-40 w-[80vw] m-auto flex justify-between p-4">
        <div className="flex items-center gap-2">
          <img src={Logo} alt="logo" className="w-10" />
          <p className="text-2xl font-bold">HireHub</p>
        </div>
        <div>
            <p className="font-cabinet font-light">We are Always Happy To Help</p>
            <p>HireHub@gmail.com</p>
        </div>
      </div>
      <hr className="w-[80vw] m-auto "/>
      <div className="text-center p-4">
        <p>Copyright @ 2025 HireHub</p>
      </div>
    </>
  );
};
