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

//edit page--------------------------------------------------------------------------------------------------------------------------------------
    if(this.props.passedState.editSongButtonClick === this.props.song.id){
      return(<div>
          <label>Title</label>
          <input id = "editSongTitleInput" value = {this.props.passedState.editSongTitleInput} type = "text" onChange={(evt) => this.props.handleFieldChange(evt)}/>
          <label>Lyric</label>
          <input id = "editSongLyricInput" value = {this.props.passedState.editSongLyricInput} type = "text" onChange={(evt) => this.props.handleFieldChange(evt)}/>
          <label>Co-Writers</label>
          <input id = "editSongCoWriters" value = {this.props.passedState.editSongCoWriters} type = "text" onChange={(evt) => this.props.handleFieldChange(evt)}/>
          <label>Duration</label>
          <input id = "editSongDuration" value = {this.props.passedState.editSongDuration} type = "text" onChange={(evt) => this.props.handleFieldChange(evt)}/>

          <button onClick = {()=> this.props.editSongSave()}>Save</button>
          <button id = {`editButtonBack-${this.props.song.id}`} onClick = {(e)=> this.props.backSongClick(e)}>Back</button>


      </div>)
    }


    //if a song is clicked
    else if(this.state.songPlayerClicked){
        return(
        <div className="song m-1 card col-sm-3" >
          <h3>{this.props.song.title}</h3>

          <audio controls src={this.props.song.downloadURL}></audio>
          <div>
            <p>Cowriter:{this.props.song.coWriter}</p>
            <h3>Lyric</h3>
            <p>{this.props.song.lyric}</p>
          </div>
          <div className="container row ">
          <button className= "btn btn-primary col m-3" id={`editSongButton-${this.props.song.id}`} onClick={(e)=> this.props.editSongClick(e)}>Edit</button>
          <button className= "btn btn-primary col m-3" id={`deleteSongButton-${this.props.song.id}`} onClick = {(evt)=> this.props.deleteSongClick(evt)}>Delete</button>
          </div>
          <img className="icon" onClick={()=>this.songUnClicked()} alt="collapse" src="images/iconfinder_collapse2_308968.svg"/>

        </div>
        )

    }



    else{
    return (
      <div className="song m-1 card col-sm-3" onClick={()=>this.songClicked()}>
          <h3>{this.props.song.title}</h3>
        <img className="icon" alt="expand" src="images/iconfinder_expand2_308964.svg"/>
        </div>
    )

  }
}
}