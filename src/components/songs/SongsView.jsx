import React, { Component } from "react"
import Song from './Song.jsx'
import NewSongModal from './NewSongModal.jsx'
export default class SongsView extends Component {


  render() {
    return (
      <React.Fragment>
        <div className="songList">
          <div className="d-flex">
            <h1 className="display-4">Saved Songs</h1>
            <div className="m-1 align-self-center ml-auto">
              <button type="button" class="btn btn-primary " data-toggle="modal" data-target="#exampleModalCenter">
                +
              </button>
            </div>
          </div>
          <div className="accordion">
            {this.props.songs.map(song =>
              <Song key={song.id} deleteSongClick={this.props.deleteSongClick} song={song} editSongClick={this.props.editSongClick}
                passedState={this.props.passedState} backSongClick={this.props.backSongClick} handleFieldChange={this.props.handleFieldChange}
                editSongSave={this.props.editSongSave} />
            )}
          </div>
        </div>

        {/* new song form */}

        <NewSongModal handleFieldChange={this.props.handleFieldChange} fileUploader={this.props.fileUploader} newSongSave={this.props.newSongSave} />

      </React.Fragment>
    )
  }
}


{/* <div key={song.id}>
          <h3>{song.title}</h3>

          <audio controls src={song.downloadURL}></audio>
        </div> */}