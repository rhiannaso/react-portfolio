import React, { Component } from 'react';
import Project from './Project';

export class ProjGallery extends Component {  
  render() {
    return this.props.projects.map((proj) => (
      <Project proj={proj} />
    ));
  }
}
export default ProjGallery;