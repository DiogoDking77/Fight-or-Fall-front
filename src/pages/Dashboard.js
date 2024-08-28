// pages/Dashboard.js

import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Tourneys from './Tourneys';
import MyTourneys from './MyTourneys';
import TourneyPage from './TourneyPage';
import CreateTournamentModal from '../components/CreateTournamentModal';
import MySidebar from '../components/MySidebar';
import { createTourney } from '../services/apiService';

function Dashboard({ logout, userId, userName }) {
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
        user_creator_id: userId,
      };

      const response = await createTourney(tournamentPayload);
      console.log('Torneio criado com sucesso:', response.data);
      setIsModalVisible(false);
    } catch (error) {
      console.error('Erro ao criar torneio:', error);
    }
  };

  return (
    <div className="flex">
      <MySidebar logout={logout} onCreateTournamentClick={handleOpenModal} />
      <div className="flex-1">
        <Routes>
          <Route path="tourneys" element={<Tourneys />} />
          <Route path="my-tourneys" element={<MyTourneys userId={userId} />} />
          <Route path="tourneys/:id" element={<TourneyPage />} /> {/* Nova rota */}
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
