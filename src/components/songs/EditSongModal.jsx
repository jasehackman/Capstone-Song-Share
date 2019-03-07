import React, { Component } from "react"
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import LyricEditor from './LyricEditor.jsx'
import "./song.css"

export default class EditSongModal extends Component {

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
        <img src="images/edit.png" className="icon" alt="edit" id={`editSongButton-${this.props.song.id}`} onClick={(e) => {
          this.props.editSongClick(e)
          this.toggle()

          }}/>
        <Modal className="myModal" isOpen={this.state.modal} toggle={this.toggle}>
          <ModalHeader toggle={this.toggle}>
            Edit Song
            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
            </button>
          </ModalHeader>

          <ModalBody>

            <div className="input-group input-group-lg">
              <div className="input-group-prepend">
                <span className="input-group-text" id="inputGroup-sizing-lg">Title</span>
              </div>
              <input className= "form-control" id="editSongTitleInput" value={this.props.passedState.editSongTitleInput} type="text" onChange={(evt) => this.props.handleFieldChange(evt)} />
             </div>
             <div className="input-group input-group-lg">
              <div className="input-group-prepend">
                <span className="input-group-text" id="inputGroup-sizing-lg">Lyric</span>
              </div>
              <LyricEditor passedState={this.props.passedState} handleFieldChange={this.props.handleFieldChange} editFieldChange={this.props.editFieldChange}/>
              </div>
              <div className="input-group input-group-lg mt-5">
              <div className="input-group-prepend">
                <span className="input-group-text" id="inputGroup-sizing-lg">CoWirter</span>
              </div>
              <input className= "form-control" id="editSongCoWriters" value={this.props.passedState.editSongCoWriters} type="text" onChange={(evt) => this.props.handleFieldChange(evt)} />
              </div>
              <div className="input-group input-group-lg">
              <div className="input-group-prepend">
                <span className="input-group-text" id="inputGroup-sizing-lg">Duration</span>
              </div>
              <input className= "form-control" id="editSongDuration" value={this.props.passedState.editSongDuration} type="text" onChange={(evt) => this.props.handleFieldChange(evt)}/>
            </div>
          </ModalBody>
          <ModalFooter>

            <button className = "btn btn-primary" onClick={() => {
              this.toggle()
              this.props.editSongSave()

              }}>Save</button>
            <button className = "btn btn-secondary" id={`editButtonBack-${this.props.song.id}`} onClick={this.toggle}>Back</button>
          </ModalFooter>
        </Modal>
      </React.Fragment>)
  }
}