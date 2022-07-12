import { createContext } from 'react';

export interface IAuthContext {
  userData: any;
  signinWithGoogle: (callback?: VoidFunction) => Promise<void>;
  logout: (callback?: VoidFunction) => Promise<void>;
  isLoading: boolean;
  isError: boolean;
  error: any;
  deleteUser: (callback?: VoidFunction) => any;
  pendingDeleteUser: boolean;
  errorDeleteUser: any;
}

const AuthContext = createContext<IAuthContext>(null!);

export default AuthContext;
