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

    async function onSigninFormSubmit(e) {
        e.preventDefault();
        console.log(signinForm);
        try {
            await signinMutation({
                email: signinForm.email,
                password: signinForm.password
            })
        } catch (error) {
            console.log('Error in login', error.message);
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
            signinForm={signinForm}
            setSigninForm={setSigninForm}
            onSigninFormSubmit={onSigninFormSubmit}
            error={error}
            isPending={isPending}
            isSuccess={isSuccess}
        />
    )
}