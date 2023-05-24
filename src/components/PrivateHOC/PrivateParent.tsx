import React from 'react';
import { useAuth } from '../../state/AuthContext/AuthContext';

const PrivateParent = (props: React.PropsWithChildren) => {
  const { children } = props;
  const { currentUser } = useAuth();
  if (currentUser) {
    // eslint-disable-next-line react/jsx-no-useless-fragment
    return <>{children}</>;
  }
  return <p>No access</p>;
};

export default PrivateParent;
