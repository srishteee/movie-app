import React from 'react';
const GenreFilter = ({ genres, selectedGenres, onGenreChange }) => {
  return (
    <div className="genre-filter">
      <label>Filter by Genre:</label>
      <select multiple value={selectedGenres} onChange={onGenreChange}>
        {genres.map((genre) => (
          <option key={genre.id} value={genre.id}>
            {genre.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default GenreFilter;
