import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { useMultiContext } from '../../context/MultiContext'
import HostForm from '../HostForm'
import NewHostForm from '../HostForm/NewHostForm'
import './HostPage.css'
const HostPage = ({ categories }) => {
  const { typesForm, setTypesForm, categoriesForm, setCategoriesForm, mapForm, setMapForm } = useMultiContext()
  const [showBackBtn, setShowBackBtn] = useState(false);
  const [showImageForm, setShowImageForm] = useState(false)

  const body = document.querySelector('body')
  useEffect(() => {
    body.style.overflowY = 'hidden'
    return () => body.style.overflowY = 'scroll'
  }, []);

  useEffect(() => {
      if(typesForm){
        setShowBackBtn(false)
      } else {
        setShowBackBtn(true)
      }
  }, [typesForm]);

  const handleNext = () => {
    if(typesForm){
      setTypesForm(false)
      setCategoriesForm(true)
    } else if(categoriesForm){
      setCategoriesForm(false)
      setMapForm(true)
    }
  }
  const handleBack = () => {
    if(categoriesForm){
      setCategoriesForm(false)
      setTypesForm(true)
    } else if(mapForm){
      setMapForm(false)
      setCategoriesForm(true)
    }
  }
  return (
    <div class="host-page-container">


            <div class="left-page">
                {typesForm && (
                  <div className='left-header'>What kind of place will you host?</div>
                )}
                {categoriesForm && (
                  <div className='left-header'>Please select a category for your home</div>
                )}
            </div>
            <div className="right-page">
            <NewHostForm />
            </div>
            <div className="next-page">
              {showBackBtn && (
                <button onClick={handleBack} className="back-button" type='button'>Back</button>
              )}
                <button onClick={handleNext} className="next-button" type='button'>Next</button>
            </div>
    </div>
  )
}

export default HostPage
