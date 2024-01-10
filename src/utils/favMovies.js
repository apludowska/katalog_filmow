import { useState } from "react";
import { useEffect } from "react";

const FAV_MOVIE_KEY = "@movies/fav-movies";

export const getFavMovies = async () => {
  return JSON.parse(localStorage.getItem(FAV_MOVIE_KEY)) ?? [];
};

export const setFavMovies = async (movies) => {
  localStorage.setItem(FAV_MOVIE_KEY, JSON.stringify(movies));
};

export const useFavMovies = () => {
  const [favouriteMovies, setFavouriteMovies] = useState([]);

  useEffect(() => {
    getFavMovies().then(setFavouriteMovies);
  }, []);

  useEffect(() => {
    setFavMovies(favouriteMovies);
  }, [favouriteMovies]);

  const toggleFavMovie = async (movieId) => {
    if (favouriteMovies.includes(movieId)) {
      const filteredMovies = favouriteMovies.filter(
        (favMovieId) => favMovieId !== movieId
      );
      setFavouriteMovies(filteredMovies);
    } else {
      const updatedMovies = [...favouriteMovies, movieId,];
      setFavouriteMovies(updatedMovies);
    }
  };

  return {
    favouriteMovies,
    toggleFavMovie,
    
  };
};
