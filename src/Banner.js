import React, { useState, useEffect } from "react";
import axios from "./axios";
import requests from "./requests";
import "./Banner.css";

function Banner() {
  const [movie, setMovie] = useState([]);
  useEffect(() => {
    async function fetchdata() {
      const request = await axios.get(requests.fetchNetflixOriginals);
      setMovie(
        request.data.results[
          Math.floor(Math.random() * request.data.results.length - 1)
        ],
      );

      return request;
    }
    fetchdata();
  }, []);
  console.log(movie);
  function truncate(str, n) {
    return str?.length > 150 ? str.substr(0, n - 1) + "..." : str;
  }
  return (
    <header
      className='banner'
      style={{
        backgroundImage: `url(
          "https://image.tmdb.org/t/p/original${movie.backdrop_path}")`,

        backgroundSize: "cover",
        backgroundPosition: "center center",
      }}>
      <div className='banner__contents'>
        <h1 className='banner_header'>
          {movie.name || movie.title || movie.orginal_name}
        </h1>
        <div className='banner_buttons'>
          <button className='banner_button'>play</button>
          <button className='banner_button'>my list</button>
        </div>
        <div className='banner-description'>{truncate(movie.overview, 150)}</div>
      </div>
      <div className='banner--fadebottom'></div>
    </header>
  );
}

export default Banner;
