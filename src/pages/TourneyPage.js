import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getTourneyById, getMatchesByPhaseId } from '../services/apiService'; // Adicionar getMatchesByPhaseId
import { FaInfoCircle, FaPlus } from 'react-icons/fa';
import ClipLoader from 'react-spinners/ClipLoader';
import editionImage from '../assets/edition.png';
import CreateEditionModal from '../components/CreateEditionModal'; // Importa o novo componente

function TourneyPage() {
  const { id } = useParams();
  const [tourney, setTourney] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isCreateEditionModalOpen, setIsCreateEditionModalOpen] = useState(false);
  const [activeEdition, setActiveEdition] = useState(null);
  const [matchesByRound, setMatchesByRound] = useState(null);
  const [hasEditions, setHasEditions] = useState(false);

  useEffect(() => {
    fetchTourneyData();
  }, [id]);

  const fetchTourneyData = () => {
    setLoading(true);
    getTourneyById(id)
      .then((response) => {
        const tourneyData = response.data;
        setTourney(tourneyData);
        setLoading(false);

        // Verifica se há edições associadas
        if (tourneyData.editions && tourneyData.editions.length > 0) {
          setHasEditions(true);
          setActiveEdition(tourneyData.editions[0]); // Definir a primeira edição como ativa
        }
      })
      .catch((error) => {
        console.error('Erro ao buscar detalhes do torneio:', error);
        setLoading(false);
      });
  };

  // Função para buscar partidas da fase ativa
  useEffect(() => {
    if (activeEdition && activeEdition.phases && activeEdition.phases.length > 0) {
      const phaseId = activeEdition.phases[0].id;
      getMatchesByPhaseId(phaseId)
        .then((response) => {
          const matchesData = response.data.phase_games;
          setMatchesByRound(matchesData);
        })
        .catch((error) => {
          console.error('Erro ao buscar partidas da fase:', error);
        });
    }
  }, [activeEdition]);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);
  const openCreateEditionModal = () => setIsCreateEditionModalOpen(true);
  const closeCreateEditionModal = () => setIsCreateEditionModalOpen(false);

  const handleCreateEdition = () => {
    openCreateEditionModal();
  };

  const handleTabClick = (edition) => {
    setActiveEdition(edition);
    setMatchesByRound(null); // Limpar partidas ao mudar de edição
  };

  // Função para atualizar o torneio após a criação da edição
  const refreshTourney = () => {
    fetchTourneyData(); // Chama novamente o fetch para pegar as edições atualizadas
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center mt-10">
        <ClipLoader color="#B22222" loading={loading} size={50} />
      </div>
    );
  }

  if (!tourney) {
    return <p className="text-white">Tourney not found</p>;
  }

  return (
    <div className="p-4 text-white relative h-full flex flex-col">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-bold">{tourney.name}</h1>
        <FaInfoCircle
          className="text-xl cursor-pointer text-[#B22222]"
          onClick={openModal}
        />
      </div>

      <div className="flex-1 bg-[#1F1E1E] border-2 border-[#B22222] rounded-lg">
        {hasEditions ? (
          <div>
            {/* Abas para as edições */}
            <div className="flex border-b border-gray-500 mb-2">
              {tourney.editions.map((edition, index) => (
                <button
                  key={edition.id}
                  className={`px-4 py-2 transition-colors duration-300 ${
                    activeEdition && activeEdition.id === edition.id
                      ? 'bg-[#B22222] text-white'
                      : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                  }`}
                  onClick={() => handleTabClick(edition)}
                >
                  {edition.name || 'Unnamed Edition'}
                </button>
              ))}

              {/* Aba para criar uma nova edição */}
              <button
                className="px-4 py-2 bg-gray-700 text-gray-300 hover:bg-gray-600 transition-colors duration-300 flex items-center"
                onClick={handleCreateEdition}
              >
                <FaPlus className="mr-2" />
                Create Edition
              </button>
            </div>

            {/* Conteúdo da edição ativa */}
            {activeEdition ? (
              <div className="px-2">
                <h2 className="text-xl font-bold mb-4">
                  {activeEdition.name || `Edition ${tourney.editions.indexOf(activeEdition) + 1}`}
                </h2>
                {/* Renderizar as partidas por rodada */}
                {matchesByRound ? (
                <div className="flex">
                  {Object.keys(matchesByRound).map((roundKey, index) => {
                    // Verifica se é a última rodada
                    const isLastRound = index === Object.keys(matchesByRound).length - 1;
                    
                    return (
                      <div key={index} className="flex-1 p-2">
                        <h3 className="text-center font-bold mb-2">
                          {isLastRound ? 'Final' : `Ronda ${index + 1}`}
                        </h3>
                        {matchesByRound[roundKey].map((match, idx) => (
                          <div key={idx} className="bg-gray-800 p-2 mb-4 rounded-lg">
                            <div className="flex justify-between">
                              <p>{match.participant_1?.name || 'TBD'}</p>
                              <p>{match.score1 || ''}</p>
                            </div>
                            <div className="flex justify-between">
                              <p>{match.participant_2?.name || 'TBD'}</p>
                              <p>{match.score2 || ''}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    );
                  })}
                </div>
              ) : (
                <p>Loading matches...</p>
              )}

              </div>
            ) : (
              <p className="text-center text-gray-300">Please select an edition to view its details.</p>
            )}
          </div>
        ) : (
          <div className="text-center">
            <img
              src={editionImage}
              alt="No Editions"
              className="mx-auto mb-4 w-32 h-auto"
            />
            <p className="mb-4">
              Your tournament currently has no editions. Please create an edition to set up participants, start date, format, and other details.
            </p>
            <button
              onClick={handleCreateEdition}
              className="flex items-center justify-center bg-[#B22222] text-white py-2 px-4 rounded-md hover:bg-[#9B1B1B] transition duration-200 mx-auto"
            >
              <FaPlus className="mr-2" />
              Create Edition
            </button>
          </div>
        )}
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-[#0C0909] p-6 rounded-lg shadow-lg w-full max-w-md text-white border-2 border-[#B22222]">
            <h2 className="text-xl font-bold mb-4">{tourney.name}</h2>
            <p><strong>Theme:</strong> {tourney.theme_name}</p>
            <p><strong>Description:</strong> {tourney.description}</p>
            <p><strong>Creator:</strong> {tourney.creator_name}</p>
            <button
              onClick={closeModal}
              className="mt-6 w-full bg-[#B22222] text-white py-2 rounded-md hover:bg-[#9B1B1B] transition duration-200"
            >
              Close
            </button>
          </div>
        </div>
      )}

      {isCreateEditionModalOpen && (
        <CreateEditionModal 
          isOpen={isCreateEditionModalOpen} 
          onClose={closeCreateEditionModal} 
          tourneyId={tourney.id}
          onEditionCreated={refreshTourney}
        />
      )}
    </div>
  );
}

export default TourneyPage
