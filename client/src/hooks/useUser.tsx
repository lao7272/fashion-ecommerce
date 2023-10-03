import {useContext} from 'react';
import { userContext } from '../context/UserProvider';

export const useUser = () => useContext(userContext);
