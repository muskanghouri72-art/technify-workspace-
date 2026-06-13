import React, { useState } from 'react';
import technifyLogo from '../assets/technify logo.jpeg';

export default function Auth({ onLoginSuccess }) {
  const [isLoginTab, setIsLoginTab] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    // Simulate a brief loading state before entering the dashboard
    setTimeout(() => {
      setLoading(false);
      onLoginSuccess(); // This triggers the state change in App.jsx to load the workspace!
    }, 1200);
  };

  return (
    <div className="container d-flex align-items-center justify-content-center min-vh-100 bg-black text-white" style={{ width: '100vw', overflowX: 'hidden' }}>
      <div className="card bg-dark border-secondary p-4 shadow-lg" style={{ width: '400px', borderRadius: '12px' }}>
   {/* Logo / Brand Header */}
      <div className="text-center mb-4">
        <img 
          src={technifyLogo} 
          alt="Technify Logo" 
          className="rounded-circle img-fluid shadow mb-2"
          style={{ 
            width: '85px', 
            height: '85px', 
            objectFit: 'cover',
            border: '3px solid #0dcaf0' 
          }} 
        />
        <h3 className="fw-bold mb-1 text-white">Technify <span className="text-info">Workspace</span></h3>
        <p className="text-secondary small">Cloud Developer Environment</p>
      </div>

        {/* Tab Buttons to switch between Login and Signup */}
        <div className="d-flex btn-group mb-4 bg-black p-1 rounded-3" role="group">
          <button 
            type="button" 
            className={`btn btn-sm text-white fw-semibold border-0 rounded-2 ${isLoginTab ? 'btn-secondary bg-opacity-50' : 'bg-transparent'}`}
            onClick={() => setIsLoginTab(true)}
          >
            Sign In
          </button>
          <button 
            type="button" 
            className={`btn btn-sm text-white fw-semibold border-0 rounded-2 ${!isLoginTab ? 'btn-secondary bg-opacity-50' : 'bg-transparent'}`}
            onClick={() => setIsLoginTab(false)}
          >
            Register
          </button>
        </div>

        {/* Submission Form */}
        <form onSubmit={handleSubmit}>
          {!isLoginTab && (
            <div className="mb-3">
              <label className="form-label text-secondary small fw-semibold">Full Name</label>
              <input 
                type="text" 
                className="form-control bg-secondary text-white border-0 py-2 small" 
                placeholder="Enter your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required 
              />
            </div>
          )}

          <div className="mb-3">
            <label className="form-label text-secondary small fw-semibold">Email Address</label>
            <input 
              type="email" 
              className="form-control bg-secondary text-white border-0 py-2 small" 
              placeholder="developer@technify.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required 
            />
          </div>

          <div className="mb-4">
            <label className="form-label text-secondary small fw-semibold">Password</label>
            <input 
              type="password" 
              className="form-control bg-secondary text-white border-0 py-2 small" 
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required 
            />
          </div>

          <button 
            type="submit" 
            className="btn btn-info w-100 fw-bold py-2 text-dark d-flex align-items-center justify-content-center gap-2"
            disabled={loading}
          >
            {loading ? (
              <>
                <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                Authenticating...
              </>
            ) : (
              isLoginTab ? 'Access Workspace' : 'Create Account'
            )}
          </button>
        </form>

        <div className="text-center mt-4 text-muted" style={{ fontSize: '11px' }}>
          Secure end-to-end sandbox platform encryption.
        </div>
      </div>
    </div>
  );
}