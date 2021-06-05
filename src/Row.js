import "./row.css";
import React, { useState, useEffect } from "react";
import axios from "./axios";

function Row({ title, fetchUrl, isLargeRow }) {
  const [movies, setMovies] = useState([]);
  const base_url = "https://image.tmdb.org/t/p/original";

  useEffect(() => {
    async function fetchData() {
      const request = await axios.get(fetchUrl);
      setMovies(request.data.results);
      return request;
    }
    fetchData();
  }, [fetchUrl]);
//   console.log(movies);
  return (
    <div className="row">
      <h1>{title}</h1>
      <div className="row_posters">
          {movies.map((movies) => 
          (
            //   check deadlinks & render
            ((isLargeRow && movies.poster_path) ||
            (!isLargeRow && movies.backdrop_path)) &&(
                <img
              className={`row_poster ${isLargeRow && "row_posterLarge"}`}
              key={movies.id}
              src={`${base_url}${
                isLargeRow ? movies.poster_path : 
                movies.backdrop_path
              }`}
              alt={movies.name}
            />
            )
          ))}
      </div>
    </div>
  );
}

export default Row;
