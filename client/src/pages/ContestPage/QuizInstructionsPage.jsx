import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function QuizInstructionsPage() {
  const [countdown, setCountdown] = useState(15);
  const [ready, setReady] = useState(false);
  const navigate = useNavigate()

  useEffect(() => {
    const timer =
      countdown > 0 &&
      setInterval(() => {
        setCountdown((prev) => prev - 1);
      }, 1000);

    if (countdown === 0) setReady(true);

    return () => clearInterval(timer);
  }, [countdown]);

  return (
    <section className="min-h-screen bg-background text-foreground px-6 py-16">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold mb-2 text-center">📢 Read Before You Start</h1>
        <p className="text-center text-muted-foreground mb-10">
          Follow the instructions carefully to ensure a smooth and fair quiz experience.
        </p>

        {/* Quiz Instructions */}
        <div className="bg-card border border-border rounded-2xl shadow-md p-6 mb-8">
          <h2 className="text-2xl font-semibold mb-4">📘 Quiz Instructions</h2>
          <ul className="space-y-3 list-disc list-inside text-muted-foreground">
            <li>Make sure your webcam is working and your face is clearly visible.</li>
            <li>Sit in a quiet place without distractions.</li>
            <li>This is a fast-paced quiz with an aggressive timer – be prepared!</li>
            <li>After the quiz, your leaderboard rank will be visible to recruiters.</li>
          </ul>
        </div>

        {/* Fair Play Guidelines */}
        <div className="bg-card border border-border rounded-2xl shadow-md p-6">
          <h2 className="text-2xl font-semibold mb-4">🛡️ Fair Play Policy</h2>
          <ul className="space-y-3 list-disc list-inside text-muted-foreground">
            <li>Do not use third-party software or tools to assist during the quiz.</li>
            <li>Avoid switching tabs or screen sharing.</li>
            <li>Violation of rules may result in a temporary ban or disqualification.</li>
          </ul>
        </div>

        {/* Countdown & Start Button */}
        <div className="mt-12 text-center">
          {!ready ? (
            <p className="text-lg font-medium text-muted-foreground">
              ⏳ Starting in <span className="font-bold text-foreground">{countdown}s</span>...
            </p>
          ) : (
            <button
              className="mt-4 px-8 py-3 text-lg font-semibold rounded-xl text-white bg-gradient-to-r from-purple-500 to-indigo-600 shadow-lg hover:shadow-purple-500/50 transition-all duration-300"
              onClick={() => {
                // redirect to quiz or start logic
                console.log('Start Quiz');
                navigate('/contests/quiz')
              }}
            >
              🚀 Start Quiz
            </button>
          )}
        </div>
      </div>
    </section>
  );
}
