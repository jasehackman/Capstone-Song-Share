import React, { Component } from "react"
import APICalls from "../../modules/APICalls";
import Playlist from "./Playlist.jsx"

export default class PlaylistsView extends Component {

  // isSongInPlaylist () {
  //   let songDivs = ""
  //   this.props.playlists.map(playlist => {
  //     console.log("playlist", playlist)
  //     this.props.songs_playlists.map(songOnPlaylist => {
  //       console.log("songOnPlaylist", songOnPlaylist)
  //       if(playlist.id===songOnPlaylist.playlistId){
  //         this.props.songs.map(song => {
  //           console.log("song", song)
  //           if(song.id===songOnPlaylist.songId){
  //             songDivs +=
  //             <div key={song.id}>
  //               <h3>{song.title}</h3>

  //               <audio controls src={song.downloadURL}></audio>
  //             </div>



  //           }
  //         })
  //       }
  //     })

  //   })
  //   console.log(songDivs)
  //   return songDivs

  // }

  // playlistSongs() {
  //   APICalls.getEmbedFromJson('playlists', 'songs_playlists')
  //     .then(data => {
  //       console.log("DATA", data);
  //       data.forEach(playlist => {

  //         return <div>
  //         {playlist.songs_playlists.map(song => {
  //           console.log("song", song)
  //           return <div key={song.id}>
  //             <h3>{song.title}</h3>

  //             <audio controls src={song.downloadURL}></audio>
  //           </div>
  //         })}
  //         </div>

  //       })
  //     })
  // }



  render() {



    return (
      <section>
        {/* {this.isSongInPlaylist()} */}
        {/* {this.playlistSongs()} */}
        <p>playlist</p>
        {this.props.playlists.map(playlist =>{
          return <Playlist key={playlist.id} playlist = {playlist} songsIds = {playlist.songs_playlists} songs={this.props.songs}/>

    })}
      </section>
    )
  }
}