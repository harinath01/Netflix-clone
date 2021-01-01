import React, { useState, useEffect } from "react";
import axios from "./axios.js";
import './row.css'
import YouTube from 'react-youtube'
import movieTrailer from 'movie-trailer'

const base_url = "https://image.tmdb.org/t/p/original";

function Row({ title, fetchUrl, isLargeRow }) {
  const [movies, setMovie] = useState([]);
  const [trailerUrl, setTrailerUrl] = useState("");
    const opts = {
      height: "390",
      width: "99%",
      playerVars: {
        autoplay: 0,
      },
    };
  useEffect(() => {
    async function fetchdata() {
      const request = await axios.get(fetchUrl);
      setMovie(request.data.results);
      return request;
    }
    fetchdata();
  }, [fetchUrl]);
  function handleClick(movie) { 
    if (trailerUrl) {
      setTrailerUrl('');
    } else { 
      movieTrailer(movie.name || "", {id:true})
        .then((id) => {
          setTrailerUrl(id)
        })
        .catch((error) => console.log(error));
    }
  }
  return (
    <div className='row'>
      <h2>{title}</h2>
      <div className={`row_posters`}>
        {movies.map((movie) => {
          return (
            <img
              className={`row_poster ${isLargeRow && "row_posterslarge"}`}
              key={movie.id}
              onClick={() => handleClick(movie)}
              src={`${base_url}${
                isLargeRow ? movie?.poster_path : movie?.backdrop_path
              }`}
              alt={movie?.title || movie?.name || movie?.original_name}
            />
          );
        })}
      </div>
      <div >
        {trailerUrl && <YouTube videoId={trailerUrl} opts={opts} />}
      </div>
    </div>
  );
}

export default Row;
