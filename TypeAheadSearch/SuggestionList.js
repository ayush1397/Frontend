import React from 'react';

export default function SuggestionList({ suggestions, onSelect }) {
  if (!suggestions.length) return null;

  return (
    <ul
      style={{
        listStyle: 'none',
        padding: 0,
        marginTop: '8px',
        border: '1px solid #ccc',
        borderRadius: '4px',
        maxHeight: '150px',
        overflowY: 'auto',
      }}
    >
      {suggestions.map((item, index) => (
        <li
          key={index}
          style={{
            padding: '8px',
            borderBottom: '1px solid #eee',
            cursor: 'pointer',
          }}
          onClick={() => onSelect(item)}
        >
          {item}
        </li>
      ))}
    </ul>
  );
}
