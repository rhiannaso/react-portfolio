import React, { Component } from 'react';
import Gallery from './Gallery';
import GG from '../Images/golden_gate.jpg';
import PointLobos from '../Images/point_lobos.jpg';
import RCMH from '../Images/rcmh.jpg';
import IV from '../Images/iv.jpg';
import LoneTree from '../Images/lone_tree.jpg';
import NYC from '../Images/new_york.jpg';
import Laguna from '../Images/laguna.jpg';
import GC from '../Images/grand_canyon.jpg';
import SD from '../Images/san_diego.jpg';

export class Images extends Component {
  enlarge(imgSrc) {
    var lbContent = document.createElement('img');
    lbContent.className = 'lightbox-content';
    lbContent.src = imgSrc;
    lbContent.id = 'lbContent';
    var lightbox = document.createElement('div');
    lightbox.id = 'lb';
    lightbox.className = 'lightbox';
    document.body.appendChild(lightbox);  
    document.getElementById('lb').appendChild(lbContent);
    document.getElementById('lb').addEventListener('click', function(event) {
      if(event.target.className !== 'lightbox-content') {
        document.getElementById('lb').removeChild(document.getElementById('lbContent'));
        document.body.removeChild(document.getElementById('lb'));
      }
    });
  }

  componentDidMount(){
    document.title = 'Discover More';
  }
  
  render() {
    const images = [
      {
        id: 1,
        src: GG,
        alt: 'Golden Gate Bridge',
        caption: 'I took this photo when my family and I visited San Francisco over winter break this year.'
      },
      {
        id: 2,
        src: PointLobos,
        alt: 'Point Lobos',
        caption: 'When my family took a trip along California\'s coast, I took this photo at Point Lobos.'
      },
      {
        id: 3,
        src: RCMH,
        alt: 'Radio City Music Hall',
        caption: 'I took this photo back in 2017 when I visited New York before college.'
      },
      {
        id: 4,
        src: IV,
        alt: 'Isla Vista Sunrise',
        caption: 'During Welcome Week this past year, I watched the sunrise with my friend and took this photo.'
      },
      {
        id: 5,
        src: LoneTree,
        alt: 'Lone Tree Point',
        caption: 'This photo was taken when my family and I drove through Pebble Beach\'s scenic 17-mile drive.'
      },
      {
        id: 6,
        src: NYC,
        alt: 'New York Buildings',
        caption: 'I took this photo from the Top of the Rock in New York. The view was pretty amazing!'
      },
      {
        id: 7,
        src: Laguna,
        alt: 'Tablerock Beach',
        caption: 'When my friends and I visited Tablerock Beach in Laguna, I captured this photo.'
      },
      {
        id: 8,
        src: GC,
        alt: 'Grand Canyon',
        caption: 'During last year\'s winter break, I took this picture while on vacation with my family.'
      },
      {
        id: 9,
        src: SD,
        alt: 'San Diego',
        caption: 'I visited my friends in San Diego during last year\'s spring break (what a different time it was!) and took this picture.'
      },
    ]
    return (
      <div>
        <div className='content'>
          <div className='img-container'>
            <Gallery images={images} enlarge={this.enlarge} />
          </div>
        </div>
        <button className='scrollButton' style={{display: this.props.display}} onClick={this.props.scrollToTop}>Scroll to Top</button>
      </div>
    );
  }
}
export default Images;