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
  useEffect(() => {
    if(!reviewContent) errors.push('review body cannot be left blank')
    setReviewValidationErrors(errors)
  }, [reviewContent]);

  const handleReviewSubmit = (e) => {
    e.preventDefault();
    if(reviewValidationErrors.length > 0){
      setShowErrors(true)
      return;
    }
    const data = {
      content: reviewContent,
      listingId: listing.id,
      userId: sessionUser.id
    }
    dispatch(createReview(data));
    setReviewContent('');
    setShowErrors(false);
    setReviewValidationErrors([]);
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
        <div className="amenities-section">
          {newAmenitiesArr.map(amenity => (
            <div className="amenities-box">
              <img className='amenity-icon' src={amenity.icon} alt="" />
              <div className='amenity-name'>{amenity.name}</div>
            </div>
          ))}
        </div>
        <div className="reviews-container">
              {showErrors && (
              <ul className="review-listing-errors">
                 {reviewValidationErrors.map((error, idx) => (
                   <li key={idx}>{error}</li>
                 ))}
              </ul>
              )}
              <form className='review-form' onSubmit={handleReviewSubmit}>
                <input
                className='review-input'
                 type="text"
                value={reviewContent}
                onChange={(e) => setReviewContent(e.target.value)}
                placeholder="enter your review"
                 />
                 <button className='submit-review-btn' type='submit'>Submit Review</button>
              </form>
              {filteredReviews.length === 0 ? (
                <h2 className='reviews-header'>Be the first to post a review!</h2>
              ): <h2 className='reviews-header'>User reviews below</h2> }
                
          <div className="reviews-display">
            {reviews ? reviews.map(review => (
              <>
                {review && (
                  <div className='review-content-delete-btn'>
                    <div className="user-review-img"
                    style={{ backgroundImage: `url(${review.User.profileImg})` }}
                    >
                      {/* <img className='user-review-img' src={review?.User ? review?.User?.profileImg : ''} alt="" /> */}
                    </div>
                    <div className='review-username'>{review?.User?.username}:</div>
                    <div className='review-content'>{review?.content}</div>
                  </div>

                )}
                {review?.userId === sessionUser.id && (
                  <button
                  className='delete-review-btn'
                   onClick={() => {
                    removeReviewFunc(review.id, listing.id)
                  }}>
                    <img src="https://img.icons8.com/ios-glyphs/30/000000/filled-trash.png" alt=''/>
                  </button>
                )}
              </>
            )) : ''}
          </div>
        </div>
    </div>
  )
}

export default CardDetails
