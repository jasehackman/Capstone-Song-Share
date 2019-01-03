import React, { Component } from "react"
import APICalls from "../../modules/APICalls";
import PublisherPlaylistView from './PublisherPlaylistView.jsx'


export default class PublisherLanding extends Component {

  state = {
    playlistKey: "",
    playlists: [],
    playlist: {},
    songs: [],
    playlistFound: false,
    songwriterName: ""
  }


  componentDidMount() {
    APICalls.getEmbedPlaylistFromJson('playlists', "songs_playlists")
      .then(data => this.setState({ playlists: data }))

  }

  keyCheck = () => {
    let stateSetter = {}
    let playlist = this.state.playlists.find(singlePlaylist => singlePlaylist.passKey === this.state.playlistKey)
    if (playlist) {
      stateSetter.playlist = playlist
      APICalls.getOneFromJson("users", playlist.userId)
        .then(data => {
        stateSetter.songwriterName = data.name
          let arrayOfPlaylistSongs = playlist.songs_playlists.sort((a,b)=> a.position - b.position).map(playlistRel => {
            return APICalls.getOneAndEmbed('songs', 'songs_playlists', playlistRel.songId)
          })
          Promise.all(arrayOfPlaylistSongs)
            .then(data => {
              stateSetter.songs = data
              stateSetter.playlistFound = true
              this.setState(stateSetter)


            })
        })

    } else { alert("you failed") }
  }

  handleFieldChange = (evt) => {
    const stateToChange = {}
    stateToChange[evt.target.id] = evt.target.value
    this.setState(stateToChange)
  }

  render() {


    if (!this.state.playlistFound) {
      return (
        <div>
          <h1 className="display-4">Pub Landing</h1>
          <div className="input-group input-group-lg mt-4">
            <div className="input-group-prepend">
              <span className="input-group-text" id="inputGroup-sizing-lg">Playlist PassKey</span>
            </div>
            <input className="form-control" type="text" id="playlistKey" value={this.playlistKey} onChange={this.handleFieldChange} />
            </div>
          <button className="btn btn-primary mt-2" onClick={this.keyCheck}>Enter</button>
        </div>
      )
    }
    else if (this.state.playlistFound) {
      return <PublisherPlaylistView playlist={this.state.playlist} songs={this.state.songs} songwriter={this.state.songwriterName}
      displayStringAsHTML={this.props.displayStringAsHTML}
      />
    }



  }
}