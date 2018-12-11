import React, { Component } from "react"
import APICalls from "../../modules/APICalls";
import PublisherView from './PublisherView.jsx'


export default class PublisherLanding extends Component {

state = {
  playlistKey: "",
  playlists: [],
  playlist: {},
  songs: [],
  playlistFound: false
}


componentDidMount () {
APICalls.getEmbedPlaylistFromJson('playlists', "songs_playlists")
.then(data => this.setState({playlists: data}))

}

keyCheck = () =>{
  let stateSetter={}
  let playlist = this.state.playlists.find(singlePlaylist => singlePlaylist.passKey === this.state.playlistKey)
  if (playlist){
    stateSetter.playlist = playlist
    console.log(playlist)
    let arrayOfPlaylistSongs = playlist.songs_playlists.map(playlistRel => {
      return APICalls.getOneFromJson('songs', playlistRel.songId)
    })
    Promise.all(arrayOfPlaylistSongs)
    .then(data => {
      console.log("data", data)
      stateSetter.songs = data
      stateSetter.playlistFound = true
      this.setState(stateSetter)


    })

  } else {alert("you failed")}
}

handleFieldChange = (evt) => {
  const stateToChange = {}
  stateToChange[evt.target.id] = evt.target.value
  this.setState(stateToChange)
}

render(){


if(!this.state.playlistFound) {
return(
  <div>
  <h3 className="h3">Enter Playlist Key</h3>
  <input className="form-control" type="text" id="playlistKey" value = {this.playlistKey} onChange = {this.handleFieldChange} />
  <button className = "btn btn-primary" onClick={this.keyCheck  }>Enter</button>
  </div>
)}
else if (this.state.playlistFound){
  return <PublisherView  playlist = {this.state.playlist} songs = {this.state.songs}/>
}



}
}