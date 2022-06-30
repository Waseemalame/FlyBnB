import { csrfFetch } from "./csrf";

export const LOAD_REVIEWS = "reviews/LOAD_REVIEWS";
export const UPDATE_REVIEW = "reviews/UPDATE_REVIEW";
export const ADD_REVIEW = "reviews/ADD_REVIEW";
export const REMOVE_REVIEW = "reviews/REMOVE_REVIEW";

const load = (reviews, listingId) => ({
  type: LOAD_REVIEWS,
  reviews,
  listingId
});
const update = (review) => ({
  type: UPDATE_REVIEW,
  review
});

const add = (review) => ({
  type: ADD_REVIEW,
  review
});

const remove = (reviewId, listingId) => ({
  type: REMOVE_REVIEW,
  reviewId,
  listingId
});


export const getListingsReviews = (id) => async dispatch => {
  const res = await fetch(`/api/listings/${id}/reviews`)
  if(res.ok){
    const reviews = await res.json();

    dispatch(load(reviews, id))
    return reviews;
  }
}
export const createReview = (data) => async (dispatch) => {

  const response = await csrfFetch(`/api/listings/${data.listingId}/reviews`, {
    method: 'POST',
    body: JSON.stringify(data)
  });


    const newReview = await response.json()
    dispatch(add(newReview))
    return newReview

}

export const removeReviewThunk = (reviewId, listingId) => async dispatch => {
  const res = await csrfFetch(`/api/reviews/${reviewId}`, {
    method: 'DELETE'
  })
  if(res.ok){
    const { id: deletedReviewId } = await res.json();
    dispatch(remove(deletedReviewId, listingId))
    return deletedReviewId;
  }
}

const initialState = {}
const reviewsReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOAD_REVIEWS:
      const newReviews = {};
      action.reviews.forEach(review => {
        newReviews[review.id] = review;
      })
      return {
        ...state,
        ...newReviews
      }
    case ADD_REVIEW:
      return {
        ...state,
        [action.review.id]: action.review
      };
    case UPDATE_REVIEW:
    return {
      ...state,
      [action.review.id]: action.review
    };
    case REMOVE_REVIEW:
    const newState = { ...state };
    delete newState[action.reviewId];
    return newState;
    default:
      return state;

  }
}
export default reviewsReducer;
