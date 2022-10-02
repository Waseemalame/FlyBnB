import React, { useEffect, useState } from 'react'
import * as sessionActions from '../../store/session';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect, useHistory } from 'react-router-dom';
import { useParams } from 'react-router-dom'
import { getOneListingThunk } from '../../store/listing';
import { amenitiesObj } from '../HostForm/AmenitiesData';
import { createReview, getListingsReviews, removeReviewThunk } from '../../store/reviews';
import './CardDetails.css'
import Reservations from '../Reservations';

function CardDetails() {
  const [reviewsEmpty, setReviewsEmpty] = useState(false)
  const [reviewContent, setReviewContent] = useState('')
  const { id } = useParams();
  const listing = useSelector(state => state.listings[id])
  const dispatch = useDispatch();
  const [reviewValidationErrors, setReviewValidationErrors] = useState([])
  const [showErrors, setShowErrors] = useState(false)
  const reviews = useSelector((state) => {
    if (!listing.reviews) return null;
    return listing.reviews.map(reviewId => state.reviews[reviewId]);
  });
  const filteredReviews = reviews?.filter(review => review !== undefined)
  // useEffect(() => {
  //   console.log(filteredReviews)

  // }, [reviews])

  useEffect(() => {
    dispatch(getListingsReviews(listing.id))
  }, [dispatch, listing.id])
  const errors = []



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
  const removeReviewFunc = async (reviewId, listingId) => {
    await dispatch(removeReviewThunk(reviewId, listingId))
  }
  if (!reviews) {
    return null;
  }

  return (

    <div className="card-details-container">
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

      <div className='image-section'>
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
                  <div id={`sub-img-${index}`} style={{backgroundImage: `url(${image.url})`}}>

                  </div>
              )
          })
        }

      </div>

        <div>
          <h2 className='listing-description'>
            {listing.type} hosted by {listing.User.username}
          </h2>
          <p className='listing-details'>{listing.guests} guests · {listing.beds} beds · {listing.baths} baths</p>

        </div>
        <h2>What this place has to offer:</h2>
        <div className="amens-and-reservations">
        <div className='listing-details-reservations'>
          <Reservations />
      </div>
        <div className="amenities-section">
          {newAmenitiesArr.map(amenity => (
            <div className="amenities-box">
              <img className='amenity-icon' src={amenity.icon} alt="" />
              <div className='amenity-name'>{amenity.name}</div>
            </div>
          ))}
        </div>
        </div>

    </div>
  )
}

export default CardDetails
