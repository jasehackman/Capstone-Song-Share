import React, { Component } from "react"
import './song.css'

export default class Song extends Component {

  state = {
    songPlayerClicked: false,
  }

  songClicked = () => {
    this.setState({songPlayerClicked: true})
  }

  songUnClicked = () => {
    this.setState({songPlayerClicked: false})
  }





  render(){
    //if a song is clicked
    if(this.state.songPlayerClicked){
        return(
        <div  >
          <h3>{this.props.song.title}</h3>

          <audio controls src={this.props.song.downloadURL}></audio>
          <div>
            <p>Cowriter:{this.props.song.coWriter}</p>
            <h3>Lyric</h3>
            <p>{this.props.song.lyric}</p>
          </div>
          <img className="icon" onClick={()=>this.songUnClicked()} alt="collapse" src="images/iconfinder_collapse2_308968.svg"/>

        </div>
        )

    }

    else{
    return (
      <div onClick={()=>this.songClicked()}>
          <h3>{this.props.song.title}</h3>

          <audio controls src={this.props.song.downloadURL}></audio>

        <img className="icon" alt="expand" src="images/iconfinder_expand2_308964.svg"/>
        </div>
    )

  }
}
}