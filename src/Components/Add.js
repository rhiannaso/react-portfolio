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
      movies: [],
      shouldUpdate: false,
    }
  }

  componentDidMount(){
    document.title = 'Add a Movie';
    if (!firebase.apps.length) {
      firebase.initializeApp(config);
    }
    let ref = firebase.database().ref('movies');
    ref.on('value', snapshot => {
      let movies = snapshot.val();
        let newData = [];
        for (let entry in movies) {
          newData.push({
            id: movies[entry].id,
          })
        }
        this.setState({movies: newData});
    })
  }

  componentDidUpdate(prevProps, prevState, snapshot){
    //only call set state here if it is wrapped in a condition
    //if you initialize this.state.shouldUpdate and have not changed it yet then this will not run
    if(this.state.shouldUpdate !== prevState.shouldUpdate){
      //same code as above to retrieve the data 
      let ref = firebase.database().ref('movies');
      ref.on('value', snapshot => {
        let movies = snapshot.val();
          let newData = [];
          for (let entry in movies) {
            newData.push({
              id: movies[entry].id,
            })
          }
          this.setState({movies: newData});
      })
    }
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
      let formObj = {
        //id: obj.state.movId, 
        name: obj.state.title,
        src: obj.state.src,
        director: obj.state.director,
        imdb: obj.state.imdb,
        plot: obj.state.plot,
      };
      // Prevent duplicates
      let ref = firebase.database().ref('movies');
      ref.once('value')
      .then(function(snapshot) {
        let movExists = snapshot.child(obj.state.movId).exists();
        if(movExists) {
          alert('Movie has already been added.');
        } else {
          firebase.database().ref('movies').child(obj.state.movId).set(formObj);
          //firebase.database().ref('movies/'+obj.state.movId).push().set(formObj);
          obj.setState({shouldUpdate: true});
          alert('Movie successfully added!');
        }
        
      });
    })
    .catch(function (error) {
      // handle error
      console.log(error);
    })
  }

  myFormHandler = (event) => {
    event.preventDefault();
    let req = 'https://www.omdbapi.com/?apikey=8ac22864&i='+this.state.movId;
    this.getMovieName(this, req);
  }

  myChangeHandler = (event) => {
    let field = event.target.name;
    let value = event.target.value;
    this.setState({[field]: value});
  }

  render() {
    return(
      <div id='add-box'>
        <form onSubmit={this.myFormHandler}>
          <h2>Add a New Movie</h2>
          <p>Please enter the IMDb movie ID for your desired movie:</p>
          <input name='movId' type='text' size='50' required onChange={this.myChangeHandler}></input><br/><br/>
          <input type='submit' id='submit' name='submit' value='Add Movie'></input>
        </form>
      </div>      
    );
  }
}
export default Add;