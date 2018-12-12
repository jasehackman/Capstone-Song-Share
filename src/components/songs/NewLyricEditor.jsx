
import React, { Component } from "react"
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

export default class LyricEditor extends React.Component {
  constructor(props) {
    super(props)

  }



  render() {
    return (
      <ReactQuill id ="editSongLyricInput" value={this.props.passedState.songLyricInput}
                  onChange={(e) => this.props.newFieldChange(e)} />
    )
  }
}