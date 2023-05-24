import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import PrivateDashboard from '../features/Dashboard/PrivateDashboard';
import SignUp from '../features/SignUp/SignUp';
import LogIn from '../features/LogIn/LogIn';
import Layout from '../layout/Layout';
import ForgotPassword from '../features/ForgotPassword/ForgotPassword';
import ProfileUpdate from '../features/ProfileUpdate/ProfileUpdate';

const routes = [
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        path: '/',
        element: <PrivateDashboard />,
      },
      {
        path: '/sign-up',
        element: <SignUp />,
      },
      {
        path: '/login',
        element: <LogIn />,
      },
      {
        path: '/forgot-password',
        element: <ForgotPassword />,
      },
      {
        path: '/profile-update',
        element: <ProfileUpdate />,
      },
    ],
  },
  {
    path: '*',
    element: <p>site doesn`t exist</p>,
  },
];

const router = createBrowserRouter(routes);

// eslint-disable-next-line react/function-component-definition
export default function Router() {
  return <RouterProvider router={router} />;
}
