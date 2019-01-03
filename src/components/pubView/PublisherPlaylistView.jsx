import React, { Component } from "react"
import SongForPub from "./SongForPub.jsx"


export default class PublisherPlaylistView extends Component {
  render(){

    //if there are no songs in a playlist
    if (this.props.playlist.songs_playlists.length === 0) {
      return (
        <div>
          <h1 className="display-4" >{this.props.playlist.title} by {this.props.songwriter}</h1>
          <div>
              <p>There are no songs in the playlist</p>
          </div>



        </div>
      )
    }

    else {

      return (
        <div className ="">
          <h1 className="display-4">{this.props.playlist.title} by {this.props.songwriter}</h1>
          <div>
            {/* add songs */}

          </div>
          {/* Songs in playlists */}
          <div>
            {this.props.songs.map(song => {

              return <SongForPub key={song.id} song={song} displayStringAsHTML={this.props.displayStringAsHTML} />
            }

            )}

          </div>
        </div>
      )
    }
  }
}