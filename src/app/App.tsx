import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import MovieSearch from "../pages/MovieSearch/MovieSearch"
import FavoriteMovies from "../pages/FavoriteMovies";
import MovieDetails from "../pages/MovieDetails/MovieDetails";
import NonExisting from "../pages/NonExisting";
import {AllRoutes} from "../consts/AllRoutes";

function App() {
  return (
      <Router>
        <Routes>
          <Route path="/" element={<MovieSearch/>}/>
          <Route path={AllRoutes.MovieSearch} element={<MovieSearch/>}/>
          <Route path={AllRoutes.FavoriteMovies} element={<FavoriteMovies/>}/>
          <Route path={`${AllRoutes.MovieDetails}/:movieID`} element={<MovieDetails/>}/>
          <Route path="*" element={<NonExisting/>}/>
        </Routes>
      </Router>
  );
}

export default App;
