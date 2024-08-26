// pages/Dashboard.js

import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Tourneys from './Tourneys';
import MyTourneys from './MyTourneys';
import CreateTournamentModal from '../components/CreateTournamentModal';
import MySidebar from '../components/MySidebar';
import { createTourney } from '../services/apiService';

function Dashboard({ logout,  userId, userName  }) { // Recebe o userId como prop
  const [isModalVisible, setIsModalVisible] = useState(false);

  const handleOpenModal = () => {
    setIsModalVisible(true);
  };

  const handleCloseModal = () => {
    setIsModalVisible(false);
  };

  const handleCreateTournament = async (tournamentData) => {
    try {
      const tournamentPayload = {
        ...tournamentData,
        user_creator_id:userId, // Usa o ID do usuário conectado
      };

      const response = await createTourney(tournamentPayload);
      console.log('Torneio criado com sucesso:', response.data);
      setIsModalVisible(false);
    } catch (error) {
      console.error('Erro ao criar torneio:', error);
      // Adicione aqui alguma lógica de tratamento de erro, como exibir uma mensagem de erro
    }
  };

  return (
    <div className="flex">
      <MySidebar logout={logout} onCreateTournamentClick={handleOpenModal} />
      <div className="flex-1">
        <Routes>
          <Route path="tourneys" element={<Tourneys />} />
          <Route path="my-tourneys" element={<MyTourneys />} />
        </Routes>
      </div>
      {isModalVisible && (
        <CreateTournamentModal 
          onClose={handleCloseModal} 
          onCreate={handleCreateTournament} 
        />
      )}
    </div>
  );
}

export default Dashboard;
