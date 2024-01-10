import { Link, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import MovieCard from "../components/MovieCard";
import Masonry from "@mui/lab/Masonry";
import "../css/MovieCard.css";
import FavoriteIcon from '@mui/icons-material/Favorite';

const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${import.meta.env.VITE_ACCESS_TOKEN}`,
  },
};

const getTopRatedFilms = async () => {
  try {
    const response = await fetch(
      "https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1",
      options
    );
    const TopRatedFilm = await response.json();
    return TopRatedFilm.results;
  } catch (error) {
    console.error("Error: ", error);
    return [];
  }
};

const useTopRatedFilms = () => {
  const [TopRatedFilms, setTopRatedFilms] = useState([]);

  useEffect(() => {
    getTopRatedFilms().then((newFilm) => {
      setTopRatedFilms(newFilm);
    });
  }, []);
  return { TopRatedFilms };
};

function TopRated() {
  const { TopRatedFilms } = useTopRatedFilms();

  return (
    <div className="moviesCon">
      <div className="appBar">
        <Link className="buttonColor" to="/HomePage">
          <button>HomePage</button>
        </Link>

        <Link className="buttonColor" to="/Upcoming">
          <button>Upcoming</button>
        </Link>
        

        <h1 className="pageTitle">TopRated</h1>
        <Link className="buttonColor" to="/FavoriteMovies">
          
          <FavoriteIcon><button></button></FavoriteIcon>
        </Link>
      </div>

      <div className="moviediv">
        <Masonry columns={4} spacing={2}>
          {TopRatedFilms.map((film) => {
            return <MovieCard key={film.id} {...film} />;
          })}
        </Masonry>
      </div>
    </div>
  );
}
export default TopRated;
