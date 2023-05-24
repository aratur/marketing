import React, { useState } from 'react';
import { NavLink, redirect } from 'react-router-dom';
import { useAuth } from '../../state/AuthContext/AuthContext';
import './navigation.scss';

const Navigation = () => {
  const [error, setError] = useState('');
  const { logout, currentUser } = useAuth();

  const handleLogout = async (
    event: React.MouseEvent<HTMLAnchorElement, MouseEvent>
  ): Promise<void> => {
    try {
      await logout();
      redirect('/login');
    } catch (e) {
      if (e instanceof Error) {
        setError(e.message);
      } else {
        setError('Unknown error during login');
      }
    }
    console.log('Logged out');
  };

  return (
    <>
      <div className="navigation">
        <NavLink to="/login">Log In</NavLink>
        <NavLink to="/sign-up">Sign Up</NavLink>
        <NavLink to="/login" onClick={handleLogout}>
          Log Out
        </NavLink>
      </div>
      <div className="error">
        {error && <p>Something went wrong: {error}</p>}
      </div>
      <div className="user">
        <strong>Email: {currentUser?.email} </strong>
      </div>
    </>
  );
};

export default Navigation;
