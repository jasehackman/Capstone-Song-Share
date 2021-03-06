import React, { Component } from "react"
import Playlist from "./Playlist.jsx"
import NewPlaylistModal from './NewPlaylistModal.jsx'
import './playlist.css'

export default class PlaylistsView extends Component {

  render() {



    return (
      <React.Fragment>
        <div className="d-flex playlistTitle sticky-top">
        <h1 className="display-4" >Playlists</h1>
        {/* Modal */}
        <NewPlaylistModal addPlaylist={this.props.addPlaylist} handleFieldChange={this.props.handleFieldChange}/>
        </div>
        {this.props.playlists.map(playlist =>{
          return <Playlist key={playlist.id} passedState = {this.props.passedState} playlist = {playlist} songsIds = {playlist.songs_playlists} songs={this.props.songs}
           addSongToPlaylist={this.props.addSongToPlaylist} removeSongFromPlaylist={this.props.removeSongFromPlaylist} removePlaylist={this.props.removePlaylist}
           editTitleButton={this.props.editTitleButton} editTitleBackButton={this.props.editTitleBackButton} editPlaylistTitle={this.props.editPlaylistTitle}
           handleFieldChange={this.props.handleFieldChange} displayStringAsHTML={this.props.displayStringAsHTML} moveSongUp = {this.props.moveSongUp} moveSongDown = {this.props.moveSongDown}
           deleteSongFromPlaylist={this.props.deleteSongFromPlaylist}/>

    })}
      </React.Fragment>
    )
  }
}