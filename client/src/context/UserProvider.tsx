import {createContext, useState} from 'react';
import { User, UserContext, ContextProviderProps } from '../Types/Types';

export const userContext = createContext<UserContext | undefined>(undefined);

export const UserProvider = ({ children }: ContextProviderProps) => {
    const [user, setUser] = useState<User>({name: "", lastname: "", age: 0, email: ""});
    return (
        <userContext.Provider value={{ user, setUser }}>
            {children}
        </userContext.Provider>
    )
}