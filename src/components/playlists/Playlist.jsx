import React, { Component } from "react"
// import Song from "../songs/Song.jsx"
import SongsInPlaylists from "../songs/SongsInPlaylists.jsx"

import './playlist.css'
import EditPlaylistModal from './EditPlaylistModal.jsx'
import PlaylistLinkModal from './PlaylistLinkModal.jsx'




export default class Playlist extends Component {


  render() {


    let editButtonForm

      editButtonForm =
        <div className="d-flex">
          <h1 className="">{this.props.playlist.title}</h1>
          <div className="ml-auto">
          <EditPlaylistModal  passedState={this.props.passedState} playlist = {this.props.playlist} editTitleButton= {this.props.editTitleButton} handleFieldChange={this.props.handleFieldChange} editPlaylistTitle={this.props.editPlaylistTitle}/>
          {/* <img src="images/edit.png" className="icon" alt="edit" id={"editPlaylistTitle-" + this.props.playlist.id} onClick={() => this.props.editTitleButton()} /> */}
          <img src="images/trash.png" className="icon" alt="delete" id={"deletePlaylist-" + this.props.playlist.id} onClick={(evt) => this.props.removePlaylist(evt)} />
          <PlaylistLinkModal playlist = {this.props.playlist} />
          </div>
        </div>

    // }

    //if there are no songs in a playlist
    if (this.props.songsIds.length === 0) {
      return (
        <div className='card p-4 mb-4 mt-4'>
          {editButtonForm}
          <div>
            <select className = "form-control p-1 pl-2" id={"addSongToPlaylist-" + this.props.playlist.id} value="pick a song" onChange={(evt) => this.props.addSongToPlaylist(evt)}>
              <option>Select Song</option>
              {this.props.songs.map(song => {
                return <option key={song.id} value={song.id}>{song.title}</option>
              })}

            </select>

          </div>



        </div>
      )
    }

    else {
      let arrayOfSongIds = this.props.songsIds.map(songid => {
        return songid.songId
      })


      let arrayOfSongs = arrayOfSongIds.map(songid => {
        return this.props.songs.filter(song => song.id === songid)
      })
      //normal playlist
      return (
        <div className="card p-4 mb-4 mt-4">
          {editButtonForm}

          <div className = ''>
            {/* add songs */}
            <div className="d-flex ">

            <select className='form-control p-1 pl-2 ' id={"addSongToPlaylist-" + this.props.playlist.id} value="pick a song" onChange={(evt) => this.props.addSongToPlaylist(evt)}>
              <option>Add Song To Playlist</option>
              {this.props.songs.map(song => {
                if (!arrayOfSongIds.includes(song.id))
                  return <option key={song.id} value={song.id}>{song.title}</option>
              })}
            </select>
              {/* remove songs */}

            <select className='form-control p-1 pl-2' id={"removeSongFromPlaylist-" + this.props.playlist.id} onChange={(evt) => this.props.removeSongFromPlaylist(evt)}>
              <option>Remove Song To Playlist</option>
              {this.props.songs.map(song => {
                if (arrayOfSongIds.includes(song.id))
                  return <option key={song.id} value={song.id}>{song.title}</option>
              })}
            </select>
            </div>

          </div>
          {/* Songs in playlists */}
          <div>
            {

              arrayOfSongs.map(song => {
                if (song.length === 0) {
                  return <p>Please Upload Songs</p>
                } else {
                  return <SongsInPlaylists key={song[0].id} song={song[0]} deleteSongClick={this.props.deleteSongClick} editSongClick={this.props.editSongClick}
                    passedState={this.props.passedState} backSongClick={this.props.backSongClick} handleFieldChange={this.props.handleFieldChange}
                    editSongSave={this.props.editSongSave} displayStringAsHTML={this.props.displayStringAsHTML} />

                }

              }

              )}

          </div>

        </div>

      )
    }
  }
}