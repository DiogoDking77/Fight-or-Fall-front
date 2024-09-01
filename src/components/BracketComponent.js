import React from 'react';
import { Bracket, Seed, SeedItem, SeedTeam } from 'react-brackets';

// Função para gerar os dados do bracket
const generateBracketData = (numParticipants, participantNames) => {
  const num = parseInt(numParticipants, 10);
  const rounds = [];

  if (num) {
    let participants = Array.from({ length: num }, (_, i) => ({
      id: i + 1,
      name: `Participant ${i + 1}`,
    }));

    // Substitua os nomes padrão pelos fornecidos
    if (participantNames.length > 0) {
      participants = participants.map((participant, index) => ({
        ...participant,
        name: participantNames[index] || participant.name,
      }));
    }

    // Cria o número de rounds necessário
    const totalRounds = Math.ceil(Math.log2(num));

    for (let round = 0; round < totalRounds; round++) {
      const roundMatches = [];
      for (let i = 0; i < participants.length; i += 2) {
        if (i + 1 < participants.length) {
          roundMatches.push({
            id: `match-${round}-${i / 2 + 1}`, // ID único para cada match
            date: new Date().toDateString(),
            teams: [participants[i], participants[i + 1]],
          });
        }
      }
      rounds.push({
        title: `Round ${round + 1}`,
        seeds: roundMatches,
      });

      // Atualiza a lista de participantes para o próximo round
      participants = roundMatches.map(match => ({
        id: `winner-${match.id}`, // ID único para cada vencedor
        name: `Winner ${match.id}`,
      }));
    }
  }

  return rounds;
};

// Componente customizado para renderizar um seed
const CustomSeed = ({ seed, breakpoint }) => {
  return (
    <Seed mobileBreakpoint={breakpoint} style={{ fontSize: 12, color: '#FFD700' }}>
      <SeedItem style={{ border: '1px solid #FFD700' }}>
        <div>
          <SeedTeam style={{ color: '#FF6347' }}>{seed.teams[0]?.name || 'NO TEAM'}</SeedTeam>
          <SeedTeam style={{ color: '#FF6347' }}>{seed.teams[1]?.name || 'NO TEAM'}</SeedTeam>
        </div>
      </SeedItem>
    </Seed>
  );
};

const BracketComponent = ({ numParticipants, participantNames, isManualDraw }) => {
  const rounds = generateBracketData(numParticipants, participantNames);

  return (
    <Bracket
      rounds={rounds}
      renderSeedComponent={CustomSeed}
      style={{ backgroundColor: '#2E2E2E' }}
    />
  );
};

export default BracketComponent;
