import React, { useState, useEffect } from "react";
import axios from "../axios";
import "./Row.css";
import Youtube from "react-youtube";

const baseImgUrl = "https://image.tmdb.org/t/p/original";

function Row({ title, fetchUrl, isLargeRow }) {
  const [movies, setMovies] = useState([]);
  const [trailerUrl, setTrailerUrl] = useState("");

  // Options for react-youtube
  const opts = {
    height: "390",
    width: "100%",
    playerVars: {
      autoplay: 1,
    },
  };

  useEffect(() => {
    async function fetchData() {
      const request = await axios.get(fetchUrl);
      setMovies(request.data.results);
      return request;
    }
    fetchData();
  }, [fetchUrl]);

  const handleClick = async (movie) => {
    if (trailerUrl) {
      setTrailerUrl("");
    } else {
      let trailerurl = await axios.get(
        `/movie/${movie.id}/videos?api_key=28d54bc4af348f69ee1aba78c7c4dfff`
      );
      setTrailerUrl(trailerurl.data.results[0]?.key);
    }
  };
  const handleunClick = (movie) => {
    if (trailerUrl) {
      setTrailerUrl("");
    }
  }
  return (
    <div className="row">
      <h2>{title}</h2>

      <div className="row_posters">
        {movies.map(
          (movie) =>
            (movie.poster_path !== null && (
              <img
                className={`row_poster ${isLargeRow && "row_posterLarge"}`}
                src={`${baseImgUrl}${
                  isLargeRow ? movie.poster_path : movie.poster_path
                }`}
                alt={movie.name}
                key={movie.id}
                onMouseOver={() => handleClick(movie)}
                onMouseOut={() => handleunClick(movie)}
              />
            ))
        )}
      </div>
      {trailerUrl && <Youtube className='row_poster_vid' videoId={trailerUrl} opts={opts} />}
    </div>
  );
}

export default Row;
