

import React, { useState, useEffect } from 'react';
import { fetchMovies, fetchGenres } from './services/movieService';
import MovieList from './components/MovieList';
import GenreFilter from './components/GenreFilter';
import './App.css';

function App() {
  const [movies, setMovies] = useState([]);
  const [genres, setGenres] = useState([]);
  const [selectedGenres, setSelectedGenres] = useState([]);
  const [year, setYear] = useState(2012);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [reachedEnd, setReachedEnd] = useState(false);
  const [reachedTop, setReachedTop] = useState(false);

  useEffect(() => {
    const fetchInitialData = async () => {
      setLoading(true);
      const initialMovies = await fetchMovies(2012, 1, 20, selectedGenres); // Set the default year to 2012
      const initialGenres = await fetchGenres();
  
      setMovies(initialMovies);
      setGenres(initialGenres);
      setLoading(false);
    };
  
    fetchInitialData();
  }, [selectedGenres]);

  const handleGenreChange = (e) => {
    const selectedOptions = Array.from(e.target.selectedOptions, (option) => option.value);
    setSelectedGenres(selectedOptions);
    setMovies([]); // Reset movies immediately when the selected genres change
    setPage(1);
    setLoading(true);
    setReachedEnd(false);
    setReachedTop(false);
  };

  const handleScroll = () => {
    if (
      !reachedEnd &&
      window.innerHeight + window.scrollY >= document.body.offsetHeight - 500 &&
      window.scrollY !== 0 &&
      !loading
    ) {
      setLoading(true);
      setPage((prevPage) => prevPage + 1);
    } else if (window.scrollY === 0 && !loading && page > 1) {
      setLoading(true);
      setPage((prevPage) => prevPage - 1);
    }
  };
  useEffect(() => {
    const handleScrollThrottle = throttle(handleScroll, 500);

    window.addEventListener('scroll', handleScrollThrottle);
    return () => {
      window.removeEventListener('scroll', handleScrollThrottle);
    };
  }, [loading, reachedEnd]);

  useEffect(() => {
    const fetchMoreMovies = async () => {
      const newMovies = await fetchMovies(year, page, 8, selectedGenres); // Load only 8 movies for each additional page
      if (newMovies.length === 0) {
        // No more movies, reached the end
        setReachedEnd(true);
      } else {
        setMovies((prevMovies) => (reachedTop ? [...newMovies, ...prevMovies] : [...prevMovies, ...newMovies]));
      }
      setLoading(false);
    };

    fetchMoreMovies();
  }, [year, page, selectedGenres, reachedEnd, reachedTop]);

  // Throttle function to limit the rate of function calls
  const throttle = (func, delay) => {
    let lastExecTime = 0;
    return function (...args) {
      const now = new Date().getTime();
      if (now - lastExecTime >= delay) {
        func.apply(null, args);
        lastExecTime = now;
      }
    };
  };

  // smooth scrolling
  useEffect(() => {
    const handleSmoothScroll = () => {
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercentage = (window.scrollY / scrollHeight) * 100;
  
      if (scrollPercentage > 80 && !loading && !reachedEnd) {
        setLoading(true);
        setPage((prevPage) => prevPage + 1);
      }
    };
  
    const handleSmoothScrollThrottle = throttle(handleSmoothScroll, 500);
  
    window.addEventListener('scroll', handleSmoothScrollThrottle);
    return () => {
      window.removeEventListener('scroll', handleSmoothScrollThrottle);
    };
  }, [loading, reachedEnd]);

  // search tab
  const handleSearch = async (searchString) => {
    console.log('Search String:', searchString); // Log the search string
    setMovies([]); // Clear existing movies
    setPage(1);
    setLoading(true);
  
    try {
      const searchResults = await fetchMovies(year, 1, 20, selectedGenres, searchString); // Adjust parameters
      console.log('Search Results:', searchResults); // Log the search results
      setMovies(searchResults);
    } catch (error) {
      console.error('Error in handleSearch:', error); // Log any errors
    }
  
    setLoading(false);
  };

  return (
    <div className="app">
     <input
        type="text"
        placeholder="Search for movies..."
        onChange={(e) => handleSearch(e.target.value)}
      />
      <GenreFilter genres={genres} selectedGenres={selectedGenres} onGenreChange={handleGenreChange} />
      <MovieList movies={movies} />
      {loading && <p>Loading...</p>}
      {reachedEnd && !loading && movies.length > 0 && <p>No more movies</p>}
      {reachedEnd && !loading && movies.length === 0 && <p>No movies available</p>}
    </div>
  );
}

export default App;