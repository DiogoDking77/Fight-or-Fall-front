import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Tourneys from './Tourneys';
import MyTourneys from './MyTourneys';

function Dashboard({ logout }) {
  return (
    <div className="flex">
      <div className="flex-1">
        <Routes>
          <Route path="tourneys" element={<Tourneys />} />
          <Route path="my-tourneys" element={<MyTourneys />} />
          {/* Adicione outras rotas do dashboard aqui */}
        </Routes>
      </div>
    </div>
  );
}

export default Dashboard;
