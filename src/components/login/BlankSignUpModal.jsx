
import React, { Component } from "react"
import { Modal, ModalHeader, ModalBody, ModalFooter} from 'reactstrap';

export default class BlankSignUpModal extends Component {

  constructor(props) {
    super(props);
    this.state = {
      modal: true
    };

    this.toggle = this.toggle.bind(this);
  }

  toggle() {
    this.setState({
      modal: !this.state.modal
    });
  }

  render() {
    return(
    <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
      <ModalHeader toggle={this.toggle}>Sign Up Alert</ModalHeader>
      <ModalBody>
          Fields cannot be blank.
          </ModalBody>
      <ModalFooter>
        <button className="btn btn-primary" onClick={() => {
          this.toggle()
          this.props.blankSignUpReset()
        }}>Back</button>
      </ModalFooter>
    </Modal>
    )
  }

}