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
  const [showSignupForm, setShowSignupForm] = useState(true)
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

      <div className="login-form-container">
        <form className='login-form' onSubmit={handleSubmit}>
            <ul className='login-form-errors'>
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
            <button className='login-submit-btn' type="submit">Log In</button>
        </form>
        <h2 className='signup-header'>Don't have an account yet? Sign Up Today!</h2>
        <button className='signup-btn' onClick={() =>
        {
          if(showSignupForm === true) setShowSignupForm(false)
          else setShowSignupForm(true)
        }
        }>Sign up</button>
        {showSignupForm && (
          <SingupFormPage />
        )}
        {/* <h3>Or just sign in as a demo user!</h3> */}
        <button className='demo-user-btn' onClick={handleDemoUser}>Demo User</button>
      </div>

  )
}

export default LoginFormPage
