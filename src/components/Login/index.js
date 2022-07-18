import {Component} from 'react'
import Cookies from 'js-cookie'
import {Redirect} from 'react-router-dom'
import './index.css'

class Login extends Component {
  state = {username: '', password: '', isSubmittedFail: false, errMsg: ''}

  onChangeUsername = event => {
    this.setState({username: event.target.value})
  }

  onChangePassword = event => {
    this.setState({password: event.target.value})
  }

  onSubmitSuccess = jwtToken => {
    Cookies.set('jwt_token', jwtToken, {expires: 1})
    const {history} = this.props
    history.replace('/')
  }

  onSubmitFailure = errMsg => {
    this.setState({isSubmittedFail: true, errMsg})
  }

  onSubmitting = async event => {
    event.preventDefault()
    const {username, password} = this.state
    const userDetails = {username, password}
    const url = 'https://apis.ccbp.in/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const response = await fetch(url, options)
    const data = await response.json()
    console.log(data)
    if (response.ok === true) {
      this.onSubmitSuccess(data.jwt_token)
    }
    if (data.status_code === 400) {
      this.onSubmitFailure(data.error_msg)
    }
  }

  render() {
    const {username, password, isSubmittedFail, errMsg} = this.state
    const token = Cookies.get('jwt_token')
    if (token !== undefined) {
      return <Redirect to="/" />
    }
    return (
      <div className="container">
        <div>
          <form className="formContainer" onSubmit={this.onSubmitting}>
            <img
              src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
              alt="website logo"
              className="logo"
            />
            <br />
            <div className="inputContainer">
              <label htmlFor="username" className="text">
                USERNAME
              </label>
              <input
                type="text"
                className="inputBox"
                id="username"
                placeholder="Username"
                value={username}
                onChange={this.onChangeUsername}
              />
            </div>
            <br />
            <div className="inputContainer">
              <label htmlFor="password" className="text">
                PASSWORD
              </label>
              <input
                type="password"
                className="inputBox"
                id="password"
                placeholder="Password"
                value={password}
                onChange={this.onChangePassword}
              />
            </div>
            <br />
            <button type="submit" className="button">
              Login
            </button>
            {isSubmittedFail && <p className="errText">*{errMsg}</p>}
          </form>
        </div>
      </div>
    )
  }
}

export default Login
