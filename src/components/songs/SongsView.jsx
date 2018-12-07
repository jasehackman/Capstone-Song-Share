import React, { Component } from "react"
import Song from './Song.jsx'

export default class SongsView extends Component{


  render(){
    return(
      <React.Fragment>
        <div className = "songList">
          <h1>Saved Songs</h1>
          {this.props.songs.map(song =>
            <Song key={song.id} deleteSongClick={this.props.deleteSongClick} song = {song} editSongClick={this.props.editSongClick}
                passedState={this.props.passedState} backSongClick = {this.props.backSongClick}/>
          )}
        </div>

        {/* new song form */}
        <div>
          <h1>Add New Song</h1>
          <label>Title</label>
          <input id = "editSongTitleInput" type = "text" onChange={(evt) => this.props.handleFieldChange(evt)}/>
          <label>Lyric</label>
          <input id = "editSongLyricInput" type = "text" onChange={(evt) => this.props.handleFieldChange(evt)}/>
          <label>Co-Writers</label>
          <input id = "editSongCoWriters" type = "text" onChange={(evt) => this.props.handleFieldChange(evt)}/>
          <label>Duration</label>
          <input id = "editSongDuration" type = "text" onChange={(evt) => this.props.handleFieldChange(evt)}/>
          <progress id = "uploader" value = "0" max = "100">0%</progress>
          <input id = "editSongUpload" type = "file" onChange= {(e) => this.props.fileUploader(e)} />
          <button onClick = {()=> this.props.newSongSave()}>Save</button>

        </div>
    </React.Fragment>
    )
  }
}


{/* <div key={song.id}>
          <h3>{song.title}</h3>

          <audio controls src={song.downloadURL}></audio>
        </div> */}