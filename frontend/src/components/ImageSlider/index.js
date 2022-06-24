import React, { useState } from 'react'
import {RiArrowRightCircleFill, RiArrowLeftCircleFill } from 'react-icons/ri'
import {IoIosArrowDroprightCircle, IoIosArrowDropleftCircle } from "react-icons/io"
import { Link, Redirect, useHistory } from 'react-router-dom';

import './ImageSlider.css'
const ImageSlider = ({ listing, hoveredOver}) => {

  const [currentSlide, setCurrentSlide] = useState(0)
  const length = listing.Images.length
  const history = useHistory();

  const nextSlide = () => {
     setCurrentSlide(currentSlide === length - 1 ? 0 : currentSlide + 1)
     console.log(currentSlide)
  }
  const previousSlide = () => {
     setCurrentSlide(currentSlide === 0 ? length - 1 : currentSlide - 1)
    }

  if (!Array.isArray(listing.Images) || listing.Images.length <= 0){
    return null;
  }

  const handleCardClick = () => {
    history.push(`/listings/${listing.id}`)
    // return (<Redirect to={`/api/listings/${listing.id}`} />)
  }
  return (
    <div className='single-listing-container'>
      {hoveredOver && (
        <>
          <IoIosArrowDropleftCircle className='left-arrow' onClick={previousSlide} />
          <IoIosArrowDroprightCircle className='right-arrow' onClick={nextSlide} />
        </>
      )}
      {listing.Images.map((slide, index) => {
        return (
          <div className={index === currentSlide ? 'slide active' : 'slide'} key={index}>
            {index === currentSlide && (
            <div className='single-listing'>
              <Link to={`/listings/${listing.id}`}><img className='card-img' src={slide.url} alt="Listing"  /></Link>

            </div>

            )}

          </div>
        )
      } )}
    </div>
  )
}

export default ImageSlider
