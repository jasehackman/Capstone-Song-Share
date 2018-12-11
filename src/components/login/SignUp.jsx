import React, { Component } from 'react'
import { Link } from "react-router-dom"


export default class SignUp extends Component {


  render() {
    return (
      <div>
        <h1 className="display-4">Sign Up</h1>


        <div className="input-group input-group-lg">
          <div className="input-group-prepend">
            <span className="input-group-text" id="inputGroup-sizing-lg">Name</span>
          </div>
          <input className = "form-control" id="signUpNameInput" onChange={(e) => this.props.handleFieldChange(e)} type="text" />
        </div>

        <div className="input-group input-group-lg">
          <div className="input-group-prepend">
            <span className="input-group-text" id="inputGroup-sizing-lg">Email</span>
          </div>
          <input className = "form-control" id="signUpEmailInput" type="email" onChange={(e) => this.props.handleFieldChange(e)} />
        </div>

        <div className="input-group input-group-lg">
          <div className="input-group-prepend">
            <span className="input-group-text" id="inputGroup-sizing-lg">Password</span>
          </div>
          <input className = "form-control" id="signUpPassword" type="password" onChange={(e) => this.props.handleFieldChange(e)} />
        </div>
        <div className = "mt-4">
        <button className="btn btn-primary mr-2" onClick={() => this.props.signUpSave()}>Create Account</button>
        <Link className="btn btn-success" to="/login">Login</Link>
        </div>


      </div>

    )
  }

}


