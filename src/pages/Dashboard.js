import React, { useState, useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom'; // Importando useNavigate
import Tourneys from './Tourneys';
import MyTourneys from './MyTourneys';
import TourneyPage from './TourneyPage';
import CreateTournamentModal from '../components/CreateTournamentModal';
import MySidebar from '../components/MySidebar';
import { createTourney } from '../services/apiService';
import { useSnackbar } from '../contexts/SnackbarContext';

function Dashboard({ logout, userId, userName }) {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [hasFetched, setHasFetched] = useState(false); // Para evitar chamadas duplicadas
  const [isLoading, setIsLoading] = useState(false); // Novo estado para loading
  const { showSnackbar } = useSnackbar(); // Hook para o Snackbar
  const navigate = useNavigate(); // Inicializando o useNavigate

  const handleOpenModal = () => {
    setIsModalVisible(true);
  };

  const handleCloseModal = () => {
    setIsModalVisible(false);
  };

  const handleCreateTournament = async (tournamentData) => {
    setIsLoading(true); // Ativando loading ao iniciar a criação
    try {
      const tournamentPayload = {
        ...tournamentData,
        user_creator_id: userId,
      };

      const response = await createTourney(tournamentPayload);
      console.log('Torneio criado com sucesso:', response.data);     
      setIsModalVisible(false);
      showSnackbar('Torneio criado com sucesso', 'success');

      // Navegando para a página do torneio recém-criado
      navigate(`/dashboard/tourneys/${response.data.id}`); // Supondo que response.data.id contém o ID do torneio

    } catch (error) {
      console.error('Erro ao criar torneio:', error);
    } finally {
      setIsLoading(false); // Desativando loading após a criação
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      if (hasFetched) return; // Verifica se já foi buscado

      setHasFetched(true);
      // Sua chamada de API ou lógica aqui
      console.log('Fetch data on dashboard');
    };

    fetchData();
  }, []); // Dependências de acordo com a necessidade

  return (
    <div className="flex">
      <MySidebar logout={logout} onCreateTournamentClick={handleOpenModal} />
      <div className="flex-1">
        <Routes>
          <Route path="tourneys" element={<Tourneys />} />
          <Route path="my-tourneys" element={<MyTourneys userId={userId} />} />
          <Route path="tourneys/:id" element={<TourneyPage />} />
        </Routes>
      </div>
      {isModalVisible && (
        <CreateTournamentModal 
          onClose={handleCloseModal} 
          onCreate={handleCreateTournament} 
          isLoading={isLoading} // Passando o estado de loading para o modal
        />
      )}
    </div>
  );
}

export default Dashboard;
