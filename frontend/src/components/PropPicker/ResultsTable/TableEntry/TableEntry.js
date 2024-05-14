import React from 'react';
import './TableEntry.css'

function TableEntry({ entry }) {
    return (
      <tr className="hover:bg-gray-100">
        <td>{entry.game}</td>
        <td>{entry.startTime}</td>
        <td>{entry.playerName}</td>
        <td>{entry.prop}</td>
        <td>{entry.draftkings}</td>
        <td>{entry.fanduel}</td>
        <td>{entry.bovada}</td>
      </tr>
    );
  }
  
  export default TableEntry;
  