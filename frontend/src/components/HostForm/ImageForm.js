import React from 'react'
import { useMultiContext } from '../../context/MultiContext'
import "./ImageForm.css"
const ImageForm = () => {
  const { imagesRef } = useMultiContext()
  return (
    <div className='image-form-container'>
      ImageForm
    </div>
  )
}

export default ImageForm
