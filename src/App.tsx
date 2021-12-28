import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import MovieSearch from "./pages/MovieSearch"
import FavoriteMovies from "./pages/FavoriteMovies";
import MovieDetail from "./pages/MovieDetail";
import NonExisting from "./pages/NonExisting";

function App() {
  return (
      <Router>
        <Routes>
          <Route path="/" element={<MovieSearch/>}/>
          <Route path="search" element={<MovieSearch/>}/>
          <Route path="favorites" element={<FavoriteMovies/>}/>
          <Route path="movie/:movieID" element={<MovieDetail/>}/>
          <Route path="*" element={<NonExisting/>}/>
        </Routes>
      </Router>
  );
}

export default App;
