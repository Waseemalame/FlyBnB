import React from 'react'
import { useEffect } from 'react'
import { useMultiContext } from '../../../context/MultiContext'
import "./PriceForm.css"
const PriceForm = () => {
  const { price, setPrice, serviceFee, setServiceFee, cleaningFee, setCleaningFee, priceForm, setPriceForm, errorValidations, setErrorValidations} = useMultiContext()
  useEffect(() => {
    const errors = []
    if(price < 1){
      errors.push('Price cannot be zero')
    }
    setErrorValidations(errors)
  }, [price, setErrorValidations]);

  return (
    <div className='price-form-container'>
      {errorValidations.length > 0 && (
        <div className='type-validation'>{errorValidations[0]}</div>
      )}
      <label className='price-label'>Price
        <input
        value={price}
        onChange={(e) => setPrice(e.target.value)}
        placeholder='price'
        min="0"
        type="number" />
      </label>
      <label>Cleaning Fee
        <input
        value={cleaningFee}
        onChange={(e) => setCleaningFee(e.target.value)}
        placeholder='cleaning fee'
        min="0"
        type="number" />
      </label>
      <label>Service Fee
        <input
        value={serviceFee}
        onChange={(e) => setServiceFee(e.target.value)}
        placeholder='service fee'
        min="0"
        type="number" />
      </label>
    </div>
  )
}

export default PriceForm
