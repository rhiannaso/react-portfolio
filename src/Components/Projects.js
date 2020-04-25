import React, { Component } from 'react';
import Bank from '../Images/bank.png';
import Piano from '../Images/piano.png';
import Hangman from '../Images/hangman.png';

export class Projects extends Component {
  componentDidMount(){
    document.title = 'Past Projects';
  }

  render() {
    return (
      <div>
        <div className='content'>
          <div className='section'>
            <div>
              <img className='proj-image' src={Bank} alt='Bank Icon'/>
            </div>
            <div>
              <h2>ATM/Bank Teller Interface</h2>
              <p>
                This was a project that I worked on in CMPSC 174A, an
                introduction to databases course. We had to simulate
                the interface of an ATM and bank teller, while keeping
                the database updated with changes.
                <br/><br/>
                <a href='https://github.com/rhiannaso/Project' target='_blank' rel='noopener noreferrer'>View the GitHub repository here</a>
              </p>
            </div>
          </div>
          <hr/>
          <div className='section'>
            <div>
                <img className='proj-image' src={Piano} alt='Piano Icon'/>
            </div>
            <div>
              <h2>Moving Pianos: Greedy Algorithm</h2>
              <p>
                This was a project that I worked on in CMPSC 130B, the second
                part of the data structures and algorithms series. This 
                project was intended to help us practice devising greedy 
                algorithms.
                <br/><br/>
                <a href='https://github.com/rhiannaso/cs130b_pa1' target='_blank' rel='noopener noreferrer'>View the GitHub repository here</a>
              </p>
            </div>
          </div>
          <hr/>
          <div className='section'>
            <div>
                <img className='proj-image' src={Hangman} alt='Hangman Icon'/>
            </div>
            <div>
              <h2>Hangman Client and Server</h2>
              <p>
                This was a project that I worked on in CMPSC 176A, an
                introduction to networking course. This project helped
                us practice communicating between a client and a server 
                and passing packets back and forth.
                <br/><br/>
                <a href='https://github.com/rhiannaso/SoRhianna_HW5' target='_blank' rel='noopener noreferrer'>View the GitHub repository here</a>
              </p>
            </div>
          </div>
        </div>
        <button className='scrollButton' style={{display: this.props.display}} onClick={this.props.scrollToTop}>Scroll to Top</button>
      </div>
    );
  }
}
export default Projects;