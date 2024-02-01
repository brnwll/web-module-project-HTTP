import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

import axios from "axios";

// Add and edit functionality are combined here.
// If this we more than a simple learning project,
// we would likely want to separate these into two
// separate components that both utilize a MovieForm component

const EditMovieForm = (props) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { setMovies } = props;
  const [movie, setMovie] = useState({
    title: "",
    director: "",
    genre: "",
    metascore: 0,
    description: "",
  });

  const handleChange = (e) => {
    setMovie({
      ...movie,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (id === undefined) {
      addMovie();
    } else {
      editMovie();
    }
  };

  const addMovie = () => {
    axios
      .post("http://localhost:9000/api/movies", movie)
      .then((res) => {
        setMovies(res.data);
        navigate("/movies");
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const editMovie = () => {
    axios
      .put(`http://localhost:9000/api/movies/${id}`, movie)
      .then((res) => {
        setMovies(res.data);
        navigate(`/movies/${id}`);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const cancelUrl = () => (id === undefined ? "/movies" : `/movies/${id}`);

  useEffect(() => {
    if (id === undefined) return;
    axios
      .get(`http://localhost:9000/api/movies/${id}`)
      .then((res) => {
        setMovie(res.data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  const { title, director, genre, metascore, description } = movie;

  return (
    <div className="col">
      <div className="modal-content">
        <form onSubmit={handleSubmit}>
          <div className="modal-header">
            <h4 className="modal-title">
              Editing <strong>{movie.title}</strong>
            </h4>
          </div>
          <div className="modal-body">
            <div className="form-group">
              <label>Title</label>
              <input
                value={title}
                onChange={handleChange}
                name="title"
                type="text"
                className="form-control"
              />
            </div>
            <div className="form-group">
              <label>Director</label>
              <input
                value={director}
                onChange={handleChange}
                name="director"
                type="text"
                className="form-control"
              />
            </div>
            <div className="form-group">
              <label>Genre</label>
              <input
                value={genre}
                onChange={handleChange}
                name="genre"
                type="text"
                className="form-control"
              />
            </div>
            <div className="form-group">
              <label>Metascore</label>
              <input
                value={metascore}
                onChange={handleChange}
                name="metascore"
                type="number"
                className="form-control"
              />
            </div>
            <div className="form-group">
              <label>Description</label>
              <textarea
                value={description}
                onChange={handleChange}
                name="description"
                className="form-control"
              ></textarea>
            </div>
          </div>
          <div className="modal-footer">
            <input type="submit" className="btn btn-info" value="Save" />
            <Link to={cancelUrl()}>
              <input type="button" className="btn btn-default" value="Cancel" />
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditMovieForm;
