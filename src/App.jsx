import React, { useState } from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import SearchBar from './components/SearchBar';
import ProfileCard from './components/ProfileCard';
import RepositoryList from './components/RepositoryList';
import PrivacyPolicy from './pages/PrivacyPolicy';
import Terms from './pages/Terms';
import { fetchUser, fetchRepos } from './services/githubApi';
import './App.css';

function HomePage() {
  const [user, setUser] = useState(null);
  const [repos, setRepos] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  async function handleSearch(username) {
    setIsLoading(true);
    setError(null);
    setUser(null);
    setRepos([]);

    try {
      const [userData, repoData] = await Promise.all([
        fetchUser(username),
        fetchRepos(username),
      ]);
      setUser(userData);
      setRepos(repoData);
    } catch (err) {
      if (err.message === 'USER_NOT_FOUND') {
        setError('User not found. Please check the username and try again.');
      } else {
        setError('Something went wrong. Please try again later.');
      }
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <>
      <header className="app-header">
        <div className="header-content">
          <Link to="/" className="header-title">
            <h1>GitHub Profile Viewer</h1>
          </Link>
        </div>
      </header>

      <main className="app-main">
        <div className="search-section">
          <p className="search-description">
            Look up any public GitHub profile and explore their repositories.
          </p>
          <SearchBar onSearch={handleSearch} isLoading={isLoading} />
        </div>

        {isLoading && (
          <div className="status-message">
            <div className="spinner" />
            <p>Loading profile...</p>
          </div>
        )}

        {error && (
          <div className="status-message error-message">
            <p>{error}</p>
          </div>
        )}

        {user && !isLoading && (
          <div className="results-section">
            <ProfileCard user={user} />
            <RepositoryList repos={repos} />
          </div>
        )}
      </main>

      <footer className="app-footer">
        <div className="footer-content">
          <span>GitHub Profile Viewer</span>
          <nav className="footer-links">
            <Link to="/privacy">Privacy</Link>
            <Link to="/terms">Terms</Link>
          </nav>
        </div>
      </footer>
    </>
  );
}

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/privacy" element={<PrivacyPolicy />} />
      <Route path="/terms" element={<Terms />} />
    </Routes>
  );
}
