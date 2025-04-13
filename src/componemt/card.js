import React, { useEffect, useState } from "react";
import axios from "axios";

function Card() {
  const [films, setFilms] = useState([]); // State to store fetched films
  const [currentPage, setCurrentPage] = useState(1); // State to track current page
  const [totalPages, setTotalPages] = useState(1); // State to track total pages
  const apiKey = "3d820eab8fd533d2fd7e1514e86292ea";

  useEffect(() => {
    const fetchFilms = async () => {
      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${currentPage}`
        );
        setFilms(response.data.results); // Store the results in state
        setTotalPages(response.data.total_pages > 500 ? 500 : response.data.total_pages); // API limits to 500 pages
      } catch (error) {
        console.error("Failed to fetch data:", error);
      }
    };

    fetchFilms();
  }, [currentPage]); // Effect runs when currentPage changes

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  return (
    <div className="p-4 bg-gray-100 min-h-screen">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 items-center justify-center">
        {films.map((film) => (
          <div
            key={film.id}
            className="relative overflow-hidden rounded-lg shadow-lg group bg-sky-950 to-r from-orange-500 to-red-500"
          >
            {/* Background SVG */}
            <svg
              className="absolute bottom-0 left-0 mb-8 scale-150 group-hover:scale-[1.65] transition-transform"
              viewBox="0 0 375 283"
              fill="none"
              style={{ opacity: "0.1" }}
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

            {/* Card Content */}
            <div className="relative pt-10 px-10 flex items-center justify-center group-hover:scale-110 transition-transform">
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
                <span className="block bg-gray-900 rounded-full text-orange-500 text-xs font-bold px-3 py-2 leading-none flex items-center">
                  {film.vote_average}/10
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="mt-8 flex justify-center">
        <div className="flex">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className={`mx-1 px-3 py-2 font-medium rounded-md ${
              currentPage === 1
                ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                : "bg-gray-200 text-gray-700 hover:bg-blue-500 hover:text-white"
            }`}
          >
            Previous
          </button>

          {currentPage > 1 && (
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              className="mx-1 px-3 py-2 bg-gray-200 text-gray-700 font-medium hover:bg-blue-500 hover:text-white rounded-md"
            >
              {currentPage - 1}
            </button>
          )}

          <button
            className="mx-1 px-3 py-2 bg-blue-500 text-white font-medium rounded-md"
          >
            {currentPage}
          </button>

          {currentPage < totalPages && (
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              className="mx-1 px-3 py-2 bg-gray-200 text-gray-700 font-medium hover:bg-blue-500 hover:text-white rounded-md"
            >
              {currentPage + 1}
            </button>
          )}

          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className={`mx-1 px-3 py-2 font-medium rounded-md ${
              currentPage === totalPages
                ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                : "bg-gray-200 text-gray-700 hover:bg-blue-500 hover:text-white"
            }`}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}

export default Card;