import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import MovieSearch from "./pages/MovieSearch/MovieSearch"
import FavoriteMovies from "./pages/FavoriteMovies";
import MovieDetail from "./pages/MovieDetail";
import NonExisting from "./pages/NonExisting";
import {AllRoutes} from "./consts/AllRoutes";

function App() {
  return (
      <Router>
        <Routes>
          <Route path="/" element={<MovieSearch/>}/>
          <Route path={AllRoutes.MovieSearch} element={<MovieSearch/>}/>
          <Route path={AllRoutes.FavoriteMovies} element={<FavoriteMovies/>}/>
          <Route path={`${AllRoutes.MovieDetail}/:movieID`} element={<MovieDetail/>}/>
          <Route path="*" element={<NonExisting/>}/>
        </Routes>
      </Router>
  );
}

export default App;
