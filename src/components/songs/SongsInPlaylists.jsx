import React, { Component } from "react"
import './song.css'


export default class Song extends Component {

  state = {
    songPlayerClicked: false,
  }

  songClicked = () => {
    this.setState({ songPlayerClicked: true })
  }

  songUnClicked = () => {
    this.setState({ songPlayerClicked: false })
  }





  render() {


    //if a song is clicked
    if (this.state.songPlayerClicked) {
      return (
        <div className="song m-1 card p-3" >
          <div className="d-flex">
            <h3>{this.props.song.title}</h3>
            <div className="ml-auto">


            </div>
          </div>
          <audio controls src={this.props.song.downloadURL}></audio>
          <div>
            <h3>Cowriter</h3>
            <p>{this.props.song.coWriters}</p>
            <h3>Lyric</h3>
            <div className="lyricBox p-3">
            {this.props.displayStringAsHTML(this.props.song.lyric)}
            </div>
          </div>
          <img className="icon" onClick={() => this.songUnClicked()} alt="collapse" src="images/iconfinder_collapse2_308968.svg" />

        </div>
      )

    }



    else {
      return (
        <div className="song m-1 card p-3 row" >
          <div className="d-flex">
            <h3>{this.props.song.title}</h3>
            <div className="ml-auto">

            </div>
          </div>

          <img className="icon" alt="expand" src="images/iconfinder_expand2_308964.svg" onClick={() => this.songClicked()} />
        </div>
      )

    }
  }
}