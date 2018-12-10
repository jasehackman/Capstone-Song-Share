import React, { Component } from "react"
import Song from "../songs/Song.jsx"
import { Link } from "react-router-dom"


export default class Playlist extends Component {


  render(){

    //edit Title Button
    let editButtonForm
    if(this.props.passedState.editTitleButtonClicked){
      editButtonForm =
      <div>
        <input type = "text" id={"editTitleButtonForm-"+this.props.playlist.id} onChange = {(evt)=> this.props.handleFieldChange(evt)}/>
        <button id = {"savePlaylistTitle-"+this.props.playlist.id} onClick={(evt) => this.props.editPlaylistTitle(evt)}>Save Title</button>
        <button onClick={()=> this.props.editTitleBackButton()}>Back</button>
      </div>
    } else{
      editButtonForm = <div>
        <h1>{this.props.playlist.title}</h1>
        <button id = {"editPlaylistTitle-"+this.props.playlist.id} onClick={() => this.props.editTitleButton()}>Edit Title</button>
        <button id = {"deletePlaylist-"+this.props.playlist.id} onClick={(evt)=> this.props.removePlaylist(evt)}>Delete</button>
       </div>

  }

  //if there are no songs in a playlist
    if(this.props.songsIds.length===0){
      return(
        <div className='card p-2 m-1'>
          <h1>{this.props.playlist.title}</h1>
          <h3>Share Link: http://localhost:8088/playlists/{this.props.playlist.id}</h3>
          <div>
            <label>Add A Song</label>
            <select id={"addSongToPlaylist-" + this.props.playlist.id} value = "pick a song" onChange = {(evt)=> this.props.addSongToPlaylist(evt)}>
              <option>Select A Song</option>
              {this.props.songs.map(song => {
                return <option key={song.id} value={song.id}>{song.title}</option>
              })}

            </select>

          </div>



        </div>
      )
    }

    else{
    let arrayOfSongIds = this.props.songsIds.map(songid => {
      return songid.songId
    })


    let arrayOfSongs = arrayOfSongIds.map(songid => {
      return this.props.songs.filter(song => song.id===songid )
    })
    //normal playlist
    return(
      <div className="card p-3 m-1">
        {editButtonForm}
        <h3>Share Link: http://localhost:3000/playlists/{this.props.playlist.id}</h3>

        <div>
          {/* add songs */}
          <label>Add A Song</label>
          <select id={"addSongToPlaylist-" + this.props.playlist.id} value = "pick a song" onChange = {(evt)=> this.props.addSongToPlaylist(evt)}>
            <option>Select A Song</option>
            {this.props.songs.map(song => {
              if(!arrayOfSongIds.includes(song.id))
              return <option key={song.id} value={song.id}>{song.title}</option>
            })}
          {/* remove songs */}
          </select>
          <label>Remove A Song</label>
          <select id={"removeSongFromPlaylist-" + this.props.playlist.id} onChange = {(evt)=> this.props.removeSongFromPlaylist(evt)}>
            <option>Select A Song</option>
              {this.props.songs.map(song => {
                if(arrayOfSongIds.includes(song.id))
                return <option key={song.id} value={song.id}>{song.title}</option>
              })}
          </select>

        </div>
        {/* Songs in playlists */}
        <div>
        {

          arrayOfSongs.map(song => {
            if(song.length===0){
              return <p>Please Upload Songs</p>
            }else{
              return <Song key={song[0].id} song={song[0]} deleteSongClick={this.props.deleteSongClick} editSongClick={this.props.editSongClick}
              passedState={this.props.passedState} backSongClick = {this.props.backSongClick} handleFieldChange={this.props.handleFieldChange}
              editSongSave={this.props.editSongSave}/>

            }

        }

        )}

        </div>
      </div>
    )
  }}
}