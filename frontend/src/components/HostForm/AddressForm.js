import React from 'react'
import { useEffect } from 'react';
import { useMultiContext } from '../../context/MultiContext';
const AddressForm = ({ address, setAddress, city, setCity, state, setState, country, setCountry }) => {
  const { addrErrors, errorValidations, setErrorValidations } = useMultiContext()
  useEffect(() => {
    const errors = [];
    if(!address || !city){
      errors.push('Street address and city are required')
    }
    setErrorValidations(errors)
  }, [address, city]);
  return (
    <div className='location-form-container'>
      <div className='location-header'>Enter your address</div>
      <div className="location-form-inner">
        <div className="street-div">Street
          <input
          className='street-input'
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          placeholder='Street'
          type="text" />
        </div>
        <div className="city-div">City
          <input
          className='city-input'
          value={city}
          onChange={(e) => setCity(e.target.value)}
          placeholder='city'
          type="text" />
        </div>
        <div className="state-div">State
          <input
          className='state-input'
          value={state}
          onChange={(e) => setState(e.target.value)}
          placeholder='state'
          type="text" />
        </div>
        <div className="country-div">Country
          <input
          className='country-input'
          value={country}
          onChange={(e) => setCountry(e.target.value)}
          placeholder='country'
          type="text" />
        </div>
      </div>
      {errorValidations.length > 0 && (

        <div className="address-errors">
          {errorValidations[0]}
        </div>
      )}
    </div>
  )
}

export default AddressForm
