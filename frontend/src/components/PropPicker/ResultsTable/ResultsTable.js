import React, { useState, useEffect } from 'react';
import TableEntry from './TableEntry/TableEntry';
import './ResultsTable.css';

const sportsbooks = {
  "DraftKings": "draftkings-icon.png",
  "FanDuel": "fanduel-icon.jpg",
  "Bovada": "bovada-icon.jpg",
  "BetMGM": "betmgm-icon.png",
  "Caesars": "caesars-icon.png",
  "BetOnline.AG": "betonlineag-icon.jpg",
  "BetRivers": "betrivers-icon.png"
};

function ResultsTable({ entries, prop }) {
  const [filter, setFilter] = useState('');
  const [structuredData, setStructuredData] = useState([]);

  useEffect(() => {
    const processData = () => {
      const dataByPlayer = {};

      entries.forEach(entry => {
        const { Game, Player, Time, Bookmaker, Line, Odds, OverUnder } = entry;
        if (!dataByPlayer[Player]) {
          dataByPlayer[Player] = {
            Game,
            Player,
            Prop: prop,
            Time,
            ...Object.fromEntries(Object.keys(sportsbooks).flatMap(sportbook => [
              [`${sportbook}Over`, null],
              [`${sportbook}Under`, null]
            ]))
          };
        }

        const bookKey = Object.keys(sportsbooks).find(key => key.toLowerCase() === Bookmaker.toLowerCase());
        if (bookKey) {
          const overOrUnder = OverUnder === "Over" ? "Over" : "Under";
          dataByPlayer[Player][`${bookKey}${overOrUnder}`] = [Line, Odds];
        }
      });

      setStructuredData(Object.values(dataByPlayer));
    };

    processData();
  }, [entries, prop]);

  const filteredEntries = structuredData.filter(entry =>
    entry.Player.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <div className="container results-table">
      <div className="search-input-container">
        <input
          type="text"
          placeholder="Search for items"
          className="search-input"
          onChange={(e) => setFilter(e.target.value)}
        />
      </div>

      <div className="table-container">
        <table className="table">
          <thead>
            <tr>
              <th style={{ width: '12%' }}>Game</th>
              <th style={{ width: '6%' }}>Start Time</th>
              <th style={{ width: '12%' }}>Player</th>
              <th style={{ width: '7%' }}>Prop</th>
              {Object.keys(sportsbooks).map((book, index) => (
                <th key={index} style={{ width: '9.08%' }}>
                  <img src={`/icons/${sportsbooks[book]}`} alt={book} />
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filteredEntries.map((entry, index) => (
              <TableEntry key={index} entry={entry} />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ResultsTable;
