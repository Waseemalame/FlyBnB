import React from 'react'
import './ProfileButton.css'
const ProfileButton = ({ user }) => {
  return (
    <div>
      {user && (

          <img className='profile-icon-button' src={user.profileImg} alt="user-profile" />
      )}

    </div>
  )
}

export default ProfileButton
