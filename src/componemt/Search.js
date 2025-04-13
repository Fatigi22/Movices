import React, { useState, useEffect } from 'react';
import axios from 'axios';

function MovieSearch() {
  const [keyword, setKeyword] = useState('');
  const [results, setResults] = useState([]);
  const [filteredResults, setFilteredResults] = useState([]);
  const [page, setPage] = useState(1);
  const [genreURL, setGenreURL] = useState('');
  const [selectedGenre, setSelectedGenre] = useState('All');
  const [backgroundImage, setBackgroundImage] = useState('');
  const apiKey = '3d820eab8fd533d2fd7e1514e86292ea';

  // List of genres (you can fetch this from API if needed)
  const genres = [
    { id: '', name: 'All' },
    { id: '28', name: 'Action' },
    { id: '12', name: 'Adventure' },
    { id: '16', name: 'Animation' },
    { id: '35', name: 'Comedy' },
    { id: '18', name: 'Drama' },
    { id: '27', name: 'Horror' },
    { id: '10749', name: 'Romance' },
    { id: '878', name: 'Sci-Fi' },
  ];

  // Fetch popular movies and set random background
  useEffect(() => {
    const fetchPopularMovies = async () => {
      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&page=1`
        );
        setResults(response.data.results);
        setFilteredResults(response.data.results);
        
        // Set random background from popular movies
        const randomMovie = response.data.results[
          Math.floor(Math.random() * response.data.results.length)
        ];
        if (randomMovie.backdrop_path) {
          setBackgroundImage(
            `https://image.tmdb.org/t/p/original${randomMovie.backdrop_path}`
          );
        }
      } catch (error) {
        console.error("Error fetching popular movies:", error);
      }
    };

    fetchPopularMovies();
  }, []);

  // Filter results based on keyword and genre
  useEffect(() => {
    let filtered = results;
    
    if (keyword) {
      filtered = filtered.filter(movie =>
        movie.title.toLowerCase().includes(keyword.toLowerCase())
      );
    }
    
    if (genreURL) {
      filtered = filtered.filter(movie =>
        movie.genre_ids.includes(Number(genreURL))
      );
    }
    
    setFilteredResults(filtered);
  }, [keyword, genreURL, results]);

  const handleSearch = async () => {
    try {
      const url = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${keyword}&page=${page}`;
      const response = await axios.get(url);
      setResults(response.data.results);
      setFilteredResults(response.data.results);
    } catch (error) {
      console.error("Error searching movies:", error);
    }
  };

  const handleGenreChange = (genreId) => {
    setGenreURL(genreId);
    setSelectedGenre(genres.find(g => g.id === genreId)?.name || 'All');
  };

  return (
    <div
      style={{
        background: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${backgroundImage || 'https://images.unsplash.com/photo-1684487747385-442d674962f2'}) no-repeat center`,
        backgroundSize: "cover",
        minHeight: "100vh",
        transition: "background-image 0.5s ease"
      }}
      className="py-20 px-1 md:px-8 text-center relative text-white"
    >
      <h1 className="pb-4 text-2xl md:text-3xl font-bold">Discover Movies</h1>
      
      <div className="w-11/12 md:w-3/4 lg:max-w-3xl mx-auto mb-8">
        {/* Genre Filter */}
        <div className="flex flex-wrap justify-center gap-2 mb-4">
          {genres.map((genre) => (
            <button
              key={genre.id}
              onClick={() => handleGenreChange(genre.id)}
              className={`px-4 py-2 rounded-full text-sm font-medium ${
                genreURL === genre.id
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
              }`}
            >
              {genre.name}
            </button>
          ))}
        </div>

        {/* Search Input */}
        <div className="relative z-30 text-base text-black">
          <input
            type="text"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            placeholder="Search for movies..."
            className="mt-2 shadow-md focus:outline-none rounded-2xl py-3 px-6 block w-full"
            onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
          />
          <button
            onClick={handleSearch}
            className="mt-2 bg-blue-600 hover:bg-blue-700 text-white py-3 px-6 rounded-2xl w-full md:w-auto"
          >
            Search
          </button>
        </div>
      </div>

      {/* Results */}
      <div className="container mx-auto px-4">
        {filteredResults.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredResults.map((movie) => (
              <div 
                key={movie.id} 
                className="bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300"
                onClick={() => {
                  if (movie.backdrop_path) {
                    setBackgroundImage(`https://image.tmdb.org/t/p/original${movie.backdrop_path}`);
                  }
                }}
              >
                <img
                  src={
                    movie.poster_path
                      ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                      : 'https://via.placeholder.com/500x750?text=No+Poster'
                  }
                  alt={movie.title}
                  className="w-full h-64 object-cover"
                />
                <div className="p-4">
                  <h3 className="font-bold text-lg mb-1">{movie.title}</h3>
                  <p className="text-gray-600 text-sm">
                    {movie.release_date?.split('-')[0]} | ⭐ {movie.vote_average?.toFixed(1)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-white text-xl py-10">
            No movies found. Try a different search or genre.
          </div>
        )}
      </div>
    </div>
  );
}

export default MovieSearch;