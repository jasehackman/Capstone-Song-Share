import React, { Component } from "react"
import APICalls from "../../modules/APICalls";
import Playlist from "./Playlist.jsx"

export default class PlaylistsView extends Component {

  render() {



    return (
      <React.Fragment>
        <h1>Playlist</h1>
        {this.props.playlists.map(playlist =>{
          return <Playlist key={playlist.id} playlist = {playlist} songsIds = {playlist.songs_playlists} songs={this.props.songs}
           addSongToPlaylist={this.props.addSongToPlaylist}/>

    })}
      </React.Fragment>
    )
  }
}