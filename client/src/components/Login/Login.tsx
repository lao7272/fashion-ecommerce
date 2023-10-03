import { useState, useRef, RefObject, FormEvent } from 'react';
import { useUser } from '../../hooks/useUser';
import { LoginErrorMessages } from '../../Types/Types';
import axios from '../../api/axios';
import validateForm from '../../validation/loginValidation';

export default function Login() {
    const user = useUser();
    const emailRef: RefObject<HTMLInputElement> = useRef(null);
    const passwordRef:RefObject<HTMLInputElement> = useRef(null);
    const [serverErrors, setServerErrors] = useState<string>("");
    const [errorMessages, setErrorMessages] = useState<LoginErrorMessages>({
        emailError: "",
        passwordError: ""
    });
    const [loading, setLoading] = useState<boolean>(false);
    const login = async (email:string, password: string) => {
        setLoading(true)
        try {
            const res = await axios.post("/auth/login", {email, password});
            if(res.status === 201) {
                const userData = await res.data.user;
                user?.setUser({
                    name: userData.name,
                    lastname: userData.lastname,
                    age: userData.age,
                    email
                })
                console.log(user?.user, userData)
            }
        } catch (e:any) {
            const status = parseInt(e.response.status);
            setLoading(false);
            if (status === 401) {
                setServerErrors("Email or password incorrect");
            }
            setServerErrors("Server error. Try again later.");
        }
    }
    const handleSubmit = (e:FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if(
            !emailRef.current || 
            !passwordRef.current 
        ) return;
        const email = emailRef.current.value;
        const password = passwordRef.current.value;
        const validation = validateForm(email, password);
        if(!validation.isValid) {
            setErrorMessages({...validation.errorMessages});
            return;
        }
        login(email, password);
    }
    return (
            <div className='form-container'>
            <h3>Register</h3>
            <form className='form' onSubmit={e => handleSubmit(e)}>
                <div className='form-input'>
                    <label htmlFor="email">Email</label>
                    <input ref={emailRef} type="email" id="email"/>
                    {errorMessages.emailError && <div className='error-message'>{errorMessages.emailError}</div>}
                </div>
                <div className='form-input'>
                    <label htmlFor="password">Password</label>
                    <input ref={passwordRef} type="text" id="name"/>
                    {errorMessages.passwordError && <div className='error-message'>{errorMessages.passwordError}</div>}
                </div>
                {serverErrors && <div className='error-message'>{serverErrors}</div>}
                <div className="form-submit">
                    {loading ? <div className='loading'></div> : <button type="submit">Register</button>}
                </div>
            </form>
        </div>
    )
}
