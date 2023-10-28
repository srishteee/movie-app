import React from 'react';

const MovieCard = ({ movie }) => {
  return (
    <div className="movie-card">
      <img style={{width:"220px"}} src={`https://image.tmdb.org/t/p/w300/${movie.poster_path}`} alt={movie.title} />
      <h2 style={{fontSize:"20px", fontWeight:"bold"}}>{movie.title}</h2>
      <p>{movie.overview.slice(0,50)}</p>
      {/* Add other movie details here */}
    </div>
  );
};

export default MovieCard;
