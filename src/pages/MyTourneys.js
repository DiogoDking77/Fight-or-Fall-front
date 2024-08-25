import React from 'react';
import { FaSearch } from 'react-icons/fa';

function MyTourneys() {
  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4 text-white">My Tourneys</h1>
      <div className="relative">
        <input
          type="text"
          placeholder="Search..."
          className="text-black w-full p-2 pl-10 rounded border-[#B22222] border-[3px]"
        />
        <FaSearch className="absolute top-1/2 left-3 transform -translate-y-1/2 text-[#B22222]" />
      </div>
      {/* Conteúdo da página */}
    </div>
  );
}

export default MyTourneys;