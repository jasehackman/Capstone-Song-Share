import React, { Component } from 'react'
import { Link } from "react-router-dom"

export default class NavBar extends Component {


  render() {
    return(
      <div id="nav">
        <Link to="/playlists">Playlists</Link>
        <Link to = "/songs">Songs</Link>
        <Link to = "/profile">Profile</Link>
        <a href="http://localhost:3000/playlists" onClick={()=>this.props.logout()}>Logout</a>
      </div>
    )
  }
}