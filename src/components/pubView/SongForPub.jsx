import React, { Component } from "react"
import '../songs/song.css'
import expand from'./iconfinder_expand2_308964.svg'
import collapse from './iconfinder_collapse2_308968.svg'

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
        <div className = "song m-1 card p-3" >
          <h3 className = "" >{this.props.song.title}</h3>

          <audio controls src={this.props.song.downloadURL}></audio>
          <div>
            <h4>Cowriter</h4>
            <p>{this.props.song.coWriter}</p>
            <h4>Lyric</h4>
            {this.props.displayStringAsHTML(this.props.song.lyric)}
          </div>
          <img className="icon" onClick={()=>this.songUnClicked()} alt="collapse" src={collapse}/>

        </div>
        )

    }

    else{
    return (
      <div className = "song m-1 card p-3" onClick={()=>this.songClicked()}>
          <h3 className = "">{this.props.song.title}</h3>

          <audio controls src={this.props.song.downloadURL}></audio>

        <img className="icon" alt="expand" src={expand}/>
        </div>
    )

  }
}
}