import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import Geocode from "react-geocode";
import { useMultiContext } from '../../context/MultiContext'

import HostForm from '../HostForm'
import NewHostForm from '../HostForm/NewHostForm'
import './HostPage.css'
const HostPage = () => {
  Geocode.setApiKey("AIzaSyCeFO0R7H2nTlWn4AMMcRcFSeUr7ndzqug");

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
          infoForm, setInfoForm,
          amenitiesForm, setAmenitiesForm,
          amenities, setAmenities,
          imageForm, setImageForm,
          images, setImages,
          priceForm, setPriceForm,
          titleForm, setTitleForm, title, setTitle } = useMultiContext()

  const [showBackBtn, setShowBackBtn] = useState(false);
  const [showImageForm, setShowImageForm] = useState(false)
  const body = document.querySelector('body')
  const rightPage = document.querySelector('.right-page')

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
      setImageForm(true)

    }
    else if(imageForm){
      console.log(images, 'images')
      console.log(type, categoryId, guests, baths, beds, bedrooms, city, state, country, amenities)
      setImageForm(false)
      setPriceForm(true)
    }
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
      setAmenitiesForm(true)
      setImageForm(false)
    }
    if(priceForm){
      setPriceForm(false)
      setImageForm(true)
    }
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
                  <div className='left-header'>Add price details for your guests</div>
                )}

            </div>
            <div className="right-page">
            <NewHostForm />
            </div>
            <div className="next-page">
              {showBackBtn && (
                <button onClick={handleBack} className="back-button" type='button'>Back</button>
              )}
                <button onClick={handleNext} className="next-button" type='button'>Next</button>
            </div>
    </div>
  )
}

export default HostPage
