import React from 'react';
import { MapPin, Users, BookOpen, ExternalLink } from 'lucide-react';

export default function ProfileCard({ user }) {
  return (
    <div className="profile-card">
      <div className="profile-header">
        <img
          src={user.avatar_url}
          alt={`${user.login}'s avatar`}
          className="profile-avatar"
        />
        <div className="profile-info">
          <h2 className="profile-name">{user.name || user.login}</h2>
          <p className="profile-username">@{user.login}</p>
          {user.bio && <p className="profile-bio">{user.bio}</p>}
          {user.location && (
            <p className="profile-location">
              <MapPin size={14} />
              <span>{user.location}</span>
            </p>
          )}
        </div>
      </div>

      <div className="profile-stats">
        <div className="stat">
          <span className="stat-value">{user.public_repos}</span>
          <span className="stat-label">
            <BookOpen size={13} />
            Repos
          </span>
        </div>
        <div className="stat">
          <span className="stat-value">{user.followers}</span>
          <span className="stat-label">
            <Users size={13} />
            Followers
          </span>
        </div>
        <div className="stat">
          <span className="stat-value">{user.following}</span>
          <span className="stat-label">
            <Users size={13} />
            Following
          </span>
        </div>
      </div>

      <a
        href={user.html_url}
        target="_blank"
        rel="noopener noreferrer"
        className="profile-link"
      >
        <ExternalLink size={14} />
        View on GitHub
      </a>
    </div>
  );
}
