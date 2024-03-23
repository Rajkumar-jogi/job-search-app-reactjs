import {Redirect} from 'react-router-dom'

import {Component} from 'react'

import Cookies from 'js-cookie'

import './index.css'

class LoginRoute extends Component {
  state = {
    enteredUsername: '',
    enteredPassword: '',
    showSubmitError: false,
    errorMsg: '',
  }

  renderHomePage = jwtToken => {
    Cookies.set('jwt_token', jwtToken, {expires: 30})
    const {history} = this.props
    history.replace('/')
  }

  makeApiRequest = async (loginUrl, options) => {
    const response = await fetch(loginUrl, options)
    const data = await response.json()
    // console.log(data)
    // console.log(response)
    if (response.ok) {
      this.renderHomePage(data.jwt_token)
    } else {
      this.setState({showSubmitError: true, errorMsg: data.error_msg})
    }
  }

  onFormSubmit = event => {
    event.preventDefault()

    const {enteredUsername, enteredPassword} = this.state
    const userDetails = {username: enteredUsername, password: enteredPassword}
    const loginUrl = 'https://apis.ccbp.in/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }

    this.makeApiRequest(loginUrl, options)
  }

  onChangeUsername = event => {
    this.setState({enteredUsername: event.target.value})
  }

  onChangePassword = event => {
    this.setState({enteredPassword: event.target.value})
  }

  render() {
    const {enteredUsername, enteredPassword, showSubmitError, errorMsg} =
      this.state
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }
    return (
      <div className="login-route-container">
        <form className="form" onSubmit={this.onFormSubmit}>
          <div className="logo-image-container">
            <img
              src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
              alt="website logo"
              className="website-logo"
            />
          </div>
          <div className="input-field-container">
            <label htmlFor="username" className="label-text">
              USERNAME
            </label>
            <input
              id="username"
              type="text"
              className="user-input-element"
              onChange={this.onChangeUsername}
              value={enteredUsername}
            />
          </div>
          <div className="input-field-container">
            <label htmlFor="password" className="label-text">
              PASSWORD
            </label>
            <input
              id="password"
              type="password"
              className="user-input-element"
              onChange={this.onChangePassword}
              value={enteredPassword}
            />
          </div>
          <button className="login-button" type="submit">
            Login
          </button>
          {showSubmitError ? <p className="error-message">*{errorMsg}</p> : ''}
        </form>
      </div>
    )
  }
}
export default LoginRoute
