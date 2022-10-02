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



      <div className="details-info">

      </div>
      <div className="details-bottom">

        <div className="amenities-and-reviews">
          <div className="details-amenities">
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

        <div className="reservations-section">
          <Reservations />
        </div>
      </div>

    </div>
  )
}

export default ListingDetails
