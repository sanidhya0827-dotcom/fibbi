import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import { startAutoCapture } from './lib/supabase';
import { initPixel } from './lib/pixel';
import './styles/index.css';
import './styles/mobile.css';

initPixel(); // must run before the first trackEvent so fbq exists to queue calls
startAutoCapture();

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
