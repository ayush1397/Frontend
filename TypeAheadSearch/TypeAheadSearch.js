import React, { useState, useEffect } from 'react';
import SuggestionList from './SuggestionList';

const items = ['Apple', 'Banana', 'Orange', 'Grapes', 'Mango', 'Pineapple', 'Peach', 'Watermelon', 'Strawberry'];

export default function TypeaheadSearch() {
  const [query, setQuery] = useState('');
  const [debouncedQuery, setDebouncedQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);

  // for adding debounce delay to the query
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(query);
    }, 500);
    return () => clearTimeout(timer);
  }, [query]);

  // for filtering the items based on the debounced query
  useEffect(() => {
    if (debouncedQuery.trim() === '') {
      setSuggestions([]);
      return;
    }

    const filtered = items.filter(item =>
      item.toLowerCase().includes(debouncedQuery.toLowerCase())
    );
    setSuggestions(filtered);
  }, [debouncedQuery]);

  return (
    <div style={{ padding: '20px', maxWidth: '400px' }}>
      <input
        type="text"
        placeholder="Search fruits..."
        value={query}
        onChange={e => setQuery(e.target.value)}
        style={{
          width: '100%',
          padding: '8px',
          fontSize: '16px',
          borderRadius: '4px',
          border: '1px solid #ccc',
        }}
      />

      <SuggestionList
        suggestions={suggestions}
        onSelect={item => setQuery(item)}
      />
    </div>
  );
}
