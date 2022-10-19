import { csrfFetch } from "./csrf";

export const LOAD_RESERVATIONS = "reviews/LOAD_RESERVATIONS";
export const LOAD_USERS_RESERVATIONS = "reviews/LOAD_USERS_RESERVATIONS";
export const UPDATE_RESERVATION = "reviews/UPDATE_RESERVATION";
export const ADD_RESERVATION = "reviews/ADD_RESERVATION";
export const REMOVE_RESERVATION = "reviews/REMOVE_RESERVATION";

const load = (reservations, listingId) => ({
  type: LOAD_RESERVATIONS,
  reservations,
  listingId
});
const loadUsersReservations = (reservations) => ({
  type: LOAD_USERS_RESERVATIONS,
  reservations
})
const update = (reservation) => ({
  type: UPDATE_RESERVATION,
  reservation
});

const add = (reservation) => ({
  type: ADD_RESERVATION,
  reservation
});

const remove = (reservationId, listingId) => ({
  type: REMOVE_RESERVATION,
  reservationId,
  listingId
});

export const loadReservationsThunk = () => async (dispatch) => {
  const res = await csrfFetch('/api/reservations')
  if(res.ok){
    const reservations = await res.json()
    dispatch(load(reservations))
  }
}


export const CreateReservationThunk = (data) => async (dispatch) => {
  const {
    start,
    end,
    userId,
    listingId,
    numGuests,
    totalDays,
    totalPrice,
  } = data
  const res = await csrfFetch('/api/reservations', {
    method: 'POST',
    body: JSON.stringify(data)
  })
  if (res.ok){
    const newReservation = await res.json()
    console.log(newReservation)
    dispatch(add(newReservation))
  } else {
    return res
  }
}

const initialState = {}
const reservationsReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOAD_RESERVATIONS:
      const newReservations = {};
      action.reviews.forEach(review => {
        newReservations[review.id] = review;
      })
      return {
        ...state,
        ...newReservations
      }
    case ADD_RESERVATION:
      return {
        ...state,
        [action.reservation.id]: action.reservation
      };
    // case UPDATE_RESERVATION:
    // return {
    //   ...state,
    //   [action.review.id]: action.review
    // };
    // case REMOVE_RESERVATION:
    // const newState = { ...state };
    // delete newState[action.reviewId];
    // return newState;
    default:
      return state;

  }
}
export default reservationsReducer;
