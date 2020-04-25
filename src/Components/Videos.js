import React, { Component } from 'react';

export class Videos extends Component {
  componentDidMount(){
    document.title = 'Fun Videos';
  }

  render() {
    return (
      <div>
        <div className='content'>
          <div className='vid-container'>
            <div className='vid-child'>
              <iframe height='315' src='https://www.youtube.com/embed/E-6xk4W6N20' frameborder='0' gesture='media' allow='autoplay; encrypted-media' allowfullscreen title='Fan.tasia'></iframe>
              <div className='vid-caption'>
                I don't remember how I even found this video, but it's 
                so much fun to watch!
              </div>
            </div>
            <div className='vid-child'>
              <iframe height='315' src='https://www.youtube.com/embed/Rv9hn4IGofM' frameborder='0' allow='accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture' allowfullscreen title='Iguanas vs. Snakes'></iframe>
              <div className='vid-caption'>
                This video is probably one of the most entertaining
                clips from an animal documentary that I've ever seen.
              </div>
            </div>
            <div className='vid-child'>
              <iframe width='560' height='315' src='https://www.youtube.com/embed/rubpIfLPzvU' frameborder='0' allow='accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture' allowfullscreen title='The Middle'></iframe>
              <div className='vid-caption'>
                This is one of my favorite songs of all time because
                it just makes me feel happy and feel like dancing!
              </div>
            </div>
            <div className='vid-child'>
              <iframe width='560' height='315' src='https://www.youtube.com/embed/v86r22gGvRA' frameborder='0' allow='accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture' allowfullscreen title='New York'></iframe>
              <div className='vid-caption'>
                I really enjoyed my trip to New York back in 2017, but it
                was really short (2 days). This video reminds me how much
                I want to go back.
              </div>
            </div>
            <div className='vid-child'>
              <iframe width='560' height='315' src='https://www.youtube.com/embed/_Q0FYoCl4Cs' frameborder='0' allow='accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture' allowfullscreen title='Cinnamon Rolls Recipe'></iframe>
              <div className='vid-caption'>
                One of my favorite things to bake is cinnamon rolls. This video 
                has been a quick reference for me whenever I need to brush up
                on things.
              </div>
            </div>
            <div className='vid-child'>
              <iframe width='560' height='315' src='https://www.youtube.com/embed/w4XdnD5c334' frameborder='0' allow='accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture' allowfullscreen title='Bloom'></iframe>
              <div className='vid-caption'>
                I like to listen to this song when I want to relax and just
                feel like I'm somewhere that's serene.
              </div>
            </div>
          </div>
        </div>
        <button className='scrollButton' style={{display: this.props.display}} onClick={this.props.scrollToTop}>Scroll to Top</button>
      </div>
    );
  }
}
export default Videos;