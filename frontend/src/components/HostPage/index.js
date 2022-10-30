import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import Geocode from "react-geocode";
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { useMultiContext } from '../../context/MultiContext'
import { addListingThunk } from '../../store/listing';
import HostForm from '../HostForm'
import NewHostForm from '../HostForm/NewHostForm'
import Form from '../MultiForm';
import './HostPage.css'
const HostPage = () => {

  Geocode.setApiKey("AIzaSyCeFO0R7H2nTlWn4AMMcRcFSeUr7ndzqug");
  const user = useSelector(state => state.session.user)
  const [page, setPage] = useState(0);

  const { typesForm, setTypesForm,
          categoriesForm, setCategoriesForm,
          mapForm, setMapForm, latLng, setLatLng,
          closeAddrForm, setCloseAddrForm,
          type, setType,
          categoryId, setCategoryId,
          address, setAddress,
          city, setCity,
          state, setState,
          country, setCountry,
          guests, setGuests,
          beds, setBeds,
          bedrooms, setBedrooms,
          baths, setBaths,
          addrErrors, setAddrErrors,
          errorValidations, setErrorValidations,
          imageErrors, setImageErrors,
          infoForm, setInfoForm,
          amenitiesForm, setAmenitiesForm,
          amenities, setAmenities,
          imageForm, setImageForm,
          images, setImages,
          priceForm, setPriceForm,
          price, setPrice,
          cleaningFee, setCleaningFee,
          serviceFee, setServiceFee,

          titleForm, setTitleForm, title, setTitle } = useMultiContext()

  const [showBackBtn, setShowBackBtn] = useState(false);
  const [showImageForm, setShowImageForm] = useState(false)
  const body = document.querySelector('body')
  const rightPage = document.querySelector('.right-page')

  const dispatch = useDispatch()
  const history = useHistory()

  useEffect(() => {
    body.style.overflowY = 'hidden'

    return () => body.style.overflowY = 'scroll'
  }, []);
  useEffect(() => {
    if(imageForm && rightPage){
      rightPage.style.overflowY = 'hidden'

      return () => rightPage.style.overflowY = 'scroll'
    }

  }, []);


  useEffect(() => {
    if(rightPage){
      if(mapForm){
        rightPage.style.overflowY = 'hidden'
      } else {
        rightPage.style.overflowY = 'scroll'
      }
    }
  });

  useEffect(() => {
      if(typesForm){
        setShowBackBtn(false)
      } else {
        setShowBackBtn(true)
      }
  }, [typesForm]);


  const getFullAddress = async() => {
    const errors = []

    try{

      const res = await Geocode.fromAddress(`${address} ${city}`)
      const { lat, lng } = res.results[0].geometry.location;
      setLatLng({
        lat: lat,
        lng: lng
      })
    }
    catch (e){
      setAddrErrors(errors)
      return 'error'
    }

}

  // Submit Listing Function
  const handleSubmitListing = async() => {
    if(imageErrors.length > 0) return;
    let amenArr = Object.values(amenities).map(amenity => amenity.name)
    let imageArr = []
    if (images && images.length !== 0) {
      for (let i = 0; i < images.length; i++) {
        imageArr.push(images[i]);
      }
    }
    const data = {
      userId: user.id,
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
      amenities: amenArr,
      price,
      cleaningFee,
      serviceFee,
      images,
    }
    dispatch(addListingThunk(data))
    setMapForm(false)
    setTypesForm(true)
    setCategoriesForm(false)
    setImageForm(false)
    setAmenitiesForm(false)
    setPriceForm(false)
    setPrice(0)
    setTitle('')
    setType('')
    setCategoryId('')
    setState('')
    setCity('')
    setCountry('')
    setAddress('')
    setBeds(0)
    setBaths(0)
    setBedrooms(.5)
    setCleaningFee(0)
    setServiceFee(0)
    setGuests(0)
    setAmenities([])
    history.push('/')

  }
  return (
    <div class="host-page-container">


            <div class="left-page">
                <img onClick={() => history.push('/')} className='host-nav-logo' src="https://media.discordapp.net/attachments/949432407461855244/993630127529414766/flybnb.png" alt="logo" />

                {page === 0 && (
                  <div className='left-header'>What kind of place will you host?</div>
                )}
                {page === 1 && (
                  <div className='left-header'>Please select a category for your home</div>
                )}
                {(page === 2 || page === 3) && (
                  <div className='left-header'>Where's your place located?</div>
                  )}
                {page === 4 && (
                  <div className='left-header'>Let's give your place a name</div>
                )}
                {page === 5 && (
                  <div className='left-header'>Add information for your home</div>
                )}
                {page === 6 && (
                  <div className='left-header'>Add amenities</div>
                )}
                {page === 7 && (
                  <div className='video-box-div'>
                  <video className='video-box' controls>
                  <source src="https://a0.muscache.com/v/9c/d4/9cd47434-c6bd-58ec-90b7-b50aa7dba461/9cd47434c6bd58ec90b7b50aa7dba461_4000k_1.mp4?imformat=h265" type="video/mp4"></source>
                  </video>
                  </div>
                )}
                {page === 8 && (
                  <div className='left-header'>Final step: Add images</div>
                )}

            </div>
            <div className="right-page">
            <Form page={page} setPage={setPage} />
            </div>
            {/* <div className="next-page">
              {showBackBtn && (
                <button onClick={handleBack} className="back-button" type='button'>Back</button>
              )}
                {!imageForm ? (
                  <button onClick={handleNext} className="next-button" type='button'>Next</button>

                ) :(
                  <button onClick={handleSubmitListing} className="submit-button" type='button'>Submit</button>
                )}
            </div> */}
    </div>
  )
}

export default HostPage
