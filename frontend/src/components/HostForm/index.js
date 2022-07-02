import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { AmenitiesData, AmenitiesIcons } from './AmenitiesData';
import { Redirect, useHistory } from 'react-router-dom';
import { addListingThunk } from '../../store/listing';
import './HostForm.css'
import ImagesForm from '../ImagesForm';
const HostForm = ({ categories, setShowImageForm, showImageForm }) => {

  const [showAmenititesForm, setShowAmenititesForm] = useState(false)

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
  const [selected, setSelected] = useState(false)
  const [imgUrls, setImgUrls] = useState([ { url: "" }, { url: "" }, { url: "" }, { url: "" }, { url: "" } ])
  const [validationErrors, setValidationErrors] = useState([]);
  const [attemptedSubmit, setAttemptedSubmit] = useState(false);

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

  const [imagesSubmitted, setImagesSubmitted] = useState(false)
  const dispatch = useDispatch();

  // let amenitiesArray = [];
  const [amenitiesState, setAmenitiesState] = useState([])

  const user = useSelector(state => state.session.user)

  const amenitiesArray = [];
  const history = useHistory()
  useEffect(() => {
    // setAmenitiesState(amenitiesArray)
  }, [amenitiesArray])


  // console.log(selectedAmenities)


  const types = [ 'Entire home', 'Entire cabin', 'Cabin', 'Entire villa','Tiny Home', 'Bungalow', 'Private room in resort', 'Luxury stay' ]
  types.sort();


  const errors = [];
  useEffect(() => {
    if(!title) errors.push('Title cannot be empty');
    if(!categoryId) errors.push('Must choose a category');
    if(!type) errors.push('Must choose a type');
    if(!price) errors.push('Must include a price');
    if(!cityLocation) errors.push('Must include city');
    if(!country) errors.push('Must include country');
    // if(!imagesSubmitted) errors.push('Must add 5 images')

    // imgUrls.forEach(img => {
      //   if(!img.url) {
        //     errors.push('image field cannot be left blank')
        //     // return;
        //   }
        // })

        setValidationErrors(errors)
      }, [title, categoryId, type, imgUrls, cityLocation, country, imagesSubmitted, price])

      const addAmenFunc = (e) => {
        e.preventDefault();
        setShowAmenititesForm(true)
      }
  let selectedAmenities;
  const changeBg = (e, index) => {
    console.log(e.target.innerText)
    // amenities.push(e.target.innerText)
    // console.log(amenities)
    // setAmenities([].concat(e.target.innerText))
    // console.log(amenities)

    // console.log('hihihihi')
    const amenityDiv = document.getElementById(`amenity-${index - 1}`);
    if(amenityDiv.classList.contains(`selected`)){
      amenityDiv.classList.remove(`selected`)
      return;
    } else if (!amenityDiv.classList.contains('selected')){
      amenityDiv.classList.add("selected")

    }




  }
  // let newArr = []

  const onSubmit = async (e) => {
    e.preventDefault();
    setAttemptedSubmit(true)
    selectedAmenities = document.querySelectorAll('.selected')

    for( let el of selectedAmenities ){

      amenitiesArray.push(el.innerText)

    }
    console.log(selectedAmenities)


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
    images: imgUrls

  }
  console.log(amenitiesArray, 'amentities Array ~!!!!!!')



      await dispatch(addListingThunk(data))
      history.push('/')

  }
  const someArr = Object.entries(categories)
  someArr.forEach(arr => {

  })
  return (
    <form className='host-form' onSubmit={onSubmit}>

        <>

          <ul className="create-listing-errors">
          {validationErrors.map((error) => (
            <li key={error}>{error}</li>
          ))}
        </ul>


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
      <button onClick={(e) =>{
        e.preventDefault();
        showAmenititesForm ? setShowAmenititesForm(false) : setShowAmenititesForm(true)

        return;
      }
      }
      >Add Amenitites</button>
      {showAmenititesForm && (
        <label className='amenities-label'>Amenities
        <div className='all-amenities'>
          {AmenitiesData.map((amenity, index) => (
            <>
            <div
            id={'amenity-' + index}
            className="amenity-div"
            value={amenity}
            onClick={(e) => {
              // console.log(e.target.value)
              // amenitiesArray.push(e.target.innerText)
              // console.log(amenitiesArray, 'inside onlcick')
              changeBg(e, index + 1)
            }}
            >
                <img src={AmenitiesIcons[index]} alt="icon" />
                <div id='amenity-string'>{amenity}</div>
            </div>
            </>
            ))}
        </div>

      </label>
      )
      }

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
    </>

      {!showImageForm && (
        <button onClick={(e) =>{
          e.preventDefault();
          setShowImageForm(true)
          // return;
        }
        }
        >Add Images</button>

      )}
      {showImageForm && (
        <div>
          <ImagesForm imgUrls={imgUrls} setImgUrls={setImgUrls} setImagesSubmitted={setImagesSubmitted} />
          <button onClick={(e) =>{
            e.preventDefault();
            setShowImageForm(false)
            return;
          }
          }
          >Back</button>
        </div>

      )}
      {showImageForm && (

      <button disabled={validationErrors.length > 0} type="submit">Submit</button>
      )}
    </form>
  )
}

export default HostForm
