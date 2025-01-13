import './App.css';
import Movies from '../Movies/Movies';
import MovieDetails from '../MovieDetails/MovieDetails';
import { useState, useEffect } from 'react';
import homeButton from '../icons/home.png';
import searchIcon from '../icons/search.png';
import { Route, Routes } from 'react-router-dom';

function App() {
  const [movies, setMovies] = useState([]);
  const [individualMovieId, setIndividualMovieId] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    getMovies();
  }, []);

  const getMovies = () => {
    fetch('https://rancid-tomatillos-api-ce4a3879078e.herokuapp.com/api/v1/movies')
    .then(res => res.json())
    .then(data => {
      setMovies(data)
    })
    .catch(err => console.log(err))
  }

  const updateVotes = (id, direction) => {
    fetch(`https://rancid-tomatillos-api-ce4a3879078e.herokuapp.com/api/v1/movies/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ vote_direction: direction })
    })
    .then(res => res.json())
    .then(data => {
      let updatedMovies = [...movies].map(movie => {
        if (movie.id === id) {
          movie.vote_count = data.vote_count
        }
        return movie
      })
      setMovies(updatedMovies)
    })
    .catch(err => console.log(err))
  }

  const viewMovie = (id) => {
    setIndividualMovieId(id)
  }

  const goHome = () => {
    setIndividualMovieId(null);
  }

  const searchMovies = () => {
    let filteredMovies = movies.filter(movie => movie.title.toLowerCase().includes(searchQuery.toLowerCase()))

    if (!filteredMovies.length) {
      return <p className='no-movies-message'>No movies found that match your search.</p>
    } else {
      return <Movies movies={filteredMovies} updateVotes={updateVotes} viewMovie={viewMovie} />
    }
  }

  return (
    <main className='App'>
      {individualMovieId
      ? <>
        <header>
          <h1>rancid tomatillos</h1>
          <img onClick={goHome} src={homeButton}/>
        </header>
        <MovieDetails id={individualMovieId}/> 
      </>
      : <>
        <header>
          <h1>rancid tomatillos</h1>
          <form className='search'>
            <img src={searchIcon}/>
            <input 
              type='text'
              name='search'
              value={searchQuery}
              onChange={event => setSearchQuery(event.target.value)}
            />
          </form>
        </header>
        { searchQuery 
        ? <>{searchMovies()}</>
        : <Movies movies={movies} updateVotes={updateVotes} viewMovie={viewMovie} />
        }
      </>
      }
      
    </main>
  );
}

export default App;
