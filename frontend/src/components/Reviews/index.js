import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { useMultiContext } from '../../context/MultiContext'
import { createReview, getListingsReviews, removeReviewThunk } from '../../store/reviews'
import "./Reviews.css"
const Reviews = () => {
  const [showErrors, setShowErrors] = useState(false)
  const [reviewValidationErrors, setReviewValidationErrors] = useState([])
  const [reviewsEmpty, setReviewsEmpty] = useState(false)
  const [reviewContent, setReviewContent] = useState('')
  const { id } = useParams();
  const listing = useSelector(state => state.listings[id])
  const sessionUser = useSelector(state => state.session.user)
  const dispatch = useDispatch()

  const { setNumReviews } = useMultiContext()

  const reviews = useSelector((state) => {
    if (!listing.reviews) return null;

    return listing.reviews.map(reviewId => state.reviews[reviewId]);
  });

  useEffect(() => {
    dispatch(getListingsReviews(listing.id))
  }, [dispatch, listing.id])



  const filteredReviews = reviews?.filter(review => review !== undefined)
  if(filteredReviews){
    setNumReviews(filteredReviews.length)
  }

  const errors = []

  useEffect(() => {
    if(!reviewContent) errors.push('review body cannot be left blank*')
    setReviewValidationErrors(errors)
  }, [reviewContent]);



  const removeReviewFunc = async (reviewId, listingId) => {
    await dispatch(removeReviewThunk(reviewId, listingId))
  }

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

  return (
    <div className="reviews-container">
              {filteredReviews?.length === 0 ? (
                <h2 className='reviews-header'>Be the first to post a review!</h2>
                ): <h2 className='reviews-header'>User reviews below</h2> }
                {showErrors && (
                <ul className="review-listing-errors">
                   {reviewValidationErrors.map((error, idx) => (
                     <li key={idx}>{error}</li>
                   ))}
                </ul>
                )}
              <form className='review-form' onSubmit={handleReviewSubmit}>
                <textarea
                className='review-input'
                 type="text"
                value={reviewContent}
                onChange={(e) => setReviewContent(e.target.value)}
                placeholder="enter your review"
                 />
                 <button className='submit-review-btn' type='submit'>Submit</button>
              </form>

          <div className="reviews-display">
            {reviews ? reviews.reverse().map(review => (
              <>
                {review && (
                  <div className='review-content'>
                    <div className="user-review-img"
                    style={{ backgroundImage: `url(${review.User.profileImg})` }}
                    >
                    <img className='user-review-img' src={review?.User ? review?.User?.profileImg : ''} alt="" />
                    </div>
                    <div className='review-username'>{review?.User?.username}:</div>
                    <div>{review?.content}</div>
                    {review?.userId === sessionUser.id && (
                        <button
                        className='delete-review-btn'
                         onClick={() => {
                          removeReviewFunc(review.id, listing.id)
                        }}>
                          <img className='delete-review-icon' src="https://img.icons8.com/ios-glyphs/30/000000/filled-trash.png" alt=''/>
                        </button>
                    )}
                  </div>
                )}

              </>
            )) : ''}

          </div>
        </div>
  )
}

export default Reviews
