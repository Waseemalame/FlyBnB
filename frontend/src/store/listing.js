import { csrfFetch } from './csrf';
import { LOAD_IMAGES } from './images';

const GET_LISTINGS = 'listings/getListings';
const ADD_LISTING = 'listings/addListing'
const GET_ONE_LISTING = 'listings/getOneListing'
const EDIT_LISTING = 'listings/editListing'

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

const getOneListing = (listing) => {
  return {
    type: GET_ONE_LISTING,
    listing
  }
}

export const editListing = updatedListing => ({
  type: EDIT_LISTING,
  updatedListing
});

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

  dispatch(editListing(data))
  return res;

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
      case ADD_LISTING:
        return {
          ...state
        };

      default:
        return state;
  }
}

export default listingsReducer;
