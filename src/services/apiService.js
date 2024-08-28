// services/apiService.js
import axios from 'axios';

const apiClient = axios.create({
  baseURL: '/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Função para obter torneios
export const getTourneys = () => {
  return apiClient.get('/tourneys');
};

export const getTourneyById = (id) => {
  return apiClient.get(`/tourneys/${id}`);
};

export const getTourneysByCreator = (creatorId) => {
  return apiClient.get(`/tourneys/creator/${creatorId}`);
};

// Função para criar um torneio
export const createTourney = (data) => {
  return apiClient.post('/tourneys', data);
};

// Função para login
export const loginUser = (email, password) => {
  return apiClient.post('/login', { email, password });
};

// Função para registro
export const registerUser = (username, email, password, confirmPassword) => {
  return apiClient.post('/register', { name: username, email, password, password_confirmation: confirmPassword });
};
