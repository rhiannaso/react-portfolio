import React, { Component } from 'react';

export class Tab extends Component {
  addStyling = () => {
    if(this.props.tab.id === this.props.activeTab) {
      return {
        backgroundColor: '#507A77',
        color: 'white'
      }
    } else {
      return {
        color: '#111'
      }
    }
  }
  render() {
    return(
      <div className='tab' style={this.addStyling()} onClick={this.props.changeTab.bind(this, this.props.tab.id)}>
        {this.props.tab.title}
      </div>
    );
  }
}
export default Tab;