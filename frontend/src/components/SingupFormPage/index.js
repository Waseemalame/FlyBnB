import * as sessionActions from "../../store/session";
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Redirect, Route, useHistory } from 'react-router-dom'


import './SignupFormPage.css'

import React from 'react'

const SingupFormPage = () => {
  const [username, setUserName] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [profileImg, setProfileImg] = useState('');
  const [linkedIn, setLinkedIn] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errors, setErrors] = useState([])

  const dispatch = useDispatch();
  const sessionUser = useSelector(state => state.session.user)
  if (sessionUser) return <Redirect to="/" />;

  const handleSubmit = (e) => {
    e.preventDefault();

    if(password !== confirmPassword) setErrors(['Password fields must match']);

    return dispatch(sessionActions.signup({ email, username, firstName, lastName, profileImg, password }))

  }

  return (
    <>
        <form className="signup-form" onSubmit={handleSubmit}>
          <ul>
            {errors.map((error, idx) => <li key={idx}>{error}</li>)}
          </ul>
          <label>
            Username
            <input
             type="text"
             value={username}
             onChange={(e) => setUserName(e.target.value)}
             required
              />
          </label>
          {/* <label>
            First Name
            <input
             type="text"
             value={firstName}
             onChange={(e) => setFirstName(e.target.value)}
             required
              />
          </label>
          <label>
            Last Name
            <input
             type="text"
             value={lastName}
             onChange={(e) => setLastName(e.target.value)}
             required
              />
          </label> */}
          <label>
            Email
            <input
             type="text"
             value={email}
             onChange={(e) => setEmail(e.target.value)}
             required
              />
          </label>
          <label>
            Profile Image
            <input
             type="text"
             value={profileImg}
             onChange={(e) => setProfileImg(e.target.value)}
             required
              />
          </label>
          <label>
            Password
            <input
             type="password"
             value={password}
             onChange={(e) => setPassword(e.target.value)}
             required
              />
          </label>
          <label>
            Confirm Password
            <input
             type="password"
             value={confirmPassword}
             onChange={(e) => setConfirmPassword(e.target.value)}
             required
              />
          </label>
          <button className="signup-submit" type="submit">Sign up</button>
      </form>
    </>
  )
}

export default SingupFormPage;
