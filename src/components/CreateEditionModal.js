// src/components/CreateEditionModal.js

import React, { useState } from 'react';
import { FaArrowLeft, FaArrowRight, FaTimes } from 'react-icons/fa';
import BracketCanvas from './BracketCanvas'; // Atualize o caminho conforme necessário

const CreateEditionModal = ({ isOpen, onClose }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [editionData, setEditionData] = useState({
    name: '',
    startDate: '',
    tournamentType: '',
    numParticipants: '',
    numRounds: '',
    winPoints: '',
    drawPoints: '',
    lossPoints: '',
    addParameters: [],
    tiebreaker: '',
    groupCount: '',
    participantsPerGroup: '',
    qualifiersPerGroup: '',
    groupDraw: '',
    knockoutDraw: '',
    eliminationType: '',
    participants: '',
  });

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

  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    setEditionData((prevData) => {
      const updatedParameters = checked
        ? [...prevData.addParameters, name]
        : prevData.addParameters.filter((param) => param !== name);
      return { ...prevData, addParameters: updatedParameters };
    });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-[#0C0909] p-6 rounded-lg shadow-lg w-full max-w-lg text-white border-2 border-[#B22222] relative">
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
              className="w-full p-2 mb-4 rounded bg-[#1F1E1E] text-white"
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
              className="w-full p-2 mb-4 rounded bg-[#1F1E1E] text-white"
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
          <div>
            <h2 className="text-xl font-bold mb-4">Add Participants</h2>
            <label className="block mb-2">Participants (Comma separated)</label>
            <input
              type="text"
              name="participants"
              value={editionData.participants}
              onChange={handleInputChange}
              className="w-full p-2 mb-4 rounded bg-[#1F1E1E] text-white"
            />
            {/* Render Bracket Canvas */}
            <div className="mt-4 w-full h-[500px] overflow-auto bg-gray-800 border border-[#B22222] rounded-lg">
              {editionData.numParticipants && (
                <BracketCanvas
                  numParticipants={editionData.numParticipants}
                />
              )}
            </div>
          </div>
        )}

        <div className="flex justify-between mt-6">
          <button
            onClick={handlePreviousStep}
            className="bg-[#B22222] text-white py-2 px-4 rounded-md hover:bg-[#9B1B1B] transition duration-200"
            disabled={currentStep === 0}
          >
            <FaArrowLeft className="mr-2" />
            Back
          </button>
          <button
            onClick={handleNextStep}
            className="bg-[#B22222] text-white py-2 px-4 rounded-md hover:bg-[#9B1B1B] transition duration-200"
            disabled={currentStep === steps.length - 1 || (currentStep === 1 && editionData.tournamentType !== 'singleElimination')}
          >
            Next
            <FaArrowRight className="ml-2" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateEditionModal;
