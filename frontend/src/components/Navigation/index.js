import { NavLink, Redirect, useHistory } from 'react-router-dom'
import React from 'react'
import ProfileButton from '../ProfileButton';
import './Navigation.css'
import * as sessionActions from '../../store/session'
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
function Navigation({ user }) {
  const history = useHistory();
  const dispatch = useDispatch();
  const [hamburgerDropDown, setHamburgerDropDown] = useState(false)

  const logoutClick = () => {


    if(user){
      dispatch(sessionActions.logout());
      history.push('/login')
      return;
    }

  }

  const hostPageClick = () => {
    if(!user){
      history.push('/login')
      return;
    }
    history.push('/hosting')
  }
  const menuClick = () => {
    if(hamburgerDropDown === false){
      setHamburgerDropDown(true)
      return;
    }
    setHamburgerDropDown(false)
  }
  const mouseLeave = () => {

  }
  const logoutclick = () => {

  }
  const manageListings = () => {
    history.push(`/${user.username}/listings`)
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
          <div className='profile-menu-icons'>
            <img className='hamburger-menu' onClick={menuClick} src="https://img.icons8.com/material-outlined/24/undefined/menu--v1.png" alt="menu" />
            <div className='profile-button' onClick={menuClick}>
              {hamburgerDropDown && (
                <div className='menu-dropdown-container' onMouseLeave={() => mouseLeave()}>
                  <div onClick={manageListings} className='btn-container'><button className='btn-options'>Manage Listings</button></div>
                  {/* <div className='btn-container'><button className='btn-options'>Trips</button></div> */}
                  <div className='btn-container'><button className='btn-options' onClick={logoutClick}>Logout</button></div>
                </div>
              )}
              <ProfileButton user={user}/>
            </div>
          </div>

        </div>
      </div>
    </>
  )
}

export default Navigation
