import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import MySidebar from './components/MySidebar';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
//import Snackbar from './components/Snackbar';
import { SnackbarProvider } from './contexts/SnackbarContext'; // Atualize o caminho conforme necessário

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userId, setUserId] = useState(null);
  const [userName, setUserName] = useState('');

  useEffect(() => {
    const storedUserId = localStorage.getItem('userId');
    const storedUserName = localStorage.getItem('userName');

    if (storedUserId && storedUserName) {
      setIsAuthenticated(true);
      setUserId(storedUserId);
      setUserName(storedUserName);
    }
  }, []);

  const login = (user) => {
    setIsAuthenticated(true);
    setUserId(user.id);
    setUserName(user.name);

    localStorage.setItem('userId', user.id);
    localStorage.setItem('userName', user.name);
    // No need to call showSnackbar here anymore
  };

  const logout = () => {
    setIsAuthenticated(false);
    setUserId(null);
    setUserName('');

    localStorage.removeItem('userId');
    localStorage.removeItem('userName');
    localStorage.removeItem('authToken');
    // No need to call showSnackbar here anymore
  };

  return (
    <SnackbarProvider>
      <Router>
        <div className="flex">
          <div className="flex-1">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={!isAuthenticated ? <Login login={login} /> : <Navigate to="/dashboard/tourneys" />} />
              <Route path="/register" element={!isAuthenticated ? <Register login={login} /> : <Navigate to="/dashboard/tourneys" />} />
              <Route path="/dashboard/*" element={isAuthenticated ? <Dashboard logout={logout} userId={userId} userName={userName} /> : <Navigate to="/" />} />
            </Routes>
          </div>
        </div>
      </Router>
    </SnackbarProvider>
  );
}

export default App;
