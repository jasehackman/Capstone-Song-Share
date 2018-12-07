import React, { Component } from "react"
import Song from './Song.jsx'

export default class SongsView extends Component{


  render(){
    return(
      <React.Fragment>
        <div className = "songList">
          <h1>Saved Songs</h1>
          {this.props.songs.map(song =>
            <Song key={song.id} deleteSongClick={this.props.deleteSongClick} song = {song}/>
          )}
        </div>

        {/* new song form */}
        <div>
          <h1>Add New Song</h1>
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

        </div>
    </React.Fragment>
    )
  }
}


{/* <div key={song.id}>
          <h3>{song.title}</h3>

          <audio controls src={song.downloadURL}></audio>
        </div> */}