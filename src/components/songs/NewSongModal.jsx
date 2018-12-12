import React, { Component } from "react"

export default class NewSongModal extends Component {






  render() {



    return (

      <div className="modal fade" id="exampleModalCenter" tabIndex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered" role="document">
          <div className="modal-content ">
            <div className="modal-header">
              <h1>Add New Song</h1>
              <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <div className="form-group">
              <progress id="uploader" value="0" max="100">0%</progress>
              <input id="songUpload" className="form-control-file" type="file" onChange={(e) => this.props.fileUploader(e)} />
              <label>Title</label>
              <input id="songTitleInput" className="form-control" type="text" onChange={(evt) => this.props.handleFieldChange(evt)} />
              <label>Lyric</label>
              <textarea id="songLyricInput" className="form-control" type="text" onChange={(evt) => this.props.handleFieldChange(evt)} />
              <label>Co-Writers</label>
              <input id="songCoWriters" className="form-control" type="text" onChange={(evt) => this.props.handleFieldChange(evt)} />
              <label>Duration</label>
              <input id="songDuration" className="form-control" type="text" onChange={(evt) => this.props.handleFieldChange(evt)} />
            </div>
            </div>
            <div className="modal-footer">
              <button onClick={() => this.props.newSongSave()}>Save</button>
              <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
            </div>
          </div>
        </div>
      </div>)
  }
}