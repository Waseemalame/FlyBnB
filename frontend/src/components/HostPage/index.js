import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import Geocode from "react-geocode";
import { useMultiContext } from '../../context/MultiContext'

import HostForm from '../HostForm'
import NewHostForm from '../HostForm/NewHostForm'
import './HostPage.css'
const HostPage = ({ categories }) => {
  Geocode.setApiKey("AIzaSyCeFO0R7H2nTlWn4AMMcRcFSeUr7ndzqug");

  const { typesForm, setTypesForm,
          categoriesForm, setCategoriesForm,
          mapForm, setMapForm, latLng, setLatLng,
           closeAddrForm, setCloseAddrForm,
           address, setAddress,
           city, setCity,
           state, setState,
           country, setCountry,
           addrErrors, setAddrErrors,
           errorValidations, setErrorValidations } = useMultiContext()

  const [showBackBtn, setShowBackBtn] = useState(false);
  const [showImageForm, setShowImageForm] = useState(false)
  const body = document.querySelector('body')
  const rightPage = document.querySelector('.right-page')

  useEffect(() => {
    body.style.overflowY = 'hidden'

    return () => body.style.overflowY = 'scroll'
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
  useEffect(() => {
    console.log(errorValidations)
  }, [errorValidations]);

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
    if(mapForm){
      // if address form is closed
      if(closeAddrForm){
        console.log('ad is closed')
        setCloseAddrForm(false)
        setMapForm(false)

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
      if(latLng){
        console.log(latLng)
      } else{
        console.log('none')
      }
    }
  }
  const handleBack = () => {
    if(categoriesForm){
      setCategoriesForm(false)
      setTypesForm(true)
    } else if(mapForm){
      if(closeAddrForm){
        setCloseAddrForm(false)

      } else {
        console.log('hihfdidhsfisdhfsdif')
        setMapForm(false)
        setCategoriesForm(true)
      }
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
