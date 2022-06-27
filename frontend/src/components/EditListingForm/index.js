import React, { useState } from "react";
import * as sessionActions from "../../store/session";
import { useDispatch, useSelector } from "react-redux";
import { AmenitiesData, AmenitiesIcons } from "../HostForm/AmenitiesData";
import { useEffect } from "react";
import './EditListingForm.css'
import { editListingThunk } from "../../store/listing";

function EditListingForm({ listing }) {

  const dispatch = useDispatch();

  const [errors, setErrors] = useState([]);

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

  const [images, setImages] = useState([])

  const [image1, setImage1] = useState(listing?.Images[1]?.url || '');
  const [image2, setImage2] = useState(listing?.Images[2]?.url || '');
  const [image3, setImage3] = useState(listing?.Images[3]?.url || '');
  const [image4, setImage4] = useState(listing?.Images[4]?.url || '');
  const [image5, setImage5] = useState(listing?.Images[5]?.url || '');
  const [image6, setImage6] = useState(listing?.Images[6]?.url || '');

  const user = useSelector(state => state.session.user)

  const categories = useSelector(state => {
    return Object.values(state.categories)
  })
  console.log(image1, image2)

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
  useEffect(() => {
    for(let el of selectedAmenities){
      amenitiesArray.push(el.innerText)
    }
  }, [amenitiesArray, selectedAmenities, categoryId])

  useEffect(() => {
    console.log(image1, image2, image3, image4, image5, image6)
    if(image1 !== '') images.push(image1)
    if(image2 !== '') images.push(image2)
    if(image3 !== '') images.push(image3)
    if(image4 !== '') images.push(image4)
    if(image5 !== '') images.push(image5)
    if(image6 !== '') images.push(image6)
  }, [image1, image2, image3, image4, image5, image6])
  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors([]);
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
      images

    }
    console.log(images)
    await dispatch(editListingThunk(data))

  };
  const someArr = Object.entries(categories)

  return (
    <form className='edit-listing-form' onSubmit={handleSubmit}>
      <h3>Edit Listing</h3>
      {/* <ul>
        {errors.map((error, idx) => (
          <li key={idx}>{error}</li>
        ))}
      </ul> */}
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
      <label className='images-label'>Images
        <input
        value={image1}
        onChange={(e) => setImage1(e.target.value)}
        className='image-input'
        placeholder='image url'
        type="text" />
        <input
        value={image2}
        onChange={(e) => setImage2(e.target.value)}
        className='image-input'
        placeholder='image url'
        type="text" />
        <input
        value={image3}
        onChange={(e) => setImage3(e.target.value)}
        className='image-input'
        placeholder='image url'
        type="text" />
        <input
        value={image4}
        onChange={(e) => setImage4(e.target.value)}
        className='image-input'
        placeholder='image url'
        type="text" />
        <input
        value={image5}
        onChange={(e) => setImage5(e.target.value)}
        className='image-input'
        placeholder='image url'
        type="text" />
        <input
        value={image6}
        onChange={(e) => setImage6(e.target.value)}
        className='image-input'
        placeholder='image url'
        type="text" />
      </label>
      <button type="submit">Submit</button>
    </form>
  );
}

export default EditListingForm;
