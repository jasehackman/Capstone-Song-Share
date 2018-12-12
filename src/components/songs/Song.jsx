import React, { Component } from "react"
import './song.css'
import EditSongModal from './EditSongModal.jsx'


export default class Song extends Component {

  state = {
    songPlayerClicked: false,
  }

  songClicked = () => {
    this.setState({ songPlayerClicked: true })
  }

  songUnClicked = () => {
    this.setState({ songPlayerClicked: false })
  }





  render() {


    //if a song is clicked
    if (this.state.songPlayerClicked) {
      return (
        <div className="song m-1 card p-2" >
          <div className="d-flex">
            <h3>{this.props.song.title}</h3>
            <div className="ml-auto">

              <EditSongModal editSongClick={this.props.editSongClick} editSongSave={this.props.editSongSave} song={this.props.song} passedState={this.props.passedState} handleFieldChange={this.props.handleFieldChange} />
              {/* <button className="btn btn-primary col m-3" id={`editSongButton-${this.props.song.id}`} onClick={(e) => this.props.editSongClick(e)}>Edit</button> */}
              <img src="images/trash.png" className="icon" alt="delete" id={`deleteSongButton-${this.props.song.id}`} onClick={(evt) => this.props.deleteSongClick(evt)} />
            </div>
          </div>
          <audio controls src={this.props.song.downloadURL}></audio>
          <div>
            <h3>Cowriter</h3>
            <p>{this.props.song.coWriters}</p>
            <h3>Lyric</h3>
            <p>{this.props.song.lyric}</p>
          </div>
          <img className="icon" onClick={() => this.songUnClicked()} alt="collapse" src="images/iconfinder_collapse2_308968.svg" />

        </div>
      )

    }



    else {
      return (
        <div className="song m-1 card p-2 row" >
          <div className="d-flex">
            <h3>{this.props.song.title}</h3>
            <div className="ml-auto">

              <EditSongModal editSongClick={this.props.editSongClick} editSongSave={this.props.editSongSave} song={this.props.song} passedState={this.props.passedState} handleFieldChange={this.props.handleFieldChange} />
              {/* <button className="btn btn-primary col m-3" id={`editSongButton-${this.props.song.id}`} onClick={(e) => this.props.editSongClick(e)}>Edit</button> */}
              <img src="images/trash.png" className="icon" alt="delete" id={`deleteSongButton-${this.props.song.id}`} onClick={(evt) => this.props.deleteSongClick(evt)} />
            </div>
          </div>

          <img className="icon" alt="expand" src="images/iconfinder_expand2_308964.svg" onClick={() => this.songClicked()} />
        </div>
      )

    }
  }
}