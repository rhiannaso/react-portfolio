import React, { Component } from 'react';
import config from '../config.js';
const firebase = require('firebase')

export class Form extends Component {
  constructor(props) {
    super();
    this.state = {
      name: '',
      desc: '',
      msg: '',
      visibility: 'private',
      email: '',
      shouldUpdate: false,
      begin: 1,
      data: {},
    }
  }

  componentDidMount(){
    document.title = 'Leave a Message';
    if (!firebase.apps.length) {
      firebase.initializeApp(config);
    }
    let ref = firebase.database().ref('data');
    ref.on('value', snapshot => {
      const data = snapshot.val();        
      this.setState({data: data});
    })
    //this.handleData();
  }

  componentDidUpdate(prevProps, prevState, snapshot){
    //only call set state here if it is wrapped in a condition
    //if you initialize this.state.shouldUpdate and have not changed it yet then this will not run
    if(this.state.shouldUpdate !== prevState.shouldUpdate){
      //same code as above to retrieve the data 
      let ref = firebase.database().ref('data');
      ref.on('value', snapshot => {
        const data = snapshot.val();
        this.setState({data: data});
      })
      this.handleData();
      //this.setState({shouldUpdate: false});
    }
    if(this.state.begin === 1) {
      this.handleData();
      this.setState({begin: 0});
    }
  }

  myFormHandler = (event) => {
    event.preventDefault();
    if (this.state.name === '') {
      alert("Missing the following required field: name");
    } else if (this.state.msg === '') {
      alert("Missing the following required field: message");
    } else if (this.state.visibility === '') {
      alert("Missing the following required field: visibility");
    } else {
      let formObj = {
        0: this.state.name, 
        1: this.state.desc,
        2: this.state.msg,
        3: this.state.visibility,
        4: this.state.email,
      };
      firebase.database().ref('data').push().set(formObj);
      this.setState({shouldUpdate: true});
      alert("Message successfully delivered!");
    }
  }

  myChangeHandler = (event) => {
    let field = event.target.name;
    let value = event.target.value;
    this.setState({[field]: value});
  }

  handleData = () => {
    let responses = document.getElementById('resp');
    let outerArr = Object.values(this.state.data).filter(x => x !== '');
    let counter = 0;
    console.log(outerArr);
    let format = outerArr.map(function(val){
      let outputString = '';
      let arr = Object.values(val);
      if(arr[3] !== 'private') {
        arr = arr.filter(x => (x !== 'public' && x !== ''));
        outputString = arr.map(function(s){
          let temp = '';
          if(counter === 0) {
            temp += '<h3>From '+JSON.stringify(s).replace(/"/g, '')+':</h3>';
          } else {
            temp += JSON.stringify(s).replace(/"/g, '')+'<br/>';
          }
          counter++;
          return temp;
        })
      } 
      let finalOutput = '';
      for(var i in outputString) {
        finalOutput += outputString[i];
      }
      if(finalOutput !== '') {
        finalOutput = '<div class=\'response\'>'+finalOutput+'</div>';
      }
      counter = 0;
      return finalOutput;
    });
    format = format.filter(x => x !== '');
    for(var str in format) {
      responses.insertAdjacentHTML("afterend", format[str]);
    }
  }

  render() {
    return (
      <div>
        <div className='content'>
          <div id='form-section'>
            <div id='form'>
            <form onSubmit={this.myFormHandler}>
              <h2>Leave Me a Message</h2>
              <p>Enter your name:&nbsp;
              <input name='name' type='text' minLength='6' maxLength='19' required onChange={this.myChangeHandler} /></p>
              <p><i>(Optional)</i> Add a description about yourself:<br/>
              <input name='desc' type='text' size='50' maxLength='99' onChange={this.myChangeHandler}/>
              </p>
              <p>Leave your message:<br/>
                <textarea name='msg' minLength='16' maxLength='499' required onChange={this.myChangeHandler}></textarea>
              </p>
              <p>Select your message visibility:&nbsp;
                <select id='visibility' name='visibility' required onChange={this.myChangeHandler}>
                  <option value='private'>Visible to Site Owner Only</option>
                  <option value='public'>Visible to Anyone</option>
                </select>
              </p>
              <p><i>(Optional)</i> Your email:&nbsp;
              <input name='email' type='text' size='30' onChange={this.myChangeHandler}/>
              </p>
              <input type='submit' id='submit' name='submit' value='Submit Your Message'></input>
            </form>
            </div>
            <div id='responses'>
              <h2 id='resp'>Messages</h2>
            </div>
          </div>
        </div>
        <button className='scrollButton' style={{display: this.props.display}} onClick={this.props.scrollToTop}>Scroll to Top</button>
      </div>
    );
  }
}
export default Form;