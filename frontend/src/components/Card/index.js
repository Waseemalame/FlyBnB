import React, { useEffect, useState } from 'react'
import * as sessionActions from '../../store/session';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect, useHistory } from 'react-router-dom';
import { getImages } from '../../store/images'

import './Card.css'
import ImageSlider from '../ImageSlider';


const Card = ({ listing }) => {
  const [hoveredOver, setHoveredOver] = useState(false)
  const history = useHistory();
  const dispatch = useDispatch();

  const mouseOver = (e) => {
    setHoveredOver(true)
  }
  const mouseOut = (e) => {

    setHoveredOver(false)

  }
  return (

      <div className='full-card' onMouseOver={mouseOver} onMouseLeave={mouseOut}>
        <ImageSlider listing={listing} setHoveredOver={setHoveredOver} hoveredOver={hoveredOver}/>
        <div className='card-location'>{listing.city + ', ' + listing.state}</div>
        <div className="description-container">
          <div className='card-description'>{'$' + listing.price}</div>
          <div className='night-text'>night</div>
        </div>
      </div>

  )
}

export default Card
