import { useNavigate } from 'react-router-dom';

const NotFound = () => {
    const navigate = useNavigate();
    return (
        <div className="min-h-screen bg-black flex flex-col items-center justify-center text-white px-6">
        <h1 className="text-[10rem] font-extrabold leading-none">404</h1>
        <p className="text-2xl mt-4 tracking-wide">You just hit a dead end.</p>
        <p className="text-md text-gray-400 mt-1">But damn, at least it looks good.</p>

        <button
            onClick={() => navigate(-1)}
            className="mt-8 px-6 py-3 text-black font-semibold rounded-full bg-gradient-to-b from-[#CE9FFC] via-[#A582F7] to-[#7367F0] hover:opacity-90 transition duration-300 shadow-lg"
        >
            Take Me Back
        </button>
        </div>
    );
};

export default NotFound;
