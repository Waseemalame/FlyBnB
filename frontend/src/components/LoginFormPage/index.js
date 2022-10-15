import React, { useState } from 'react'
import * as sessionActions from '../../store/session';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect, useHistory } from 'react-router-dom';
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
    return (
      <Redirect to="/" />
    )
  }
  const handleSignup = () => {

  }
  return (

      <main className="login-page-container">

        <div className="login-form-container">
          <img className='login-background' src="https://a0.muscache.com/im/pictures/95d475b1-1dfd-4bf5-9380-156f8183c061.jpg?im_w=1680" alt="" />
          <form className='login-form' onSubmit={handleSubmit}>


              <ul className='login-form-errors'>
                {errors.map((error, idx) => <li key={idx}>{error}</li>)}
              </ul>
              <section className='login-form-header'>
                  <h3 className='login-main-header'>Find places to stay in United States on Airbnb</h3>
                  <p className='login-subheader'>Discover entire homes and private rooms perfect for any trip.</p>
              </section>
                <input
                 type="text"
                 value={credential}
                 placeholder="Username"
                 onChange={(e) => setCredential(e.target.value)}
                 required
                  />

                <input
                 type="password"
                 value={password}
                 placeholder="Password"
                 onChange={(e) => setPassword(e.target.value)}
                 required
                  />

              <button className='login-submit-btn' type="submit">Log In</button>
              <button type='button' className='demo-user-btn' onClick={handleDemoUser} onTouchStart={handleDemoUser}>Guest User</button>
          </form>
        </div>
      </main>

  )
}

export default LoginFormPage
