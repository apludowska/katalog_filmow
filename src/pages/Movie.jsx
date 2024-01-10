import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import MovieCard from "../components/MovieCard";
import "../css/MovieCard.css";
import { Button } from "@mui/material";
import { useFavMovies } from "../utils/favMovies";
import "../css/SingleMovie.css";
import { Link } from "react-router-dom";

const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${import.meta.env.VITE_ACCESS_TOKEN}`,
  },
};

async function getMovie(movieId) {
  const resp = await fetch(
    `https://api.themoviedb.org/3/movie/${movieId}?language=en-US`,
    options
  );
  const movie = await resp.json();
  return movie;
}

const useMovie = (movieId) => {
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    getMovie(movieId).then((film) => {
      setMovie(film);
    });
  }, [movieId]);

  return { movie };
};

export default function Movie() {
  const { toggleFavMovie, favouriteMovies } = useFavMovies();

  const { movieId } = useParams();
  const { movie } = useMovie(movieId);

  if (movie === null) {
    return <div>loading...</div>;
  }

  const isFavourite = favouriteMovies.includes(movie.id);

  console.log(isFavourite);

  return (
    <div className="body">
      <div className="movie-card">
        <div className="aa">
          <img
            className="single-img"
            src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
            alt={movie.original_title}
          />
          <h1 id="title">{movie.original_title}</h1>
          <div className="inf">
            <h5> Date: {movie.release_date}</h5>
            <h5>Vote average: {movie.vote_average}</h5>
            <h5>Vote count: {movie.vote_count}</h5>
          </div>
          <span id="overview">{movie.overview}</span>
          <div>
            {isFavourite ? (
              <Link to="/FavoriteMovies">
                <button>Go to fav</button>
              </Link>
            ) : (
              <Button onClick={() => toggleFavMovie(movie.id)}>
                Add to fav
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
