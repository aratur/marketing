import React from 'react';
import ReactDOM from 'react-dom/client';
import AuthContextProvider from './state/AuthContext/AuthContext';
import Router from './router/routes';
import './sass/reset.scss';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <AuthContextProvider>
      <Router />
    </AuthContextProvider>
  </React.StrictMode>
);
