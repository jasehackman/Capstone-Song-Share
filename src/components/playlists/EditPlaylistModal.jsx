import React, { Component } from "react"
import { Modal, ModalHeader, ModalBody, ModalFooter, Input } from 'reactstrap';

export default class NewPlaylistModal extends Component {

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
       <img src="images/edit.png" className="icon" alt="edit" id={"editPlaylistTitle-" + this.props.playlist.id} onClick={(evt) => {
         this.props.editTitleButton(evt)
         this.toggle()
       }} />

        <Modal isOpen={this.state.modal} toggle={this.toggle}>
          <ModalHeader toggle={this.toggle}>
            Edit Playlist Title
          </ModalHeader>

          <ModalBody>
          <Input  bsSize="lg" className="form-control form-control-lg" type="text" id="editPlaylistTitle" value={this.props.passedState.editPlaylistTitle} onChange={(evt)=>this.props.handleFieldChange(evt)}/>
          </ModalBody>
          <ModalFooter>
            <button className="btn"onClick={(e) => {this.props.editPlaylistTitle(e); this.toggle()  }}>Save</button>
            <button type="button" className="btn btn-secondary" onClick={this.toggle} >Close</button>
          </ModalFooter>
        </Modal>
      </React.Fragment>
    )

  }
}