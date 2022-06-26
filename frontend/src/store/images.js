import { csrfFetch } from './csrf';
export const LOAD_IMAGES = 'listings/getImages'

const load = (images, listingId) => ({
  type: LOAD_IMAGES,
  images,
  listingId
});

export const getImages = (listingId) => async (dispatch) => {
  const response = await fetch(`/api/listings/${listingId}/images`);

  if (response.ok) {
    const images = await response.json();
    dispatch(load(images, listingId));
  }
};

const initialState = {};
const imagesReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOAD_IMAGES:
      const newImages = {};
      action.images.forEach(image => {
        newImages[image.id] = image;
      })
      return {
        ...newImages,
        ...state,
      }
    default:
      return state;
  }
}
export default imagesReducer;
