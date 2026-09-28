import React, { useState } from 'react';

export default function SearchBar({ onSearch, isLoading }) {
  const [query, setQuery] = useState('');

  function handleSubmit(e) {
    e.preventDefault();
    const trimmed = query.trim();
    if (!trimmed) return;
    onSearch(trimmed);
  }

  return (
    <form className="search-bar" onSubmit={handleSubmit}>
      <input
        type="text"
        className="search-input"
        placeholder="Enter GitHub username"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        aria-label="GitHub username"
      />
      <button
        type="submit"
        className="search-button"
        disabled={isLoading}
      >
        {isLoading ? 'Searching...' : 'Search'}
      </button>
    </form>
  );
}
