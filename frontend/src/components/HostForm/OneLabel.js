import React, { useState } from 'react'

const OneLabel = ({ updateFiles }) => {
  const [imagePreview, setImagePreview] = useState(null);

  const [profileImgPreview, setProfileImgPreview] = useState(null);

  const previewImg = (e) => {
    setImagePreview(URL.createObjectURL(e.target.files[0]))

  }
  return (
    <label className='one-label' htmlFor="upload-image-input">
                  {imagePreview ? (
                    <img className='one-image-preview' src={imagePreview} alt="" />

                  ) : (

                    <input
                    id="upload-image-input"
                    type="file"
                    // multiple
                    onChange={ (e) => {
                      updateFiles(e)
                      setImagePreview(URL.createObjectURL(e.target.files[0]))
                    }
                  } />
                  )}
      </label>
  )
}

export default OneLabel
