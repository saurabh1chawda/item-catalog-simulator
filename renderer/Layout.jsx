import React from 'react';
import './Layout.css';

export function Layout({ children }) {
  return (
    <React.StrictMode>
      {children}
    </React.StrictMode>
  );
}
