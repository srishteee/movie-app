// src/services/movieService.js

const apiKey = '2dca580c2a14b55200e784d157207b4d';
const baseUrl = 'https://api.themoviedb.org/3';

export const fetchMovies = async (year, page, count = 20, genres = [], search = '') => {
  const genreQuery = genres.length > 0 ? `&with_genres=${genres.join(',')}` : '';
  const searchQuery = search ? `&query=${encodeURIComponent(search)}` : '';
  const apiUrl = `${baseUrl}/discover/movie?api_key=${apiKey}&sort_by=popularity.desc&primary_release_year=${year}&page=${page}&vote_count.gte=100${genreQuery}${searchQuery}`;

  try {
    const response = await fetch(apiUrl);
    const data = await response.json();
    
    // Filter movies based on the original_title containing the search string
    const filteredMovies = data.results.filter(movie => movie.original_title.toLowerCase().includes(search.toLowerCase()));
    
    // Return only the specified count of filtered movies
    return filteredMovies.slice(0, count);
  } catch (error) {
    console.error('Error fetching movies:', error);
    return [];
  }
};

export const fetchGenres = async () => {
  const apiUrl = `${baseUrl}/genre/movie/list?api_key=${apiKey}`;

  try {
    const response = await fetch(apiUrl);
    const data = await response.json();
    return data.genres;
  } catch (error) {
    console.error('Error fetching genres:', error);
    return [];
  }
};
