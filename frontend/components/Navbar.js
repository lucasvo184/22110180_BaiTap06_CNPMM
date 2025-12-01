'use client';

import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import './Navbar.css';

const Navbar = () => {
  const { user, logout, isAuthenticated, isAdmin } = useAuth();
  const router = useRouter();

  const handleLogout = () => {
    logout();
    router.push('/');
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link href="/" className="navbar-brand">
          BT04 CNPMM
        </Link>
        <div className="navbar-menu">
          <Link href="/" className="navbar-link">Home</Link>
          <Link href="/products" className="navbar-link">Products</Link>
          {isAuthenticated ? (
            <>
              {isAdmin && (
                <Link href="/admin" className="navbar-link">Admin</Link>
              )}
              <span className="navbar-user">Hello, {user?.username}</span>
              <button onClick={handleLogout} className="navbar-button">
                Logout
              </button>
            </>
          ) : (
            <>
              <Link href="/login" className="navbar-link">Login</Link>
              <Link href="/register" className="navbar-link">Register</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

