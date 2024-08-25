// Exemplo de configuração do axios
import axios from 'axios';

const instance = axios.create({
    baseURL: 'http://localhost:8000/api', // Ajuste para a URL do seu backend
    headers: {
        'Content-Type': 'application/json',
    },
});

export default instance;
