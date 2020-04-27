import React, { Component } from 'react';
import ProjGallery from './ProjGallery';
import Bank from '../Images/bank.png';
import Piano from '../Images/piano.png';
import Hangman from '../Images/hangman.png';

export class Projects extends Component {
  componentDidMount(){
    document.title = 'Past Projects';
  }

  render() {
    const projects = [
      {
        id: 1,
        src: Bank,
        alt: 'Bank Icon',
        title: 'ATM/Bank Teller Interface',
        desc: 'This was a project that I worked on in CMPSC 174A, an introduction to databases course. We had to simulate the interface of an ATM and bank teller, while keeping the database updated with changes.',
        link: 'https://github.com/rhiannaso/Project'
      },
      {
        id: 2,
        src: Piano,
        alt: 'Piano Icon',
        title: 'Moving Pianos: Greedy Algorithm',
        desc: 'This was a project that I worked on in CMPSC 130B, the second part of the data structures and algorithms series. This project was intended to help us practice devising greedy algorithms.',
        link: 'https://github.com/rhiannaso/cs130b_pa1'
      },
      {
        id: 3,
        src: Hangman,
        alt: 'Hangman Icon',
        title: 'Hangman Client and Server',
        desc: 'This was a project that I worked on in CMPSC 176A, an introduction to networking course. This project helped us practice communicating between a client and a server and passing packets back and forth.',
        link: 'https://github.com/rhiannaso/SoRhianna_HW5'
      }
    ]
    return (
      <div>
        <div className='content'>
          <ProjGallery projects={projects} />
        </div>
        <button className='scrollButton' style={{display: this.props.display}} onClick={this.props.scrollToTop}>Scroll to Top</button>
      </div>
    );
  }
}
export default Projects;