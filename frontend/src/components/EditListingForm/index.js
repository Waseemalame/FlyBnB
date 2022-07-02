import React, { useState } from "react";
import * as sessionActions from "../../store/session";
import { useDispatch, useSelector } from "react-redux";
import { AmenitiesData, AmenitiesIcons } from "../HostForm/AmenitiesData";
import './EditListingForm.css'
import { editListingThunk, getListingsThunk } from "../../store/listing";
import { useHistory } from "react-router-dom";
import { useEffect } from "react";
function EditListingForm({ listing, setShowModal }) {

  const listings = useSelector(state => Object.values(state.listings))

  const dispatch = useDispatch();

  // const [errors, setErrors] = useState([]);

  const [title, setTitle] = useState(listing.title);
  const [categoryId, setCategoryId] = useState(listing?.categoryId);
  const [type, setType] = useState(listing.type);
  const [guests, setGuests] = useState(listing.guests);
  const [beds, setBeds] = useState(listing.beds);
  const [bedrooms, setBedrooms] = useState(listing.bedrooms);
  const [baths, setBaths] = useState(listing.baths);
  const [price, setPrice] = useState(listing.price);
  const [amenities, setAmenities] = useState([]);
  const [cleaningFee, setCleaningFee] = useState(listing.cleaningFee);
  const [serviceFee, setServiceFee] = useState(listing.serviceFee);
  const [address, setAddress] = useState(listing.address)
  const [cityLocation, setCityLocation] = useState(listing.city);
  const [stateLocation, setStateLocation] = useState(listing.state);
  const [country, setCountry] = useState(listing.country);
  const [selected, setSelected] = useState(false)
  const [editFormValidations, setEditFormValidations] = useState([]);
  const updateTitle = (e) => setTitle(e.target.value);
  const updateCategoryId = (e) => setCategoryId(e.target.value);
  const updateType = (e) => setType(e.target.value);
  const updateGuests = (e) => setGuests(e.target.value);
  const updateBeds = (e) => setBeds(e.target.value);
  const updateBedrooms = (e) => setBedrooms(e.target.value);
  const updateBaths = (e) => setBaths(e.target.value);
  const updatePrice = (e) => setPrice(e.target.value);
  const updateAmenities = (e) => setAmenities(e.target.value);
  const updateCleaningFee = (e) => setCleaningFee(e.target.value);
  const updateServiceFee = (e) => setServiceFee(e.target.value);
  const updateAddress = (e) => setAddress(e.target.value);
  const updateCity = (e) => setCityLocation(e.target.value);
  const updateState = (e) => setStateLocation(e.target.value);
  const updateCountry = (e) => setCountry(e.target.value);

  const history = useHistory();

  const user = useSelector(state => state.session.user)

  const categories = useSelector(state => {
    return Object.values(state.categories)
  })
  const errors = [];
  useEffect(() => {
    if(!title) errors.push('Title cannot be empty');
    if(!categoryId) errors.push('Must choose a category');
    if(!type) errors.push('Must choose a type');
    if(price <= 0) errors.push('Must include a price');
    if(!cityLocation) errors.push('Must include city');
    if(!country) errors.push('Must include country');

        setEditFormValidations(errors)
      }, [title, categoryId, type, cityLocation, country, price])
  const handleSubmit = async(e) => {
    e.preventDefault();
    setEditFormValidations([]);

    const data = {
      id: listing.id,
      userId: user.id,
      title,
      categoryId,
      type,
      guests,
      beds,
      bedrooms,
      baths,
      amenities: amenitiesArray,
      price,
      cleaningFee,
      serviceFee,
      city: cityLocation,
      state: stateLocation,
      country,

    }
    await dispatch(editListingThunk(data))
    await dispatch(getListingsThunk())

    // history.push('/')
    setShowModal(false)

  };

  let amenitiesArray = [];
  const changeBg = (index) => {
    const amenityDiv = document.getElementById(`amenity-${index - 1}`);
    if(amenityDiv.classList.contains('selected')){
      amenityDiv.classList.remove('selected')
      return;
    }
    amenityDiv.classList.add("selected")
    amenitiesArray.push(amenityDiv.innerText)
  }

  let selectedAmenities = document.querySelectorAll('.selected')

  const types = [ 'Entire home', 'Entire cabin', 'Cabin', 'Entire villa','Tiny Home', 'Bungalow', 'Private room in resort', 'Luxury stay' ]
  types.sort();
  const someArr = Object.entries(categories)
  return (
    <form className='edit-listing-form' onSubmit={handleSubmit}>
    <h3>Edit Listing</h3>
    <h5 className="amenities-note">Note: Editing your listing will require you to re-enter your amenities</h5>
    <ul className="edit-listing-errors">
      {editFormValidations.map((error, idx) => (
        <li key={idx}>{error}</li>
      ))}
    </ul>
    <label>Title
      <textarea
      type="text"
      value={title}
      onChange={updateTitle}
      placeholder='title'
      />
    </label>
    <label>Category
      <select
      value={categoryId}
      onChange={updateCategoryId}
      placeholder='category'
      type="text"
      >
      <option value='' disabled>Select Category</option>
      {someArr.map(category => (
        <option value={category[1].id}>
          {category[1].name}
          </option>
      ))}

      </select>
    </label>
    <label>Type
      <select
      value={type}
      onChange={updateType}
      placeholder='type'
      type="text"
      >
      <option value='' disabled>Select type</option>
      {types.map(type => (
        <option value={type}>{type}</option>
      ))}

      </select>
    </label>
    <label>Guests
      <input
      onChange={updateGuests}
      value={guests}
      min="0"
      type="number" />
    </label>
    <label>Beds
      <input
      value={beds}
      onChange={updateBeds}
      placeholder='number beds'
      min="0"
      type="number" />
    </label>
    <label>Bedrooms
      <input
      value={bedrooms}
      onChange={updateBedrooms}
      placeholder='number bedrooms'
      min="0"
      type="number" />
    </label>
    <label>Baths
      <input
      value={baths}
      onChange={updateBaths}
      placeholder='number baths'
      min="0"
      type="number" />
    </label>
    <label className='amenities-label'>Amenities
      <div className='all-amenities'>
        {AmenitiesData.map((amenity, index) => (
          <>
          <div
          id={'amenity-' + index}
          className="amenity-div"
          onClick={() => changeBg(index + 1)}
          >
              <img src={AmenitiesIcons[index]} alt="icon" />
              <div id='amenity-string'>{amenity}</div>
          </div>
          </>
          ))}
      </div>

    </label>
    <label className='price-label'>Price
      <input
      value={price}
      onChange={updatePrice}
      placeholder='price'
      min="0"
      type="number" />
    </label>
    <label>Cleaning Fee
      <input
      value={cleaningFee}
      onChange={updateCleaningFee}
      placeholder='cleaning fee'
      min="0"
      type="number" />
    </label>
    <label>Service Fee
      <input
      value={serviceFee}
      onChange={updateServiceFee}
      placeholder='service fee'
      min="0"
      type="number" />
    </label>
    <label>Address
      <input
      value={address}
      onChange={updateAddress}
      placeholder='address'
      type="text" />
    </label>
    <label>City
      <input
      value={cityLocation}
      onChange={updateCity}
      placeholder='city'
      type="text" />
    </label>
    <label>State
      <input
      value={stateLocation}
      onChange={updateState}
      placeholder='state'
      type="text" />
    </label>
    <label>Country
      <input
      value={country}
      onChange={updateCountry}
      placeholder='country'
      type="text" />
    </label>
    <button disabled={editFormValidations.length > 0} type="submit">Submit</button>
  </form>
  );
}

export default EditListingForm;
