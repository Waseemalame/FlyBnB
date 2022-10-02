import React, { useState } from 'react'
import { useMultiContext } from '../../context/MultiContext';

const OneLabel = ({ updateFiles, index }) => {
  const [imagePreview, setImagePreview] = useState(null);
  const { images, setImages } = useMultiContext()

  // function for canceling an image before submission
  const cancelFile = (index) => {
    const imgObj = {}
    images.forEach((image, i) => {
      if(!(i === index)){
        imgObj[i] = image
      }
    })
    setImages(Object.values(imgObj))
    setImagePreview('')
    return
}
  return (
    <>
    {imagePreview ? (
      <div className='one-preview'>
            <i onClick={() => cancelFile(index + 1)} class="fa-solid fa-xmark remove-image-icon"></i>

            <img className='one-image-preview' src={imagePreview} alt="" />
      </div>
          ) : (

            <label className='one-label' htmlFor="upload-image-input">
            <i class="fa-regular fa-image image-upload-icon"></i>


              <input
                id="upload-image-input"
                type="file"
                onChange={ (e) => {
                  updateFiles(e)
                  setImagePreview(URL.createObjectURL(e.target.files[0]))
                }} />
        </label>
      )}
    </>

  )
}

export default OneLabel
