import { ReactNode, Dispatch, SetStateAction } from 'react'
interface User {
    name: string;
    lastname: string;
    age: number;
    email: string;
}
interface RegisterErrorMessages {
    nameError: string;
    lastnameError: string;
    ageError: string;
    emailError: string;
    passwordError: string;
    confirmPasswordError: string;
}
interface LoginErrorMessages {
    emailError: string;
    passwordError: string;
}
interface ContextProviderProps {
    children: ReactNode
}
interface UserContext {
    user: User;
    setUser: Dispatch<SetStateAction<User>>;
}
export {
    type RegisterErrorMessages,
    type LoginErrorMessages,
    type User,
    type UserContext,
    type ContextProviderProps
}