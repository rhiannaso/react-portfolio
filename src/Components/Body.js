import React, { Component } from 'react';
import Home from './Home';
import Images from './Images';
import Videos from './Videos';
import Projects from './Projects';
import Form from './Form';

export class Body extends Component {
  constructor()
  {
    super();
    this.state = {
      display: 'none'
    }
  }
  componentDidMount() {
    window.addEventListener('scroll', this.prepScroll)
  }
  componentWillUnmount() {
    window.removeEventListener('scroll', this.prepScroll)
  }
  prepScroll = () => {
    var windowHeight = window.innerHeight;
    var amtScrolled = window.pageYOffset;
    var percentScrolled = (amtScrolled/windowHeight)*100;

    if(percentScrolled > 25) {
      this.setState({
        display: 'block'
      });
    } else {
      this.setState({
        display: 'none'
      });
    }
  }
  scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
  displayContent = () => {
    var activeTab = this.props.activeTab
    if(activeTab === 1)
      return <Home display={this.state.display} scrollToTop={this.scrollToTop}/>
    else if(activeTab === 2) 
      return <Images display={this.state.display} scrollToTop={this.scrollToTop}/>
    else if(activeTab === 3)
      return <Videos display={this.state.display} scrollToTop={this.scrollToTop}/>
    else if(activeTab === 4)
      return <Projects display={this.state.display} scrollToTop={this.scrollToTop}/>
    else 
      return <Form display={this.state.display} scrollToTop={this.scrollToTop}/>
  }
  render() {
    return(
      this.displayContent()
    );
  }
}
export default Body;