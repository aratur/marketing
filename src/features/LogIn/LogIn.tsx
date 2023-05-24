/* eslint-disable @typescript-eslint/no-non-null-assertion */
import React, { useRef, FormEvent, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import * as Form from '@radix-ui/react-form';
import './styles.scss';
import FormField from '../../components/Form/FormField';
import { useAuth } from '../../state/AuthContext/AuthContext';
import GoogleLogin from './GoogleLogin';

const LogIn = () => {
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const { currentUser, login } = useAuth();
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const validInput = (): boolean => {
    if (emailRef.current?.value === undefined) return false;
    if (emailRef.current?.value.length < 5) return false;
    if (passwordRef.current?.value === undefined) return false;
    if (passwordRef.current?.value.length < 5) return false;
    return true;
  };

  const handleSubmit = async (
    event: FormEvent<HTMLFormElement>
  ): Promise<void> => {
    event.preventDefault();
    if (!validInput()) return setError('Failed Log In validation');
    try {
      setError('');
      setLoading(true);
      await login(emailRef.current!.value, passwordRef.current!.value);
      navigate('/', { replace: true });
    } catch (err) {
      if (err instanceof Error) setError(err.message);
      else setError('Unknown error');
    } finally {
      setLoading(false);
    }
    return undefined;
  };

  return (
    <div className="form">
      <h2>Log In</h2>
      <Form.Root className="form__root" onSubmit={handleSubmit}>
        {currentUser && <p>{currentUser.email}</p>}
        {error && <p>{error}</p>}
        <FormField
          label="e-mail"
          message="Please provide your e-mail"
          warning="Please provide a valid email"
          type="email"
          ref={emailRef}
        />
        <FormField
          label="password"
          message="Please provide your password"
          warning="Please provide a valid password"
          type="password"
          ref={passwordRef}
        />
        <Form.Submit asChild>
          <button disabled={loading} type="submit" className="form__button">
            Log In
          </button>
        </Form.Submit>
      </Form.Root>
      <div className="reset-password">
        <Link to="/forgot-password">Forgot Password?</Link>
      </div>
      <div className="need-an-account">
        Need an account? <Link to="/sign-up">Sign Up</Link>
      </div>
      <div className="login-with-google">
        <GoogleLogin />
      </div>
    </div>
  );
};

export default LogIn;
