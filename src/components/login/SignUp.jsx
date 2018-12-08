import React, { Component } from 'react'
import LogIn from "./LogIn.jsx"
import { Link } from "react-router-dom"


export default class SignUp extends Component{


  render() {
    return (
      <div>
        <h3>SignUp</h3>

        <label>Name</label>
        <input id="signUpNameInput" onChange={(e) => this.props.handleFieldChange(e)} type = "text"/>

        <label>email</label>
        <input id = "signUpEmailInput" type = "email" onChange={(e) => this.props.handleFieldChange(e)}/>

        <label>Password</label>
        <input id = "signUpPassword" type="password" onChange={(e) => this.props.handleFieldChange(e)}/>

        <button onClick={()=> this.props.signUpSave()}>Create Account</button>
        <Link to="/login">Login</Link>


      </div>

    )
  }

}


