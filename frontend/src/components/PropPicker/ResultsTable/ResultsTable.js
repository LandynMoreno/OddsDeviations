// ResultsTable.js
import React, { useState } from 'react';
import TableEntry from './TableEntry/TableEntry';
import './ResultsTable.css';

function ResultsTable({ entries }) {
  const [filter, setFilter] = useState('');

  const filteredEntries = entries.filter(entry =>
    entry.playerName.toLowerCase().includes(filter.toLowerCase())
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
              <th style={{ width: '15%' }}>Game</th>
              <th style={{ width: '15%' }}>Start Time</th>
              <th style={{ width: '15%' }}>Player</th>
              <th style={{ width: '15%' }}>Prop</th>
              <th style={{ width: '5%' }}><img src="/icons/draftkings-icon.png" alt="Draftkings"/></th>
              <th style={{ width: '5%' }}><img src="/icons/fanduel-icon.jpg" alt="FanDuel" /></th>
              <th style={{ width: '5%' }}><img src="/icons/bovada-icon.jpg" alt="Bovada" /></th>
              <th style={{ width: '5%' }}><img src="/icons/betmgm-icon.png" alt="Bet MGM" /></th>
              <th style={{ width: '5%' }}><img src="/icons/mybookieag-icon.jpg" alt="MyBookie AG" /></th>
              <th style={{ width: '5%' }}><img src="/icons/pointsbet-icon.png" alt="Points Bet US" /></th>
              <th style={{ width: '5%' }}><img src="/icons/betonline-icon.jpg" alt="BetOnline" /></th>
              <th style={{ width: '5%' }}><img src="/icons/betrivers-icon.png" alt="BetRivers" /></th>
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
