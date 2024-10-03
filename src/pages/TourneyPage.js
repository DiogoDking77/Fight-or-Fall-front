import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getTourneyById, getMatchesByPhaseId, updateSingleEliminationResults } from '../services/apiService';
import { FaArrowLeft, FaArrowRight, FaInfoCircle, FaPlus, FaSave } from 'react-icons/fa';
import ClipLoader from 'react-spinners/ClipLoader';
import editionImage from '../assets/edition.png';
import CreateEditionModal from '../components/CreateEditionModal';
import { useSnackbar } from '../contexts/SnackbarContext';

function TourneyPage() {
  const { id } = useParams();
  const [tourney, setTourney] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isCreateEditionModalOpen, setIsCreateEditionModalOpen] = useState(false);
  const [activeEdition, setActiveEdition] = useState(null);
  const [hasEditions, setHasEditions] = useState(false);
  const [activeRoundIndex, setActiveRoundIndex] = useState(0);
  const [matchesByRound, setMatchesByRound] = useState({});
  const [updatedMatchesByRound, setUpdatedMatchesByRound] = useState({}); // Copia para armazenar resultados
  const [loadingEdition, setLoadingEdition] = useState(false);
  const [loadingSave, setLoadingSave] = useState(false); // Adicionando estado para controle do spinner durante o save
  const { showSnackbar } = useSnackbar(); // Hook para o Snackbar



// Primeiro useEffect para buscar dados do torneio
useEffect(() => {
  fetchTourneyData();
}, [id]);

const fetchTourneyData = async () => {
  setLoading(true);
  try {
    const response = await getTourneyById(id);
    const tourneyData = response.data;
    setTourney(tourneyData);
    setLoading(false);

    if (tourneyData.editions && tourneyData.editions.length > 0) {
      setHasEditions(true);
      const selectedEdition = tourneyData.editions[0]; // Selecionar a primeira edição por padrão
      setActiveEdition(selectedEdition);
      await fetchMatchesForEdition(selectedEdition); // Carregar jogos para a edição selecionada
    }
  } catch (error) {
    console.error('Erro ao buscar detalhes do torneio:', error);
    setLoading(false);
  }
};


const fetchMatchesForEdition = async (edition) => {
  setLoadingEdition(true); // Iniciar o carregamento
  if (edition.phases && edition.phases.length > 0) {
    const phaseId = edition.phases[0].id;
    const matchesResponse = await getMatchesByPhaseId(phaseId);
    const matchesData = matchesResponse.data.phase_games;
    setMatchesByRound(matchesData || {});

    const copiedMatches = JSON.parse(JSON.stringify(matchesData)); // Cópia profunda
    setUpdatedMatchesByRound(copiedMatches);
  } else {
    console.log("No phases available in the selected edition.");
  }
  setLoadingEdition(false); // Finalizar o carregamento
};



  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);
  const openCreateEditionModal = () => setIsCreateEditionModalOpen(true);
  const closeCreateEditionModal = () => setIsCreateEditionModalOpen(false);

  const handleCreateEdition = () => {
    openCreateEditionModal();
  };

  const handleTabClick = async (edition) => {
    setActiveEdition(edition);
    setActiveRoundIndex(0); // Resetar o índice da rodada ativa
    await fetchMatchesForEdition(edition); // Buscar jogos para a nova edição ativa
  };
  
  

  const refreshTourney = () => {
    fetchTourneyData();
  };

  const handleNextRound = () => {
    if (activeRoundIndex < Object.keys(matchesByRound).length - 1) {
      setActiveRoundIndex(activeRoundIndex + 1);
    }
  };

  const handlePreviousRound = () => {
    if (activeRoundIndex > 0) {
      setActiveRoundIndex(activeRoundIndex - 1);
    }
  };

  const handleScoreChange = (e, roundKey, matchIdx, scoreType) => {
    const updatedScore = e.target.value;
  
    // Atualizando o estado da cópia (updatedMatchesByRound)
    setUpdatedMatchesByRound((prevMatches) => {
      const newMatches = { ...prevMatches };
      newMatches[roundKey][matchIdx][scoreType] = updatedScore; // Atualiza score1 ou score2
      return newMatches;
    });
  };

  const handleSave = async () => {
    if (!activeEdition || !activeEdition.phases || activeEdition.phases.length === 0) {
        console.error('Nenhuma fase disponível para salvar.');
        return;
    }

    setLoadingSave(true); // Ativando o loading do save
    const phaseId = activeEdition.phases[0].id;

    const matchesToUpdate = [];
    console.log(updatedMatchesByRound)

    // Verificar se há empates
    for (const roundKey in updatedMatchesByRound) {
        const matches = updatedMatchesByRound[roundKey];
        for (const match of matches) {
            const score1 = match.score1;
            const score2 = match.score2;

            // Permitir que scores sejam em branco ("" ou null), mas impedir empates se ambos forem números inteiros
            const isScore1Valid = score1 !== "" && score1 !== null;
            const isScore2Valid = score2 !== "" && score2 !== null;

            // Verifica se ambos os scores são válidos e se são iguais
            if (isScore1Valid && isScore2Valid) {
                // Converte os scores para números inteiros para comparação
                const numScore1 = parseInt(score1, 10);
                const numScore2 = parseInt(score2, 10);

                // Verifica se ambos os scores são números e iguais
                if (!isNaN(numScore1) && !isNaN(numScore2) && numScore1 === numScore2) {
                    showSnackbar('Empates não são permitidos nas partidas!', 'error'); // Exibe a mensagem de erro
                    setLoadingSave(false);
                    return; // Não prosseguir se houver empate
                }
            }
        }
    }

    for (const roundKey in updatedMatchesByRound) {
        const matches = updatedMatchesByRound[roundKey];

        if (Array.isArray(matches)) {
            matches.forEach(match => {
                if (match && typeof match === 'object') {
                    matchesToUpdate.push({
                        id_match: match.id_match,
                        round: match.round,
                        score1: match.score1,
                        score2: match.score2,
                        participant_1: {
                            name: match.participant_1?.name || null,
                        },
                        participant_2: {
                            name: match.participant_2?.name || null,
                        },
                        id_bracket: {
                            winner_match_id: match.id_bracket?.winner_match_id || null,
                        }
                    });
                }
            });
        } else {
            console.error(`Erro: esperado um array para ${roundKey}, mas obteve ${typeof matches}`);
        }
    }

    try {
        await updateSingleEliminationResults(matchesToUpdate, phaseId);
        console.log('Resultados atualizados com sucesso!');
        refreshTourney();
    } catch (error) {
        console.error('Erro ao salvar os resultados:', error);
    } finally {
        setLoadingSave(false); // Desativando o loading do save
    }
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

      <div className="flex-1 bg-[#1F1E1E] border-2 border-[#B22222] rounded-lg flex flex-col">
        {hasEditions ? (
          <div className="flex flex-col h-full">
            {/* Abas para as edições */}
            <div className="flex mb-2 px-1 bg-[#B22222] rounded-t">
              {tourney.editions.map((edition, idx) => (
                <button
                  key={edition.id}
                  className={`px-4 py-2 transition-colors duration-300 text-white ${
                    activeEdition && activeEdition.id === edition.id
                      ? 'bg-red-600'
                      : 'bg-[#B22222] hover:bg-red-500'
                  } ${idx !== tourney.editions.length - 1 ? 'border-r border-red-300' : ''}`}  // Adiciona a linha entre as abas, exceto a última
                  onClick={() => handleTabClick(edition)}
                >
                  {edition.name || 'Unnamed Edition'}
                </button>
              ))}
              <button
                className="px-4 py-2 bg-[#B22222] text-white hover:bg-red-500 transition-colors duration-300 flex items-center"
                onClick={handleCreateEdition}
              >
                <FaPlus className="mr-2" />
                Create Edition
              </button>
            </div>
            {/* Conteúdo da edição ativa */}
            {activeEdition ? (
              <div className="flex-1 px-2 overflow-y-auto">
                {loadingEdition ? ( // Verifica se a edição está carregando
                  <div className="flex justify-center items-center h-full">
                    <ClipLoader color="#B22222" loading={loadingEdition} size={50} />
                  </div>
                ) : matchesByRound && typeof matchesByRound === 'object' ? (
                  <div className="flex flex-wrap md:flex-nowrap">
                    {Object.keys(matchesByRound).length > 0 ? (
                      Object.keys(matchesByRound).map((roundKey, index) => {
                        const isLastRound = index === Object.keys(matchesByRound).length - 1;
                        const isActive = index === activeRoundIndex;

                        return (
                          <div
                            key={index}
                            className={`flex-1 p-2 relative ${isActive ? 'block' : 'hidden md:block'}`}
                          >
                            {/* Aplica o filtro escuro para rodadas não ativas em telas maiores */}
                            <div
                              className={`h-full w-full ${isActive ? '' : 'opacity-50 pointer-events-none'}`}
                            >
                              <h3 className="text-center font-bold mb-2">
                                {isLastRound ? 'Final' : `Ronda ${index + 1}`}
                              </h3>
                              {matchesByRound[roundKey].map((match, idx) => (
                                <div key={idx} className="bg-zinc-950 p-2 mb-4 rounded-lg">
                                    <div className="flex justify-between">
                                        <p>{match.participant_1?.name || 'TBD'}</p>
                                        <input
                                            type="number" // Definir como input numérico
                                            value={updatedMatchesByRound[roundKey][idx].score1 !== undefined ? updatedMatchesByRound[roundKey][idx].score1 : ''} // Mostrar 0 ou o valor correto
                                            className="text-black px-2 rounded border-[#B22222] border-[2px] w-16" // Adicionar largura fixa
                                            onChange={(e) => handleScoreChange(e, roundKey, idx, 'score1')}
                                        />
                                    </div>
                                    <div className="flex justify-between">
                                        <p>{match.participant_2?.name || 'TBD'}</p>
                                        <input
                                            type="number" // Definir como input numérico
                                            value={updatedMatchesByRound[roundKey][idx].score2 !== undefined ? updatedMatchesByRound[roundKey][idx].score2 : ''} // Mostrar 0 ou o valor correto
                                            className="text-black px-2 rounded border-[#B22222] border-[2px] w-16" // Adicionar largura fixa
                                            onChange={(e) => handleScoreChange(e, roundKey, idx, 'score2')}
                                        />
                                    </div>
                                </div>
                            ))}
                            </div>
                          </div>
                        );
                      })
                    ) : (
                      <p>No matches available for this round.</p>
                    )}
                  </div>
                ) : (
                  <p>Loading matches...</p>
                )}
              </div>
            ) : (
              <p className="text-center text-gray-300">Please select an edition to view its details.</p>
            )}




            {/* Setas de navegação no rodapé */}
            <div className="flex justify-between items-center p-4 rounded-b-lg mt-2">
              
                <button
                  onClick={handlePreviousRound}
                  className={`bg-[#8B0000] text-white p-2 rounded-lg hover:bg-[#a10505] flex items-center ${activeRoundIndex > 0 ? '' : 'opacity-50 pointer-events-none'}`}
                >
                  <FaArrowLeft className="mr-2" />
                  Previous Round
                </button>
              

                {/* Botão Save centralizado */}
                <button
                    className="px-4 py-2 bg-[#8B0000] text-white rounded hover:bg-[#a10505] transition-colors duration-300 flex items-center"
                    onClick={handleSave}
                    disabled={loadingSave}
                >
                    {loadingSave ? <ClipLoader color="#FFFFFF" loading={loadingSave} size={20} /> : <><FaSave className="mr-2" /> Save Results</>}
                </button>

              
                <button
                  onClick={handleNextRound}
                  className={`bg-[#8B0000] text-white p-2 rounded-lg hover:bg-[#a10505] flex items-center ${activeRoundIndex < Object.keys(matchesByRound).length - 1 ? '' : 'opacity-50 pointer-events-none'}`}
                >
                  Next Round
                  <FaArrowRight className="ml-2" />
                </button>
              
            </div>

          </div>
        ) : (
          <div className="flex flex-col justify-center items-center h-full">
            <img
              src={editionImage}
              alt="No Editions" className="mx-auto mb-4 w-32 h-auto" />
            <p className="mb-4">
              Your tournament currently has no editions. Please create an edition to set up
              participants, start date, format, and other details.
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

      {/* Modal for creating new edition */}
      {isCreateEditionModalOpen && (
          <CreateEditionModal 
            isOpen={isCreateEditionModalOpen} 
            onClose={closeCreateEditionModal} 
            tourneyId ={tourney.id}
            onEditionCreated={refreshTourney}
          />
        )}

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
    </div>
  );
}

export default TourneyPage;

