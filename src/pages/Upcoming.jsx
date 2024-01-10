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

const getUpcomingFilms = async () => {
  try{
    const response = await fetch(
      "https://api.themoviedb.org/3/movie/upcoming?language=en-US&page=1",
      options
    );
    const upcomingFilms = await response.json();
    return upcomingFilms.results;
  } catch (error) {
    console.error("Error: ", error);
    return [];
  }
};

const useUpcomingFilms = () => {
  const [upcomingFilms, setUpcomingFilms] = useState([]);
  useEffect(() => {
    getUpcomingFilms().then((movie) => {
      setUpcomingFilms(movie);
    });
  }, []);
  return { upcomingFilms };
};

function Upcoming() {
  const { upcomingFilms } = useUpcomingFilms();

  return (
    <div>
      <div className="appBar">
      <Link className="buttonColor" to="/HomePage">
          <button>HomePage</button>
        </Link>
        <Link className="buttonColor" to="/TopRated">
          <button>TopRated</button>
        </Link>
        
      
      <h1 className="pageTitle">Upcoming</h1>
      <Link className="buttonColor" to="/FavoriteMovies">
          
          <FavoriteIcon><button></button></FavoriteIcon>
        </Link>
      </div>

      <div>
        <Masonry
          columns={4}
          spacing={2}

        >
          {upcomingFilms.map((film) => {
            return <MovieCard key={film.id} {...film} />;
          })}
        </Masonry>
      </div>
    </div>
  );
}
export default Upcoming;
