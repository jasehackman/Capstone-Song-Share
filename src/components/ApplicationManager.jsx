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
        return <SongsView songs = {this.props.passedState.songs}/>
      })}/>
       <Route exact path = "/playlists" render={(props => {
        return <PlaylistsView playlists = {this.props.passedState.playlists}/>
      })}/>
    <Route exact path = "/profile" render={(props => {
        return <ProfileView passedState = {this.props.passedState}/>
      })}/>





    </React.Fragment>
    )
  }
}