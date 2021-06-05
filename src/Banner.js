import { React, useState, useEffect } from "react";
import "./banner.css";
import axios from "./axios"; //import local axios
import requests from "./Request";

function Banner() {
  // store movies
  const [movies, setmovies] = useState([]);

  useEffect(() => {
    async function fetchData() {
      // request method
      const request = await axios.get(requests.fetchNetflixOroginals);
    //   console.log(request.config);
      setmovies(
          request.data.results
        [
          Math.floor(Math.random() * request.data.results.length - 1)
        ]
      );
      return request;
      
    }
    
    fetchData();
  }, []);
  console.log(movies);

  //after 100 string/textdesc, this function adds ... else return string
  function truncate(string, n) {
    return string?.length > n ? string.substr(0, n - 1) + "..." : string;
  }

  return (
    <header
      className="banner"
      style={{
        backgroundImage: `url('https://image.tmdb.org/t/p/original/${movies?.backdrop_path}')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="banner_contains">
        <h1 className="banner_title">Movie Name</h1>
        <div className="banner_buttons">
          <button className="banner_button">Play</button>
          <button className="banner_button">My List</button>
        </div>
        <h1 className="banner_desc">
          {truncate(
            `this is testthis is test
              this is testthis is testthis is testthis is testthis is test
              this is testthis is testthis is testthis is testthis is testthis 
              is test this is testthis is testthis is testthis is testthis is test
              this is testthis is testthis is testthis is testthis is testthis 
              ithis is testthis is testthis is testthis is testthis is tests test
              this is testthis is testthis is testthis is testthis is testthis is test`,

            150
          )}
        </h1>
      </div>
      <div className="banner--fadeBottom" />
    </header>
  );
}

export default Banner;
