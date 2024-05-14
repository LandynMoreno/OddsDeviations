import React, { useState } from 'react';
import './PropPicker.css';
import ResultsTable from './ResultsTable/ResultsTable';

function PropPicker () {
  const [sport, setSport] = useState('');
  const [game, setGame] = useState('');
  const [prop, setProp] = useState('');
  const [isLoading, setIsLoading] = useState(false);  // State to manage loading
  const [fetchedData, setFetchedData] = useState(null);

  const sportsArray = ["NBA"];
  const gamesArray = ["Bos @ Cle", "Okc @ Dal"];
  const propOptions = [
    'playerpoints', 'player_rebounds', 'player_assists', 
    'player_threes', 'player_blocks', 'player_steals', 
    'player_blocks_steals', 'player_turnovers', 
    'player_points_rebounds_assists', 'player_points_rebounds', 
    'player_points_assists', 'player_rebounds_assists'
  ];

  function getSportsbooksData() {
    if (!sportsArray.includes(sport) || !gamesArray.includes(game) || !propOptions.includes(prop)) {
      alert("Please select a valid option for all fields.");
      return;
    }
    setIsLoading(true);  // Start loading

    // Simulate an API call
    setTimeout(() => {
      const data = [
        { id: 1, game: "Bos @ Cle", startTime: "7:00 pm", playerName: "Player One", prop: "playerpoints", draftkings: "130", fanduel: "125", bovada: "120" },
        { id: 2, game: "Okc @ Dal", startTime: "7:00 pm", playerName: "Player Two", prop: "player_rebounds", draftkings: "110", fanduel: "115", bovada: "105" }
      ];

      setFetchedData(data);
      setIsLoading(false);
    }, 2000);
  }

  return (
    <div className="container PropPicker">
      <div className="dropdowns">
        <select value={sport} onChange={(e) => setSport(e.target.value)} className={!sport ? 'placeholder' : ''}>
          <option value="" disabled hidden>Select a sport</option>
          <option value="NBA">NBA</option>
        </select>
        <select value={game} onChange={(e) => setGame(e.target.value)} className={!game ? 'placeholder' : ''}>
          <option value="" disabled hidden>Select a game</option>
          <option value="Bos @ Cle">Bos @ Cle</option>
          <option value="Okc @ Dal">Okc @ Dal</option>
        </select>
        <select value={prop} onChange={(e) => setProp(e.target.value)} className={!prop ? 'placeholder' : ''}>
          <option value="" disabled hidden>Select a prop</option>
          {propOptions.map(option => (
            <option key={option} value={option}>{option}</option>
          ))}
        </select>
        <button onClick={getSportsbooksData}>Scan Sportsbooks</button>
      </div>
      {isLoading && (
        <div className="loading">
          <h4>Fetching data for {sport}, {game}, {prop}</h4>
          <div className="spinner"></div>
        </div>
      )}
      {!isLoading && fetchedData && <ResultsTable entries={fetchedData} />}
    </div>
  );
}

export default PropPicker;
