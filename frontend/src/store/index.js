import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import sessionReducer from './session';
import categoriesReducer from './category';
import listingsReducer from './listing';
import imagesReducer from './images';
import thunk from 'redux-thunk';

const rootReducer = combineReducers({
  session: sessionReducer,
  categories: categoriesReducer,
  listings: listingsReducer,
  images: imagesReducer,
});

let enhancer;

if (process.env.NODE_ENV === 'production') {
  enhancer = applyMiddleware(thunk);
} else {
  const logger = require('redux-logger').default;
  const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  enhancer = composeEnhancers(applyMiddleware(thunk, logger));
}

const configureStore = (preloadedState) => {
  return createStore(rootReducer, preloadedState, enhancer);
};

export default configureStore;
