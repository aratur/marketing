/* eslint-disable @typescript-eslint/no-non-null-assertion */
import React, { useRef, FormEvent, useState } from 'react';
import { Link } from 'react-router-dom';
import * as Form from '@radix-ui/react-form';
import './styles.scss';
import FormField from '../../components/Form/FormField';
import { useAuth } from '../../state/AuthContext/AuthContext';

const SignUp = () => {
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const passwordConfirmRef = useRef<HTMLInputElement>(null);
  const { signUp, currentUser } = useAuth();
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const validInput = (): boolean => {
    if (emailRef.current?.value === undefined) return false;
    if (emailRef.current?.value.length < 5) return false;
    if (passwordRef.current?.value === undefined) return false;
    if (passwordRef.current?.value.length < 5) return false;
    if (passwordConfirmRef.current?.value === undefined) return false;
    if (passwordConfirmRef.current.value !== passwordRef.current.value)
      return false;
    return true;
  };

  const handleSubmit = async (
    event: FormEvent<HTMLFormElement>
  ): Promise<void> => {
    event.preventDefault();
    if (!validInput()) return setError('Failed Sign Up validation');
    try {
      setError('');
      setLoading(true);
      await signUp(emailRef.current!.value, passwordRef.current!.value);
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
      <h2>Sign Up</h2>
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
        <FormField
          label="password confirmation"
          message="Please provide your password again"
          warning="Please provide an identical password"
          type="password"
          ref={passwordConfirmRef}
        />
        <Form.Submit asChild>
          <button disabled={loading} type="submit" className="form__button">
            Sign Up
          </button>
        </Form.Submit>
      </Form.Root>
      <div className="have-an-account">
        Already have an account? <Link to="/login">Log In</Link>
      </div>
    </div>
  );
};

export default SignUp;
