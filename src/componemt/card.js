import React, { useEffect, useState } from "react";
import axios from "axios";

function Card() {
  const [films, setFilms] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [selectedFilm, setSelectedFilm] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const apiKey = "3d820eab8fd533d2fd7e1514e86292ea";

  useEffect(() => {
    const fetchFilms = async () => {
      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${currentPage}`
        );
        setFilms(response.data.results);
        setTotalPages(response.data.total_pages > 500 ? 500 : response.data.total_pages);
      } catch (error) {
        console.error("Failed to fetch data:", error);
      }
    };

    fetchFilms();
  }, [currentPage]);

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  const handleCardClick = (film) => {
    setSelectedFilm(film);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="p-4 bg-gray-100 min-h-screen">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 items-center justify-center">
        {films.map((film) => (
          <div
            key={film.id}
            onClick={() => handleCardClick(film)}
            className="relative overflow-hidden rounded-lg shadow-lg group bg-sky-950 to-r from-orange-500 to-red-500 cursor-pointer hover:shadow-xl transition-shadow duration-300"
          >
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
                src={
                  film.poster_path
                    ? `https://image.tmdb.org/t/p/w500${film.poster_path}`
                    : "https://via.placeholder.com/500x750?text=No+Poster"
                }
                alt={film.title}
              />
            </div>

            <div className="relative text-white px-6 pb-6 mt-6">
              <span className="block opacity-75 -mb-1">Movie</span>
              <div className="flex justify-between">
                <span className="block font-semibold text-xl truncate">{film.title}</span>
                <span className="block bg-gray-900 rounded-full text-orange-500 text-xs font-bold px-3 py-2 leading-none flex items-center">
                  {film.vote_average.toFixed(1)}/10
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

          <button className="mx-1 px-3 py-2 bg-blue-500 text-white font-medium rounded-md">
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

      {/* Modal */}
      {isModalOpen && selectedFilm && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="relative">
              <button
                onClick={closeModal}
                className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 z-10"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-8 w-8"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>

              <div className="lg:flex">
                <div className="lg:w-1/3">
                  <img
                    className="w-full h-auto object-cover"
                    src={
                      selectedFilm.backdrop_path
                        ? `https://image.tmdb.org/t/p/original${selectedFilm.backdrop_path}`
                        : "https://via.placeholder.com/1280x720?text=No+Backdrop"
                    }
                    alt={selectedFilm.title}
                  />
                </div>

                <div className="lg:w-2/3 p-6">
                  <h2 className="text-3xl font-bold mb-2">{selectedFilm.title}</h2>
                  <div className="flex items-center mb-4">
                    <span className="bg-blue-500 text-white px-2 py-1 rounded mr-2">
                      {selectedFilm.release_date.split("-")[0]}
                    </span>
                    <span className="bg-orange-500 text-white px-2 py-1 rounded">
                      {selectedFilm.vote_average.toFixed(1)}/10
                    </span>
                  </div>

                  <h3 className="text-xl font-semibold mb-2">Overview</h3>
                  <p className="mb-4">{selectedFilm.overview || "No overview available."}</p>

                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div>
                      <h4 className="font-semibold">Original Language</h4>
                      <p>{selectedFilm.original_language.toUpperCase()}</p>
                    </div>
                    <div>
                      <h4 className="font-semibold">Popularity</h4>
                      <p>{selectedFilm.popularity.toFixed(0)}</p>
                    </div>
                  </div>

                  <a
                    href={`https://www.themoviedb.org/movie/${selectedFilm.id}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition-colors"
                  >
                   Watch film 
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Card;