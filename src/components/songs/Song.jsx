import React, { Component } from "react"
import './song.css'

export default class Song extends Component {

  state = {
    songPlayerClicked: false,
    editSongClicked: false
  }

  songClicked = () => {
    this.setState({songPlayerClicked: true})
  }

  songUnClicked = () => {
    this.setState({songPlayerClicked: false})
  }


  editSongClickedFunction = () => {
    this.setState({editSongClicked: true})
  }



  render(){
    //edit button clicked
    if(this.state.songPlayerClicked && this.state.editSongClicked){
      return(
        <div>
          <h3 contentEditable="true">{this.props.song.title}</h3>

          <audio controls src={this.props.song.downloadURL}></audio>
          <div>
            <h5>CoWriters</h5>
            <p contentEditable="true">{this.props.song.coWriter}</p>
            <h3>Lyric</h3>
            <p contentEditable="true">{this.props.song.lyric}</p>
            <button>Edit</button><button>Delete</button>
          </div>
          <img className="icon" alt="expand" src="images/iconfinder_collapse2_308968.svg"/>

        </div>
      )
    }
    //if a song is clicked
    else if(this.state.songPlayerClicked){
        return(
        <div onClick={()=>this.songUnClicked()} >
          <h3>{this.props.song.title}</h3>

          <audio controls src={this.props.song.downloadURL}></audio>
          <div>
            <p>Cowriter:{this.props.song.coWriter}</p>
            <h3>Lyric</h3>
            <p>{this.props.song.lyric}</p>
            <button onClick = {this.editSongClickedFunction}>Edit</button><button>Delete</button>
          </div>
          <img className="icon" alt="expand" src="images/iconfinder_collapse2_308968.svg"/>

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