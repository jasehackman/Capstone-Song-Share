import React, { Component } from 'react'
import LogIn from "./LogIn.jsx"

export default class SignUp extends Component{


  render() {
    return (
      <div>
        <h3>SignUp</h3>

        <label>email</label>
        <input type = "email"/>

        <label>Password</label>
        <input type="password"/>




      </div>

    )
  }

}


