import { memo, useCallback, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

const questions = [
  {
    id: 1,
    question: "What is React?",
    options: ["Framework", "Library", "Language", "Compiler"],
    answer: "Library",
  },
  {
    id: 2,
    question: "Which hook is used for managing state?",
    options: ["useState", "useEffect", "useMemo", "useContext"],
    answer: "useState",
  },
  {
    id: 3,
    question: "Next.js is built on top of?",
    options: ["Vue", "Angular", "React", "Svelte"],
    answer: "React",
  },
];

const QuizPage = () => {
  const [currentQ, setCurrentQ] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [timer, setTimer] = useState(15);
  const videoRef = useRef(null);
  const [quizFinish, setQuizFinish] = useState(false);
  const navigate = useNavigate();

  const handleNext = useCallback(() => {
    console.log(currentQ,questions.length-1)
    if (currentQ >= questions.length - 1) {
      console.log('if')
      setQuizFinish(true);
      setTimer(0);
    } else {
      console.log('else')
      setSelectedOption(null);
      setCurrentQ((prev) => (prev + 1 < questions.length ? prev + 1 : prev));
      setTimer(15);
    }
  }, [currentQ]);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimer((prev) => {
        if (prev === 1) {
          handleNext();
          return 15;
        }
        return prev - 1;
      });
    }, 1000);
    if (timer == 0 && currentQ >= questions.length - 1) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [currentQ, handleNext,timer]);

  useEffect(() => {
    navigator.mediaDevices
      .getUserMedia({ video: true })
      .then((stream) => {
        if (videoRef.current) videoRef.current.srcObject = stream;
      })
      .catch((err) => console.log("Webcam error:", err));
  }, []);

  const current = questions[currentQ];


  return (
    <>
      <div className="min-h-screen bg-background text-foreground px-4 py-10">
        <div className="max-w-5xl mx-auto grid md:grid-cols-3 gap-8 items-start">
          <div className="md:col-span-2 space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold">
                Question {currentQ + 1} of {questions.length}
              </h2>
              <div className="text-lg font-semibold text-purple-100 bg-purple-400 dark:bg-purple-900/40 px-4 py-1 rounded-xl shadow-inner">
                ⏳ {timer}s
              </div>
            </div>

            <div className="bg-card border border-border rounded-2xl p-6 shadow-md transition-all duration-300 hover:shadow-purple-500/30">
              <h3 className="text-xl font-medium mb-4">{current.question}</h3>
              <div className="grid gap-4">
                {current.options.map((option) => (
                  <button
                    key={option}
                    onClick={() => setSelectedOption(option)}
                    className={`w-full text-left px-4 py-3 rounded-lg border ${
                      selectedOption === option
                        ? "border-purple-500 bg-green-600 dark:bg-purple-900/30"
                        : "border-border hover:border-purple-400"
                    } transition-all`}
                  >
                    {option}
                  </button>
                ))}
              </div>

              <div className="mt-6 text-right">
                <button
                  onClick={handleNext}
                  disabled={!selectedOption}
                  className={`px-6 py-2 rounded-xl font-semibold transition-all duration-300 ${
                    selectedOption
                      ? "bg-gradient-to-r from-purple-500 to-indigo-600 text-white shadow-lg hover:shadow-purple-500/40"
                      : "bg-muted text-muted-foreground cursor-not-allowed"
                  }`}
                >
                  Save & Next →
                </button>
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-border p-4 shadow-md bg-card text-center space-y-3">
            <p className="text-lg font-semibold">📷 Monitoring</p>
            <div className="aspect-video w-full overflow-hidden rounded-xl border border-dashed border-purple-400 shadow-inner">
              <video
                ref={videoRef}
                autoPlay
                muted
                playsInline
                className="w-full h-full object-cover"
              />
            </div>
            <p className="text-sm text-muted-foreground">
              Your webcam feed is shown here for proctoring simulation.
            </p>
          </div>
        </div>
      </div>
      {quizFinish && (
        <div className="w-full h-screen absolute bg-[#303030af] top-0 flex items-center justify-center">
          <div className="w-[400px] h-fit p-8 rounded-xl border border-purple-600">
            <h3 className="text-4xl text-green-500 font-semibold mb-4">
              Contest is Over !
            </h3>
            <p className="text-[#ccc] mb-4">
              Your Ranking available soon on leaderboard after verification{" "}
            </p>
            <div className="text-center ">
              <button
                onClick={() => navigate("/home")}
                className="text-xl w-full px-6 py-1 rounded-xl bg-purple-600 text-white"
              >
                Exit
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default memo(QuizPage);
