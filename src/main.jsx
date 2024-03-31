import { createRoot } from 'react-dom/client';
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App.jsx';
import './index.css';

const rootElement = document.getElementById('root');

createRoot(rootElement).render(
  <React.StrictMode>
    <div style={{ 
      backgroundImage: 'url(.//src/assets/talae.jpg)', 
      backgroundSize: 'cover', 
      backgroundPosition: 'center', 
      width: '100vw', 
      height: '100vh',
      overflow: 'overlay' // ใช้ overlay เพื่อให้ scrollbar ทับกับเนื้อหาและเลื่อนพร้อมกับหน้าเว็บ
    }}>
      <App />
    </div>
  </React.StrictMode>
);
