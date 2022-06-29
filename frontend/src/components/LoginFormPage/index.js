import React, { useState } from 'react'
import * as sessionActions from '../../store/session';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect, useHistory } from 'react-router-dom';
import SingupFormPage from '../SingupFormPage';
import './LoginFormPage.css'

const LoginFormPage = () => {

  const [credential, setCredential] = useState('');
  const [password, setPassword] = useState('')
  const [errors, setErrors] = useState([])
  const [showSignupForm, setShowSignupForm] = useState(false)
  const dispatch = useDispatch();

  const history = useHistory();

  const sessionUser = useSelector(state => {
    return state.session.user
  })
  if(sessionUser) return (
    <Redirect to="/" />
  )

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors([]);
    return dispatch(sessionActions.login({ credential, password }))
      .catch(async (res) => {
        const data = await res.json();
        if (data && data.errors) setErrors(data.errors);
      });
  }
  const handleDemoUser = () => {
    dispatch(sessionActions.login({ credential: 'Demo-lition', password: 'password' }))
  }
  const handleSignup = () => {

  }
  return (
    <>
      <form onSubmit={handleSubmit}>
          <ul>
            {errors.map((error, idx) => <li key={idx}>{error}</li>)}
          </ul>
          <label>
            Username or Email
            <input
             type="text"
             value={credential}
             onChange={(e) => setCredential(e.target.value)}
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
          <button type="submit">Log In</button>
      </form>
      <h3>Don't have an account yet? Sign Up Today!</h3>
      <button onClick={() => setShowSignupForm(true)}>Sign up</button>
      {showSignupForm && (
        <SingupFormPage />

      )}
      <h3>Or just sign in as a demo user!</h3>
      <button onClick={handleDemoUser}>Demo User</button>
    </>
  )
}

export default LoginFormPage
