import React, { Component } from 'react'
import NavBar from "./nav/NavBar.jsx"
import ApplicationManager from "./ApplicationManager.jsx"
import APICalls from "../modules/APICalls"
import firebase from "firebase"
import './reactManager.css'
import ReactHtmlParser from 'react-html-parser';


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

    songwriter: '',

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

  displayStringAsHTML = (htmlString) => {
    return <div>{ReactHtmlParser(htmlString)}</div>;
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
    APICalls.getEmbedFromJson("songs", 'songs_playlists', sessionStorage.getItem("id"))
      .then(data => {
        stateSetter.songs = data;
        return APICalls.getEmbedFromJson('playlists', 'songs_playlists', sessionStorage.getItem("id"))
      })
      .then(data => {
        stateSetter.playlists = data;
        return APICalls.getFromJsonForUser("songs_playlists", sessionStorage.getItem("id"))
      })
      .then(data => {
        stateSetter.editTitleButtonClicked = 0;
        stateSetter.songs_playlists = data;
        return APICalls.getOneFromJson("users", sessionStorage.getItem("id"))
      })
      .then(data => {
        stateSetter.songwriter = data.name
        this.setState(stateSetter)
        this.setState({ pageLoaded: true })
      })


  }

  handleFieldChange = (evt) => {
    const stateToChange = {}
    stateToChange[evt.target.id] = evt.target.value
    this.setState(stateToChange)
  }

  editFieldChange = (value) => {
    this.setState({editSongLyricInput: value})
  }

  newFieldChange = (value) => {
    this.setState({songLyricInput: value})
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
      .then(() => APICalls.getEmbedFromJson("songs", 'songs_playlists', sessionStorage.getItem("id")).then(data => {
        this.setState({
          songs: data,
          songTitleInput: "",
          uploadedFileName: "",
          songDownloadURL: "",
          songLyricInput: "",
          songCoWriters: "",
          songDuration: ""
         })
      }))

  }

  //deleteSongs
  deleteSongClick = (evt) => {
    const idOfSongArray = evt.target.id.split('-');


    //test
    APICalls.getOneFromJson("songs", idOfSongArray[1])
    .then(data => {
      console.log("file name", data.fileName)
    let songRef = storage.ref(data.fileName);
      songRef.delete().then(() => {
        console.log("file deleted")
      }).catch((error) =>{
        console.log(error)
      });
    })

    APICalls.deleteItem("songs", idOfSongArray[1])
      .then(() => APICalls.getFromJsonForUser("songs", sessionStorage.getItem("id")).then(data => {
        this.setState({ songs: data }, this.refreshData())

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

    }).then(() => APICalls.getEmbedFromJson("songs", 'songs_playlists', sessionStorage.getItem("id"))
    .then(data => {
      this.setState({
        songs: data,
        editSongButtonClick: 0
      })

    }))
  }

  backSongClick = (e) => {
    this.setState({editSongButtonClick: 0})

  }


  //Playlists-----------------------------------------------------------------------------------------
  moveSongUp = (evt) => {
    //first number is position number, second number is id number

    const relationshipArray = evt.target.id.split('-');
    const positionNumb = Number(relationshipArray[1])
    const relationshipId = Number(relationshipArray[2])
    const playlistId = Number(relationshipArray[3])

    const otherSongToChange = this.state.songs_playlists.filter(relationship => relationship.playlistId === playlistId && relationship.position === positionNumb -1)


    APICalls.updateItem('songs_playlists', relationshipId, {position: positionNumb-1})
    .then(() => APICalls.updateItem('songs_playlists', otherSongToChange[0].id, {position: otherSongToChange[0].position+1})
    .then(() => this.refreshData()))
  }
  moveSongDown = (evt) => {
    //first number is position number, second number is id number

    const relationshipArray = evt.target.id.split('-');
    const positionNumb = Number(relationshipArray[1])
    const relationshipId = Number(relationshipArray[2])
    const playlistId = Number(relationshipArray[3])

    const otherSongToChange = this.state.songs_playlists.filter(relationship => relationship.playlistId === playlistId && relationship.position === positionNumb +1)

    APICalls.updateItem('songs_playlists', relationshipId, {position: positionNumb+1})
    .then(() => APICalls.updateItem('songs_playlists', otherSongToChange[0].id, {position: otherSongToChange[0].position-1})
    .then(() => this.refreshData()))
  }


  addSongToPlaylist = (evt) => {

    const idOfSong = Number(evt.target.value);
    const idOfPlaylistArray = evt.target.id.split('-');
    const idOfPlaylist = Number(idOfPlaylistArray[1])

    //gather the number of songs in the playlist
    let playlistSongs = this.state.playlists.filter(playlist => playlist.id === idOfPlaylist)
    let songsArrayLength = playlistSongs[0].songs_playlists.length

    APICalls.saveToJson('songs_playlists', {
      songId: idOfSong,
      playlistId: idOfPlaylist,
      position: songsArrayLength + 1
    }).then(() => this.refreshData())
  }

  deleteSongFromPlaylist = (evt) => {
   //first number is position number, second number is id number

   const idOfPlaylistArray = evt.target.id.split('-');
   const idOfPlaylist = Number(idOfPlaylistArray[3])
   const relId = Number(idOfPlaylistArray[2])
   const idOfSong = Number(idOfPlaylistArray[4]);

    const arrayOfSongs = this.state.songs_playlists.filter(relationship => relationship.playlistId === idOfPlaylist)
    const objOfCorrectRelationship = arrayOfSongs.filter(relationship => relationship.songId === idOfSong)
    let deletedSongPosition = objOfCorrectRelationship[0].position

    let promises = arrayOfSongs.filter(song => {
      //deletes the selected song
      if (song.songId === idOfSong){
        return APICalls.deleteItem('songs_playlists', song.id)
      }
      //changes the position number of the songs in the playlists
      else if(song.position > deletedSongPosition){
        return APICalls.updateItem("songs_playlists", song.id, {position: (song.position-1)})
      }
    } )
    Promise.all(promises).then(this.refreshData())
  }

  removeSongFromPlaylist = (evt) => {

    const idOfSong = Number(evt.target.value);
    const idOfPlaylistArray = evt.target.id.split('-');
    const idOfPlaylist = Number(idOfPlaylistArray[1])


    const arrayOfSongs = this.state.songs_playlists.filter(relationship => relationship.playlistId === idOfPlaylist)
    const objOfCorrectRelationship = arrayOfSongs.filter(relationship => relationship.songId === idOfSong)
    let deletedSongPosition = objOfCorrectRelationship[0].position

    let promises = arrayOfSongs.filter(song => {
      //deletes the selected song
      if (song.songId === idOfSong){
        return APICalls.deleteItem('songs_playlists', song.id)
      }
      //changes the position number of the songs in the playlists
      else if(song.position > deletedSongPosition){
        return APICalls.updateItem("songs_playlists", song.id, {position: (song.position-1)})
      }
    } )
    Promise.all(promises).then(this.refreshData())
  }

  addPlaylist = () => {
    APICalls.saveToJson("playlists", {
      title: this.state.newPlaylistText,
      userId: Number(sessionStorage.getItem("id")),
      passKey: (Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)),

    }).then(() => this.refreshData())

  }

  removePlaylist = (evt) => {
    const idOfPlaylistArray = evt.target.id.split('-');
    console.log(evt.target.id)
    const arrayOfSongsinPlaylist = this.state.songs_playlists.filter(relationship => relationship.playlistId === Number(idOfPlaylistArray[1]))
    console.log(arrayOfSongsinPlaylist)
    let arrayOfPromises = arrayOfSongsinPlaylist.map(relationship => {
      return APICalls.deleteItem("songs_playlists", relationship.id)
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
          refreshData={this.refreshData} signUpSave={this.signUpSave} displayStringAsHTML={this.displayStringAsHTML}

            //playlists
            addSongToPlaylist={this.addSongToPlaylist} addPlaylist={this.addPlaylist}
            removeSongFromPlaylist={this.removeSongFromPlaylist} removePlaylist={this.removePlaylist} editTitleButton={this.editTitleButton}
            editTitleBackButton={this.editTitleBackButton} editPlaylistTitle={this.editPlaylistTitle} newFieldChange={this.newFieldChange}
            deleteSongFromPlaylist={this.deleteSongFromPlaylist}

            //songs
            deleteSongClick={this.deleteSongClick} fileUploader={this.fileUploader} handleFieldChange={this.handleFieldChange}
            newSongSave={this.newSongSave} editSongClick={this.editSongClick} backSongClick = {this.backSongClick}
            editSongSave={this.editSongSave} editFieldChange={this.editFieldChange} moveSongUp = {this.moveSongUp} moveSongDown = {this.moveSongDown}



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