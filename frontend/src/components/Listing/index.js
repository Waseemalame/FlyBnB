import React, { useEffect, useState } from 'react'
import * as sessionActions from '../../store/session';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect, useHistory } from 'react-router-dom';
import { getListingsThunk } from '../../store/listing';
// import { getImagesThunk } from '../../store/images.js';

import './Listing.css'
import Card from '../Card';

const Listing = ({ listings }) => {



  const images = useSelector(state => {
    return state.images
  })

const dispatch = useDispatch();

useEffect(() => {
  dispatch(getListingsThunk())

}, [dispatch])




  return (
    <div className='listing-container'>
      {listings.map((listing) => (

        <Card listing={listing} />
      ))}
    </div>
  )
}

export default Listing
