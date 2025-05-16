import { SiReact, SiNextdotjs, SiHtml5, SiNodedotjs, SiReactrouter } from 'react-icons/si';
import ContestCard from '../../component/ContestsCard/ContestCard';

const quizCategories = [
  {
    id: 'react',
    title: 'React Quiz',
    icon: <SiReact className="text-blue-500 dark:text-blue-400 text-4xl" />,
    questions: Math.floor(Math.random() * 11) + 15, // 15–25
    duration: `${Math.floor(Math.random() * 6) + 5} min`, // 5–10 min
    gradientFrom: 'from-blue-500',
    gradientTo: 'to-purple-600',
  },
  {
    id: 'nextjs',
    title: 'Next.js Quiz',
    icon: <SiNextdotjs className="text-black dark:text-white text-4xl" />,
    questions: Math.floor(Math.random() * 11) + 15,
    duration: `${Math.floor(Math.random() * 6) + 5} min`,
    gradientFrom: 'from-gray-700',
    gradientTo: 'to-purple-600',
  },
  {
    id: 'frontend',
    title: 'Frontend Quiz',
    icon: <SiHtml5 className="text-orange-500 dark:text-orange-400 text-4xl" />,
    questions: Math.floor(Math.random() * 11) + 15,
    duration: `${Math.floor(Math.random() * 6) + 5} min`,
    gradientFrom: 'from-pink-500',
    gradientTo: 'to-red-500',
  },
  {
    id: 'backend',
    title: 'Backend Quiz',
    icon: <SiNodedotjs className="text-green-500 dark:text-green-400 text-4xl" />,
    questions: Math.floor(Math.random() * 11) + 15,
    duration: `${Math.floor(Math.random() * 6) + 5} min`,
    gradientFrom: 'from-green-500',
    gradientTo: 'to-yellow-500',
  },
  {
    id: 'react-native',
    title: 'React Native Quiz',
    icon: <SiReactrouter className="text-indigo-500 dark:text-indigo-400 text-4xl" />,
    questions: Math.floor(Math.random() * 11) + 15,
    duration: `${Math.floor(Math.random() * 6) + 5} min`,
    gradientFrom: 'from-indigo-500',
    gradientTo: 'to-purple-700',
  },
];

export default function QuizContestPage() {
  return (
    <section className="min-h-screen bg-background text-foreground px-6 py-16">
      <div className="max-w-4xl mx-auto text-center">
        <h1 className="text-4xl font-bold">Boost Your Developer Profile</h1>
        <p className="mt-4 text-lg text-muted-foreground">
          Get recruiters' attention by completing quick tech contests – showcase your skills and stand out!
        </p>
      </div>

      <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {quizCategories.map((quiz) => (
          <ContestCard  quiz={quiz}/>
        ))}
      </div>
    </section>
  );
}
