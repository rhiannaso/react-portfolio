import React, { Component } from 'react';

export class Project extends Component {
  render() {
    return(
      <div>
        <div className='section'>
          <div>
            <img className='proj-image' src={this.props.proj.src} alt={this.props.proj.alt}/>
          </div>
          <div>
            <h2>{this.props.proj.title}</h2>
            <p>
              {this.props.proj.desc}
              <br/><br/>
              <a href={this.props.proj.link} target='_blank' rel='noopener noreferrer'>View the GitHub repository here</a>
            </p>
          </div>
        </div>
        <hr/>
      </div>
    );
  }
}
export default Project;