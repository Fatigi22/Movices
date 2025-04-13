import React, { useState } from 'react';
import axios from 'axios';

function MovieSearch() {
  const [keyword, setKeyword] = useState('');
  const [results, setResults] = useState([]);
  const [page, setPage] = useState(1);
  const [genreURL, setGenreURL] = useState(''); // Set this to the desired genre ID

  const handleSearch = async () => {
    const apiKey = '3d820eab8fd533d2fd7e1514e86292ea';
    const url = `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${page}&with_genres=${genreURL}`;

    try {
      const response = await axios.get(url);
      setResults(response.data.results);
    } catch (error) {
      console.error("There was an error fetching the movie data!", error);
    }
  };

  return (
    <div
      style={{
        background: "linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(https://images.unsplash.com/photo-1684487747385-442d674962f2) no-repeat center",
        backgroundSize: "cover",
      }}
      className="py-52 px-1 md:px-8 text-center relative text-white font-bold text-2xl md:text-3xl overflow-auto"
    >
      <h1 className="pb-4">Search for product</h1>
      <div className="w-11/12 md:w-3/4 lg:max-w-3xl m-auto">
        <div className="relative z-30 text-base text-black">
          <input
            type="text"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            placeholder="Keyword"
            className="mt-2 shadow-md focus:outline-none rounded-2xl py-3 px-6 block w-full"
          />
          <button
            onClick={handleSearch}
            className="mt-2 bg-blue-500 text-white py-2 px-4 rounded-2xl"
          >
            Search
          </button>
          <div className="text-left absolute top-10 rounded-t-none rounded-b-2xl shadow bg-white divide-y w-full max-h-40 overflow-auto">
            {results.map((movie) => (
              <div key={movie.id} className="p-2 hover:bg-gray-200">
                {movie.title}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default MovieSearch;