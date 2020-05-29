import React, { Component } from 'react';
import config from '../config.js';
const firebase = require('firebase')

export class List extends Component {
  constructor(props) {
    super();
    this.state = {
      listName: '',
    }
  }

  componentDidMount(){
    document.title = 'Create a Movie List';
    if (!firebase.apps.length) {
      firebase.initializeApp(config);
    }
  }

  myFormHandler = (event) => {
    event.preventDefault();
    let formObj = {
      name: this.state.listName, 
    };
    firebase.database().ref('lists').push().set(formObj);
    //this.setState({shouldUpdate: true});
    alert("List successfully created!");
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
          <h2>Create a New Movie List</h2>
          <p>Please enter a title for the new movie list:</p>
          <input name='listName' type='text' size='50' required onChange={this.myChangeHandler}></input><br/><br/>
          <input type='submit' id='submit' name='submit' value='Create List'></input>
        </form>
      </div>       
    );
  }
}
export default List;