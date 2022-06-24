import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Switch, useHistory } from "react-router-dom";
import Categories from "./components/Categories";
import Listing from "./components/Listing";
import LoginFormPage from "./components/LoginFormPage";
import Navigation from "./components/Navigation";
import SingupFormPage from "./components/SingupFormPage";
import CardDetails from "./components/CardDetails";
import Card from "./components/Card";
import HostPage from "./components/HostPage";
import * as sessionActions from "./store/session";
import { getListingsThunk } from "./store/listing";
import { getCategoriesThunk } from "./store/category";
import FilteredListings from "./components/FilteredListings";
function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  // const listing = useSelector(state => console.log(state.listings, '!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!'))
  const history = useHistory();
  const listings = useSelector(state => Object.values(state.listings))
  const sessionUser = useSelector(state => state.session.user);
  if(!sessionUser){
    history.push('/login')
  }
  const categories = useSelector(state => {
    return Object.values(state.categories)
  })

  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
    if(!sessionUser){
      history.push('/login')
    }
  }, [dispatch, history]);

  useEffect(() => {
    if(sessionUser){
      dispatch(getCategoriesThunk())
    }
  }, [dispatch, sessionUser]);

  return isLoaded && (

    <Switch>
      <Route path="/login">
        <Navigation user={sessionUser} />
        <LoginFormPage />
      </Route>
      <Route path="/signup">
        <SingupFormPage />
      </Route>
      <Route exact path="/">
        <Navigation user={sessionUser} />
        <Categories categories={categories} />
        <Listing listings={listings} />
      </Route>
      <Route path="/listings/:id">
        <Navigation user={sessionUser} />
        <CardDetails />
      </Route>
      <Route path='/filtered-listings/categories/:id'>
        <Navigation user={sessionUser} />
        <Categories categories={categories} />
        <FilteredListings listings={listings} />
      </Route>
      <Route path="/hosting">
        <Navigation user={sessionUser} />
        <HostPage categories={categories} />
      </Route>

    </Switch>

  );
}

export default App;
