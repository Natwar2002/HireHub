import { SignupCard } from "./SignupCard";
import { useNavigate } from 'react-router-dom';
import { useSignup } from '../../hooks/apis/useSignup';
import { useEffect, useState } from "react";

export const SignupContainer = () => {

    const { isSuccess, isPending, error, signupMutation } = useSignup();
    const navigate = useNavigate();
    const [signupForm, setSignupForm] = useState({
        email: '',
        username: '',
        password: '',
        confirmPassword: '',
    });
    const [validationError, setValidationError] = useState(null);

    async function onSignupFormSubmit(e) {
        e.preventDefault(); 
        try { 
            if(signupForm.username.length < 3) {
                setValidationError({ message: 'Username should be at least 3 characters long' });
                console.log("Username should be at least 3 characters long");
                return;
            }
            if (!/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(signupForm.email)) {
                setValidationError({ message: 'Please enter a valid email' });
                console.log("Validation Error: Invalid email");
                return;
            }
            if(signupForm.password.length < 3) {
                setValidationError({ message: 'Password should be at least 3 characters long' });
                console.log("Password should be at least 3 characters long");
                return;               
            }
            if(signupForm.password !== signupForm.confirmPassword) {
                setValidationError({ message: 'Password does not match' });
                console.log('Password does not match');
                return;
            }                
            setValidationError(null);
            await signupMutation({
                email: signupForm.email,
                password: signupForm.password,
                username: signupForm.username
            });
        } catch (error) {
            console.log('Error in sign up', error);
        }
    }

    useEffect(() => {
        setTimeout(() => {
            if(isSuccess) {
                navigate('/auth/signin');
            }
        }, 1000);
    }, [isSuccess, navigate]);

    return (
        <SignupCard 
            signupForm={signupForm}
            isPending={isPending}
            isSuccess={isSuccess}
            error={error}
            setSignupForm={setSignupForm}
            validationError={validationError}
            onSignupFormSubmit={onSignupFormSubmit}
        />
    )
}