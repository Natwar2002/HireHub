import { useNavigate } from "react-router-dom"

export default function ContestCard({quiz}) {

  const navigate = useNavigate()

  return (
     <div key={quiz.id} className="relative group">
            <div
              className={`absolute -inset-0.5 rounded-2xl blur-xl opacity-0 group-hover:opacity-80 transition duration-500 z-0 pointer-events-none bg-gradient-to-br ${quiz.gradientFrom} ${quiz.gradientTo}`}
            />

            <div className="relative z-10 p-6 rounded-2xl border border-border bg-card text-card-foreground shadow-lg transition-all duration-300 group-hover:scale-[1.03]">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-semibold">{quiz.title}</h2>
                {quiz.icon}
              </div>

              <p className="text-sm text-muted-foreground">
                Take this challenge to prove your expertise!
              </p>

              <div className="mt-4 flex justify-between text-sm">
                <p>
                  <strong>{quiz.questions}</strong> Questions
                </p>
                <p>
                  <strong>{quiz.duration}</strong>
                </p>
              </div>

              <button
                onClick={()=>navigate('/contests/start')}
                className="mt-6 w-full py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition duration-200"
              >
                Start Quiz
              </button>
            </div>
          </div>
  )
}
