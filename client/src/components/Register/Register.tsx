import { useRef, useState , FormEvent, RefObject } from 'react';
import validateForm from '../../validation/registerValidation';
import { RegisterErrorMessages } from '../../Types/Types'
import { useUser } from '../../hooks/useUser';
import axios from '../../api/axios';

export default function Register() {
    const user = useUser();
    const nameRef:RefObject<HTMLInputElement> = useRef(null);
    const lastnameRef:RefObject<HTMLInputElement> = useRef(null);
    const emailRef: RefObject<HTMLInputElement> = useRef(null);
    const ageRef:RefObject<HTMLInputElement> = useRef(null);
    const passwordRef:RefObject<HTMLInputElement> = useRef(null);
    const confirmPasswordRef:RefObject<HTMLInputElement> = useRef(null);
    
    const [serverErrors, setServerErrors] = useState<string>();
    const [loading, setLoading] = useState<boolean>(false);
    const [errorMessages, setErrorMessages] = useState<RegisterErrorMessages>({
        nameError: "",
        lastnameError: "",
        ageError: "",
        emailError: "",
        passwordError: "",
        confirmPasswordError: ""
    });
    // const [visiblePassword, setVisiblePassword] = useState<boolean>(false);
    // const [visibleConfirmPassword, setVisibleConfirmPassword] = useState<boolean>(false);
    const register = async (name: string, lastname:string, age: number, email:string, password:string) => {
        setLoading(true);
        try {
            const res = await axios.post("/auth/register", {name, lastname, age, email, password});
            if(res.status === 201) {
                user?.setUser({name, lastname, age, email});
            };
            
        } catch (e:any) {
            const status = parseInt(e.response.status);
            setLoading(false);
            if(status === 409) {
                setServerErrors("This email is already taken");
                return;
            }
            setServerErrors("Server error. Try again later.");
        }
        
    }
    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if(
            !nameRef.current || 
            !lastnameRef.current || 
            !emailRef.current ||
            !ageRef.current || 
            !passwordRef.current || 
            !confirmPasswordRef.current
        ) return;
        const name = nameRef.current.value;
        const lastname = lastnameRef.current.value;
        const email = emailRef.current.value;
        const age = parseInt(ageRef.current.value);
        const password = passwordRef.current.value;
        const confirmPassword = confirmPasswordRef.current.value;
        const validation = validateForm(name, lastname, age, email, password, confirmPassword);
        if(!validation.isValid) {
            setErrorMessages({...validation.errorMessages});
            return;
        }
        register(name, lastname, age, email, password);
    }
    return (
        <div className='form-container'>
            <h3>Register</h3>
            <form className='form' onSubmit={e => handleSubmit(e)}>
                <div className='form-input'>
                    <label htmlFor="name">Name</label>
                    <input ref={nameRef} type="text" id="name"/>
                    {errorMessages.nameError && <div className='error-message'>{errorMessages.nameError}</div>}
                </div>
                <div className='form-input'>
                    <label htmlFor="lastname">Last name</label>
                    <input ref={lastnameRef} type="text" id="lastname"/>
                    {errorMessages.lastnameError && <div className='error-message'>{errorMessages.lastnameError}</div>}
                </div>
                <div className='form-input'>
                    <label htmlFor="email">Email</label>
                    <input ref={emailRef} type="email" id="email"/>
                    {errorMessages.emailError && <div className='error-message'>{errorMessages.emailError}</div>}
                </div>
                <div className='form-input'>
                    <label htmlFor="age">Age</label>
                    <input ref={ageRef} type="number" id="age"/>
                    {errorMessages.ageError && <div className='error-message'>{errorMessages.ageError}</div>}
                </div>
                <div className='form-input'>
                    <label htmlFor="password">Password</label>
                    <input ref={passwordRef} type="text" id="name"/>
                    {errorMessages.passwordError && <div className='error-message'>{errorMessages.passwordError}</div>}
                </div>
                <div className='form-input'>
                    <label htmlFor="password">Confirm password</label>
                    <input ref={confirmPasswordRef} type="text" id="name"/>
                    {errorMessages.confirmPasswordError && <div className='error-message'>{errorMessages.confirmPasswordError}</div>}
                </div>
                {serverErrors && <div className='error-message'>{serverErrors}</div>}
                <div className="form-submit">
                    {loading ? <div className='loading'></div> : <button type="submit">Register</button>}
                </div>
            </form>
        </div>
    )
}
