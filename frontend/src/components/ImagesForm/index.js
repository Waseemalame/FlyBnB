import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react'
import { useDispatch } from 'react-redux'

const ImagesForm = ({ imgUrls, setImgUrls, setImagesSubmitted }) => {
  const dispatch = useDispatch();

  const imgInputChange = (e, i) => {
    e.preventDefault();
    let newImgVals = [...imgUrls];
    newImgVals[i][e.target.name] = e.target.value;
    setImgUrls(newImgVals);
  }
  const handleImageSubmit = (e, i) => {
    e.preventDefault();
    setImagesSubmitted(true)


  }

  return (
    <>
      {imgUrls.map((img, i) => (
        <input
        placeholder='Image Url'
        name='url'
        type="text"
        value={img.url}
        onChange={e => imgInputChange(e, i)}
        required
        />

      ))}

      <div onClick={handleImageSubmit}>Submit Images</div>
    </>
  )
}

export default ImagesForm
