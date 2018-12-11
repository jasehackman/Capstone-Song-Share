import React, { Component } from "react"
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Input } from 'reactstrap';

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
        <div className = "m-1 align-self-center ml-auto ">
        <button className="btn sm btn-primary" onClick={this.toggle} onClick={this.toggle}>+</button>
        </div>
        <Modal isOpen={this.state.modal} toggle={this.toggle}>
          <ModalHeader toggle={this.toggle}>
            New Playlist
          </ModalHeader>

          <ModalBody>
          <Input  bsSize="lg" className="form-control form-control-lg" type="text" id="newPlaylistText" placeholder= "Title" onChange={(evt)=>this.props.handleFieldChange(evt)}/>
          </ModalBody>
          <ModalFooter>
            <button className="btn"onClick={() => {this.props.addPlaylist(); this.toggle()  }}>Create Playlist</button>
            <button type="button" className="btn btn-secondary" onClick={this.toggle} >Close</button>
          </ModalFooter>
        </Modal>
      </React.Fragment>
    )

  }
}