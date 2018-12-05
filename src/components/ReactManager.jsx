import React, { Component } from 'react'
import NavBar from "./nav/NavBar.jsx"
import ApplicationManager from "./ApplicationManager.jsx"
import APICalls from "../modules/APICalls"



export default class ReactManager extends Component {

  state = {
    pageLoaded: false,

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
        return APICalls.getEmbedFromJson('playlists', 'songs_playlists', this.state.currentUser.userId)
      })
      .then(data => {
        stateSetter.playlists = data;
        return APICalls.getFromJsonForUser("songs_playlists", this.state.currentUser.userId)
      })
      .then(data => {
        stateSetter.songs_playlists = data;
        this.setState(stateSetter)
        this.setState({pageLoaded: true})
      })


  }


  componentDidMount() {
    this.refreshData();
  }

  fileUploader = (e) => {
    let file = e.target.files[0];
    console.log(file);
  }
  render() {
    if(this.state.pageLoaded)
    return (


      <React.Fragment>
        <NavBar passedState={this.state}/>
        <ApplicationManager passedState={this.state} fileUploader = {this.fileUploader} />
      </React.Fragment>
    )
    else{return(<p>page loading....</p>)}
  }
}