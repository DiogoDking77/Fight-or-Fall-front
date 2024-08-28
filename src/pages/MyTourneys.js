import React, { useState, useEffect } from 'react';
import { FaSearch } from 'react-icons/fa';
import { getTourneysByCreator } from '../services/apiService';
import ClipLoader from 'react-spinners/ClipLoader'; // Exemplo de um spinner de loading
import { Link } from 'react-router-dom';

function MyTourneys({ userId }) { // Desestruturando o userId
  const [tourneys, setTourneys] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getTourneysByCreator(userId)
      .then(response => {
        setTourneys(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error('There was an error fetching the tourneys!', error);
        setLoading(false);
      });
  }, [userId]);

  const filteredTourneys = tourneys.filter(tourney =>
    tourney.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4 text-white">Tourneys</h1>
      <div className="relative">
        <input
          type="text"
          placeholder="Search..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="text-black w-full p-2 pl-10 rounded border-[#B22222] border-[3px]"
        />
        <FaSearch className="absolute top-1/2 left-3 transform -translate-y-1/2 text-[#B22222]" />
      </div>

      {loading ? (
        <div className="flex justify-center items-center mt-10">
          <ClipLoader color="#B22222" loading={loading} size={50} />
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
          {filteredTourneys.map(tourney => (
            <Link to={`/dashboard/tourneys/${tourney.id}`} key={tourney.id}>
              <div className="bg-[#141313] p-4 rounded shadow-md cursor-pointer">
                <h2 className="text-lg font-bold text-white underline">{tourney.name}</h2>
                <p className="text-white mb-2">{tourney.theme_name}</p>
                <p className="text-white">By {tourney.creator_name}</p>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

export default MyTourneys;

