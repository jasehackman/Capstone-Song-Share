import React, { Component } from 'react'
import NavBar from "./nav/NavBar.jsx"
import ApplicationManager from "./ApplicationManager.jsx"
import APICalls from "../modules/APICalls"
import firebase from "firebase"



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

    songs_playlists: [],
    uploader: 0,
    uploadedFileName:"",
    songDownloadURL:""
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
    console.log(file.name);
    let fileName = file.name
    let uploadedSong = firebase.storage().ref(file.name)
    let task = uploadedSong.put(file)
    let songDownloadUrl = ""
    task.on('state_changed', (snapshot) => {
      let progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      console.log('Upload is ' + progress + '% done');
      switch (snapshot.state) {
        case firebase.storage.TaskState.PAUSED:
          console.log('Upload is paused');
          break;
        case firebase.storage.TaskState.RUNNING:
          console.log('Upload is running');
          break;
      }
    }, (error) => {
      console.log(error)
    },
     () => {

      task.snapshot.ref.getDownloadURL().then((downloadURL)=>{
        songDownloadUrl = downloadURL
        this.setState({
          uploadedFileName: fileName,
          songDownloadURL: downloadURL
        })})
      })
    };
    // let songDownloadURL = APICalls.getSingleSong(uploadedSong)
    // this.setState({
    //   uploadedFileName: fileName,
    //   songDownloadURL: songDownloadURL

    // })
    // task.on('state_changed',
    //   function progress(snapshot) {
    //     let percentage = (snapshot.bytesTransferred/snapshot.totalBytes) *100;
    //     console.log(percentage)

    //   }),
    //   function error(err) {

    //   },
    //   function complete() {

    //   }



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