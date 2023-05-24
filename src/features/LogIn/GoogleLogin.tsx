import React, { useState } from 'react';
import { useAuth } from '../../state/AuthContext/AuthContext';

const GoogleLogin = () => {
  const { loginWithPopUp } = useAuth();
  const [error, setError] = useState('');

  async function handleClick(
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ): Promise<void> {
    try {
      await loginWithPopUp();
    } catch (e) {
      if (e instanceof Error) {
        setError(e.message);
      } else setError('Unknown error.');
    }
  }

  return (
    <button type="button" onClick={handleClick}>
      Login with Google
    </button>
  );
};

export default GoogleLogin;
