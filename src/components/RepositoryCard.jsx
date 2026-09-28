import React from 'react';
import { Star, GitFork, ExternalLink } from 'lucide-react';

export default function RepositoryCard({ repo }) {
  return (
    <div className="repo-card">
      <div className="repo-card-header">
        <a
          href={repo.html_url}
          target="_blank"
          rel="noopener noreferrer"
          className="repo-name"
        >
          {repo.name}
          <ExternalLink size={12} className="repo-link-icon" />
        </a>
      </div>

      {repo.description && (
        <p className="repo-description">{repo.description}</p>
      )}

      <div className="repo-meta">
        {repo.language && (
          <span className="repo-language">
            <span className="language-dot" />
            {repo.language}
          </span>
        )}
        <span className="repo-stat">
          <Star size={13} />
          {repo.stargazers_count}
        </span>
        <span className="repo-stat">
          <GitFork size={13} />
          {repo.forks_count}
        </span>
      </div>
    </div>
  );
}
