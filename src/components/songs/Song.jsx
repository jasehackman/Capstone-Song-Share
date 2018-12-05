import React, { Component } from "react"

export default class Song extends Component {



  render(){
    return (
      <div>
          <h3>{this.props.song.title}</h3>

          <audio controls src={this.props.song.downloadURL}></audio>
        </div>
    )

  }
}