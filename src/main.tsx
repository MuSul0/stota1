import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { Toaster } from '@/components/ui/sonner';
import { HelmetProvider } from 'react-helmet-async';
import './globals.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <HelmetProvider>
      <App />
      <Toaster />
    </HelmetProvider>
  </React.StrictMode>
);