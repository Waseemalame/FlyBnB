import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Switch, useHistory, useLocation, useParams } from "react-router-dom";
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
import UserListingsPage from "./components/UserListingsPage";
import LoginNavigation from "./components/LoginNavigation";
import Footer from "./components/Footer";
import ListingDetails from "./components/ListingDetails";

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
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
        {/* <Navigation user={sessionUser} /> */}
        <LoginNavigation />
        <LoginFormPage />
      </Route>
      <Route path="/signup">
        <SingupFormPage />
      </Route>
      <Route exact path="/">
        <Navigation user={sessionUser} />
        <Categories categories={categories} />
        <Listing listings={listings} />
        <Footer />
      </Route>
      <Route path="/listings/:id">
        <Navigation user={sessionUser} />
        <ListingDetails />
      </Route>
      <Route path='/filtered-listings/categories/:id'>
        <Navigation user={sessionUser} />
        <Categories categories={categories} />
        <FilteredListings listings={listings} />
        <Footer />
      </Route>
      <Route path="/hosting">
        <HostPage categories={categories} />
      </Route>
      <Route path="/:username/listings">
        <Navigation user={sessionUser} />
        <UserListingsPage listings={listings} user={sessionUser} />
      </Route>


    </Switch>
  );
}

export default App;
