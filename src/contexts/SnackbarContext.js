import React, { createContext, useContext, useState } from 'react';
import Snackbar from '../components/Snackbar'; // Certifique-se de que o caminho está correto

const SnackbarContext = createContext();

export const SnackbarProvider = ({ children }) => {
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarType, setSnackbarType] = useState('success');
  const [snackbarVisible, setSnackbarVisible] = useState(false);

  const showSnackbar = (message, type = 'success') => {
    setSnackbarMessage(message);
    setSnackbarType(type);
    setSnackbarVisible(true);
    setTimeout(() => {
      setSnackbarVisible(false);
    }, 3000);
  };

  return (
    <SnackbarContext.Provider value={{ showSnackbar }}>
      {children}
      <Snackbar message={snackbarMessage} type={snackbarType} visible={snackbarVisible} />
    </SnackbarContext.Provider>
  );
};

export const useSnackbar = () => useContext(SnackbarContext);
