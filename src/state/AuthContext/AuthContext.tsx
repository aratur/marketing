import React, {
  PropsWithChildren,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import {
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  updatePassword,
  signInWithPopup,
  updateEmail,
  User,
  UserCredential,
} from 'firebase/auth';
import { auth, googleProvider } from '../../firebase';

export interface AuthContextI {
  currentUser: User | null;
  signUp: (email: string, password: string) => Promise<UserCredential>;
  login: (email: string, password: string) => Promise<UserCredential>;
  loginWithPopUp: () => Promise<UserCredential>;
  logout: () => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
  changePassword: (password: string) => Promise<void>;
  changeEmail: (password: string) => Promise<void>;
}

export const AuthContext = React.createContext<AuthContextI | null>(null);

const AuthContextProvider = (props: PropsWithChildren) => {
  const { children } = props;
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  function signUp(email: string, password: string) {
    return createUserWithEmailAndPassword(auth, email, password);
  }

  function login(email: string, password: string) {
    return signInWithEmailAndPassword(auth, email, password);
  }

  function loginWithPopUp() {
    return signInWithPopup(auth, googleProvider);
  }

  function logout() {
    return auth.signOut();
  }

  function resetPassword(email: string) {
    return sendPasswordResetEmail(auth, email);
  }

  const changePassword = useCallback(
    (password: string): Promise<void> => {
      if (currentUser) return updatePassword(currentUser, password);
      throw Error(
        'User information missing for Password change. Try to log in first.'
      );
    },
    [currentUser]
  );

  const changeEmail = useCallback(
    (email: string): Promise<void> => {
      if (currentUser) return updateEmail(currentUser, email);
      throw Error(
        'User information missing for E-mail change. Try to log in first.'
      );
    },
    [currentUser]
  );

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setCurrentUser(user);
      console.log('onAuthStateChanged changed: ', user);

      setIsLoading(false);
    });
    return unsubscribe;
  }, []);
  const value = useMemo(
    () => ({
      currentUser,
      signUp,
      login,
      loginWithPopUp,
      logout,
      resetPassword,
      changePassword,
      changeEmail,
    }),
    [changeEmail, changePassword, currentUser]
  );

  return (
    <AuthContext.Provider value={value}>
      {!isLoading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === null) throw Error('Missing context provider.');
  return context;
};

export default AuthContextProvider;
