import React, { useState } from 'react'
import { useEffect } from 'react';
import { useMultiContext } from '../../context/MultiContext';

const OneLabel = ({ index, images, setImages }) => {
  const [imagePreview, setImagePreview] = useState(null);

  const [listOfFiles, setListOfFiles] = useState([]);
  useEffect(() => {
    if(images[index]){
      setImagePreview(URL.createObjectURL(images[index]))
    }
  }, [images, index]);
  const updateFiles = (e) => {
    e.stopPropagation()
    const file = e.target.files[0];
    listOfFiles.push(file)
    setImages((prevState) => ({
      ...prevState,
      [index]: file
    }));
  };

  // function for canceling an image before submission
  const cancelFile = () => {
    delete images[index]
    setImages({...images})
    setImagePreview('')
    return
}
  return (
    <>
    {imagePreview ? (
      <div className='one-preview'>
            <i onClick={() => cancelFile()} class="fa-solid fa-xmark remove-image-icon"></i>

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
                  }} />
          </label>
      )}
    </>

  )
}

export default OneLabel
