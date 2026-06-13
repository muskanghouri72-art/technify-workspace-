import React, { useState, useEffect } from 'react';
import Auth from './components/Auth';
import Workspace from './components/Workspace';
import WelcomeSplash from './components/WelcomeSplash'; // Imported safely

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isInitializing, setIsInitializing] = useState(false); // New loader state
  const [darkMode, setDarkMode] = useState(true); // Defaulting to dark mode!

  // Trigger the loading splash screen the moment login is successful
  const handleLoginSuccess = () => {
    setIsAuthenticated(true);
    setIsInitializing(true);
  };

  // Run the 1.5-second welcome timer only when initializing starts
  useEffect(() => {
    if (isInitializing) {
      const timer = setTimeout(() => {
        setIsInitializing(false);
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, [isInitializing]);

  // Toggle helper function
  const toggleTheme = () => setDarkMode(!darkMode);

  return (
    <div className={darkMode ? '' : 'light-theme'}>
      {!isAuthenticated ? (
        // 1. Show Auth screen if not logged in
        <Auth onLoginSuccess={handleLoginSuccess} isDarkMode={darkMode} onToggleTheme={toggleTheme} />
      ) : isInitializing ? (
        // 2. Show Splash screen temporarily upon successful login
        <WelcomeSplash />
      ) : (
        // 3. Show your completely untouched Workspace component layout
        <Workspace onLogout={() => setIsAuthenticated(false)} isDarkMode={darkMode} onToggleTheme={toggleTheme} />
      )}
    </div>
  );
}

export default App;