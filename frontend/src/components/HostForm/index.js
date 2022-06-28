import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { AmenitiesData, AmenitiesIcons } from './AmenitiesData';
import { Redirect, useHistory } from 'react-router-dom';
import { addListingThunk } from '../../store/listing';
import './HostForm.css'
import ImagesForm from '../ImagesForm';
const HostForm = ({ categories }) => {

  const [title, setTitle] = useState('');
  const [categoryId, setCategoryId] = useState('');
  const [type, setType] = useState('');
  const [guests, setGuests] = useState(0);
  const [beds, setBeds] = useState(0);
  const [bedrooms, setBedrooms] = useState(0);
  const [baths, setBaths] = useState(0);
  const [price, setPrice] = useState(0);
  const [amenities, setAmenities] = useState([]);
  const [cleaningFee, setCleaningFee] = useState(0);
  const [serviceFee, setServiceFee] = useState(0);
  const [address, setAddress] = useState('')
  const [cityLocation, setCityLocation] = useState('');
  const [stateLocation, setStateLocation] = useState('');
  const [country, setCountry] = useState('');
  const [selected, setSelected] = useState(false);

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
  const [showImagesForm, setShowImagesForm] = useState(false)
  const [newListingCreated, setNewListingCreated] = useState(false)
  const [images, setImages] = useState([])

  const [image1, setImage1] = useState('');
  const [image2, setImage2] = useState('');
  const [image3, setImage3] = useState('');
  const [image4, setImage4] = useState('');
  const [image5, setImage5] = useState('');
  const [image6, setImage6] = useState('');


  const dispatch = useDispatch();

  let amenitiesArray = [];

  const user = useSelector(state => state.session.user)


  const history = useHistory()


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


  const onSubmit = async (e) => {
    e.preventDefault();

  const data = {
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


    const newListing = await dispatch(addListingThunk(data))
    if(newListing){
      setNewListingCreated(true)
      history.push('/')
    }
  }
  const someArr = Object.entries(categories)
  someArr.forEach(arr => {

  })
  return (
    <form className='host-form' onSubmit={onSubmit}>
      <label>Title
        <input
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
          <option value={category[1].id}>{category[1].name}</option>
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
      {newListingCreated && showImagesForm ? (
        <ImagesForm />
      ) : ''}
      <button type="submit">Submit</button>
    </form>
  )
}

export default HostForm
