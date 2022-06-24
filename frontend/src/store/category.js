import { csrfFetch } from './csrf';

const GET_CATEGORIES = 'categories/getCategories'

const getCategories = (categories) => {
  return {
    type: GET_CATEGORIES,
    categories
  }
}

export const getCategoriesThunk = () => async dispatch => {
  const res = await fetch('/api/categories')
  const categories = await res.json();
  dispatch(getCategories(categories))
  return res;
}

const initialState = {}

const categoriesReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_CATEGORIES:
        let newState = {};
        action.categories.forEach(category => {
          newState[category.id] = category;
        })
        newState = { ...action.categories }
        return newState;
      default:
        return state;
    }
  }

export default categoriesReducer;
