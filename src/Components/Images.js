import React, { Component } from 'react';
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
    return (
      <div>
        <div className='content'>
          <div className='img-container'>
            <div className='img-child'>
              <img src={GG} id='01' onClick={this.enlarge.bind(this, GG)} alt='Golden Gate Bridge'/>
              <div className='caption'>
                I took this photo when my family and I visited 
                San Francisco over winter break this year.
              </div>
            </div>
            <div className='img-child'>
              <img src={PointLobos} id='02' onClick={this.enlarge.bind(this, PointLobos)} alt='Point Lobos'/>
              <div className='caption'>
                When my family took a trip along California's
                coast, I took this photo at Point Lobos.
              </div>
            </div>
            <div className='img-child'>
              <img src={RCMH} id='03' onClick={this.enlarge.bind(this, RCMH)} alt='Radio City Music Hall'/>
              <div className='caption'>
                I took this photo back in 2017 when I visited
                New York before college.
              </div>
            </div>
            <div className='img-child'>
              <img src={IV} id='04' onClick={this.enlarge.bind(this, IV)} alt='Isla Vista Sunset'/>
              <div className='caption'>
                During Welcome Week this past year, I watched
                the sunrise with my friend and took this photo.
              </div>
            </div>
            <div className='img-child'>
              <img src={LoneTree} id='05' onClick={this.enlarge.bind(this, LoneTree)} alt='Lone Tree Point'/>
              <div className='caption'>
                This photo was taken when my family and I drove
                through Pebble Beach's scenic 17-mile drive.
              </div>
            </div>
            <div className='img-child'>
              <img src={NYC} id='06' onClick={this.enlarge.bind(this, NYC)} alt='New York Buildings'/>
              <div className='caption'>
                I took this photo from the Top of the Rock in 
                New York. The view was pretty amazing!
              </div>
            </div>
            <div className='img-child'>
              <img src={Laguna} id='07' onClick={this.enlarge.bind(this, Laguna)} alt='Tablerock Beach'/>
              <div className='caption'>
                When my friends and I visited Tablerock Beach
                in Laguna, I captured this photo.
              </div>
            </div>
            <div className='img-child'>
              <img src={GC} id='08' onClick={this.enlarge.bind(this, GC)} alt='Grand Canyon'/>
              <div className='caption'>
                During last year's winter break, I took this
                picture while on vacation with my family.
              </div>
            </div>
            <div className='img-child'>
              <img src={SD} id='09' onClick={this.enlarge.bind(this, SD)} alt='San Diego'/>
              <div className='caption'>
                I visited my friends in San Diego during last 
                year's spring break (what a different time it 
                was!) and took this picture.
              </div>
            </div>
          </div>
        </div>
        <button className='scrollButton' style={{display: this.props.display}} onClick={this.props.scrollToTop}>Scroll to Top</button>
      </div>
    );
  }
}
export default Images;