import React, { useEffect, useState } from "react";
import axios from "axios";

function Card() {
  const [films, setFilms] = useState([]); // State to store fetched films
  const apiKey = "3d820eab8fd533d2fd7e1514e86292ea";

  useEffect(() => {
    const fetchFilms = async () => {
      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1`
        );
        setFilms(response.data.results); // Store the results in state
        console.log(response.data.results);
      } catch (error) {
        console.error("Failed to fetch data:", error);
      }
    };

    fetchFilms();
  }, []); // Effect runs only once when the component is mounted

  return (
    <div className="p-4 flex flex-wrap items-center justify-center">
      {films.map((film) => (
        <div
          key={film.id}
          className="flex-shrink-0 m-6 relative overflow-hidden bg-orange-500 rounded-lg max-w-xs shadow-lg"
        >
          <svg
            className="absolute bottom-0 left-0 mb-8"
            viewBox="0 0 375 283"
            fill="none"
            style={{ transform: "scale(1.5)", opacity: "0.1" }}
          >
            <rect
              x="159.52"
              y="175"
              width="152"
              height="152"
              rx="8"
              transform="rotate(-45 159.52 175)"
              fill="white"
            />
            <rect
              y="107.48"
              width="152"
              height="152"
              rx="8"
              transform="rotate(-45 0 107.48)"
              fill="white"
            />
          </svg>
          <div className="relative pt-10 px-10 flex items-center justify-center">
            <div
              className="block absolute w-48 h-48 bottom-0 left-0 -mb-24 ml-3"
              style={{
                background: "radial-gradient(black, transparent 60%)",
                transform: "rotate3d(0, 0, 1, 20deg) scale3d(1, 0.6, 1)",
                opacity: "0.2",
              }}
            ></div>
            <img
              className="relative w-40"
              src={`https://image.tmdb.org/t/p/w500${film.poster_path}`}
              alt={film.title}
            />
          </div>
          <div className="relative text-white px-6 pb-6 mt-6">
            <span className="block opacity-75 -mb-1">Movie</span>
            <div className="flex justify-between">
              <span className="block font-semibold text-xl">{film.title}</span>
              <span className="block bg-white rounded-full text-orange-500 text-xs font-bold px-3 py-2 leading-none flex items-center">
                {film.vote_average}/10
              </span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Card;