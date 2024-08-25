// src/pages/Dashboard.js
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Tourneys from './Tourneys';
import MyTourneys from './MyTourneys';

function Dashboard({ logout }) {
  return (
    <div> 
      <Routes>
        <Route path="tourneys" element={<Tourneys />} />
        <Route path="my-tourneys" element={<MyTourneys />} />
      </Routes>
    </div>
  );
}

export default Dashboard;
