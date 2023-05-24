import React from 'react';
import { useAuth } from '../../state/AuthContext/AuthContext';
import LogIn from '../../features/LogIn/LogIn';

interface WrapperProps {
  role?: string;
}

function privateHOC<T extends WrapperProps>(
  Inbound: React.FunctionComponent<T>
) {
  const Wrapper = (props: T) => {
    const { currentUser } = useAuth();
    if (currentUser) {
      return <Inbound {...props} />;
    }
    return <LogIn />;
  };
  return Wrapper;
}

export default privateHOC;
