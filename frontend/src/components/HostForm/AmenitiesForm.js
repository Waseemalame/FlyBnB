import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import { useMultiContext } from '../../context/MultiContext'
import { amenitiesObj } from './AmenitiesData'
import "./AmenitiesForm.css"
const AmenitiesForm = ({ amenitiesForm }) => {
const amenitiesFormContainer = document.querySelector('.amenitites-form-container')
const { setAmenities, amenityRef } = useMultiContext()
const amenityOptions = Object.values(amenitiesObj)
  useEffect(() => {
    if(amenitiesFormContainer){

      if(amenitiesForm){

        amenitiesFormContainer.style.display = ''
      } else {
        amenitiesFormContainer.style.display = 'none'
      }
    }
  }, [amenitiesFormContainer, amenitiesForm]);

  const handleChange = (e) => {
    const allAmenities = document.querySelectorAll('input[type="checkbox"]:checked + label')
    const amenitySelection = {}
    for (let i = 0; i < allAmenities.length; i++) {
      const amenity = allAmenities[i];
      amenity.addEventListener('change', function () {


      });
      amenitySelection[i] = {
                  name: amenity.children[0].children[0].innerHTML,
                  icon: amenity.children[0].children[1].src
                }
    }
    setAmenities(amenitySelection)
  }
  return (
    <div ref={amenityRef} className='amenitites-form-container'>
      <div className="amenity-header">Do you have any standout amenities?</div>
      <div className="all-amenity-options">
      {amenityOptions.map((amenity, i) => (
        <>
        <input onChange={(e) => handleChange(e)} className='amenity-checkbox' type="checkbox" name="amenity" id={`amenity-${amenity.name}`} />
        <label className={`amenity-label`} value={`amenity-${amenity.name}`} htmlFor={`amenity-${amenity.name}`}>
        <div className='amenity-option'>
          <div>{amenity.name}</div>
          <img src={amenity.icon} alt="" />
        </div>
        </label>
        </>
      ))}
      </div>
    </div>
  )
}

export default AmenitiesForm
