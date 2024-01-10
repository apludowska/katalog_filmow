import { Link, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Masonry from "@mui/lab/Masonry";
import MovieCard from "../components/MovieCard";
import FavoriteIcon from '@mui/icons-material/Favorite';
import "../css/MovieCard.css";


const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${import.meta.env.VITE_ACCESS_TOKEN}`,
  },
};

const getPopularFilms = async () => {
  try {
    const response = await fetch(
      "https://api.themoviedb.org/3/movie/popular?language=en-US&page=1",
      options
    );
    const popularFilms = await response.json();
    return popularFilms.results;
  } catch (error) {
    console.error("Error: ", error);
    return [];
  }
};



const usePopularFilms = () => {
  const [popularFilms, setPopularFilms] = useState([]);

  useEffect(() => {
    getPopularFilms().then((newFilm) => {
      setPopularFilms(newFilm);
    });
  }, []);

  return { popularFilms };
};



function HomePage() {
  const { popularFilms } = usePopularFilms();

  return (
    <div class="movie-container">
      <div className="appBar">
      <Link className="buttonColor" to="/TopRated">
          <button>TopRated</button>
        </Link>
        
        <Link className="buttonColor" to="/Upcoming">
          <button>Upcoming</button>
        </Link>
        
        <h1 className="pageTitle">HomePage</h1>
        <Link className="buttonColor" to="/FavoriteMovies">
          
          <FavoriteIcon><button></button></FavoriteIcon>
        </Link>
      </div>
      

      <div className="moviediv">
        <Masonry className="masnory" columns={4} spacing={2}>
          {popularFilms.map((film) => {
            return <MovieCard key={film.id} {...film} />;
          })}
        </Masonry>
      </div>
    </div>
  );
}
export default HomePage;
