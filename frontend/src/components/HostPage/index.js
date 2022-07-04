import React from 'react'
import { useState } from 'react'
import HostForm from '../HostForm'
import './HostPage.css'
const HostPage = ({ categories }) => {
  const [showImageForm, setShowImageForm] = useState(false)
  return (
    <div className='host-page-container'>
      <div className="pages">
        <div className="left-page">
        </div>
        <div className="right-page">
          <HostForm categories={categories} showImageForm={showImageForm} setShowImageForm={setShowImageForm} />
        </div>
      </div>

    </div>
  )
}

export default HostPage
