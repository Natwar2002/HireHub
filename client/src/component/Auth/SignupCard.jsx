import { Input } from "@heroui/input"
import { useNavigate } from "react-router-dom";
import { IoShieldCheckmark } from 'react-icons/io5';
import { LucideLoader, TriangleAlert } from 'lucide-react';

export const SignupCard = ({ signupForm, setSignupForm, validationError, isPending, isSuccess, error, onSignupFormSubmit }) => {

    const navigate = useNavigate();

    return (
        <div className="">
            <div className="flex flex-col justify-center items-center gap-1 mb-5">
                <h1 className="text-2xl font-semibold">Sign Up</h1>
                <p className="text-xs">Welcom to HireHub, Let's create your account</p>
            </div>
            {validationError && (
                <div className='bg-destructive/15 px-4 py-2 rounded-md flex items-center gap-x-2 text-sm mb-6 text-red-600'>
                    <TriangleAlert className='size-5' />
                    <p>{validationError.message}</p>
                </div>
            )}
            {error && (
                <div className='bg-destructive/15 px-4 py-2 rounded-md flex items-center gap-x-2 text-sm text-red-600 mb-6'>
                    <TriangleAlert className='size-5' />
                    <p>{error.error}</p>
                </div>
            )}
            {isSuccess && (
                <div className='bg-green-200 px-4 py-2 rounded-md flex items-center gap-x-2 text-green-600 text-sm mb-5'>
                    <IoShieldCheckmark className='size-5' />
                    <p>Successfully signed up, You will be redirected to the login page shortly</p>
                    <LucideLoader className='animate-spin ml-2' />
                </div>
            )}
            <form onSubmit={onSignupFormSubmit} className="flex flex-col w-full h-full gap-4">
                <Input 
                    size="sm"
                    label="Username" 
                    type="text" 
                    isRequired
                    disabled={isPending}
                    onChange={(e) => setSignupForm({...signupForm, username: e.target.value })}
                />
                <Input 
                    size="sm"
                    label="Email" 
                    type="email" 
                    isRequired
                    errorMessage="Please enter a valid email"
                    disabled={isPending}
                    onChange={(e) => setSignupForm({...signupForm, email: e.target.value })}
                />
                <Input 
                    size="sm"
                    label="Password" 
                    type="password" 
                    isRequired
                    disabled={isPending}
                    onChange={(e) => setSignupForm({...signupForm, password: e.target.value })}
                /> 
                <Input 
                    label="Confirm Password" 
                    size="sm"
                    type="password" 
                    isRequired
                    disabled={isPending}
                    onChange={(e) => setSignupForm({...signupForm, confirmPassword: e.target.value })}
                />
                <button 
                    type="submit" 
                    className="text-white bg-gradient-to-b from-[#CE9FFC] via-[#A582F7] to-[#7367F0] hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-3 text-center me-2 mb-2 flex justify-center items-center gap-5"
                    disabled={isPending}
                >
                    { isPending || isSuccess ? `Signing up...` : 'Sign up' }
                    { isPending || isSuccess && (<LucideLoader className='animate-spin ml-2' />)}
                </button>
            </form>

            <p className='text-sm text-muted-foreground mt-4'>
                Already have an account? 
                <span className='text-sky-600 hover:underline cursor-pointer' onClick={()=> navigate('/auth/signin')}> Sign In</span>
            </p>
        </div>
    );
};