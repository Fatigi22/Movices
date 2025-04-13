import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

function FilmDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [film, setFilm] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const apiKey = "3d820eab8fd533d2fd7e1514e86292ea";

  useEffect(() => {
    const fetchFilmDetails = async () => {
      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/movie/${id}?api_key=${apiKey}&language=en-US`
        );
        setFilm(response.data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchFilmDetails();
  }, [id]);

  if (loading) return <div className="text-center py-20">Loading...</div>;
  if (error) return <div className="text-center py-20">Error: {error}</div>;
  if (!film) return <div className="text-center py-20">Film not found</div>;

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <button
        onClick={() => navigate(-1)}
        className="mb-6 flex items-center text-blue-600 hover:text-blue-800"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5 mr-2"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z"
            clipRule="evenodd"
          />
        </svg>
        Back to Movies
      </button>

      <div className="bg-white rounded-lg shadow-xl overflow-hidden">
        <div className="md:flex">
          <div className="md:w-1/3">
            <img
              className="w-full h-full object-cover"
              src={
                film.backdrop_path
                  ? `https://image.tmdb.org/t/p/original${film.backdrop_path}`
                  : "https://via.placeholder.com/1280x720?text=No+Backdrop"
              }
              alt={film.title}
            />
          </div>
          
          <div className="md:w-2/3 p-8">
            <h1 className="text-3xl font-bold mb-2">{film.title}</h1>
            <div className="flex items-center mb-6">
              <span className="bg-blue-500 text-white px-3 py-1 rounded-full text-sm mr-3">
                {film.release_date.split("-")[0]}
              </span>
              <span className="bg-orange-500 text-white px-3 py-1 rounded-full text-sm">
                {film.vote_average.toFixed(1)}/10
              </span>
            </div>

            <div className="mb-6">
              <h2 className="text-xl font-semibold mb-2">Overview</h2>
              <p className="text-gray-700">{film.overview}</p>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-8">
              <div>
                <h3 className="font-semibold text-gray-600">Runtime</h3>
                <p>{film.runtime} minutes</p>
              </div>
              <div>
                <h3 className="font-semibold text-gray-600">Genre</h3>
                <p>{film.genres.map(g => g.name).join(", ")}</p>
              </div>
              <div>
                <h3 className="font-semibold text-gray-600">Status</h3>
                <p>{film.status}</p>
              </div>
              <div>
                <h3 className="font-semibold text-gray-600">Budget</h3>
                <p>${film.budget.toLocaleString()}</p>
              </div>
            </div>

            <div className="flex space-x-4">
              <button className="bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-6 rounded-lg transition-colors">
                Watch Now
              </button>
              <a
                href={`https://www.themoviedb.org/movie/${film.id}`}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg transition-colors"
              >
                View on TMDB
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FilmDetail;