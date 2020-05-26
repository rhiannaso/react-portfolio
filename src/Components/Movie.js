import React, { Component } from 'react';
const axios = require('axios');

export class Movie extends Component {
  constructor()
  {
    super();
    this.state = {
      src: '',
      title: '',
      director: '',
      imdb: '',
      plot: '',
      shouldUpdate: false,
    }
  }

  dimPoster(e) {
    e.target.style.opacity = 0.7;
  }

  resetPoster(e) {
    e.target.style.opacity = 1;
  }

  componentDidMount(){
    let req = 'https://www.omdbapi.com/?apikey=8ac22864&i='+this.props.movie;
    this.getMovieInfo(this, req);
  }

  componentDidUpdate(prevProps, prevState, snapshot){
    if(this.state.shouldUpdate !== prevState.shouldUpdate){
      let req = 'https://www.omdbapi.com/?apikey=8ac22864&i='+this.props.movie;
      this.getMovieInfo(this, req);
    }
    if(this.props.movie !== prevProps.movie) {
      let req = 'https://www.omdbapi.com/?apikey=8ac22864&i='+this.props.movie;
      this.getMovieInfo(this, req);
    }
  }

  getMovieInfo(obj, req) {
    axios.get(req)
    .then(function (response) {
      // handle success
      //console.log(response);
      obj.setState({
        src: response.data.Poster,
        title: response.data.Title,
        director: response.data.Director,
        imdb: response.data.imdbRating,
        plot: response.data.Plot,
      });
      //console.log(response.data);
    })
    .catch(function (error) {
      // handle error
      console.log(error);
    })
  }

  render() {
    return(
      <div className='mov-child'>
        <img src={this.state.src} onMouseEnter={this.dimPoster} onMouseLeave={this.resetPoster} onClick={this.props.enlarge.bind(this, this.state.src, this.state.title, this.state.director, this.state.imdb, this.state.plot, this.props.movie)} alt={this.state.title}/>
      </div>      
    );
  }
}
export default Movie;