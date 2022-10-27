import React from 'react'
import { useEffect } from 'react'
import { useMultiContext } from '../../context/MultiContext'

const TypeForm = ({ type, setType, errorValidations }) => {

  const types = [ 'Entire home', 'Entire cabin', 'Cabin', 'Entire villa','Tiny Home', 'Bungalow', 'Private room in resort', 'Luxury stay' ]

  useEffect(() => {
    const chosenType = document.getElementById(`type-${type}`)
    // const chosenCategory = document.getElementById(`category-${categoryId}`)
    if(chosenType) chosenType.classList.add('type-checked')
    const allChecked = document.querySelectorAll('.type-checked')
    if(allChecked){
      allChecked.forEach(el => {
        el.classList.remove('type-checked')
      })
    }
    if(chosenType) chosenType.classList.add('type-checked')

  });
  return (
    <div>
            {errorValidations.length > 0 && (
              <div className='type-validation'>{errorValidations[0]}</div>
            )}
            <div className="types">
              {types.map((type, i) => (
                <div
                  id={`type-${type}`}
                  onClick={() => {
                  setType(type)
                  }} className='type-select' tabIndex={i}>
                  {type}
                </div>
              ))}
            </div>
          </div>
  )
}

export default TypeForm
