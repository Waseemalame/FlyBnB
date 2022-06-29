import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react'
import { useDispatch } from 'react-redux'

const ImagesForm = ({ imgUrls, setImgUrls, setImagesSubmitted }) => {
  const dispatch = useDispatch();
  // const [imgUrls, setImgUrls] = useState([ { url: "" }, { url: "" }, { url: "" }, { url: "" }, { url: "" } ])

  const imgInputChange = (e, i) => {
    e.preventDefault();
    // console.log(e.target.value, 'asdfdsssssssssss')
    let newImgVals = [...imgUrls];
    newImgVals[i][e.target.name] = e.target.value;
    setImgUrls(newImgVals);
  }
  const handleImageSubmit = (e, i) => {
    e.preventDefault();
    console.log('hihih')
    setImagesSubmitted(true)


  }

  // imgUrls.map(el => console.log(el.url))
  return (
    <form>
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
    </form>
  )
}

export default ImagesForm
