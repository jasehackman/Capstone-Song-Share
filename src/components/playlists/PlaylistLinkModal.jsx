import React, { Component } from "react"
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

export default class PlaylistLinkModal extends Component {

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
        <img src='images/link-symbol.svg' className='icon' alt='playlistLink' id={'linkPlaylist-' + this.props.playlist.id} onClick={this.toggle} />

        <Modal isOpen={this.state.modal} toggle={this.toggle}>
          <ModalHeader toggle={this.toggle}>
            Playlist PassKey
          </ModalHeader>

          <ModalBody>
            <p className="text-center">{this.props.playlist.passKey}</p>
          </ModalBody>
          <ModalFooter>
          <a className="btn btn-primary" href={"http://localhost:3000/playlists/"+this.props.playlist.id} role="button">Preview</a>
            <button type="button" className="btn btn-secondary" onClick={this.toggle} >Close</button>
          </ModalFooter>
        </Modal>
      </React.Fragment>
    )

  }
}