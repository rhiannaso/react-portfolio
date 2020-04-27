import React, { Component } from 'react';
import Video from './Video';

export class VidGallery extends Component {  
  render() {
    return this.props.videos.map((video) => (
      <Video video={video} />
    ));
  }
}
export default VidGallery;