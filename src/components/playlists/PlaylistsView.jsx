import React, { Component } from "react"
import APICalls from "../../modules/APICalls";
import Playlist from "./Playlist.jsx"

export default class PlaylistsView extends Component {

  render() {



    return (
      <React.Fragment>
        <h1 className="display-4" >Playlist</h1>
        <label>Add Playlist</label>
        <input type="text" id="newPlaylistText" onChange={(evt)=>this.props.handleFieldChange(evt)}/>
        <button onClick={()=>this.props.addPlaylist()}>+</button>
        {this.props.playlists.map(playlist =>{
          return <Playlist key={playlist.id} passedState = {this.props.passedState} playlist = {playlist} songsIds = {playlist.songs_playlists} songs={this.props.songs}
           addSongToPlaylist={this.props.addSongToPlaylist} removeSongFromPlaylist={this.props.removeSongFromPlaylist} removePlaylist={this.props.removePlaylist}
           editTitleButton={this.props.editTitleButton} editTitleBackButton={this.props.editTitleBackButton} editPlaylistTitle={this.props.editPlaylistTitle}
           handleFieldChange={this.props.handleFieldChange}/>

    })}
      </React.Fragment>
    )
  }
}