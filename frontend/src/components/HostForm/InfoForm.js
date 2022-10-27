import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import { useMultiContext } from '../../context/MultiContext';
import "./InfoForm.css"
const InfoForm = () => {
  const { guests, setGuests,
    beds, setBeds,
    bedrooms, setBedrooms,
    baths, setBaths } = useMultiContext()

  const plusGuests = () => {
    if(guests >= 20) return
    setGuests(guests + 1)
  }
  const minusGuests = () => {
    if(guests === 0) return
    setGuests(guests - 1)
  }
  const plusBeds = () => {
    if(beds >= 20) return
    setBeds(beds + 1)
  }
  const minusBeds = () => {
    if(beds === 0) return
    setBeds(beds - 1)
  }
  const plusBedrooms = () => {
    if(bedrooms >= 20) return
    setBedrooms(bedrooms + 1)
  }
  const minusBedrooms = () => {
    if(bedrooms === 0) return
    setBedrooms(bedrooms - 1)
  }
  const plusBaths = () => {
    if(baths >= 20.5) return
    setBaths(baths + .5)
  }
  const minusBaths = () => {
    if(baths === .5) return
    setBaths(baths - .5)
  }

  return (
    <div className='info-form-container'>
      <div className="info-input">
        <div className="info-header">Guests</div>
        <div className="plus-minus-buttons">
          <div onClick={plusGuests} className="plus">+</div>
          <div className="num">{guests}</div>
          <div onClick={minusGuests} className="minus">-</div>
        </div>
      </div>
      <div className="info-input">
        <div className="info-header">Beds</div>
        <div className="plus-minus-buttons">
          <div onClick={plusBeds} className="plus">+</div>
          <div className="num">{beds}</div>
          <div onClick={minusBeds} className="minus">-</div>
        </div>
      </div>
      <div className="info-input">
        <div className="info-header">Bedrooms</div>
        <div className="plus-minus-buttons">
          <div onClick={plusBedrooms} className="plus">+</div>
          <div className="num">{bedrooms}</div>
          <div onClick={minusBedrooms} className="minus">-</div>
        </div>
      </div>
      <div className="info-input">
        <div className="info-header">Bathrooms</div>
        <div className="plus-minus-buttons">
          <div onClick={plusBaths} className="plus">+</div>
          <div className="num">{baths}</div>
          <div onClick={minusBaths} className="minus">-</div>
        </div>
      </div>
    </div>
  )
}

export default InfoForm
