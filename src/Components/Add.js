import React, { Component } from 'react';
import config from '../config.js';
const firebase = require('firebase')

export class Add extends Component {
  constructor(props) {
    super();
    this.state = {
      movId: '',
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

  myFormHandler = (event) => {
    event.preventDefault();
    let formObj = {
      id: this.state.movId, 
    };
    firebase.database().ref('movies').push().set(formObj);
    this.setState({shouldUpdate: true});
    alert("Movie successfully added!");
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