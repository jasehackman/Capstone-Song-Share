import React, { Component } from 'react'
import APICalls from "../../modules/APICalls"
import { Link } from "react-router-dom"
import LoginAlertModal from './LoginAlertModal.jsx'


export default class LogIn extends Component {

  state = {
    email: '',
    password: '',
    loginStuff: ""

  }

  handleFieldChange = (evt) => {
    const stateToChange = {}
    stateToChange[evt.target.id] = evt.target.value
    this.setState(stateToChange)
  }

  resetLoginState = () => {
    this.setState({loginStuff: ""})
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

          this.props.refreshData()
          this.setState({loginStuff: <LoginAlertModal  resetLoginState = {this.resetLoginState}/>})

        }

      })

  }


  render() {

    return (
      <div>
        <h1 className="display-4">Login</h1>
        <div className="input-group input-group-lg">
          <div className="input-group-prepend">
            <span className="input-group-text" id="inputGroup-sizing-lg">Email</span>
          </div>
          <input id="email" className="form-control m-2 " type="email" onChange={(e) => this.handleFieldChange(e)} />
        </div>
        <div className="input-group input-group-lg">
          <div className="input-group-prepend">
            <span className="input-group-text" id="inputGroup-sizing-lg">Password</span>
          </div>
          <input id="password" className="form-control m-2" type="password" onChange={(e) => this.handleFieldChange(e)} />
        </div>
        <button className="btn btn-primary  m-2 input-group-lg" placeholder="password" onClick={() => this.loginCheck()} >Login</button>
        <Link className="btn btn-success" to="/signup">Sign Up</Link>
        {this.state.loginStuff}
      </div>


    )
  }

}