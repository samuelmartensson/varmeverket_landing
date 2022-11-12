import React, { Component } from 'react'

export default class Icon extends Component {
  render() {
    return (
      <img className={this.props.className} src={this.props.src} alt={this.props.alt}/>
    )
  }
}
