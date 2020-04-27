import React, { Component } from 'react';
import Photo from './Photo';

export class Gallery extends Component {  
  render() {
    return this.props.images.map((image) => (
      <Photo image={image} enlarge={this.props.enlarge} />
    ));
  }
}
export default Gallery;