import React, { Component } from 'react'
import NavBar from "./nav/NavBar.jsx"
import ApplicationManager from "./ApplicationManager.jsx"
import APICalls from "../modules/APICalls"
import firebase from "firebase"
import './reactManager.css'

let storage = firebase.storage()


export default class ReactManager extends Component {

  state = {
    pageLoaded: false,

    //Login

    loggedIn: false,

    //need to reset with login
    currentUser:
    {
      userId: 1
    },

    songs: [],

    playlists: [],

    songs_playlists: [],

    //new song form
    uploader: 0,
    uploadedFileName: "",
    songDownloadURL: "",
    songTitleInput: "",
    songLyricInput: "",
    songCoWriters: "",
    songDuration: "",

    //edit song
    editSongButtonClick: 0,
    editSongTitleInput: "",
    editSongLyricInput: "",
    editSongCoWriters: "",
    editSongDuration: "",

    //playlists
    newPlaylistText: "",
    editTitleButtonClicked: 0,
    editPlaylistTitle: "",

    //Sign Up
    signUpNameInput: "",
    signUpEmailInput: "",
    signUpPassword: ""




  }

  //Login/out ---------------------------------------------------------------------------------------------

  logout = () => {
    sessionStorage.removeItem('id')

  }

  //Sign Up ----------------------------------------------------------------------------------------
  signUpSave = () => {
    APICalls.getAllFromJson("users")
    .then(data => {
      data.forEach(user => {
        if(user.email===this.state){
          return alert("Account with that email already exists")
        }
      })
      APICalls.saveToJson("users",{
        name: this.state.signUpNameInput,
        email: this.state.signUpEmailInput,
        password: this.state.signUpPassword
      }).then(data => {
        sessionStorage.setItem("id", data.id)
        this.refreshData()
      })
    })
  }


  refreshData = () => {
    let stateSetter = {}
    APICalls.getFromJsonForUser("songs", sessionStorage.getItem("id"))
      .then(data => {
        stateSetter.songs = data;
        return APICalls.getEmbedFromJson('playlists', 'songs_playlists', sessionStorage.getItem("id"))
      })
      .then(data => {
        stateSetter.playlists = data;
        return APICalls.getFromJsonForUser("songs_playlists", sessionStorage.getItem("id"))
      })
      .then(data => {
        stateSetter.editTitleButtonClicked = false;
        stateSetter.songs_playlists = data;
        this.setState(stateSetter)
        this.setState({ pageLoaded: true })
      })


  }

  handleFieldChange = (evt) => {
    const stateToChange = {}
    stateToChange[evt.target.id] = evt.target.value
    this.setState(stateToChange)
  }

  componentDidMount() {
    this.refreshData();
  }

  //Songs-----------------------------------------------------------------------------------------------------

  //uploading a song to firebase
  fileUploader = (e) => {
    let file = e.target.files[0];
    //file name to save in database
    let fileName = file.name

    //reference to the file location on firebase
    let uploadedSong = firebase.storage().ref(file.name)
    //uploading the song
    let task = uploadedSong.put(file)
    let songDownloadUrl = ""
    //an open connection to the status of that upload
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
        //getting the download url
        task.snapshot.ref.getDownloadURL().then((downloadURL) => {
          songDownloadUrl = downloadURL

          //setting the download url and file name to state
          this.setState({
            uploadedFileName: fileName,
            songDownloadURL: downloadURL
          })
        })
      })
  };

  //someone submits a new song
  newSongSave = () => {

    let songObj = {
      title: this.state.songTitleInput,
      fileName: this.state.uploadedFileName,
      userId: Number(sessionStorage.getItem("id")),
      downloadURL: this.state.songDownloadURL,
      lyric: this.state.songLyricInput,
      coWriters: this.state.songCoWriters,
      duration: this.state.songDuration
    }

    APICalls.saveToJson("songs", songObj)
      .then(() => APICalls.getFromJsonForUser("songs", sessionStorage.getItem("id")).then(data => {
        console.log(data)
        this.setState({ songs: data })
      }))

  }

  //deleteSongs
  deleteSongClick = (evt) => {
    const idOfSongArray = evt.target.id.split('-');


    //test
    APICalls.getOneFromJson("songs", idOfSongArray[1])
    .then(data => {
    let songRef = storage.ref(data.fileName);
      songRef.delete().then(() => {
        alert("file deleted")
      }).catch((error) =>{
        alert(error)
      });
    })

    APICalls.deleteItem("songs", idOfSongArray[1])
      .then(() => APICalls.getFromJsonForUser("songs", sessionStorage.getItem("id")).then(data => {
        this.setState({ songs: data })

      }

      ))
  }

  //editSongs

  editSongClick = (e) => {
    let songId = e.target.id.split('-')
    APICalls.getOneFromJson("songs", Number(songId[1]))
    .then(data =>
    this.setState({

      editSongButtonClick: Number(songId[1]),
      editSongTitleInput: data.title,
      editSongLyricInput: data.lyric,
      editSongCoWriters: data.coWriters,
      editSongDuration: data.duration,

    }))
  }

  editSongSave = () => {
    APICalls.updateItem("songs", this.state.editSongButtonClick, {
      title: this.state.editSongTitleInput,
      lyric: this.state.editSongLyricInput,
      coWriters: this.state.editSongCoWriters,
      duration: this.state.editSongDuration

    }).then(() => APICalls.getFromJsonForUser("songs",sessionStorage.getItem("id"))
    .then(data => {
      this.setState({
        songs: data,
        editSongButtonClick: 0
      })

    }))
  }

  backSongClick = (e) => {
    let buttonId = e.target.id
    let buttonNumber = buttonId.split('-')
    let setId = `editSongButton-${Number(buttonNumber[1])}`
    this.setState({editSongButtonClick: 0})

  }


  //Playlists-----------------------------------------------------------------------------------------
  addSongToPlaylist = (evt) => {

    const idOfSong = Number(evt.target.value);
    const idOfPlaylistArray = evt.target.id.split('-');
    const idOfPlaylist = Number(idOfPlaylistArray[1])
    APICalls.saveToJson('songs_playlists', {
      songId: idOfSong,
      playlistId: idOfPlaylist
    }).then(() => this.refreshData())
  }

  removeSongFromPlaylist = (evt) => {

    const idOfSong = Number(evt.target.value);
    const idOfPlaylistArray = evt.target.id.split('-');
    const idOfPlaylist = Number(idOfPlaylistArray[1])
    const arrayOfSongs = this.state.songs_playlists.filter(relationship => relationship.playlistId === idOfPlaylist)
    const objOfCorrectRelationship = arrayOfSongs.filter(relationship => relationship.songId === idOfSong)
    APICalls.deleteItem('songs_playlists', objOfCorrectRelationship[0].id)
      .then(() => this.refreshData())
  }

  addPlaylist = () => {
    APICalls.saveToJson("playlists", {
      title: this.state.newPlaylistText,
      userId: Number(sessionStorage.getItem("id")),
      password: "123abc",
      url: null

    }).then(() => this.refreshData())

    //The bellow code broke. See if you can just render playlist and get it to work
    // APICalls.getFromJsonForUser("playlists", sessionStorage.getItem("id"))).then((data) => this.setState({ playlists: data }))
  }

  removePlaylist = (evt) => {
    const idOfPlaylistArray = evt.target.id.split('-');
    console.log(evt.target.id)
    const arrayOfSongsinPlaylist = this.state.songs_playlists.filter(relationship => relationship.playlistId === Number(idOfPlaylistArray[1]))
    console.log(arrayOfSongsinPlaylist)
    let arrayOfPromises = arrayOfSongsinPlaylist.map(relationship => {
      APICalls.deleteItem("songs_playlists", relationship.id)
    })
    Promise.all(arrayOfPromises).then(() => APICalls.deleteItem("playlists", idOfPlaylistArray[1])).then(() => this.refreshData())

  }

  editPlaylistTitle = (evt) => {

    APICalls.updateItem("playlists", this.state.editTitleButtonClicked, { title: this.state.editPlaylistTitle })
      .then(() => this.refreshData())

  }

  editTitleButton = (evt) => {
    const idOfPlaylistArray = evt.target.id.split('-');
    APICalls.getOneFromJson('playlists', Number(idOfPlaylistArray[1]))
    .then(playlist => {
      this.setState({
        editTitleButtonClicked: Number(idOfPlaylistArray[1]),
        editPlaylistTitle: playlist.title
      })
    })
  }

  editTitleBackButton = () => {
    this.setState({ editTitleButtonClicked: false })
  }


  render() {
    if (this.state.pageLoaded)
      return (

        <div className="container">
        <div className="row">
          <div className="col-2">
          <NavBar passedState={this.state} logout = {this.logout}/>
          </div>
          <div className="col-8 container mainContainer">
          <ApplicationManager passedState={this.state}
          refreshData={this.refreshData} signUpSave={this.signUpSave}

            //playlists
            addSongToPlaylist={this.addSongToPlaylist} addPlaylist={this.addPlaylist}
            removeSongFromPlaylist={this.removeSongFromPlaylist} removePlaylist={this.removePlaylist} editTitleButton={this.editTitleButton}
            editTitleBackButton={this.editTitleBackButton} editPlaylistTitle={this.editPlaylistTitle}

            //songs
            deleteSongClick={this.deleteSongClick} fileUploader={this.fileUploader} handleFieldChange={this.handleFieldChange}
            newSongSave={this.newSongSave} editSongClick={this.editSongClick} backSongClick = {this.backSongClick}
            editSongSave={this.editSongSave}



          />
          </div>
        </div >
        </div>
      )
    else {
      return (<p> page loading....</p >)
    }
  }
}