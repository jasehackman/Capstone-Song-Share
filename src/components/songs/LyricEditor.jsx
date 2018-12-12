
import React, { Component } from "react"
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

export default class LyricEditor extends React.Component {
  constructor(props) {
    super(props)
    // this.state = { text: '' } // You can also pass a Quill Delta here
    // this.handleChange = this.handleChange.bind(this)
  }

  // handleChange(value) {
  //   this.setState({ text: value })
  // }

  render() {
    return (
      <ReactQuill id ="editSongLyricInput" value={this.props.passedState.editSongLyricInput}
                  onChange={(e) => this.props.editFieldChange(e)} />
    )
  }
}