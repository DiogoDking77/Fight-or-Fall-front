import React, { useState } from 'react';
import { FaArrowLeft, FaArrowRight, FaTimes } from 'react-icons/fa';
import BracketCanvas from './BracketCanvas'; // Atualize o caminho conforme necessário
import '../styles/scrollbar.css'; // Certifique-se de que o caminho está correto
import { useSnackbar } from '../contexts/SnackbarContext'; 

const CreateEditionModal = ({ isOpen, onClose, tourneyId }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [editionData, setEditionData] = useState({
    name: '',
    startDate: '',
    tournamentType: '',
    numParticipants: '',
    eliminationType: '',
    participants: '',
  });
  const [participantNames, setParticipantNames] = useState([]);
  const { showSnackbar } = useSnackbar();

  const steps = [
    'Basic Information',
    'Tournament Specifics',
    'Add Participants',
  ];

  const handleNextStep = () => {
    setCurrentStep((prevStep) => Math.min(prevStep + 1, steps.length - 1));
  };

  const handlePreviousStep = () => {
    setCurrentStep((prevStep) => Math.max(prevStep - 1, 0));
  };

  const handleInputChange = (e) => {
    setEditionData({
      ...editionData,
      [e.target.name]: e.target.value,
    });
  };

  const handleParticipantChange = (e) => {
    const input = e.target.value;
    const participants = input.split(',').map(p => p.trim());
    const maxParticipants = parseInt(editionData.numParticipants, 10);

    if (participants.length > maxParticipants) {
      showSnackbar(`Cannot add more than ${maxParticipants} participants.`, 'error');
      return;
    }

    setEditionData({
      ...editionData,
      participants: input,
    });
    setParticipantNames(participants);
  };

  const handleFinish = () => {
    // Ação ao finalizar o formulário (exemplo: salvar dados, enviar ao backend, etc.)
    showSnackbar('Tournament created successfully!', 'success');
    onClose(); // Fecha o modal após concluir
  };

  const isManual = editionData.eliminationType === 'manual';

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div
        className={`bg-[#0C0909] p-6 rounded-lg shadow-lg w-full text-white border-2 border-[#B22222] relative ${
          currentStep === 2 ? 'md:max-w-4xl max-w-lg' : 'max-w-lg'
        }`}
      >
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-[#B22222] hover:text-[#9B1B1B] transition duration-200"
        >
          <FaTimes size={20} />
        </button>

        <div className="mt-6 mb-4">
          <div className="w-full bg-[#1F1E1E] rounded-full h-2.5">
            <div
              className="bg-[#B22222] h-2.5 rounded-full"
              style={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
            ></div>
          </div>
        </div>

        <div className={`scrollbar-thin ${currentStep === 2 ? 'grid md:grid-cols-2 gap-4 grid-cols-1' : 'max-h-[50vh] overflow-y-auto'}`}>
          {currentStep === 0 && (
            <div>
              <h2 className="text-xl font-bold mb-4">Basic Information</h2>
              <label className="block mb-2">Edition Name</label>
              <input
                type="text"
                name="name"
                value={editionData.name}
                onChange={handleInputChange}
                className="text-black w-full p-2 rounded border-[#B22222] border-[3px]"
              />
              <label className="block mb-2">Start Date</label>
              <input
                type="date"
                name="startDate"
                value={editionData.startDate}
                onChange={handleInputChange}
                className="text-black w-full p-2 rounded border-[#B22222] border-[3px]"
              />
              <label className="block mb-2">Tournament Type</label>
              <select
                name="tournamentType"
                value={editionData.tournamentType}
                onChange={handleInputChange}
                className="text-black w-full p-2 rounded border-[#B22222] border-[3px]"
              >
                <option value="">Select...</option>
                <option value="singleElimination">Single Elimination</option>
                <option value="roundRobin">Round Robin</option>
                <option value="doubleElimination">Double Elimination</option>
                <option value="groupsAndKnockout">Groups and Knockout</option>
                <option value="groupsAndDoubleKnockout">Groups and Double Knockout</option>
              </select>
            </div>
          )}

          {currentStep === 1 && editionData.tournamentType === 'singleElimination' && (
            <div>
              <h2 className="text-xl font-bold mb-4">Single Elimination Settings</h2>
              <label className="block mb-2">Number of Participants</label>
              <select
                name="numParticipants"
                value={editionData.numParticipants}
                onChange={handleInputChange}
                className="text-black w-full p-2 rounded border-[#B22222] border-[3px]"
              >
                <option value="">Select...</option>
                <option value="2">2</option>
                <option value="4">4</option>
                <option value="8">8</option>
                <option value="16">16</option>
                <option value="32">32</option>
              </select>
              <label className="block mb-2">Draw Type</label>
              <select
                name="eliminationType"
                value={editionData.eliminationType}
                onChange={handleInputChange}
                className="text-black w-full p-2 rounded border-[#B22222] border-[3px]"
              >
                <option value="manual">Manual</option>
                <option value="computer">Computer</option>
              </select>
            </div>
          )}

          {currentStep === 1 && editionData.tournamentType !== 'singleElimination' && (
            <div>
              <h2 className="text-xl font-bold mb-4">Tournament Specifics</h2>
              <p>This tourney type is still under development. Go back and choose Single Elimination.</p>
            </div>
          )}

          {currentStep === 2 && (
            <>
              <div className="h-full">
                <h2 className="text-xl font-bold mb-4">Add Participants</h2>
                <label className="block mb-2">Participants (Comma separated)</label>
                <textarea 
                  type="text"
                  name="participants"
                  value={editionData.participants}
                  onChange={handleParticipantChange}
                  className="text-black h-5/6 w-full p-2 rounded border-[#B22222] border-[3px]"
                />
              </div>
              <div className="h-full">
                <h2 className="text-xl font-bold mb-4">Preview</h2>
                <div className="h-[400px] overflow-auto">
                  {editionData.numParticipants && (
                    <BracketCanvas
                      numParticipants={editionData.numParticipants}
                      participantNames={participantNames}
                      isManualDraw={editionData.eliminationType === 'manual'}
                    />
                  )}
                </div>
              </div>
            </>
          )}
        </div>

        <div className="flex justify-between mt-6">
          {/* Botão "Back" só aparece se não for o primeiro passo */}
          {currentStep > 0 && (
            <button
              onClick={handlePreviousStep}
              className="bg-[#B22222] text-white py-2 px-4 rounded-md hover:bg-[#9B1B1B] transition duration-200"
            >
              <FaArrowLeft className="mr-2" />
              Back
            </button>
          )}
          
          {/* Se for a primeira etapa, centraliza o botão à direita */}
          <div className={`flex ${currentStep === 0 ? 'justify-end w-full' : 'justify-end'}`}>
            {currentStep === steps.length - 1 ? (
              <button
                onClick={handleFinish}
                className="bg-[#B22222] text-white py-2 px-4 rounded-md hover:bg-[#9B1B1B] transition duration-200"
              >
                Finish
              </button>
            ) : (
              <button
                onClick={handleNextStep}
                className="bg-[#B22222] text-white py-2 px-4 rounded-md hover:bg-[#9B1B1B] transition duration-200"
                disabled={currentStep === 1 && editionData.tournamentType !== 'singleElimination'}
              >
                Next
                <FaArrowRight className="ml-2" />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateEditionModal;