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

    //edit page
    if(this.props.passedState[`editSongButton-${this.props.song.id}`]){
      return(<div>
          <label>Title</label>
          <input id = "songTitleInput" type = "text" onChange={(evt) => this.props.handleFieldChange(evt)}/>
          <label>Lyric</label>
          <input id = "songLyricInput" type = "text" onChange={(evt) => this.props.handleFieldChange(evt)}/>
          <label>Co-Writers</label>
          <input id = "songCoWriters" type = "text" onChange={(evt) => this.props.handleFieldChange(evt)}/>
          <label>Duration</label>
          <input id = "songDuration" type = "text" onChange={(evt) => this.props.handleFieldChange(evt)}/>
          <progress id = "uploader" value = "0" max = "100">0%</progress>
          <input id = "songUpload" type = "file" onChange= {(e) => this.props.fileUploader(e)} />
          <button onClick = {()=> this.props.newSongSave()}>Save</button>
          <button id = {`editButtonBack-${this.props.song.id}`} onClick = {(e)=> this.props.backSongClick(e)}>Back</button>


      </div>)
    }


    //if a song is clicked
    else if(this.state.songPlayerClicked){
        return(
        <div  >
          <h3>{this.props.song.title}</h3>

          <audio controls src={this.props.song.downloadURL}></audio>
          <div>
            <p>Cowriter:{this.props.song.coWriter}</p>
            <h3>Lyric</h3>
            <p>{this.props.song.lyric}</p>
          </div>
          <button id={`editSongButton-${this.props.song.id}`} onClick={(e)=> this.props.editSongClick(e)}>Edit</button>
          <button id={`deleteSongButton-${this.props.song.id}`} onClick = {(evt)=> this.props.deleteSongClick(evt)}>Delete</button>
          <img className="icon" onClick={()=>this.songUnClicked()} alt="collapse" src="images/iconfinder_collapse2_308968.svg"/>
        </div>
        )

    }



    else{
    return (
      <div onClick={()=>this.songClicked()}>
          <h3>{this.props.song.title}</h3>
        <img className="icon" alt="expand" src="images/iconfinder_expand2_308964.svg"/>
        </div>
    )

  }
}
}