import React from 'react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { HashRouter } from 'react-router-dom';
import App from '../App';

const mockUser = {
  login: 'octocat',
  name: 'The Octocat',
  avatar_url: 'https://avatars.githubusercontent.com/u/583231?v=4',
  html_url: 'https://github.com/octocat',
  bio: 'A test bio',
  location: 'San Francisco',
  public_repos: 8,
  followers: 100,
  following: 10,
};

const mockRepos = [
  {
    id: 1,
    name: 'hello-world',
    html_url: 'https://github.com/octocat/hello-world',
    description: 'A hello world repo',
    language: 'JavaScript',
    stargazers_count: 5,
    forks_count: 3,
  },
  {
    id: 2,
    name: 'test-repo',
    html_url: 'https://github.com/octocat/test-repo',
    description: null,
    language: null,
    stargazers_count: 0,
    forks_count: 0,
  },
];

function renderApp() {
  return render(
    <HashRouter>
      <App />
    </HashRouter>
  );
}

describe('App', () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  it('renders the page with header and search input', () => {
    renderApp();
    expect(screen.getByRole('heading', { name: 'GitHub Profile Viewer' })).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Enter GitHub username')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /search/i })).toBeInTheDocument();
  });

  it('does not submit an empty search', async () => {
    const user = userEvent.setup();
    const fetchSpy = vi.spyOn(globalThis, 'fetch');
    renderApp();

    await user.click(screen.getByRole('button', { name: /search/i }));
    expect(fetchSpy).not.toHaveBeenCalled();
  });

  it('shows loading state when searching', async () => {
    const user = userEvent.setup();

    // Make fetch hang so the loading state is visible
    vi.spyOn(globalThis, 'fetch').mockImplementation(
      () => new Promise(() => {})
    );

    renderApp();
    const input = screen.getByPlaceholderText('Enter GitHub username');
    await user.type(input, 'octocat');
    await user.click(screen.getByRole('button', { name: /search/i }));

    expect(screen.getByText('Loading profile...')).toBeInTheDocument();
    expect(screen.getByText('Searching...')).toBeInTheDocument();
  });

  it('displays profile and repos after a successful search', async () => {
    const user = userEvent.setup();

    vi.spyOn(globalThis, 'fetch').mockImplementation((url) => {
      if (url.includes('/repos')) {
        return Promise.resolve({
          ok: true,
          status: 200,
          json: () => Promise.resolve(mockRepos),
        });
      }
      return Promise.resolve({
        ok: true,
        status: 200,
        json: () => Promise.resolve(mockUser),
      });
    });

    renderApp();
    const input = screen.getByPlaceholderText('Enter GitHub username');
    await user.type(input, 'octocat');
    await user.click(screen.getByRole('button', { name: /search/i }));

    await waitFor(() => {
      expect(screen.getByText('The Octocat')).toBeInTheDocument();
    });

    expect(screen.getByText('@octocat')).toBeInTheDocument();
    expect(screen.getByText('A test bio')).toBeInTheDocument();
    expect(screen.getByText('San Francisco')).toBeInTheDocument();
    expect(screen.getByText('hello-world')).toBeInTheDocument();
    expect(screen.getByText('A hello world repo')).toBeInTheDocument();
    expect(screen.getByText('test-repo')).toBeInTheDocument();
  });

  it('displays user not found error for 404 response', async () => {
    const user = userEvent.setup();

    vi.spyOn(globalThis, 'fetch').mockResolvedValue({
      ok: false,
      status: 404,
    });

    renderApp();
    const input = screen.getByPlaceholderText('Enter GitHub username');
    await user.type(input, 'nonexistentuser12345');
    await user.click(screen.getByRole('button', { name: /search/i }));

    await waitFor(() => {
      expect(
        screen.getByText('User not found. Please check the username and try again.')
      ).toBeInTheDocument();
    });
  });

  it('displays generic error for network failures', async () => {
    const user = userEvent.setup();

    vi.spyOn(globalThis, 'fetch').mockRejectedValue(new Error('Network error'));

    renderApp();
    const input = screen.getByPlaceholderText('Enter GitHub username');
    await user.type(input, 'octocat');
    await user.click(screen.getByRole('button', { name: /search/i }));

    await waitFor(() => {
      expect(
        screen.getByText('Something went wrong. Please try again later.')
      ).toBeInTheDocument();
    });
  });
});
