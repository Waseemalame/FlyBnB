import React from 'react'
import { useEffect } from 'react'
import { useMultiContext } from '../../../context/MultiContext'
import "./PriceForm.css"
const PriceForm = () => {
  const { price, setPrice, serviceFee, setServiceFee, cleaningFee, setCleaningFee, priceForm, setPriceForm} = useMultiContext()
  const priceFormContainer = document.querySelector('.price-form-container')

  useEffect(() => {
    if(priceFormContainer){

      if(priceForm){
        priceFormContainer.style.display = ''
      } else {

        priceFormContainer.style.display = 'none'
      }
    }
    }, [priceForm, priceFormContainer]);
  return (
    <div className='price-form-container'>
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
