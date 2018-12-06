import React, { Component } from "react"
import Song from "../songs/Song.jsx"

export default class Playlist extends Component {


  render(){

    if(this.props.songsIds.length===0){
      return(
        <div>
          <h1>{this.props.playlist.title}</h1>
          <div>
            <label>Add A Song</label>
            <select id={"addSongToPlaylist-" + this.props.playlist.id} value = "pick a song" onChange = {(evt)=> this.props.addSongToPlaylist(evt)}>
              <option>Select A Song</option>
              {this.props.songs.map(song => {
                return <option key={song.id} value={song.id}>{song.title}</option>
              })}

            </select>

          </div>



        </div>
      )
    }

    else{
    let arrayOfSongIds = this.props.songsIds.map(songid => {
      return songid.songId
    })


    let arrayOfSongs = arrayOfSongIds.map(songid => {
      return this.props.songs.filter(song => song.id===songid )
    })

    return(
      <div>
        <h1>{this.props.playlist.title}</h1>
        <div>
          <label>Add A Song</label>
          <select id={"addSongToPlaylist-" + this.props.playlist.id} value = "pick a song" onChange = {(evt)=> this.props.addSongToPlaylist(evt)}>
            <option>Select A Song</option>
            {this.props.songs.map(song => {
              if(!arrayOfSongIds.includes(song.id))
              return <option key={song.id} value={song.id}>{song.title}</option>
            })}

          </select>

        </div>
        {arrayOfSongs.map(song => {
         return <Song key={song[0].id} song={song[0]}/>
        }

        )}


      </div>
    )
  }}
}