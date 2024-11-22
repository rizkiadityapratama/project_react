import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';  // Pastikan Anda mengimpor komponen App
import { BrowserRouter } from 'react-router-dom';  // Import BrowserRouter

ReactDOM.render(
  <BrowserRouter>  {/* Pembungkus Router */}
    <App />  {/* Aplikasi Anda */}
  </BrowserRouter>,
  document.getElementById('root')
);
