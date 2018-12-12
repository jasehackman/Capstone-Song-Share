import { Route, Redirect } from "react-router-dom"
import React, { Component } from "react"
import SongsView from "./songs/SongsView.jsx"
import PlaylistsView from "./playlists/PlaylistsView.jsx"
import ProfileView from "./profile/ProfileView.jsx"
import PubView from "./pubView/PubView.jsx"
import Login from "./login/LogIn.jsx"
import SignUp from "./login/SignUp.jsx"
import PublisherLanding from "./pubView/PublisherLanding.jsx"


export default class ApplicationManager extends Component{

    isAuthenticated = () =>sessionStorage.getItem("id") !== null

  render(){
    return(
    <React.Fragment>

    {/* SONGS */}
      <Route exact path = "/songs" render={(props => {
        if(this.isAuthenticated()){

          return <SongsView passedState={this.props.passedState} songs = {this.props.passedState.songs} fileUploader = {this.props.fileUploader} handleFieldChange={this.props.handleFieldChange}
          newSongSave={this.props.newSongSave} deleteSongClick={this.props.deleteSongClick} editSongClick={this.props.editSongClick}
          backSongClick = {this.props.backSongClick} editSongSave={this.props.editSongSave} editFieldChange={this.props.editFieldChange}
          displayStringAsHTML={this.props.displayStringAsHTML} newFieldChange = {this.props.newFieldChange}
          />
      }
        else{
          return <Login {...props} refreshData={this.props.refreshData} passedState={this.props.passedState} currentUser = {this.props.currentUser}/>
        }



      })}/>


      {/* PLAYLISTS */}
      <Route exact path = "/playlists" render={(props => {
        if(this.isAuthenticated()){

        return <PlaylistsView passedState = {this.props.passedState} playlists = {this.props.passedState.playlists} songs_playlists={this.props.passedState.songs_playlists}
        songs={this.props.passedState.songs} handleFieldChange={this.props.handleFieldChange} addSongToPlaylist={this.props.addSongToPlaylist}
        addPlaylist={this.props.addPlaylist} removeSongFromPlaylist={this.props.removeSongFromPlaylist} removePlaylist = {this.props.removePlaylist}
        editTitleButton={this.props.editTitleButton} editTitleBackButton={this.props.editTitleBackButton} editPlaylistTitle={this.props.editPlaylistTitle}
        displayStringAsHTML={this.props.displayStringAsHTML}/>
      }
        else{
          return <Login {...props} refreshData={this.props.refreshData} passedState={this.props.passedState} currentUser = {this.props.currentUser}/>
        }


    })}/>

      {/* PUBVIEW */}
      <Route path="/playlists/:playlistsId(\d+)" render={(props) => {

        if(this.isAuthenticated()){
          return <PubView {...props}  passedState = {this.props.passedState} playlists = {this.props.passedState.playlists}
          songs_playlists={this.props.passedState.songs_playlists} songs={this.props.passedState.songs}
          displayStringAsHTML={this.props.displayStringAsHTML}/>
        }
        else{
          return <PubView {...props}  passedState = {this.props.passedState} playlists = {this.props.passedState.allPlaylists}
          songs_playlists={this.props.passedState.songs_playlists} songs={this.props.passedState.songs}
          displayStringAsHTML={this.props.displayStringAsHTML}/>
        }
}} />
      {/* PROFILE */}

      <Route exact path = "/profile" render={(props => {

        if(this.isAuthenticated()){
          return <ProfileView passedState = {this.props.passedState} handleFieldChange={this.props.handleFieldChange}/>
        }
        else{
          return <Login {...props} refreshData={this.props.refreshData} passedState={this.props.passedState} currentUser = {this.props.currentUser}/>
        }


      })}/>

      <Route exact path="/signup" render={(props) => {
         if (!this.isAuthenticated()) {
            return <SignUp refreshData={this.props.refreshData} handleFieldChange={this.props.handleFieldChange} signUpSave={this.props.signUpSave}/>
         }else {
           return <Redirect to='/playlists'/>
         }

      }}/>

      <Route exact path="/login" render={(props) => {
         if (!this.isAuthenticated()) {
            return <Login refreshData={this.props.refreshData} handleFieldChange={this.props.handleFieldChange}/>
         }else {
           return <Redirect to='/playlists'/>
         }

      }}/>

      <Route path="/publisherLanding" render={(props) => {
        return <PublisherLanding displayStringAsHTML={this.props.displayStringAsHTML}/>
      }}/>




    </React.Fragment>
    )
  }
}