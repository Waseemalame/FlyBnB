import React from 'react'
import { useState } from 'react'
import Card from '../Card'
import EditListingModal from '../EditListingModal'
import './UserListingsPage.css'
const UserListingsPage = ({ listings, user }) => {
  const [cname, setCname] = useState('')
  const [userListingRendered, setUserListingRendered] = useState(true)
  const userListings = listings.filter(listing => listing.userId === user.id)

  const editListing = () => {

  }

  return (
    <div className='user-listings'>
      {userListings.map((listing) => (

          <div className="user-listing">
            <Card userListingRendered={userListingRendered} listing={listing} cname={cname}/>
            <div className="user-listing-btns">
              <EditListingModal listing={listing} />
              <button className='delete-listing'>Delete</button>
            </div>
          </div>

      ))}
    </div>
  )
}

export default UserListingsPage
