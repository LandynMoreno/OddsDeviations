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
              <th style={{ width: '20%' }}>Game</th>
              <th style={{ width: '20%' }}>Start Time</th>
              <th style={{ width: '20%' }}>Player</th>
              <th style={{ width: '20%' }}>Prop</th>
              <th style={{ width: '5%' }}>DK</th>
              <th style={{ width: '5%' }}>FD</th>
              <th style={{ width: '5%' }}>BV</th>
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
