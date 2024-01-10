import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import MovieCard from "../components/MovieCard";
import { useFavMovies } from "../utils/favMovies";
import "../css/MovieCard.css";

const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${import.meta.env.VITE_ACCESS_TOKEN}`,
  },
};

function MovieList() {
  const { favouriteMovies, toggleFavMovie } = useFavMovies();
  const [moviesData, setMoviesData] = useState([]);

  useEffect(() => {
    const resp = async () => {
      try {
        const response = await fetch(
          "https://api.themoviedb.org/3/movie/popular?language=en-US&page=1",
          options
        );

        const fav = await response.json();
        setMoviesData(fav.results);
      } catch (error) {
        console.error("Error", error);
      }
    };

    resp();
  }, []);

  // console.log(favouriteMovies);
  if (favouriteMovies.length === 0) {
    return (
      <div>
        <h1>No favorite movies yet</h1>
        <Link className="buttonColor" to="/HomePage">
          <button className="hpbutton">HomePage</button>
        </Link>
      </div>
    );
  }

  const allMovie = moviesData.filter((movie) =>
    favouriteMovies.includes(movie.id)
  );

  return (
    <div>
      <h1>Favorite Movies</h1>
      <div className="favorite-movies-container">
        {allMovie.map((movie) => (
          <div key={movie.id}>
            <MovieCard {...movie} />
            <button onClick={() => toggleFavMovie(movie.id)}>Remove</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MovieList;
