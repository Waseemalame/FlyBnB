import React, { useEffect, useState } from 'react'
import { useMultiContext } from '../../context/MultiContext'
import "./ImageForm.css"
import OneLabel from './OneLabel'
const ImageForm = ({ images, setImages}) => {
  const { errorValidations, setErrorValidations } = useMultiContext()
  useEffect(() => {
    const errors = []
    if (Object.values(images).length < 5){
      errors.push('Five images are required')
    }
    setErrorValidations(errors)
  }, [images]);
  return (
    <>
      {errorValidations.length > 0 && (
        <div className='type-validation'>{errorValidations[0]}</div>
      )}

    <div className='image-form-container'>
      <OneLabel index={0} images={images} setImages={setImages}/>
      <OneLabel index={1} images={images} setImages={setImages}/>
      <OneLabel index={2} images={images} setImages={setImages}/>
      <OneLabel index={3} images={images} setImages={setImages}/>
      <OneLabel index={4} images={images} setImages={setImages}/>
    </div>
    </>
  )
}

export default ImageForm
