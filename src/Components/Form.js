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
      data: [],
    }
  }

  componentDidMount(){
    document.title = 'Leave a Message';
    if (!firebase.apps.length) {
      firebase.initializeApp(config);
    }
    let ref = firebase.database().ref('data');
    ref.on('value', snapshot => {
      let data = snapshot.val();
        let newData = [];
        let months = ["Jan.", "Feb.", "Mar.", "Apr.", "May", "Jun.", "Jul.", "Aug.", "Sep.", "Oct.", "Nov.", "Dec."];
        for (let entry in data) {
          let d = new Date(data[entry].date);
          let date = months[d.getMonth()]+" "+d.getDate()+", "+d.getFullYear()+" ("+d.getHours()+":"+d.getMinutes()+":"+d.getSeconds()+")";
          newData.push({
            id: entry,
            name: data[entry].name,
            desc: data[entry].desc,
            msg: data[entry].msg,
            visibility: data[entry].visibility,
            email: data[entry].email,
            date: date,
          })
        }
        this.setState({data: newData});
    })
  }

  componentDidUpdate(prevProps, prevState, snapshot){
    //only call set state here if it is wrapped in a condition
    //if you initialize this.state.shouldUpdate and have not changed it yet then this will not run
    if(this.state.shouldUpdate !== prevState.shouldUpdate){
      //same code as above to retrieve the data 
      let ref = firebase.database().ref('data');
      ref.on('value', snapshot => {
        let data = snapshot.val();
        let newData = [];
        let months = ["Jan.", "Feb.", "Mar.", "Apr.", "May", "Jun.", "Jul.", "Aug.", "Sep.", "Oct.", "Nov.", "Dec."];
        for (let entry in data) {
          let d = new Date(data[entry].date);
          let date = months[d.getMonth()]+" "+d.getDate()+", "+d.getFullYear()+" ("+d.getHours()+":"+d.getMinutes()+":"+d.getSeconds()+")";
          newData.push({
            id: entry,
            name: data[entry].name,
            desc: data[entry].desc,
            msg: data[entry].msg,
            visibility: data[entry].visibility,
            email: data[entry].email,
            date: date,
          })
        }
        this.setState({data: newData});
      })
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
        name: this.state.name, 
        desc: this.state.desc,
        msg: this.state.msg,
        visibility: this.state.visibility,
        email: this.state.email,
        date: firebase.database.ServerValue.TIMESTAMP,
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

  render() {
    return (
      <div>
        <div className='content'>
          <div id='form-section'>
            <div className='form animate__animated animate__fadeInLeft'>
            <form onSubmit={this.myFormHandler}>
              <h2>Leave Me a Message</h2>
              <p><b>*</b> Enter your name:&nbsp;
              <input name='name' type='text' minLength='6' maxLength='19' required onChange={this.myChangeHandler} /></p>
              <p>Add a description about yourself:<br/>
              <input name='desc' type='text' size='50' maxLength='99' onChange={this.myChangeHandler}/>
              </p>
              <p><b>*</b> Leave your message:<br/>
                <textarea name='msg' minLength='16' maxLength='499' required onChange={this.myChangeHandler}></textarea>
              </p>
              <p><b>*</b> Would you like your name and message to be viewable by the other guests of this site?<br/>
                <select id='visibility' name='visibility' required onChange={this.myChangeHandler}>
                  <option value='private'>No</option>
                  <option value='public'>Yes</option>
                </select>
              </p>
              <p>Your email:
              <input name='email' type='text' size='30' onChange={this.myChangeHandler}/>
              </p>
              <div>
                <input type='submit' id='submit' name='submit' value='Submit Your Message'></input>
                <span className='note'><b>*</b>: indicates a required field</span>
              </div>
            </form>
            </div>
            <div className='responses animate__animated animate__fadeInRight'>
              <h2 id='resp'>Messages</h2>
              {this.state.data.map((entry) => {
                if(entry.visibility !== 'private') {
                  if(entry.desc !== '') {
                    return (
                      <div className='response animate__animated animate__pulse' id={entry.id}>
                        <div>
                          <span className='name'>{entry.name}</span>
                          <span className='date'>{entry.date}</span>
                        </div>
                        <i>{entry.desc}</i><br/>
                        <span className='message'>{entry.msg}</span><br/>
                      </div>
                    )
                  } else {
                    return (
                      <div className='response animate__animated animate__pulse' id={entry.id}>
                        <div>
                          <span className='name'>{entry.name}</span>
                          <span className='date'>{entry.date}</span>
                        </div>
                        <span className='message'>{entry.msg}</span><br/>
                      </div>
                    )
                  }
                }
              })}
            </div>
          </div>
        </div>
        <button className='scrollButton' style={{display: this.props.display}} onClick={this.props.scrollToTop}>Scroll to Top</button>
      </div>
    );
  }
}
export default Form;