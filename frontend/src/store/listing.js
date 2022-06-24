import { csrfFetch } from './csrf';
import { LOAD_IMAGES } from './images';

const GET_LISTINGS = 'listings/getListings';
const ADD_LISTING = 'listings/addListing'
const GET_ONE_LISTING = 'listings/getOneListing'

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
  console.log('INSIDE ADD LISTING THUNK')
  const res = await csrfFetch('/api/listings', {
    method: 'POST',
    body: JSON.stringify(data)
  })

  console.log(res, 'RES in listing thunk')
  dispatch(addListing(data))
  return res;

}




const initialState = {};
const listingsReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_LISTINGS:
      let newState = {};
      action.listings.forEach(listing => {
        console.log(typeof listing.id, 'TYPEOFTYPEOF IN REDUCER')
        newState[listing.id] = listing;
      })

      return {
        ...newState,
        // ...state,

      };
      case ADD_LISTING:
        console.log('INSIDE ADD LISTING REDUCER CASE')
        console.log(state, 'state in reducer')
        console.log(action, 'action in reducer')
        return {
          ...state
        };
        // case GET_ONE_LISTING:
        // console.log(state, 'INSIDE GET ONE THIS TIME BROOO')
        //   return {
        //     ...state,
        //     listing: action.listing
        //   }
      default:
        return state;
  }
}

export default listingsReducer;
