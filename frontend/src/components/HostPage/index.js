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
import './HostPage.css'
const HostPage = () => {
  Geocode.setApiKey("AIzaSyCeFO0R7H2nTlWn4AMMcRcFSeUr7ndzqug");
  const user = useSelector(state => state.session.user)

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
    if(imageForm){
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


  let errors = []
  const getFullAddress = async() => {


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

  const handleNext = async() => {
    if(errorValidations.length > 0) return
    if(typesForm){
      setTypesForm(false)

      setCategoriesForm(true)
    } else if(categoriesForm){
      setCategoriesForm(false)
      setMapForm(true)
      setCloseAddrForm(false)
    }
     else if(mapForm){
      // if address form is closed
      if(closeAddrForm){
        console.log('ad is closed')
        setCloseAddrForm(false)
        setMapForm(false)
        setTitleForm(true)

      } else {
        console.log(addrErrors.length)
        if(!address || !city || !country){
          errors.push('street, city, and country is required')
          setAddrErrors(errors)
          return
        }
        const res = await getFullAddress()

        if(res !== 'error'){
          setCloseAddrForm(true)
        }
      }
    }
    else if(titleForm){
        setInfoForm(true)
        setTitleForm(false)
    }
    else if(infoForm){
      setInfoForm(false)
      setAmenitiesForm(true)
    }
    else if(amenitiesForm){
      setAmenitiesForm(false)
      setPriceForm(true)

    }
    else if(imageForm){
      console.log(images, 'images')
      console.log(type, categoryId, guests, baths, beds, bedrooms, city, state, country, amenities)
      setImageForm(false)
    }
    else if (priceForm){
      setImageForm(true)
      setPriceForm(false)
    }
    setAddrErrors([])

  }


  const handleBack = () => {
    if(categoriesForm){
      setCategoriesForm(false)
      setTypesForm(true)
    }
    if(mapForm){
      if(closeAddrForm){
        setCloseAddrForm(false)

      } else {
        console.log('hihfdidhsfisdhfsdif')
        setMapForm(false)
        setCategoriesForm(true)
      }
    }
    if(titleForm){
      setTitleForm(false)
      setMapForm(true)
      closeAddrForm(false)
    }
    if(infoForm){
      setInfoForm(false)
      setTitleForm(true)
    }
    if(amenitiesForm){
      setAmenitiesForm(false)
      setInfoForm(true)
    }
    if(imageForm){
      // setAmenitiesForm(true)
      setPriceForm(true)
      setImageForm(false)
    }
    if(priceForm){
      setPriceForm(false)
      setAmenitiesForm(true)
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
    console.log(data)
    dispatch(addListingThunk(data))
    history.push('/')
  }
  return (
    <div class="host-page-container">


            <div class="left-page">
                {typesForm && (
                  <div className='left-header'>What kind of place will you host?</div>
                )}
                {categoriesForm && (
                  <div className='left-header'>Please select a category for your home</div>
                )}
                {mapForm && (
                  <div className='left-header'>Where's your place located?</div>
                  )}
                {titleForm && (
                  <div className='left-header'>Let's give your place a name</div>
                )}
                {infoForm && (
                  <div className='left-header'>Add information for your home</div>
                )}
                {amenitiesForm && (
                  <div className='left-header'>Add amenities</div>
                )}
                {imageForm && (
                  <div className='left-header'>Where's your place located?</div>
                )}
                {priceForm && (
                  <div className='video-box-div'>
                  <video className='video-box' controls>
                  <source src="https://a0.muscache.com/v/9c/d4/9cd47434-c6bd-58ec-90b7-b50aa7dba461/9cd47434c6bd58ec90b7b50aa7dba461_4000k_1.mp4?imformat=h265" type="video/mp4"></source>
                  </video>
                  </div>
                )}

            </div>
            <div className="right-page">
            <NewHostForm />
            </div>
            <div className="next-page">
              {showBackBtn && (
                <button onClick={handleBack} className="back-button" type='button'>Back</button>
              )}
                {!imageForm ? (
                  <button onClick={handleNext} className="next-button" type='button'>Next</button>

                ) :(
                  <button onClick={handleSubmitListing} className="submit-button" type='button'>Submit</button>
                )}
            </div>
    </div>
  )
}

export default HostPage
