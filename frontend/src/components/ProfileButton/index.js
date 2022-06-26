import React from 'react'
import './ProfileButton.css'
const ProfileButton = ({ user }) => {
  return (
    <div>
      {user?.profileImg ? (

          <img className='profile-icon-button' src={user.profileImg} alt="user-profile" />
      ) : (
        <img className='profile-icon-button' src="https://img.icons8.com/external-kiranshastry-solid-kiranshastry/40/undefined/external-user-interface-kiranshastry-solid-kiranshastry.png" alt='' />
      )}

    </div>
  )
}

export default ProfileButton
