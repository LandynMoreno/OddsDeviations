import React from 'react';
import './TableEntry.css';

function TableEntry({ entry }) {
  const renderBookmakerData = (over, under) => {
    const line = over ? over[0] : under ? under[0] : 'N/A';
    return (
      <div className="table-entry-cell">
        <div className="over-row">{over ? `Over, ${over[1]}` : 'N/A'}</div>
        <div className="line-row">{line}</div>
        <div className="under-row">{under ? `Under, ${under[1]}` : 'N/A'}</div>
      </div>
    );
  };

  return (
    <tr className="hover:bg-gray-100">
      <td>{entry.Game}</td>
      <td>{entry.Time}</td>
      <td>{entry.Player}</td>
      <td>{entry.Prop}</td>
      {Object.keys(entry).filter(key => key.endsWith("Over")).map((bookOverKey, index) => {
        const bookUnderKey = bookOverKey.replace("Over", "Under");
        return (
          <td key={index}>
            {renderBookmakerData(entry[bookOverKey], entry[bookUnderKey])}
          </td>
        );
      })}
    </tr>
  );
}

export default TableEntry;
