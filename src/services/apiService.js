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

export const createEdition = (data) => {
  return apiClient.post('/editions', data);
};

// Função para deletar uma edição por ID
export const deleteEdition = (id) => {
  return apiClient.delete(`/editions/${id}`);
};

// Função para criar um torneio de Single Elimination
export const createSingleEliminationTournament = (data) => {
  return apiClient.post('/tournaments/single-elimination', data);
};

export const getMatchesByPhaseId = (phaseId) => {
  return apiClient.get(`/phase/${phaseId}/matches`);
};

