import { csrfFetch } from './csrf';
import { LOAD_IMAGES } from './images';
import { LOAD_REVIEWS, REMOVE_REVIEW, ADD_REVIEW, UPDATE_REVIEW } from './reviews';

const GET_LISTINGS = 'listings/getListings';
const ADD_LISTING = 'listings/addListing'
const GET_ONE_LISTING = 'listings/getOneListing'
const EDIT_LISTING = 'listings/editListing'
const DELETE_LISTING  = 'listings/deleteListing'
const getListings = (listings) => {
  return {
    type: GET_LISTINGS,
    listings
  }
}

const addListing = (listing) => {
  return {
    type: ADD_LISTING,
    listing
  }
}
export const editListing = updatedListing => ({
  type: EDIT_LISTING,
  updatedListing
});

const getOneListing = (listing) => {
  return {
    type: GET_ONE_LISTING,
    listing
  }
}
const deleteOneListing = (listingId) => {
  return {

    type: DELETE_LISTING,
    listingId
  }
}

export const getListingsThunk = () => async dispatch => {
  const res = await fetch('/api/listings')
  const listings = await res.json();
  dispatch(getListings(listings));
  return res;
}

export const getFilteredListings = (id) => async dispatch => {
  const res = await fetch('/listings/categories/:id')
}

export const getOneListingThunk = (id) => async dispatch => {
  const res = await fetch(`/api/listings/${id}`)
  const listing = await res.json();
  dispatch(getOneListing(listing))
  return res;
}

export const addListingThunk = (data) => async dispatch => {
  const res = await csrfFetch('/api/listings', {
    method: 'POST',
    body: JSON.stringify(data)
  })

  dispatch(addListing(data))
  return res;

}

export const editListingThunk = (data) => async dispatch => {
  console.log(data)
  const res = await csrfFetch(`/api/listings/${data.id}`, {
    method: 'PUT',
    body: JSON.stringify(data)
  })
  const editedListing = await res.json();
  console.log(editedListing)
  dispatch(editListing(editedListing))
  // dispatch(getListingsThunk(data))
  return editedListing;

}
export const deleteListingThunk = (data) => async dispatch => {
  console.log('WE INSIDE THE THUNK')
  console.log('WE INSIDE THE THUNK')
  console.log('WE INSIDE THE THUNK')
  console.log('WE INSIDE THE THUNK')
  const res = await csrfFetch(`/api/listings/${data.id}`, {
    method: 'delete',
  })
  if(res.ok){
    const { id: deletedItemId } = await res.json();
    dispatch(deleteOneListing(data.id))
    return deletedItemId;
  }

}





const initialState = {};
const listingsReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_LISTINGS:
      let newState = {};
      action.listings.forEach(listing => {
        newState[listing.id] = listing;
      })

      return {
        ...newState,

      };
      case LOAD_REVIEWS:
      return {
        ...state,
        [action.listingId]: {
          ...state[action.listingId],
          reviews: action.reviews.map(review => review.id)
        }
      };
      case REMOVE_REVIEW:
      return {
        ...state,
        [action.listingId]: {
          ...state[action.listingId],
          reviews: state[action.listingId].reviews.filter(
            (reviewId) => reviewId !== action.reviewId
          )
        }
      };
      case ADD_LISTING:
        return {
          ...state
        };
      case EDIT_LISTING:
      return {
        ...state,
        [action.updatedListing.id]: {
          ...state[action.updatedListing.id],
          ...action.updatedListing
        },
      };
      case DELETE_LISTING:
        console.log(state[action.listingId])
        const deleteState = { ...state };
        delete deleteState[action.listingId];
        return deleteState;

      default:
        return state;
  }
}

export default listingsReducer;
