import React from 'react';
import RepositoryCard from './RepositoryCard';

export default function RepositoryList({ repos }) {
  if (!repos || repos.length === 0) {
    return (
      <div className="repos-section">
        <h3 className="repos-heading">Repositories</h3>
        <p className="repos-empty">No public repositories found.</p>
      </div>
    );
  }

  return (
    <div className="repos-section">
      <h3 className="repos-heading">Repositories</h3>
      <div className="repos-grid">
        {repos.map((repo) => (
          <RepositoryCard key={repo.id} repo={repo} />
        ))}
      </div>
    </div>
  );
}
