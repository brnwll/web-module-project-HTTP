import React, { useEffect, useState } from "react";

import { Route, Routes, Navigate, useNavigate } from "react-router-dom";
import MovieList from "./components/MovieList";
import Movie from "./components/Movie";
import MovieHeader from "./components/MovieHeader";
import EditMovieForm from "./components/EditMovieForm";
import FavoriteMovieList from "./components/FavoriteMovieList";

import axios from "axios";

const App = (props) => {
  const [movies, setMovies] = useState([]);
  const [favoriteMovies, setFavoriteMovies] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:9000/api/movies")
      .then((res) => {
        setMovies(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const deleteMovie = (id) => {
    // Make a DELETE request using Axios
    // On success update the movies list in state
    // and navigate the user to /movies
    // Hand this function down to the correct component
    axios.delete(`http://localhost:9000/api/movies/${id}`).then((res) => {
      setMovies(res.data);
      navigate("/movies");
    });
  };

  const addToFavorites = (movie) => {
    // Stretch goal, see the README
  };

  return (
    <div>
      <nav className="navbar navbar-dark bg-dark">
        <span className="navbar-brand"> HTTP / CRUD Module Project</span>
      </nav>

      <div className="container">
        <MovieHeader />
        <div className="row ">
          <FavoriteMovieList favoriteMovies={favoriteMovies} />

          <Routes>
            <Route
              path="movies/edit/:id"
              element={<EditMovieForm setMovies={setMovies} />}
            />

            <Route
              path="movies/:id"
              element={
                <Movie
                  addToFavorites={addToFavorites}
                  deleteMovie={deleteMovie}
                />
              }
            />

            <Route path="movies" element={<MovieList movies={movies} />} />

            <Route path="/" element={<Navigate to="/movies" />} />

            <Route
              path="/movies/add"
              element={<EditMovieForm setMovies={setMovies} />}
            />
          </Routes>
        </div>
      </div>
    </div>
  );
};

export default App;
