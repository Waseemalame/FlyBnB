import React from 'react'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useHistory, Link, NavLink } from 'react-router-dom'
import { deleteListingThunk } from '../../store/listing'
import Card from '../Card'
import EditListingModal from '../EditListingModal'
import './UserListingsPage.css'
const UserListingsPage = ({ listings, user }) => {
  const [cname, setCname] = useState('')
  const [userListingRendered, setUserListingRendered] = useState(true)
  const userListings = listings.filter(listing => listing.userId === user.id)
  const dispatch = useDispatch();
  const history = useHistory();

  const deleteListingTrigger = async (e) => {
    console.dir(e.target)
    await dispatch(deleteListingThunk())
  }
  const editListing = () => {

  }

  return (
    <div className='user-listings'>
      {userListings.map((listing) => (

          <div className="user-listing">
            <Card userListingRendered={userListingRendered} listing={listing} cname={cname}/>
            <div className="user-listing-btns">
              <EditListingModal listing={listing} />
              {/* <button onClick={editListing} className='edit-listing'>Edit</button> */}
              <button onClick={(e) => deleteListingTrigger(e)} className='delete-listing'>Delete</button>
            </div>
          </div>

      ))}
    </div>
  )
}

export default UserListingsPage
