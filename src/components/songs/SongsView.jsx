import React, { Component } from "react"
import Song from './Song.jsx'

export default class SongsView extends Component{


  render(){
    return(
      <React.Fragment>
        <div className = "songList">
          <h1>Saved Songs</h1>
          {this.props.songs.map(song =>
            <Song key={song.id} song = {song}/>
          )}
        </div>
        <div>
          <h1>Add New Song</h1>
          <label>Title</label>
          <input id = "songTitleInput" type = "text" />
          <label>Lyic</label>
          <input id = "songLyricInput" type = "text"/>
          <label>Co-Writers</label>
          <input id = "songCo-Writers" type = "text"/>
          <progress id = "uploader" value = "0" max = "100">0%</progress>
          <input id = "songUpload" type = "file" onChange= {(e) => this.props.fileUploader(e)}/>

        </div>
    </React.Fragment>
    )
  }
}


{/* <div key={song.id}>
          <h3>{song.title}</h3>

          <audio controls src={song.downloadURL}></audio>
        </div> */}