import React, { useEffect, useState } from 'react';
import { getDocs, collection } from 'firebase/firestore';
import { Link } from 'react-router-dom';
import { useAuth } from '../../state/AuthContext/AuthContext';
import { db } from '../../firebase';

// eslint-disable-next-line arrow-body-style
const Dashboard = () => {
  const { logout, currentUser } = useAuth();
  const [userList, setUserList] = useState<any[]>([]);
  const [error, setError] = useState('');

  const moviesCollectionRef = collection(db, 'users');

  useEffect(() => {
    const getMovieList = async () => {
      try {
        const data = await getDocs(moviesCollectionRef);
        const filtered = data.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));
        setUserList(filtered);
      } catch (e) {
        if (e instanceof Error) {
          setError(e.message);
        }
      }
    };
    getMovieList();
    return () => {
      // second
    };
  }, []);

  return (
    <>
      <h2>Dashboard</h2>
      <div className="content">
        <h3>List of users</h3>
        {userList.map((user) => (
          <p key={user.id}>{JSON.stringify(user)}</p>
        ))}
        {error && <div className="error">{error}</div>}
        <h3>Profile</h3>
        <Link to="/profile-update" className="profile__link">
          Update profile
        </Link>
      </div>
    </>
  );
};

export default Dashboard;
