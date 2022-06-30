import React, { useEffect, useState } from 'react'
import * as sessionActions from '../../store/session';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect, useHistory } from 'react-router-dom';
import { useParams } from 'react-router-dom'
import { getOneListingThunk } from '../../store/listing';
import { amenitiesObj } from '../HostForm/AmenitiesData';
import { createReview, getListingsReviews, removeReviewThunk } from '../../store/reviews';
import './CardDetails.css'

function CardDetails() {
  const [reviewContent, setReviewContent] = useState('')
  const { id } = useParams();
  const listing = useSelector(state => state.listings[id])
  const dispatch = useDispatch();

  const reviews = useSelector((state) => {
    if (!listing.reviews) return null;
    return listing.reviews.map(reviewId => state.reviews[reviewId]);
  });

  useEffect(() => {
    dispatch(getListingsReviews(listing.id))
  }, [dispatch, listing.id])

  const handleReviewSubmit = (e) => {
    e.preventDefault();
    const data = {
      content: reviewContent,
      listingId: listing.id,
      userId: sessionUser.id
    }
    dispatch(createReview(data))
  }

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
            {listing.type} hosted by {sessionUser.username}
          </h2>
          <p className='listing-details'>{listing.guests} guests · {listing.beds} beds · {listing.baths} baths</p>
          {sessionUser.id === listing.userId ? (
            <button className='edit-listing-btn'>Edit Listing</button>

          ) : (
            ''
          )}
        </div>
        <h2>What this place has to offer:</h2>
        <div className="amenities-section">
          {newAmenitiesArr.map(amenity => (
            <div className="amenities-box">
              <img className='amenity-icon' src={amenity.icon} alt="" />
              <div className='amenity-name'>{amenity.name}</div>
            </div>
          ))}
        </div>
        <div className="reviews-container">
        <button>Click me to create review!</button>
              <form onSubmit={handleReviewSubmit}>
                <input type="text"
                value={reviewContent}
                onChange={(e) => setReviewContent(e.target.value)}
                placeholder="enter your review"
                 />
                 <button type='submit'>Submit Review</button>
              </form>
          {reviews ? reviews.map(review => (
            <div>

              <div>{review?.content}</div>
              {review?.userId === sessionUser.id && (
                <button onClick={() => {
                  dispatch(removeReviewThunk(review.id, listing.id))
                }}>Delete Me if u own me</button>
              )}
            </div>
          )) : 'No rewiews have been'}
        </div>
    </div>
  )
}

export default CardDetails
