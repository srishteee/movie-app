import React from 'react';
import "../App.css"
const GenreFilter = ({ genres, selectedGenres, onGenreChange }) => {
  return (
    <div style={{display:"flex", justifyContent:"end"}}>
      <div style={{padding:"20px"}}>
      <label style={{fontWeight:"bolder"}}>Filter by Genre</label>
      </div>
      <div className='select'>
      <select name="format" id="format" multiple value={selectedGenres} onChange={onGenreChange}>
        {genres.map((genre) => (
          <option key={genre.id} value={genre.id}>
            {genre.name}
          </option>
        ))}
      </select>
      </div>
    </div>
  );
};

export default GenreFilter;