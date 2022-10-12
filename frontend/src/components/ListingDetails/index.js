import React, { useEffect, useState } from 'react'
import * as sessionActions from '../../store/session';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect, useHistory } from 'react-router-dom';
import { useParams } from 'react-router-dom'
import { getOneListingThunk } from '../../store/listing';
import { amenitiesObj } from '../HostForm/AmenitiesData';
import { createReview, getListingsReviews, removeReviewThunk } from '../../store/reviews';
import Reservations from '../Reservations';
import "./ListingDetails.css"
import Reviews from '../Reviews';

const ListingDetails = () => {
  const { id } = useParams();

  const listing = useSelector(state => state.listings[id])

  const sessionUser = useSelector(state => state.session.user)

  const newAmenities = {};
  const amenitiesValues = Object.values(amenitiesObj)
  amenitiesValues.forEach(val => {
    listing.amenities.forEach(amenity => {
      if(amenity === val.name){
        newAmenities[amenity] = {
          name: amenity,
          icon: val.icon
        }
      }
    })
  })

  const newAmenitiesArr = Object.values(newAmenities)
  return (
    <div className='listing-details-container'>

      <div className="details-top">
        <div className='listing-title'>{listing?.title}</div>
        <div className="listing-location">
          {listing.city && (
            <div className="listing-city">{listing?.city},</div>
          )}
          {listing.state && (
            <div className="listing-state">{listing?.state},</div>
          )}
          <div className="listing-country">{listing?.country}</div>
        </div>
      </div>

      <div className="details-images">
        {listing?.Images.map((image, index) => {
          if(index === 0){
            return (
                <div
                style={{backgroundImage: `url(${image.url})`}}
                className="first-img"></div>
            );
          }
          if(index > 4) return '';
          return (
                  <div className='sub-images' id={`sub-img-${index}`} style={{backgroundImage: `url(${image.url})`}}>

                  </div>
              )
          })
        }
      </div>




      <div className="details-bottom">

        <div className="amenities-info-reviews">

          <div className="info-amenities">

            <div className="details-info">
              <h2 className='details-description'>
                {listing.type} hosted by {listing.User.username}
              </h2>
              <p className='listing-details'>{listing.guests} guests · {listing.beds} beds · {listing.baths} baths</p>
            </div>

            <div className='amenities-header'>What this place has to offer</div>
            <div className="amenities-section">
                {newAmenitiesArr.map(amenity => (
                  <div className="amenities-box">
                    <img className='amenity-icon' src={amenity.icon} alt="" />
                    <div className='amenity-name'>{amenity.name}</div>
                  </div>
                ))}
            </div>

          </div>

          <div className="details-reviews">
            <Reviews />
          </div>
        </div>

        <div className="details-reservations">
            <Reservations listing={listing}/>
        </div>
      </div>

    </div>
  )
}

export default ListingDetails
