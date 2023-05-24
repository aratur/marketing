/* eslint-disable @typescript-eslint/no-non-null-assertion */
import React, { useRef, FormEvent, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import * as Form from '@radix-ui/react-form';
import './styles.scss';
import FormField from '../../components/Form/FormField';
import { useAuth } from '../../state/AuthContext/AuthContext';

const ProfileUpdate = () => {
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const passwordConfirmRef = useRef<HTMLInputElement>(null);
  const { currentUser, changeEmail, changePassword } = useAuth();
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const validInput = (): boolean => {
    if (emailRef.current?.value === undefined) return false;
    if (emailRef.current?.value.length < 5) return false;
    if (passwordRef.current?.value === undefined) return false;
    if (
      passwordRef.current?.value.length < 5 &&
      passwordRef.current?.value.length !== 0
    )
      return false;
    if (passwordConfirmRef.current?.value === undefined) return false;
    if (passwordConfirmRef.current.value !== passwordRef.current.value)
      return false;
    return true;
  };

  const handleSubmit = async (
    event: FormEvent<HTMLFormElement>
  ): Promise<void> => {
    event.preventDefault();
    if (!validInput()) return setError('Failed Profile Update validation');
    const promisees = [];
    if (emailRef.current?.value !== currentUser?.email) {
      promisees.push(changeEmail(emailRef.current!.value));
    }
    if (passwordRef.current?.value) {
      promisees.push(changePassword(passwordRef.current!.value));
    }

    try {
      setError('');
      setLoading(true);
      await Promise.all(promisees);
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
      <h2>Update Profile</h2>
      <Form.Root className="form__root" onSubmit={handleSubmit}>
        {currentUser && <p>{currentUser.email}</p>}
        {error && <p>{error}</p>}
        <FormField
          label="e-mail"
          message="Please provide your e-mail"
          warning="Please provide a valid email"
          type="email"
          ref={emailRef}
          defaultValue={currentUser?.email || ''}
        />
        <FormField
          label="password"
          message="Please provide your password"
          warning="Please provide a valid password"
          type="password"
          ref={passwordRef}
          placeholder="Leave blank to keep the same"
        />
        <FormField
          label="password confirmation"
          message="Please provide your password again"
          warning="Please provide an identical password"
          type="password"
          ref={passwordConfirmRef}
          placeholder="Leave blank to keep the same"
        />
        <Form.Submit asChild>
          <button disabled={loading} type="submit" className="form__button">
            Update Profile
          </button>
        </Form.Submit>
      </Form.Root>
      <div className="cancel">
        <Link to="/">Cancel</Link>
      </div>
    </div>
  );
};

export default ProfileUpdate;
