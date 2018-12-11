import React, { Component } from 'react'
import { Link } from "react-router-dom"
import './nav.css'

export default class NavBar extends Component {


  render() {
    return(
      <div className="list-group list-group-flush" id="nav">
        <img className = "logo list-group-item "src='/images/Song-ShareVectorFinal.png' alt="logo"/>
        <Link className="logo list-group-item" to="/playlists">Playlists</Link>
        <Link className="logo list-group-item" to = "/songs">Songs</Link>
        <Link className="logo list-group-item" to = "/publisherLanding">PubLanding</Link>

        <a className="logo list-group-item" href="http://localhost:3000/playlists" onClick={()=>this.props.logout()}>Logout</a>
      </div>
    )
  }
}