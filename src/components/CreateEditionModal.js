import React, { useState } from 'react';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';

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
      <div className="bg-[#0C0909] p-6 rounded-lg shadow-lg w-full max-w-lg text-white border-2 border-[#B22222]">
        <div className="mb-4">
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
              className="w-full p-2 mb-4 rounded bg-[#1F1E1E] text-white"
            />
            <label className="block mb-2">Start Date</label>
            <input
              type="date"
              name="startDate"
              value={editionData.startDate}
              onChange={handleInputChange}
              className="w-full p-2 mb-4 rounded bg-[#1F1E1E] text-white"
            />
            <label className="block mb-2">Tournament Type</label>
            <select
              name="tournamentType"
              value={editionData.tournamentType}
              onChange={handleInputChange}
              className="w-full p-2 mb-4 rounded bg-[#1F1E1E] text-white"
            >
              <option value="">Select...</option>
              <option value="roundRobin">Round Robin</option>
              <option value="singleElimination">Single Elimination</option>
              <option value="doubleElimination">Double Elimination</option>
              <option value="groupsAndKnockout">Groups and Knockout</option>
              <option value="groupsAndDoubleKnockout">Groups and Double Knockout</option>
            </select>
          </div>
        )}

        {currentStep === 1 && editionData.tournamentType === 'roundRobin' && (
          <div>
            <h2 className="text-xl font-bold mb-4">Round Robin Settings</h2>
            <label className="block mb-2">Number of Participants (3-20)</label>
            <input
              type="number"
              name="numParticipants"
              min="3"
              max="20"
              value={editionData.numParticipants}
              onChange={handleInputChange}
              className="w-full p-2 mb-4 rounded bg-[#1F1E1E] text-white"
            />
            <label className="block mb-2">Number of Rounds (1 or 2)</label>
            <input
              type="number"
              name="numRounds"
              min="1"
              max="2"
              value={editionData.numRounds}
              onChange={handleInputChange}
              className="w-full p-2 mb-4 rounded bg-[#1F1E1E] text-white"
            />
            <label className="block mb-2">Points for Win</label>
            <input
              type="number"
              name="winPoints"
              value={editionData.winPoints}
              onChange={handleInputChange}
              className="w-full p-2 mb-4 rounded bg-[#1F1E1E] text-white"
            />
            <label className="block mb-2">Points for Draw</label>
            <input
              type="number"
              name="drawPoints"
              value={editionData.drawPoints}
              onChange={handleInputChange}
              className="w-full p-2 mb-4 rounded bg-[#1F1E1E] text-white"
            />
            <label className="block mb-2">Points for Loss</label>
            <input
              type="number"
              name="lossPoints"
              value={editionData.lossPoints}
              onChange={handleInputChange}
              className="w-full p-2 mb-4 rounded bg-[#1F1E1E] text-white"
            />
            <label className="block mb-2">Additional Parameters</label>
            <div className="mb-4">
              <label>
                <input
                  type="checkbox"
                  name="goalsScored"
                  checked={editionData.addParameters.includes('goalsScored')}
                  onChange={handleCheckboxChange}
                />
                Goals Scored
              </label>
              <label>
                <input
                  type="checkbox"
                  name="goalsConceded"
                  checked={editionData.addParameters.includes('goalsConceded')}
                  onChange={handleCheckboxChange}
                />
                Goals Conceded
              </label>
              <label>
                <input
                  type="checkbox"
                  name="goalDifference"
                  checked={editionData.addParameters.includes('goalDifference')}
                  onChange={handleCheckboxChange}
                />
                Goal Difference
              </label>
            </div>
            <label className="block mb-2">Tiebreaker Rule</label>
            <select
              name="tiebreaker"
              value={editionData.tiebreaker}
              onChange={handleInputChange}
              className="w-full p-2 mb-4 rounded bg-[#1F1E1E] text-white"
            >
              <option value="random">Random</option>
              <option value="parameter">Based on Parameter</option>
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

        {currentStep === 1 && editionData.tournamentType === 'doubleElimination' && (
          <div>
            <h2 className="text-xl font-bold mb-4">Double Elimination Settings</h2>
            <label className="block mb-2">Number of Participants</label>
            <select
              name="numParticipants"
              value={editionData.numParticipants}
              onChange={handleInputChange}
              className="w-full p-2 mb-4 rounded bg-[#1F1E1E] text-white"
            >
              <option value="">Select...</option>
              <option value="4">4</option>
              <option value="8">8</option>
              <option value="16">16</option>
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

        {currentStep === 1 && editionData.tournamentType === 'groupsAndKnockout' && (
          <div>
            <h2 className="text-xl font-bold mb-4">Groups and Knockout Settings</h2>
            <label className="block mb-2">Number of Groups</label>
            <select
              name="groupCount"
              value={editionData.groupCount}
              onChange={handleInputChange}
              className="w-full p-2 mb-4 rounded bg-[#1F1E1E] text-white"
            >
              <option value="">Select...</option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="4">4</option>
              <option value="8">8</option>
            </select>
            <label className="block mb-2">Participants per Group (4-32)</label>
            <input
              type="number"
              name="participantsPerGroup"
              min="4"
              max="32"
              value={editionData.participantsPerGroup}
              onChange={handleInputChange}
              className="w-full p-2 mb-4 rounded bg-[#1F1E1E] text-white"
            />
            <label className="block mb-2">Qualifiers per Group</label>
            <input
              type="number"
              name="qualifiersPerGroup"
              value={editionData.qualifiersPerGroup}
              onChange={handleInputChange}
              className="w-full p-2 mb-4 rounded bg-[#1F1E1E] text-white"
            />
            <label className="block mb-2">Group Draw Type</label>
            <select
              name="groupDraw"
              value={editionData.groupDraw}
              onChange={handleInputChange}
              className="w-full p-2 mb-4 rounded bg-[#1F1E1E] text-white"
            >
              <option value="manual">Manual</option>
              <option value="computer">Computer</option>
            </select>
            <label className="block mb-2">Knockout Draw Type</label>
            <select
              name="knockoutDraw"
              value={editionData.knockoutDraw}
              onChange={handleInputChange}
              className="w-full p-2 mb-4 rounded bg-[#1F1E1E] text-white"
            >
              <option value="manual">Manual</option>
              <option value="computer">Computer</option>
            </select>
          </div>
        )}

        {currentStep === 1 && editionData.tournamentType === 'groupsAndDoubleKnockout' && (
          <div>
            <h2 className="text-xl font-bold mb-4">Groups and Double Knockout Settings</h2>
            <label className="block mb-2">Number of Groups</label>
            <select
              name="groupCount"
              value={editionData.groupCount}
              onChange={handleInputChange}
              className="w-full p-2 mb-4 rounded bg-[#1F1E1E] text-white"
            >
              <option value="">Select...</option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="4">4</option>
              <option value="8">8</option>
            </select>
            <label className="block mb-2">Participants per Group (4-32)</label>
            <input
              type="number"
              name="participantsPerGroup"
              min="4"
              max="32"
              value={editionData.participantsPerGroup}
              onChange={handleInputChange}
              className="w-full p-2 mb-4 rounded bg-[#1F1E1E] text-white"
            />
            <label className="block mb-2">Qualifiers per Group</label>
            <input
              type="number"
              name="qualifiersPerGroup"
              value={editionData.qualifiersPerGroup}
              onChange={handleInputChange}
              className="w-full p-2 mb-4 rounded bg-[#1F1E1E] text-white"
            />
            <label className="block mb-2">Group Draw Type</label>
            <select
              name="groupDraw"
              value={editionData.groupDraw}
              onChange={handleInputChange}
              className="w-full p-2 mb-4 rounded bg-[#1F1E1E] text-white"
            >
              <option value="manual">Manual</option>
              <option value="computer">Computer</option>
            </select>
            <label className="block mb-2">Knockout Draw Type</label>
            <select
              name="knockoutDraw"
              value={editionData.knockoutDraw}
              onChange={handleInputChange}
              className="w-full p-2 mb-4 rounded bg-[#1F1E1E] text-white"
            >
              <option value="manual">Manual</option>
              <option value="computer">Computer</option>
            </select>
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
            disabled={currentStep === steps.length - 1}
          >
            Next
            <FaArrowRight className="ml-2" />
          </button>
        </div>

        <button
          onClick={onClose}
          className="mt-6 w-full bg-[#B22222] text-white py-2 rounded-md hover:bg-[#9B1B1B] transition duration-200"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default CreateEditionModal;
