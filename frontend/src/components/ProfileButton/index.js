import React from 'react'
import './ProfileButton.css'
const ProfileButton = ({ user }) => {
  return (
    <div>
      {user?.profileImg ? (

          <img className='profile-icon-button' src={user.profileImg} alt="user-profile" />
      ) : (
        <img className='profile-icon-button' src="https://i.imgur.com/f906ONQ.jpg" alt='' />
      )}

    </div>
  )
}

export default ProfileButton
