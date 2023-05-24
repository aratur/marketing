/* eslint-disable @typescript-eslint/no-non-null-assertion */
import React, { useRef, FormEvent, useState } from 'react';
import { Link } from 'react-router-dom';
import * as Form from '@radix-ui/react-form';
import './styles.scss';
import FormField from '../../components/Form/FormField';
import { useAuth } from '../../state/AuthContext/AuthContext';

const ForgotPassword = () => {
  const emailRef = useRef<HTMLInputElement>(null);
  const { currentUser, resetPassword } = useAuth();
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const validInput = (): boolean => {
    if (emailRef.current?.value === undefined) return false;
    if (emailRef.current?.value.length < 5) return false;
    return true;
  };

  const handleSubmit = async (
    event: FormEvent<HTMLFormElement>
  ): Promise<void> => {
    event.preventDefault();
    if (!validInput()) return setError('Failed Reset Password validation');
    try {
      setMessage('');
      setError('');
      setLoading(true);
      await resetPassword(emailRef.current!.value);
      setMessage('Check your inbox for further instructions');
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
      <h2>Reset Password</h2>
      <Form.Root className="form__root" onSubmit={handleSubmit}>
        {currentUser && <p>{currentUser.email}</p>}
        {error && <p>{error}</p>}
        {message && <div className="message">{message}</div>}
        <FormField
          label="e-mail"
          message="Please provide your e-mail"
          warning="Please provide a valid email"
          type="email"
          ref={emailRef}
        />

        <Form.Submit asChild>
          <button disabled={loading} type="submit" className="form__button">
            Reset Password
          </button>
        </Form.Submit>
      </Form.Root>
      <div className="reset-password">
        <Link to="/login"> Log In</Link>
      </div>
      <div className="need-an-account">
        Need an account? <Link to="/sign-up">Sign Up</Link>
      </div>
    </div>
  );
};

export default ForgotPassword;
