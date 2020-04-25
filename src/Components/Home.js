import React, { Component } from 'react';
import Portrait from '../Images/image.jpg';
import School from '../Images/ucsb.jpg';

export class Home extends Component {
  componentDidMount(){
    document.title = 'Rhianna So\'s Portfolio';
  }

  render() {
    return (
      <div>
        <div className='content'>
          <div className='section'>
            <div className='s1-image'>
              <img src={Portrait} alt='Me in San Francisco'/>
            </div>
            <div>
              <h2>About Me</h2>
              <hr/>
              <p>
                Hi, I'm Rhianna! I am a third-year computer science major at 
                UCSB, originally from sunny Los Angeles. I have always been very
                interested in human-computer interaction, especially regarding
                UI and UX, so I am so excited to get to take CS 185 this quarter.
                When I'm not in the lab coding up projects, I like to bake and 
                write in my free time. Just during this quarter, I've made
                cream puffs, biscuits, cookies, and coffee cake!
              </p>
            </div>
          </div>
          <div className='section'>
            <div>
              <h2>Background at UCSB</h2>
              <hr/>
              <p>
                I came into UCSB as a computer science major, so I've taken all
                the lower-division computer science courses required of the major.
                I've also taken a handful of upper-division CS courses during my
                time here. Some of the upper division classes that I took last 
                quarter are:
                <br/>
                <ul>
                  <li>CS 130B</li>
                  <li>CS 154</li>
                  <li>CS 178</li>
                </ul>
              </p>
            </div>
            <div className='s2-image'>
              <img src={School} alt='UCSB'/>
            </div>
          </div>
        </div>
        <button className='scrollButton' style={{display: this.props.display}} onClick={this.props.scrollToTop}>Scroll to Top</button>
      </div>
    );
  }
}
export default Home;