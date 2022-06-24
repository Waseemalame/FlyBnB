import { NavLink, Redirect, useHistory } from 'react-router-dom'
import React from 'react'
import ProfileButton from '../ProfileButton';
import './Navigation.css'
import * as sessionActions from '../../store/session'
import { useDispatch, useSelector } from 'react-redux';
function Navigation({ user }) {
  const history = useHistory();
  const dispatch = useDispatch();
  const profileClick = () => {
    // <Redirect to="/login" />
    if(user){
      dispatch(sessionActions.logout());
      history.push('/login')
      return;
    }

  }

  // const handleLogoClick = () => {
  //   history.push('/')
  // }
  const hostPageClick = () => {
    if(!user){
      history.push('/login')
      return;
    }
    history.push('/hosting')
  }
  return (
    <>
      <div className="nav-container">
        <div className="nav-left">
        {user ? (
        <NavLink to="/">
          <img className='nav-logo' src="https://1000logos.net/wp-content/uploads/2017/08/Airbnb-logo.jpg" alt="logo" />
        </NavLink>

        ) : (
          <img className='nav-logo' src="https://1000logos.net/wp-content/uploads/2017/08/Airbnb-logo.jpg" alt="logo" />
        )}

        </div>
        <div className="nav-middle">
          <input type="text" />
          <img src="https://img.icons8.com/material-sharp/24/undefined/search.png" alt="seach-icon" />
        </div>
        <div className="nav-right">
          <div className='nav-right-text'>
            <p onClick={hostPageClick}>Become a Host</p>
          </div>
          {/* <div cl><img src="https://img.icons8.com/ios/20/undefined/geography.png" alt="language" /></div> */}
          <div className='profile-menu-icons'>
            <img className='hamburger-menu' src="https://img.icons8.com/material-outlined/24/undefined/menu--v1.png" alt="menu" />
            <div className='profile-button' onClick={profileClick}>
              <ProfileButton />
            </div>
          </div>

        </div>
      </div>
    </>
  )
}

export default Navigation
