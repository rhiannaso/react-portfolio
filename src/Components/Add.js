import React, { Component } from 'react';
import config from '../config.js';
const axios = require('axios');
const firebase = require('firebase')

export class Add extends Component {
  constructor(props) {
    super();
    this.state = {
      movId: '',
      src: '',
      title: '',
      director: '',
      imdb: '',
      plot: '',
      //movies: [],
      //shouldUpdate: false,
    }
  }

  componentDidMount(){
    document.title = 'Add a Movie';
    if (!firebase.apps.length) {
      firebase.initializeApp(config);
    }
  }

  myFormHandler = (event) => {
    event.preventDefault();
    let req = 'https://www.omdbapi.com/?apikey=8ac22864&i='+this.state.movId;
    this.getMovieName(this, req);
  }

  inputHandler = (event) => {
    let field = event.target.name;
    let value = event.target.value;
    this.setState({[field]: value});
  }

  updateDb(obj) {
    let formObj = {
      name: obj.state.title,
      src: obj.state.src,
      director: obj.state.director,
      imdb: obj.state.imdb,
      plot: obj.state.plot,
    };
    let ref = firebase.database().ref('movies');
    ref.once('value').then(function(snapshot) {
      let movExists = snapshot.child(obj.state.movId).exists();
      if(movExists) {
        alert('Movie has already been added.');
      } else {
        ref.child(obj.state.movId).set(formObj);
        alert('Movie successfully added!');
      }
    });
  }

  getMovieName(obj, req) {
    axios.get(req)
    .then(function (response) {
      // handle success
      obj.setState({
        src: response.data.Poster,
        title: response.data.Title,
        director: response.data.Director,
        imdb: response.data.imdbRating,
        plot: response.data.Plot,
      });
      //console.log(response.data);
    })
    .then(function () {
      obj.updateDb(obj);
    })
    .catch(function (error) {
      // handle error
      console.log(error);
    })
  }

  render() {
    return(
      <div id='add-box'>
        <form onSubmit={this.myFormHandler}>
          <h2>Add a New Movie</h2>
          <p>Please enter the IMDb movie ID for your desired movie:</p>
          <input name='movId' type='text' size='50' required onChange={this.inputHandler}></input><br/><br/>
          <input type='submit' id='submit' name='submit' value='Add Movie'></input>
        </form>
      </div>      
    );
  }
}
export default Add;