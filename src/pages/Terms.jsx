import React from 'react';
import { Link } from 'react-router-dom';

export default function Terms() {
  return (
    <div className="legal-page">
      <div className="legal-container">
        <Link to="/" className="legal-back">&larr; Back to app</Link>
        <h1>Terms and Conditions</h1>
        <p className="legal-updated">Last updated: September 2026</p>

        <section>
          <h2>Purpose</h2>
          <p>
            GitHub Profile Viewer is a free, open-source web application
            designed to browse publicly available GitHub user profiles and
            repositories. It is intended for informational and educational
            purposes.
          </p>
        </section>

        <section>
          <h2>Acceptable Use</h2>
          <p>
            By using this application, you agree to use it in a manner that
            is lawful and respectful. You should not use this application to:
          </p>
          <ul>
            <li>Scrape or harvest data in bulk from GitHub.</li>
            <li>Harass, stalk, or target any GitHub user.</li>
            <li>Circumvent GitHub API rate limits or terms of service.</li>
            <li>Use the data obtained for any unlawful purpose.</li>
          </ul>
        </section>

        <section>
          <h2>GitHub API</h2>
          <p>
            This application relies on the GitHub REST API to retrieve
            publicly available data. Your use of this application is also
            subject to <a href="https://docs.github.com/en/site-policy/github-terms/github-terms-of-service" target="_blank" rel="noopener noreferrer">GitHub's Terms of Service</a>.
          </p>
        </section>

        <section>
          <h2>Limitations</h2>
          <p>
            This application is provided "as is" without any warranties.
            The developer does not guarantee the accuracy, availability,
            or completeness of the data displayed. GitHub API rate limits
            may affect the application's functionality.
          </p>
        </section>

        <section>
          <h2>No Warranty</h2>
          <p>
            This is a personal project and is not a commercial product.
            It is provided without warranty of any kind. The developer is
            not liable for any damages arising from the use of this
            application.
          </p>
        </section>

        <section>
          <h2>Changes</h2>
          <p>
            These terms may be updated from time to time. Continued use of
            the application after changes constitutes acceptance of the
            updated terms.
          </p>
        </section>
      </div>
    </div>
  );
}
