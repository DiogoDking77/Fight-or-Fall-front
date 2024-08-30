import React from 'react';
import { Bracket, RoundProps, Seed, SeedItem, SeedTeam, RenderSeedProps } from 'react-brackets';

// Função para gerar os dados do bracket
export const generateBracketData = (numParticipants) => {
  const num = parseInt(numParticipants, 10);
  const rounds = [];
  
  if (num) {
    let participants = Array.from({ length: num }, (_, i) => ({
      id: i + 1,
      name: `Participant ${i + 1}`,
    }));
  
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
export const CustomSeed = ({ seed, breakpoint, roundIndex, seedIndex }) => {
  return (
    <Seed mobileBreakpoint={breakpoint} style={{ fontSize: 12 }}>
      <SeedItem>
        <div>
          <SeedTeam>{seed.teams[0]?.name || 'NO TEAM '}</SeedTeam>
          <SeedTeam>{seed.teams[1]?.name || 'NO TEAM '}</SeedTeam>
        </div>
      </SeedItem>
    </Seed>
  );
};

const BracketComponent = ({ numParticipants }) => {
  return (
    <Bracket
      rounds={generateBracketData(numParticipants)}
      renderSeedComponent={CustomSeed}
    />
  );
};

export default BracketComponent;
