import React from 'react';
import technifyLogo from '../assets/technify logo.jpeg';

export default function WelcomeSplash() {
  return (
    <div className="d-flex flex-column justify-content-center align-items-center vh-100 bg-black text-white text-center animate-fade-in">
      <div className="position-relative mb-4">
        <img 
          src={technifyLogo} 
          alt="Technify Logo" 
          className="rounded-circle shadow-lg border border-secondary p-1"
          style={{ width: '100px', height: '100px', objectFit: 'cover' }}
        />
        {/* Glowing Bootstrap ring around the logo */}
        <div className="spinner-border text-info position-absolute top-0 start-0 w-100 h-100 m-0" role="status" style={{ borderWidth: '3px', animationDuration: '1.2s' }}>
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
      
      <h2 className="fw-bold mb-2" style={{ letterSpacing: '1px' }}>
        Welcome to <span className="text-info">Technify Workspace</span>
      </h2>
      <h5 
  className="mt-2 fw-medium animate-pulse" 
  style={{ 
    letterSpacing: '1px', 
    color: '#0dcaf0', // Beautiful glowing cyan accent color
    fontSize: '1.25rem' // Explicitly making it bigger and prominent!
  }}
>
  Initializing secure developer environment...
</h5>
    </div>
  );
}