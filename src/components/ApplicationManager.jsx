import { Route, Redirect } from "react-router-dom"
import React, { Component } from "react"
import SongsView from "./songs/SongsView.jsx"
import PlaylistsView from "./playlists/PlaylistsView.jsx"
import ProfileView from "./profile/ProfileView.jsx"
import PubView from "./pubView/PubView.jsx"

export default class ApplicationManager extends Component{


  render(){
    return(
    <React.Fragment>
      <Route exact path = "/songs" render={(props => {
        return <SongsView passedState={this.props.passedState} songs = {this.props.passedState.songs} fileUploader = {this.props.fileUploader} handleFieldChange={this.props.handleFieldChange}
        newSongSave={this.props.newSongSave} deleteSongClick={this.props.deleteSongClick} editSongClick={this.props.editSongClick}
        backSongClick = {this.props.backSongClick} editSongSave={this.props.editSongSave}/>
      })}/>
      <Route exact path = "/playlists" render={(props => {
        return <PlaylistsView passedState = {this.props.passedState} playlists = {this.props.passedState.playlists} songs_playlists={this.props.passedState.songs_playlists}
        songs={this.props.passedState.songs} handleFieldChange={this.props.handleFieldChange} addSongToPlaylist={this.props.addSongToPlaylist}
        addPlaylist={this.props.addPlaylist} removeSongFromPlaylist={this.props.removeSongFromPlaylist} removePlaylist = {this.props.removePlaylist}
        editTitleButton={this.props.editTitleButton} editTitleBackButton={this.props.editTitleBackButton} editPlaylistTitle={this.props.editPlaylistTitle}/>
      })}/>

      <Route path="/playlists/:playlistsId(\d+)" render={(props) => {
        return <PubView {...props}  passedState = {this.props.passedState} playlists = {this.props.passedState.playlists}
        songs_playlists={this.props.passedState.songs_playlists} songs={this.props.passedState.songs}/>
}} />

    <Route exact path = "/profile" render={(props => {
        return <ProfileView passedState = {this.props.passedState} handleFieldChange={this.props.handleFieldChange}/>
      })}/>





    </React.Fragment>
    )
  }
}