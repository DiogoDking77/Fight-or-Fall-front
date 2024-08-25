import axios from 'axios';

const apiClient = axios.create({
  baseURL: '/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

export const getTourneys = () => {
  return apiClient.get('/tourneys');
};

export const createTourney = (data) => {
  return apiClient.post('/tourneys', data);
};