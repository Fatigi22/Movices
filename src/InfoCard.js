import React, { useState, useEffect } from 'react';

const MovieFeatured = () => {
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page] = useState(1);
  const [genreURL] = useState(''); // You can set a specific genre if needed

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/discover/movie?api_key=3d820eab8fd533d2fd7e1514e86292ea&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${page}&with_genres=${genreURL}`
        );
        
        if (!response.ok) {
          throw new Error('Failed to fetch movie data');
        }
        
        const data = await response.json();
        // Get a random movie from the results
        const randomIndex = Math.floor(Math.random() * data.results.length);
        setMovie(data.results[randomIndex]);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchMovie();
  }, [page, genreURL]);

  if (loading) return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  if (error) return <div className="min-h-screen flex items-center justify-center">Error: {error}</div>;
  if (!movie) return <div className="min-h-screen flex items-center justify-center">No movie found</div>;

  return (
    <div className="min-h-screen flex flex-col p-8 sm:p-16 md:p-24 justify-center bg-white">
      <div data-theme="teal" className="mx-auto max-w-6xl">
        <h2 className="sr-only">Featured movie</h2>
        <section className="font-sans text-black">
          <div className="lg:flex lg:items-center fancy-corners fancy-corners--large fancy-corners--top-left fancy-corners--bottom-right">
            <div className="flex-shrink-0 self-stretch sm:flex-basis-40 md:flex-basis-50 xl:flex-basis-60">
              <div className="h-full">
                <article className="h-full">
                  <div className="h-full">
                    {movie.video ? (
                      <iframe
                        className="h-full w-full"
                        src={`https://www.youtube.com/embed/${movie.video.key}`}
                        title={movie.title}
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                      ></iframe>
                    ) : (
                      <img
                        className="h-full object-cover"
                        src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
                        alt={movie.title}
                      />
                    )}
                  </div>
                </article>
              </div>
            </div>
            <div className="p-6 bg-grey">
              <div className="leading-relaxed">
                <h2 className="leading-tight text-4xl font-bold">{movie.title}</h2>
                <p className="mt-4">{movie.overview}</p>
                <p className="mt-4">
                  <strong>Release Date:</strong> {movie.release_date}
                  <br />
                  <strong>Rating:</strong> {movie.vote_average}/10
                </p>
                <a
                  className="mt-4 inline-block px-6 py-2 bg-teal-500 text-white rounded hover:bg-teal-600 transition-colors"
                  href={`https://www.themoviedb.org/movie/${movie.id}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  View Details
                </a>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default MovieFeatured;