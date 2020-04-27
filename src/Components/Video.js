import React, { Component } from 'react';

export class Video extends Component {
  render() {
    return(
      <div className='vid-child'>
        <iframe height='315' src={this.props.video.src} frameborder='0' gesture='media' allow='autoplay; encrypted-media' allowfullscreen title={this.props.video.title}></iframe>
        <div className='vid-caption'>
          {this.props.video.caption}
        </div>
      </div>
    );
  }
}
export default Video;