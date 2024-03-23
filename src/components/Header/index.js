import {Link, withRouter} from 'react-router-dom'

import Cookies from 'js-cookie'

import './index.css'

import {AiFillHome} from 'react-icons/ai'

import {FaBriefcase} from 'react-icons/fa'
import {FiLogOut} from 'react-icons/fi'

const Header = props => {
  const onClickLogout = () => {
    Cookies.remove('jwt_token')
    const {history} = props
    history.replace('/login')
  }

  return (
    <nav className="header-container">
      <div className="mobile-nav-container">
        <div className="mobile-logo-container">
          <Link to="/">
            <img
              src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
              alt="website logo"
              className="mobile-logo"
            />
          </Link>
        </div>
        <ul className="mobile-nav-menu">
          <li className="mobile-nav-menu-item">
            <Link to="/" className="mobile-nav-link">
              <AiFillHome />
            </Link>
          </li>
          <li className="mobile-nav-menu-item">
            <Link to="/jobs" className="mobile-nav-link">
              <FaBriefcase />
            </Link>
          </li>
        </ul>
        <button className="mobile-logout-button" onClick={onClickLogout}>
          <FiLogOut />
        </button>
      </div>
      <div className="desktop-nav-container">
        <div className="desktop-logo-container">
          <Link to="/">
            <img
              src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
              alt="website logo"
              className="desktop-logo"
            />
          </Link>
        </div>
        <ul className="desktop-nav-menu">
          <li className="desktop-nav-menu-item">
            <Link to="/" className="desktop-nav-link">
              Home
            </Link>
          </li>
          <li className="desktop-nav-menu-item">
            <Link to="/jobs" className="desktop-nav-link">
              Jobs
            </Link>
          </li>
        </ul>
        <button className="desktop-logout-button" onClick={onClickLogout}>
          Logout
        </button>
      </div>
    </nav>
  )
}
export default withRouter(Header)
