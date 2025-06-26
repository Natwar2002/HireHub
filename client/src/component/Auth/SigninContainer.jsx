import { SigninCard } from "./SigninCard";
import { useSignin } from '../../hooks/apis/useSignin';
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export const SigninContainer = () => {

    const { isPending, isSuccess, error, signinMutation } = useSignin();
    const [signinForm, setSigninForm] = useState({
        email: '',
        password: ''
    });
    const navigate = useNavigate();
    const [validationError, setValidationError] = useState(null);

    async function onSigninFormSubmit(e) {
        e.preventDefault();
        try {
            if (!/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(signinForm.email)) {
                setValidationError({ message: 'Please enter a valid email' });
                return;
            }
            if(signinForm.password.length <= 3) {
                setValidationError({ message: 'Password should be at least 3 characters long' });
                return;               
            }
            await signinMutation({
                email: signinForm.email,
                password: signinForm.password
            })
        } catch (error) {
            console.log('Error in login', error.error);
        }
    }

    useEffect(()=> {
        if(isSuccess) {
            setTimeout(() => {
                navigate('/home');
            }, 1000);
        }
    }, [isSuccess, navigate]);

    return (
        <SigninCard 
            validationError={validationError}
            signinForm={signinForm}
            setSigninForm={setSigninForm}
            onSigninFormSubmit={onSigninFormSubmit}
            error={error}
            isPending={isPending}
            isSuccess={isSuccess}
        />
    )
}