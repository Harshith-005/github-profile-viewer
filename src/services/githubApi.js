const BASE_URL = 'https://api.github.com';

export async function fetchUser(username) {
  const response = await fetch(`${BASE_URL}/users/${username}`);

  if (response.status === 404) {
    throw new Error('USER_NOT_FOUND');
  }

  if (!response.ok) {
    throw new Error('API_ERROR');
  }

  return response.json();
}

export async function fetchRepos(username, perPage = 30) {
  const response = await fetch(
    `${BASE_URL}/users/${username}/repos?per_page=${perPage}&sort=updated&direction=desc`
  );

  if (response.status === 404) {
    throw new Error('USER_NOT_FOUND');
  }

  if (!response.ok) {
    throw new Error('API_ERROR');
  }

  return response.json();
}
