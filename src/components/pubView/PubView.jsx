import React, { Component } from "react"
import SongForPub from "./SongForPub.jsx"

export default class Playlist extends Component {






  render(){
    const playlist = this.props.playlists.find(playlist => playlist.id === parseInt(this.props.match.params.playlistsId)
      ) || {}



  //   //edit Title Button
  //   let editButtonForm
  //   if(this.props.passedState.editTitleButtonClicked){
  //     editButtonForm =
  //     <div>
  //       <input type = "text" id={"editTitleButtonForm-"+this.props.playlist.id} onChange = {(evt)=> this.props.handleFieldChange(evt)}/>
  //       <button id = {"savePlaylistTitle-"+this.props.playlist.id} onClick={(evt) => this.props.editPlaylistTitle(evt)}>Save Title</button>
  //       <button onClick={()=> this.props.editTitleBackButton()}>Back</button>
  //     </div>
  //   } else{
  //     editButtonForm = <div>
  //       <h1>{this.props.playlist.title}</h1>
  //       <button id = {"editPlaylistTitle-"+this.props.playlist.id} onClick={() => this.props.editTitleButton()}>Edit Title</button>
  //       <button id = {"deletePlaylist-"+this.props.playlist.id} onClick={(evt)=> this.props.removePlaylist(evt)}>Delete</button>
  //      </div>

  // }


  //if there are no songs in a playlist
    if(playlist.songs_playlists.length===0){
      return(
        <div>
          <h1>{this.props.playlist.title}</h1>
          <div>

          </div>



        </div>
      )
    }

    else{
    let arrayOfSongIds = playlist.songs_playlists.map(songid => {
      return songid.songId
    })


    let arrayOfSongs = arrayOfSongIds.map(songid => {
      return this.props.songs.filter(song => song.id===songid )
    })

    return(
      <div>
        <h1>{playlist.title}</h1>
        <div>
          {/* add songs */}

        </div>
        {/* Songs in playlists */}
        <div>
        {arrayOfSongs.map(song => {
         return <SongForPub key={song[0].id} song={song[0]}/>
        }

        )}

        </div>
      </div>
    )
  }
}
}