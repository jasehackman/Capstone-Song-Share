import React, { Component } from "react"
import SongForPubs from "../pubView/SongForPub.jsx"

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

  console.log(this.props.songsIds)
  //if there are no songs in a playlist
    if(this.props.songsIds.length===0){
      return(
        <div>
          <h1>{this.props.playlist.title}</h1>
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

    return(
      <div>
        {editButtonForm}
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
        {arrayOfSongs.map(song => {
         return <SongForPubs key={song[0].id} song={song[0]}/>
        }

        )}

        </div>
      </div>
    )
  }}
}