import { Route, Redirect } from "react-router-dom"
import React, { Component } from "react"
import SongsView from "./songs/SongsView.jsx"
import PlaylistsView from "./playlists/PlaylistsView.jsx"
import ProfileView from "./profile/ProfileView.jsx"

export default class ApplicationManager extends Component{


  render(){
    return(
    <React.Fragment>
      <Route exact path = "/songs" render={(props => {
        return <SongsView songs = {this.props.passedState.songs} fileUploader = {this.props.fileUploader} handleFieldChange={this.props.handleFieldChange}
        newSongSave={this.props.newSongSave}/>
      })}/>
       <Route exact path = "/playlists" render={(props => {
        return <PlaylistsView playlists = {this.props.passedState.playlists} songs_playlists={this.props.passedState.songs_playlists}
        songs={this.props.passedState.songs} handleFieldChange={this.props.handleFieldChange} addSongToPlaylist={this.props.addSongToPlaylist}
        addPlaylist={this.props.addPlaylist} removeSongFromPlaylist={this.props.removeSongFromPlaylist}/>
      })}/>
    <Route exact path = "/profile" render={(props => {
        return <ProfileView passedState = {this.props.passedState} handleFieldChange={this.props.handleFieldChange}/>
      })}/>





    </React.Fragment>
    )
  }
}