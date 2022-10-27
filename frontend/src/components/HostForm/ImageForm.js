import React, { useEffect, useState } from 'react'
import { useMultiContext } from '../../context/MultiContext'
import "./ImageForm.css"
import OneLabel from './OneLabel'
const ImageForm = ({ images, setImages}) => {
  const { imageErrors } = useMultiContext()

  return (
    <>
    {Object.values(images) && Object.values(images).length < 5 && (
      <ul className='image-errors'>{imageErrors}</ul>
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
