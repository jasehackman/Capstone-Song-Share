import React, { Component } from "react"
import SongForPub from "./SongForPub.jsx"

export default class Playlist extends Component {






  render(){
    const playlist = this.props.playlists.find(playlist => playlist.id === parseInt(this.props.match.params.playlistsId)
      ) || 0
    console.log(playlist)
  if(playlist === 0){
      return(<p>playlist does not exist</p>)
  }


  //if there are no songs in a playlist
  else if(playlist.songs_playlists.length===0){
      return(
        <div>
          <h1 className = "display-4">{playlist.title}</h1>
          <div>
            <p>There are no songs in this playlist. </p>
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
        <h1 className = "display-4">{playlist.title}</h1>
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