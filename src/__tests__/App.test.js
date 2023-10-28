import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';

test('renders app title', () => {
  render(<App />);
  const titleElement = screen.getByText(/Movie List App/i);
  expect(titleElement).toBeInTheDocument();
});

test('loads movies and displays them', async () => {
  render(<App />);

  // Wait for movies to load
  await waitFor(() => screen.getByText(/Loading.../i), { timeout: 3000 });

  // Check if movie cards are rendered
  const movieCards = screen.getAllByRole('img', { name: /movie poster/i });
  expect(movieCards.length).toBeGreaterThan(0);
});

test('filters movies by genre', async () => {
  render(<App />);

  // Wait for movies to load
  await waitFor(() => screen.getByText(/Loading.../i), { timeout: 3000 });

  // Select a genre
  const genreSelect = screen.getByLabelText(/Filter by Genre/i);
  userEvent.selectOptions(genreSelect, ['Action']);

  // Check if only Action movies are displayed
  const actionMovies = screen.getAllByRole('img', { name: /movie poster/i });
  expect(actionMovies.length).toBeGreaterThan(0);

  // TODO: Add more specific checks based on your app's logic
});

// Add more tests based on your app's features and logic
