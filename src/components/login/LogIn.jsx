import React, { Component } from 'react'
import SignUp from "./SignUp.jsx"
import APICalls from "../../modules/APICalls"
import { Link } from "react-router-dom"


export default class LogIn extends Component {

  state = {
    email: '',
    password: ''

  }

  handleFieldChange = (evt) => {
    const stateToChange = {}
    stateToChange[evt.target.id] = evt.target.value
    this.setState(stateToChange)
  }

  loginCheck = () => {
    APICalls.getAllFromJson("users")
      .then(users => {
        users.forEach(user => {
          console.log(user)
          if (this.state.email === user.email && this.state.password === user.password) {
            sessionStorage.setItem("id", user.id)
            this.props.refreshData()
          } else {
            alert("boo")
          }

        })

      })
  }

  render() {
    return (
      <div>
        <h3>LogIn</h3>
        <div className="form-group">
          <label>Email</label>

          <input id="email" className="form-control m-2" type="email" onChange={(e) => this.handleFieldChange(e)} />

          <label>Password</label>
          <input id="password" className="form-control m-2" type="password" onChange={(e) => this.handleFieldChange(e)} />

          <button className="btn btn-sm m-2"onClick={() => this.loginCheck()} >Login</button>

          <Link to="/signup">Sign Up</Link>

        </div>

      </div>
    )
  }

}