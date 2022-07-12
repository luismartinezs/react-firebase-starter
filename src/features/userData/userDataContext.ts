import { IUserData } from './userDataTypes';
import { createContext } from 'react';

export const UserDataContext = createContext<IUserData | null | undefined>(null);
