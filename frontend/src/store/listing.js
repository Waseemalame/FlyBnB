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
  console.log(data)
  const {
    user,
    userId,
    type,
    categoryId,
    address,
    city,
    state,
    country,
    title,
    guests,
    beds,
    bedrooms,
    baths,
    amenities,
    price,
    cleaningFee,
    serviceFee,
    images,
  } = data
  const formData = new FormData()
  formData.append('type', type)
  formData.append('userId', userId)
  formData.append('user', user)
  formData.append('city', city)
  formData.append('categoryId', categoryId)
  formData.append('address', address)
  formData.append('state', state)
  formData.append('country', country)
  formData.append('title', title)
  formData.append('guests', guests)
  formData.append('beds', beds)
  formData.append('bedrooms', bedrooms)
  formData.append('baths', baths)
  formData.append('price', price)
  formData.append('cleaningFee', cleaningFee)
  formData.append('serviceFee', serviceFee)
  formData.append('amenities', amenities)

  if (images && images.length !== 0) {
    for (let i = 0; i < images.length; i++) {
      formData.append("images", images[i]);
    }
  }
  const res = await csrfFetch('/api/listings', {
    method: 'POST',
    headers: {
      "Content-Type":"multipart/form-data"
  },
    body: formData
  })

  dispatch(addListing(data))
  return res;

}

export const editListingThunk = (data) => async dispatch => {
  const res = await csrfFetch(`/api/listings/${data.id}`, {
    method: 'PUT',
    body: JSON.stringify(data)
  })
  const editedListing = await res.json();
  dispatch(editListing(editedListing))
  return editedListing;

}
export const deleteListingThunk = (data) => async dispatch => {

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
      case ADD_REVIEW:
      return {
        ...state,
        [action.review.listingId]: {
          ...state[action.review.listingId],
          reviews: [...state[action.review.listingId].reviews, action.review.id]
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
        const deleteState = { ...state };
        delete deleteState[action.listingId];
        return deleteState;

      default:
        return state;
  }
}

export default listingsReducer;
