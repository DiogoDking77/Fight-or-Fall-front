import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getTourneyById } from '../services/apiService';
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
    const [hasEditions, setHasEditions] = useState(false);
  
    useEffect(() => {
      getTourneyById(id)
        .then((response) => {
          setTourney(response.data);
          setLoading(false);
        })
        .catch((error) => {
          console.error('Erro ao buscar detalhes do torneio:', error);
          setLoading(false);
        });
    }, [id]);
  
    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);
    const openCreateEditionModal = () => setIsCreateEditionModalOpen(true);
    const closeCreateEditionModal = () => setIsCreateEditionModalOpen(false);
  
    const handleCreateEdition = () => {
      openCreateEditionModal();
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
  
        <div className="flex-1 bg-[#1F1E1E] border-2 border-[#B22222] rounded-lg flex justify-center items-center">
          {hasEditions ? (
            <canvas 
              id="tourneyCanvas" 
              className="w-full h-full" 
              style={{ maxHeight: '500px', maxWidth: '100%' }}
            ></canvas>
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
                Create
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
            tourneyId ={tourney.id}
          />
        )}
      </div>
    );
  }
  
  export default TourneyPage;
