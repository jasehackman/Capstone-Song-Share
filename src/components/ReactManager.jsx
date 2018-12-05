import React, { Component } from 'react'
import NavBar from "./nav/NavBar"
import ApplicationManager from "./ApplicationManager"
import APICalls from "../modules/APICalls"



export default class ReactManager extends Component {

  state = {
    pageLoaded: true,

    //need to reset with login
    currentUser:
    {
      userId: 1
    },

    songs: [],

    playlists: [],

    songs_playlists: []
  }


  refreshData = () => {
    let stateSetter = {}
    APICalls.getAllFromJson("songs", this.state.currentUser.userId)
      .then(data => {
        stateSetter.songs = data;
        return APICalls.getFromJsonForUser("playlists", this.state.currentUser.userId)
      })
      .then(data => {
        stateSetter.playlists = data;
        return APICalls.getFromJsonForUser("songs_playlists", this.state.currentUser.userId)
      })
      .then(data => {
        stateSetter.songs_playlists = data;
        this.setState(stateSetter)
      })


  }


  componentDidMount() {
    this.refreshData();
  }

  buildDom() {

  }

  render() {

    return (


      <React.Fragment>
        <ApplicationManager/>
        <NavBar />
      </React.Fragment>
    )
  }
}