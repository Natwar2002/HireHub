import { Input } from "@heroui/input";
import { LucideLoader, TriangleAlert } from "lucide-react";
import { IoShieldCheckmark } from "react-icons/io5";
import { useNavigate } from "react-router-dom"

export const AdminSigninCard = ({ signinForm, setSigninForm, onSigninFormSubmit, isPending, isSuccess, error }) => {

    const navigate = useNavigate();

    return (
        <div className="">
            <div className="flex flex-col justify-center items-center gap-1 mb-5">
                <h1 className="text-2xl font-semibold">Admin Sign In</h1>
                <p className="text-xs">Welcom Back, Login to explore the jobs</p>
            </div>
            
            {error && (
                <div className='bg-destructive/15 px-4 py-2 rounded-md flex items-center gap-x-2 text-sm text-red-600 mb-6'>
                    <TriangleAlert className='size-5' />
                    <p>{error.error}</p>
                </div>
            )}
            {isSuccess && (
                <div className='bg-green-200 px-4 py-2 rounded-md flex items-center gap-x-2 text-green-600 text-sm mb-5'>
                    <IoShieldCheckmark className='size-5' />
                    <p>Successfully signed in, You will be redirected to the Home page shortly</p>
                    <LucideLoader className='animate-spin ml-2' />
                </div>
            )}
            <form onSubmit={onSigninFormSubmit} className="flex flex-col w-full h-full gap-4">
                <Input 
                    size="sm"
                    label="Email" 
                    type="email" 
                    // isRequired
                    errorMessage="Please enter a valid email"
                    disabled={isPending}
                    onChange={(e) => setSigninForm({...signinForm, email: e.target.value })}
                />
                <Input 
                    size="sm"
                    label="Password" 
                    type="password" 
                    // isRequired
                    disabled={isPending}
                    onChange={(e) => setSigninForm({...signinForm, password: e.target.value })}
                /> 
                <button 
                    type="submit" 
                    className="text-white bg-gradient-to-b from-[#CE9FFC] via-[#A582F7] to-[#7367F0] hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-3 text-center me-2 mb-2 flex justify-center items-center gap-5"
                    disabled={isPending}
                >
                    { isPending || isSuccess ? `Signing in...` : 'Sign in' }
                    { isPending || isSuccess && (<LucideLoader className='animate-spin ml-2' />)}
                </button>
            </form>

            <p className='text-sm text-muted-foreground mt-4'>
                Don't have an account? 
                <span className='text-sky-600 hover:underline cursor-pointer' onClick={()=> navigate('/admin/invite')}> - Request Access</span>
            </p>
        </div>
    )
}