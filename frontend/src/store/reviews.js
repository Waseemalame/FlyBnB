export const LOAD_REVIEWS = "reviews/LOAD_REVIEWS";

const load = (reviews, listingId) => ({
  type: LOAD_REVIEWS,
  reviews,
  listingId
});

export const getListingsReviews = (id) => async dispatch => {
  console.log('REVIEWS REDUCVER')
  const res = await fetch(`/api/listings/${id}/reviews`)
  if(res.ok){
    const reviews = await res.json();
    console.log(reviews)

    console.log('REVIEWS REDUCVER')
    console.log('REVIEWS REDUCVER')
    console.log('REVIEWS REDUCVER')
    dispatch(load(reviews, id))
    return reviews;
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
    default:
      return state;

  }
}
export default reviewsReducer;
