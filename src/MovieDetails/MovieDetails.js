import './MovieDetails.css';
import { useState, useEffect } from 'react';

function MovieDetails({ id }) {
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    fetch(`https://rancid-tomatillos-api-ce4a3879078e.herokuapp.com/api/v1/movies/${id}`)
      .then(res => res.json())
      .then(data => {
        setMovie(data);
      })
      .catch(err => console.log(err))
  }, []);


  const getGenres = () => {
    return movie.genre_ids.map(genre => <p className='genre' >{genre}</p>)
  }

  return (
    <>
    {movie ? 
      <section className='MovieDetails'>
        <img className='backdrop' src={movie.backdrop_path}/>
        <div className='movie-details'>
          <h2>{movie.title}</h2>
          <div>{getGenres()}</div>
          <p className='overview'>{movie.overview}</p>
        </div>
      </section>
      : <p>loading...</p>
    }
  </>
  )
}

export default MovieDetails;