import './MoviePoster.css';
import upvote from '../icons/upvote.png';
import downvote from '../icons/downvote.png';

function MoviePoster({ movie, updateVotes, viewMovie }) {
  return (
    <section className='MoviePoster'>
      <img onClick={() => viewMovie(movie.id)} className='movie-poster' src={movie.poster_path}/>
      <div className='vote-box'>
        <button onClick={() => updateVotes(movie.id, 'up')}><img src={upvote}/></button>
        <p>{movie.vote_count}</p>
        <button onClick={() => updateVotes(movie.id, 'down')}><img src={downvote}/></button>
      </div>
    </section>
  );
}

export default MoviePoster;