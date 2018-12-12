import React, { Component } from "react"
import {Modal, ModalHeader, ModalBody, ModalFooter, Input } from 'reactstrap';
import LyricEditor from './LyricEditor.jsx'

export default class NewSongModal extends Component {


  constructor(props) {
    super(props);
    this.state = {
      modal: false
    };

    this.toggle = this.toggle.bind(this);
  }


  toggle() {
    this.setState({
      modal: !this.state.modal
    });
  }



  render() {



    return (

      <React.Fragment>
        <div className="m-1 align-self-center ml-auto">
          <button type="button" className="btn btn-primary " onClick={this.toggle}>
            +
    </button>
        </div>

        <Modal isOpen={this.state.modal} toggle={this.toggle}>
        <ModalHeader toggle={this.toggle}>

          Add New Song

        </ModalHeader>
        <ModalBody>
            <div className="input-group input-group-lg">
              <div className="input-group-prepend">
                <span className="input-group-text" id="inputGroup-sizing-lg">File Upload</span>
              </div>
            <progress id="uploader" value="0" max="100">0%</progress>
            <input id="songUpload" className="form-control-file" type="file" onChange={(e) => this.props.fileUploader(e)} />
           </div>
           <div className="input-group input-group-lg">
              <div className="input-group-prepend">
                <span className="input-group-text" id="inputGroup-sizing-lg">Title</span>
              </div>

            <input id="songTitleInput" className="form-control" type="text" onChange={(evt) => this.props.handleFieldChange(evt)} />
            </div>
            <div className="input-group input-group-lg">
              <div className="input-group-prepend">
                <span className="input-group-text" id="inputGroup-sizing-lg">Lyric</span>
              </div>
              <LyricEditor />
            {/* <textarea id="songLyricInput" className="form-control" type="text" onChange={(evt) => this.props.handleFieldChange(evt)} /> */}
            </div>
            <div className="input-group input-group-lg">
              <div className="input-group-prepend">
                <span className="input-group-text" id="inputGroup-sizing-lg">CoWriters</span>
              </div>
          <input id="songCoWriters" className="form-control" type="text" onChange={(evt) => this.props.handleFieldChange(evt)} />
            </div>
            <div className="input-group input-group-lg">
              <div className="input-group-prepend">
                <span className="input-group-text" id="inputGroup-sizing-lg">Duration</span>
              </div>

            <input id="songDuration" className="form-control" type="text" onChange={(evt) => this.props.handleFieldChange(evt)} />
            </div>
          </ModalBody>

          <ModalFooter>
          <button className = "btn btn-primary" onClick={() => this.props.newSongSave()}>Save</button>
          <button type="button" className="btn btn-secondary" onClick={this.toggle}>Close</button>
          </ModalFooter>
      </Modal>
      </React.Fragment >)
  }
}