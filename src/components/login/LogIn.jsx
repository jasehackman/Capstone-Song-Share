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
        let logUser = users.find(user =>
          this.state.email === user.email && this.state.password === user.password
        )

        if (logUser) {
          sessionStorage.setItem("id", logUser.id)
          this.props.refreshData()
        }

        else {
          alert("boo")
        }

      })

  }


  render() {
    return (
      <div>
        <h1 className="display-4">LogIn</h1>

          {/* <h3>Email</h3> */}
          <div className="input-group input-group-lg">
        <div className="input-group-prepend">
          <span className="input-group-text" id="inputGroup-sizing-lg">Email</span>
        </div>
          <input id="email" className="form-control m-2 " type="email"  onChange={(e) => this.handleFieldChange(e)} />
          </div>
          {/* <h3>Password</h3> */}
          <div className="input-group input-group-lg">
        <div className="input-group-prepend">
          <span className="input-group-text" id="inputGroup-sizing-lg">Password</span>
        </div>
          <input id="password" className="form-control m-2" type="password" onChange={(e) => this.handleFieldChange(e)} />
          </div>
          <button className="btn btn-primary  m-2 input-group-lg" placeholder = "password" onClick={() => this.loginCheck()} >Login</button>

          <Link className="btn btn-success" to="/signup">Sign Up</Link>

        </div>


    )
  }

}