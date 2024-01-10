import { createBrowserRouter, RouterProvider } from "react-router-dom";


import First from "../pages/First";
import HomePage from "../pages/HomePage";
import Upcoming from "../pages/Upcoming";
import TopRated from "../pages/TopRated";
import Movie from "../pages/Movie"
import FavoriteMovies from "../pages/favMovies";

const router = createBrowserRouter([
  {
    path: "/",
    element: <First />,
  },
  {
    path: "/HomePage",
    element: <HomePage />,
  },
  {
    path: "/TopRated",
    element: <TopRated />,
  },
  {
    path: "/Upcoming",
    element: <Upcoming />,
  },
  {
    path: "/FavoriteMovies",
    element: <FavoriteMovies />,
  },
  {
    path: "/Movie/:movieId",
    element: <Movie />,
  },
 
]);

function Router() {
  return <RouterProvider router={router} />;
}

export default Router;
