import React from 'react';
import { Link } from 'react-router-dom';

export default function PrivacyPolicy() {
  return (
    <div className="legal-page">
      <div className="legal-container">
        <Link to="/" className="legal-back">&larr; Back to app</Link>
        <h1>Privacy Policy</h1>
        <p className="legal-updated">Last updated: September 2026</p>

        <section>
          <h2>What This Application Does</h2>
          <p>
            GitHub Profile Viewer is a client-side web application that allows you
            to search for public GitHub user profiles and view their publicly
            available information and repositories.
          </p>
        </section>

        <section>
          <h2>Data Collection</h2>
          <p>
            This application does not collect, store, or transmit any personal
            data. There are no user accounts, cookies, analytics trackers, or
            databases.
          </p>
        </section>

        <section>
          <h2>GitHub API Usage</h2>
          <p>
            When you search for a username, this application makes requests
            directly from your browser to the GitHub REST API. These requests
            are made to <code>api.github.com</code> and are subject to
            GitHub's own <a href="https://docs.github.com/en/site-policy/privacy-policies/github-general-privacy-statement" target="_blank" rel="noopener noreferrer">Privacy Statement</a>.
          </p>
          <p>
            Only publicly available information is retrieved. No private
            repositories or private user data are accessed.
          </p>
        </section>

        <section>
          <h2>Third-Party Services</h2>
          <p>
            The only third-party service used is the GitHub REST API.
            This application does not integrate with any advertising networks,
            analytics platforms, or other third-party services.
          </p>
        </section>

        <section>
          <h2>Local Storage</h2>
          <p>
            This application does not store any data in your browser's local
            storage, session storage, or cookies.
          </p>
        </section>

        <section>
          <h2>Contact</h2>
          <p>
            If you have questions about this privacy policy, you can open an
            issue on the project's GitHub repository.
          </p>
        </section>
      </div>
    </div>
  );
}
