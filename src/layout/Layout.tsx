import React from 'react';
import { Outlet } from 'react-router-dom';
import Navigation from '../features/Navigation/Navigation';

const Layout = () => (
  <>
    <header className="header">
      <Navigation />
    </header>
    <main className="main">
      <Outlet />
    </main>
    <footer className="footer">Copy right AJ</footer>
  </>
);

export default Layout;
