import React, { Component } from 'react';
import VidGallery from './VidGallery';

export class Videos extends Component {
  componentDidMount(){
    document.title = 'Fun Videos';
  }

  render() {
    const videos = [
      {
        id: 1,
        src: 'https://www.youtube.com/embed/E-6xk4W6N20',
        title: 'Fan.tasia',
        caption: 'I don\'t remember how I even found this video, but it\'s so much fun to watch!'
      },
      {
        id: 2,
        src: 'https://www.youtube.com/embed/Rv9hn4IGofM',
        title: 'Iguanas vs. Snakes',
        caption: 'This video is probably one of the most entertaining clips from an animal documentary that I\'ve ever seen.'
      },
      {
        id: 3,
        src: 'https://www.youtube.com/embed/rubpIfLPzvU',
        title: 'The Middle',
        caption: 'This is one of my favorite songs of all time because it just makes me feel happy and feel like dancing!'
      },
      {
        id: 4,
        src: 'https://www.youtube.com/embed/v86r22gGvRA',
        title: 'New York',
        caption: 'I really enjoyed my trip to New York back in 2017, but it was really short (2 days). This video reminds me how much I want to go back.'
      },
      {
        id: 5,
        src: 'https://www.youtube.com/embed/_Q0FYoCl4Cs',
        title: 'Cinnamon Rolls Recipe',
        caption: 'One of my favorite things to bake is cinnamon rolls. This video has been a quick reference for me whenever I need to brush up on things.'
      },
      {
        id: 6,
        src: 'https://www.youtube.com/embed/w4XdnD5c334',
        title: 'Bloom',
        caption: 'I like to listen to this song when I want to relax and just feel like I\'m somewhere that\'s serene.'
      },
    ]
    return (
      <div>
        <div className='content'>
          <div className='vid-container'>
            <VidGallery videos={videos} />
          </div>
        </div>
        <button className='scrollButton' style={{display: this.props.display}} onClick={this.props.scrollToTop}>Scroll to Top</button>
      </div>
    );
  }
}
export default Videos;