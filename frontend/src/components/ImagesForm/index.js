import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react'
import { useDispatch } from 'react-redux'

const ImagesForm = ({ imgUrls, setImgUrls, setImagesSubmitted }) => {
  const dispatch = useDispatch();
  const [validationErrorsImages, setValidationErrorsImages] = useState([])
  const errors = [];
  const imgInputChange = (e, i) => {
    e.preventDefault();
    let newImgVals = [...imgUrls];
    newImgVals[i][e.target.name] = e.target.value;
    setImgUrls(newImgVals);
  }
  const handleImageSubmit = (e, i) => {
    e.preventDefault();
    if(validationErrorsImages.length === 0){

      setImagesSubmitted(true)
    }


  }
  useEffect(() => {
    imgUrls.forEach(img => {
      if(!img.url) {
        errors.push('image field cannot be left blank')
        // return;
      }
    })
  }, [imgUrls])



  return (
    <>

      <ul className="create-listing-errors">
        {validationErrorsImages.map((error) => (
          <li key={error}>{error}</li>
        ))}
      </ul>
      <h3>All 5 image fields must be complete</h3><br></br>
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

      {/* <div onClick={handleImageSubmit}>Submit Images</div> */}
    </>
  )
}

export default ImagesForm
