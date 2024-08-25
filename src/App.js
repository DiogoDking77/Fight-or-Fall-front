import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import MySidebar from './components/MySidebar';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Snackbar from './components/Snackbar'; // Importa o componente Snackbar
import axios from './axios'; // Importe o axios configurado

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarType, setSnackbarType] = useState('success'); // 'success' ou 'error'
  const [snackbarVisible, setSnackbarVisible] = useState(false);

  useEffect(() => {
    // Verifique se há um token no localStorage e atualize o estado de autenticação
    const token = localStorage.getItem('authToken');
    if (token) {
      axios.get('/check-token', { headers: { 'Authorization': `Bearer ${token}` } })
        .then(() => setIsAuthenticated(true))
        .catch(() => setIsAuthenticated(false));
    }
  }, []);

  const login = () => {
    setIsAuthenticated(true);
    showSnackbar('Login successful', 'success');
  };

  const logout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('authToken');
  };

  const showSnackbar = (message, type = 'success') => {
    setSnackbarMessage(message);
    setSnackbarType(type);
    setSnackbarVisible(true);
    setTimeout(() => {
      setSnackbarVisible(false);
    }, 3000); // Snackbar é visível por 3 segundos
  };

  return (
    <Router>
      <div className="flex">
        {isAuthenticated && <MySidebar logout={logout} />}
        <div className="flex-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={!isAuthenticated ? <Login login={login} showSnackbar={showSnackbar} /> : <Navigate to="/dashboard/tourneys" />} />
            <Route path="/register" element={!isAuthenticated ? <Register login={login} showSnackbar={showSnackbar} /> : <Navigate to="/dashboard/tourneys" />} />
            <Route path="/dashboard/*" element={isAuthenticated ? <Dashboard logout={logout} /> : <Navigate to="/" />} />
          </Routes>
        </div>
      </div>
      <Snackbar message={snackbarMessage} type={snackbarType} visible={snackbarVisible} onClose={() => setSnackbarVisible(false)} />
    </Router>
  );
}

export default App;
