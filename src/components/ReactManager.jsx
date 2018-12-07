import React, { Component } from 'react'
import NavBar from "./nav/NavBar.jsx"
import ApplicationManager from "./ApplicationManager.jsx"
import APICalls from "../modules/APICalls"
import firebase from "firebase"


let storage = firebase.storage()


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

    //new song form
    uploader: 0,
    uploadedFileName: "",
    songDownloadURL: "",
    songTitleInput: "",
    songLyricInput: "",
    songCoWriters: "",
    songDuration: "",

    //playlists
    newPlaylistText: "",
    editTitleButtonClicked: false



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
      userId: this.state.currentUser.userId,
      downloadURL: this.state.songDownloadURL,
      lyric: this.state.songLyricInput,
      coWriters: this.state.songCoWriters,
      duration: this.state.songDuration
    }

    APICalls.saveToJson("songs", songObj)
      .then(() => APICalls.getFromJsonForUser("songs", this.state.currentUser.userId).then(data => {
        console.log(data)
        this.setState({ songs: data })
      }))

  }

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
      .then(() => APICalls.getFromJsonForUser("songs", this.state.currentUser.userId).then(data => {
        this.setState({ songs: data })

      }

      ))
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
      userId: this.state.currentUser.userId,
      password: "123abc",
      url: null

    }).then(() => APICalls.getFromJsonForUser("playlists", this.state.currentUser.userId)).then((data) => this.setState({ playlists: data }))
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
    const idOfPlaylistArray = evt.target.id.split('-');
    APICalls.updateItem("playlists", idOfPlaylistArray[1], { title: this.state[`editTitleButtonForm-${idOfPlaylistArray[1]}`] })
      .then(() => this.refreshData())

  }

  editTitleButton = () => {
    this.setState({ editTitleButtonClicked: true })
  }

  editTitleBackButton = () => {
    this.setState({ editTitleButtonClicked: false })
  }


  render() {
    if (this.state.pageLoaded)
      return (


        <React.Fragment>
          <NavBar passedState={this.state} />
          <ApplicationManager passedState={this.state}

            //playlists
            addSongToPlaylist={this.addSongToPlaylist} addPlaylist={this.addPlaylist}
            removeSongFromPlaylist={this.removeSongFromPlaylist} removePlaylist={this.removePlaylist} editTitleButton={this.editTitleButton}
            editTitleBackButton={this.editTitleBackButton} editPlaylistTitle={this.editPlaylistTitle}

            //songs
            deleteSongClick={this.deleteSongClick} fileUploader={this.fileUploader} handleFieldChange={this.handleFieldChange}
            newSongSave={this.newSongSave}



          />
        </React.Fragment >
      )
    else {
      return (<p> page loading....</p >)
    }
  }
}