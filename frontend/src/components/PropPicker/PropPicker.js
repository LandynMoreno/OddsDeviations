import React, { useState, useEffect } from 'react';
import './PropPicker.css';
import ResultsTable from './ResultsTable/ResultsTable';

function PropPicker() {
    const [sport, setSport] = useState('NBA');
    const [games, setGames] = useState([]);
    const [selectedGame, setSelectedGame] = useState({});
    const [prop, setProp] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [fetchedData, setFetchedData] = useState(null);

    const propOptions = [
        'player_points', 'player_rebounds', 'player_assists', 
        'player_threes', 'player_blocks', 'player_steals', 
        'player_blocks_steals', 'player_turnovers', 
        'player_points_rebounds_assists', 'player_points_rebounds', 
        'player_points_assists', 'player_rebounds_assists'
    ];

    useEffect(() => {
        fetchGames();
    }, [sport]);

    async function fetchGames() {
        const response = await fetch('http://localhost:5000/get-nba-games');
        const games = await response.json();
        setGames(games);
        console.log("Games Fetched: ", games);
    };

    async function getSportsbookData() {
        if (!selectedGame.id || !prop) {
            alert("Please select a valid game and prop type.");
            return;
        }
        setIsLoading(true);
        console.log("Fetching sportsbook data for " + selectedGame.game + ", " + prop);

        try {
            const response = await fetch('http://localhost:5000/get-player-props', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ event_id: selectedGame.id, prop_type: prop })
            });
            if (response.ok) {
                const propsData = await response.json();
                setFetchedData(propsData);
                console.log('Player props fetched:', propsData); // Log fetched data for debugging
            } else {
                throw new Error('Failed to fetch player props');
            }
        } catch (error) {
            console.error('Error fetching player props:', error);
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <div className="container PropPicker">
            <div className="dropdowns">
                <select value={sport} onChange={(e) => setSport(e.target.value)} className={!sport ? 'placeholder' : ''}>
                    <option value="" disabled hidden>Select a sport</option>
                    <option value="NBA">NBA</option>
                </select>
                <select value={selectedGame.id || ''} onChange={(e) => setSelectedGame(games.find(game => game.id === e.target.value))} className={!selectedGame ? 'placeholder' : ''}>
                    <option value="" disabled hidden>Select a game</option>
                    {games.map(game => (
                        <option key={game.id} value={game.id}>{game.game}</option>
                    ))}
                </select>
                <select value={prop} onChange={(e) => setProp(e.target.value)} className={!prop ? 'placeholder' : ''}>
                    <option value="" disabled hidden>Select a prop</option>
                    {propOptions.map(option => (
                        <option key={option} value={option}>{option}</option>
                    ))}
                </select>
                <button onClick={getSportsbookData}>Scan Sportsbooks</button>
            </div>
            {isLoading && (
                <div className="loading">
                    <h4>Fetching data for {selectedGame.game}, {prop}</h4>
                    <div className="spinner"></div>
                </div>
            )}
            {!isLoading && fetchedData && <ResultsTable entries={fetchedData} prop={prop}/>}
        </div>
    );
}

export default PropPicker;
