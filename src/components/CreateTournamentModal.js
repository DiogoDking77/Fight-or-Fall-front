import React, { useState } from 'react';

function CreateTournamentModal({ onClose, onCreate, isLoading }) { // Adicionando isLoading como prop
  const [tournamentName, setTournamentName] = useState('');
  const [tournamentTheme, setTournamentTheme] = useState(''); // Novo campo para o tema
  const [tournamentDescription, setTournamentDescription] = useState('');
  
  const handleSubmit = (e) => {
    e.preventDefault();
    onCreate({
      name: tournamentName,
      theme_name: tournamentTheme,
      description: tournamentDescription,
    });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-[#0C0909] p-6 rounded-lg shadow-lg w-full max-w-md text-white border-2 border-[#B22222]">
        <h2 className="text-2xl font-bold mb-4">Create Tournament</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block">Tournament Name</label>
            <input 
              type="text" 
              className="text-black w-full p-2 rounded border-[#B22222] border-[3px]"
              value={tournamentName}
              onChange={(e) => setTournamentName(e.target.value)}
              required 
            />
          </div>
          <div className="mb-4">
            <label className="block">Theme</label>
            <input 
              type="text" 
              className="text-black w-full p-2 rounded border-[#B22222] border-[3px]"
              value={tournamentTheme}
              onChange={(e) => setTournamentTheme(e.target.value)}
              required 
            />
          </div>
          <div className="mb-4">
            <label className="block ">Description</label>
            <textarea 
              className="text-black w-full p-2 rounded border-[#B22222] border-[3px]"
              value={tournamentDescription}
              onChange={(e) => setTournamentDescription(e.target.value)}
              required 
            />
          </div>
          <div className="flex justify-end space-x-4">
            <button type="button" className="bg-[#302B2B] text-white px-4 py-2 rounded" onClick={onClose}>Cancel</button>
            <button type="submit" 
              className={`bg-[#8B0000] text-white px-4 py-2 rounded hover:bg-[#a10505] ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
              disabled={isLoading} // Desabilitando o botão durante o loading
            >
              {isLoading ? 'Creating...' : 'Create'} {/* Alterando o texto do botão */}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CreateTournamentModal;
