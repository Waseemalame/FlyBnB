import React, { useEffect, useState } from 'react'
import * as sessionActions from '../../store/session';
import { useDispatch, useSelector } from 'react-redux';
import { Link, Redirect, useHistory } from 'react-router-dom';
import { getCategoriesThunk } from '../../store/category';

import {IoIosArrowDroprightCircle, IoIosArrowDropleftCircle } from "react-icons/io"

import './Categories.css'
import { categoryIcons } from './categoryIcons';


function Categories({ categories }) {
  const [hoveredOver, setHoveredOver] = useState(false)

  const slider = document.querySelector('.categories-list');
  const leftArrow = document.querySelector(".categories-left")
  const rightArrow = document.querySelector(".categories-right")

  const catScroll = () => {
    const catContainer = document.querySelector('.categories-container')
    if(catContainer){

      if(window.scrollY > 22.7){
        catContainer.style.boxShadow = 'rgba(0, 0, 0, 0.08) 0px 4px 12px';
      }
      if(window.scrollY < 22.7){
        catContainer.style.boxShadow = 'none'
      }
    }
  }



  window.addEventListener('scroll', catScroll)
    const slideLeft = () => {
    document.querySelector('.categories-right').style.display = 'block';
    if(slider.scrollLeft < 600){
    }
    slider.scrollLeft -= 990;
  }
  const slideRight = () => {
    slider.scrollLeft += 990;
    document.querySelector('.categories-left').style.display = 'block';

    if(slider.scrollLeft >= 800){
    }
  }


  return (
    <div className='categories-container'>
      <div className='categories-list'>
        {categories.map((category, i) => (
          <Link to={`/filtered-listings/categories/${category.id}`} className='single-category'>
          <img className='category-icon' src={categoryIcons[i]} alt="sadas" />
          <h5 className='categories-list-item'>{category.name}</h5>
          </Link>
        ))}
        <IoIosArrowDropleftCircle className="categories-left" onClick={slideLeft}/>
        <IoIosArrowDroprightCircle className='categories-right' onClick={slideRight}/>
      </div>
    </div>
  )
}

export default Categories
