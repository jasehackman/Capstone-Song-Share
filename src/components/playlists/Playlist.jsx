import React, { Component } from "react"
import Song from "../songs/Song.jsx"

export default class Playlist extends Component {


  render(){
    let arrayOfSongIds = this.props.songsIds.map(songid => {
      return songid.songId
    })
    // let arrayOfSongs = this.props.songs.map(song => {

    //   return arrayOfSongIds.filter(songId => songId === song.id)
    // })

    let arrayOfSongs = arrayOfSongIds.map(songid => {
      console.log(songid)
      return this.props.songs.filter(song => song.id===songid )
    })

    return(
      <div>
        <h1>{this.props.playlist.title}</h1>
        {arrayOfSongs.map(song => {
         return <Song key={song[0].id} song={song[0]}/>
        }

        )}


      </div>
    )
  }
}