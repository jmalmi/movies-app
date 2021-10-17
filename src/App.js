import React, { useState, useEffect } from 'react'
import axios from 'axios'
import './App.css';
import Modal from 'react-modal';
import YouTube from 'react-youtube';


function MovieListItem(props) {
  const [movie, setMovie] = useState([])
  const [modalIsOpen, setModalIsOpen] = useState(false);

  useEffect(() => {
    axios
      .get('https://api.themoviedb.org/3/movie/'+props.movie.id+'?api_key=d41a8c9251b4b04efb0b1c86474a150e&append_to_response=videos')
      .then(response => {
        setMovie(response.data)
        console.log(response.data)
      })
  }, []);

  let IMAGEPATH = 'http://image.tmdb.org/t/p/w500'
  let imageurl = IMAGEPATH + props.movie.poster_path;

  // get genres
  var genres = "";  
  if (movie !== undefined && movie.genres !== undefined) {
    for (var i=0;i<movie.genres.length;i++) {
      genres += movie.genres[i].name+" ";
    }
  }

  const videoPressed = (event) => {
    event.preventDefault();
    console.log("videoPressed", event);
    setModalIsOpen(true);
  }

  // get first youtube video
  var video = "";
  var videoLink ="";
  if (movie !== undefined && movie.videos !== undefined && movie.videos.results !== undefined) {
    video = <span id="v" style={{color:'blue', cursor:'pointer'}} onClick={(e) => videoPressed(e)}>{movie.videos.results[0].name}</span>
    videoLink = movie.videos.results[0].key
  }

  return(
    <div className="Movie">
      <img src={imageurl}/>
      <p className="MovieTitle">{props.movie.original_title} : {props.movie.release_date}</p>
      <p className="MovieText">{props.movie.overview}</p>
      <span className="GenresText">Genres: {genres}</span><br/>
      <span className="VideosText">Video: {video}</span>
      <Modal className="Modal" isOpen={modalIsOpen} >
        <YouTube videoId={videoLink}/> 
        <button onClick={() => setModalIsOpen(false)}>Close window</button>
      </Modal>
      <div>
    </div>

    </div>
  )
  }

  function MovieList(props) {
    const [movies, setMovies] = useState([]) 

    useEffect(() => {
      axios
        .get('https://api.themoviedb.org/3/movie/now_playing?api_key=d41a8c9251b4b04efb0b1c86474a150e&append_to_response=videos')
        .then(response => {
          setMovies(response.data.results)
        })
    }, [])


    if (movies.length === 0) {
      return(
        <div style={{flex: 1, padding: 20}}>
          <p>Loading, please wait...</p>
        </div>
      )
    } else {
        const movieItems = movies.map((movie,index) =>
          <MovieListItem key={index} movie={movie}/>
        );
    
      return(
        <div style={{flex: 1, padding: 20}}>
          {movieItems}
        </div>
      )
    }
  }

function App() {
  return ( 
    <div className="App">
      <h1 className="title">Now palying at the MovieDb</h1>
      <MovieList />
      <Modal />
    </div>
  );
}

export default App;