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
  /*enlarge = (img_obj) => {
    var enlargedImg = document.getElementsByClassName('big'+img_obj.className)[0];
    var lightbox = document.getElementsByClassName('box'+img_obj.className)[0];
    lightbox.style.display = 'flex';
    enlargedImg.src = img_obj.src;

    window.onClick = function(event) {
      if (event.target.className === 'lightbox') {
        lightbox.style.display = 'none';
      }
    }
  }*/

  /*enlarge() {
    console.log("hi");
    var lightbox = document.createElement('div');
    lightbox.id = 'lb'
    lightbox.className = 'lightbox';
    document.body.append(lightbox);
    console.log("in here");
    console.log(img_obj);
    var enlargedImg = document.getElementById('big'+img_obj.id);
    var lightbox = document.getElementById('box'+img_obj.id);
    lightbox.style.display = 'flex';
    enlargedImg.src = img_obj.src;

    window.onClick = function(event) {
      console.log(event.target.className);
      if (event.target.className === 'lightbox') {
        document.body.remove(lightbox)
      }
    }
  }*/
  
  render() {
    const images = [
      {
        id: 1,
        src: GG
      },
      {
        id: 2,
        src: PointLobos
      },
      {
        id: 3,
        src: RCMH
      },
      {
        id: 4,
        src: IV
      },
      {
        id: 5,
        src: LoneTree
      },
      {
        id: 6,
        src: NYC
      },
      {
        id: 7,
        src: Laguna
      },
      {
        id: 8,
        src: GC
      },
      {
        id: 9,
        src: SD
      },
    ]
    return (
      <div>
        <div className='content'>
          <div className='img-container'>
            <div className='img-child'>
              <img src={this.props.image.src} id='01' onClick={this.enlarge} alt='Golden Gate Bridge'/>
              <div className='caption'>
                {this.props.image.caption}
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