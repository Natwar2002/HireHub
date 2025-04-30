export const Auth = ({ children }) => {
    return(
        <div className="h-[100vh] flex items-center justify-center">
            <div className="w-full max-w-md bg-[#2d2f34] rounded-xl shadow-lg p-8">
                { children }
            </div>
        </div>
    );
};