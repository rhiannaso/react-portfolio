import React, { Component } from 'react';

export class Photo extends Component {
  render() {
    return(
      <div className='img-child'>
        <img src={this.props.image.src} onClick={this.props.enlarge.bind(this, this.props.image.src)} alt={this.props.image.alt}/>
        <div className='caption'>
          {this.props.image.caption}
        </div>
      </div>
    );
  }
}
export default Photo;