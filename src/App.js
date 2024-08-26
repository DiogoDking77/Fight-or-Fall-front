import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import MySidebar from './components/MySidebar';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Snackbar from './components/Snackbar';
import axios from './axios';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userId, setUserId] = useState(null); // Estado para armazenar o ID do usuário
  const [userName, setUserName] = useState(''); // Estado para armazenar o nome do usuário
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarType, setSnackbarType] = useState('success');
  const [snackbarVisible, setSnackbarVisible] = useState(false);

  useEffect(() => {
    const storedUserId = localStorage.getItem('userId');
    const storedUserName = localStorage.getItem('userName');

    if (storedUserId && storedUserName) {
      setIsAuthenticated(true);
      setUserId(storedUserId);
      setUserName(storedUserName); // Recupera o nome do usuário do localStorage
    }
  }, []);

  const login = (user) => {
    setIsAuthenticated(true);
    setUserId(user.id);
    setUserName(user.name); // Armazena o nome do usuário no estado

    // Salva as informações do usuário no localStorage
    localStorage.setItem('userId', user.id);
    localStorage.setItem('userName', user.name);

    showSnackbar(`Hello ${user.name}!`, 'success'); // Exibe a mensagem de boas-vindas
  };

  const logout = () => {
    setIsAuthenticated(false);
    setUserId(null);
    setUserName('');

    localStorage.removeItem('userId');
    localStorage.removeItem('userName');
    localStorage.removeItem('authToken'); // Remova o token se estiver sendo usado

    showSnackbar('Logout successful', 'info');
  };

  const showSnackbar = (message, type = 'success') => {
    setSnackbarMessage(message);
    setSnackbarType(type);
    setSnackbarVisible(true);
    setTimeout(() => {
      setSnackbarVisible(false);
    }, 3000);
  };

  return (
    <Router>
      <div className="flex">
        <div className="flex-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={!isAuthenticated ? <Login login={login} showSnackbar={showSnackbar} /> : <Navigate to="/dashboard/tourneys" />} />
            <Route path="/register" element={!isAuthenticated ? <Register login={login} showSnackbar={showSnackbar} /> : <Navigate to="/dashboard/tourneys" />} />
            <Route path="/dashboard/*" element={isAuthenticated ? <Dashboard logout={logout} userId={userId} userName={userName} /> : <Navigate to="/" />} />
          </Routes>
        </div>
      </div>
      <Snackbar message={snackbarMessage} type={snackbarType} visible={snackbarVisible} onClose={() => setSnackbarVisible(false)} />
    </Router>
  );
}

export default App;
