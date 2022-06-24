import React from 'react'
import HostForm from '../HostForm'
import './HostPage.css'
const HostPage = ({ categories }) => {
  return (
    <div className='host-page-container'>
      <div className="pages">
        <div className="left-page">
        </div>
        <div className="right-page">
          <HostForm categories={categories} />
        </div>
      </div>
      {/* <div className="host-btns">
        <div className="back-btn">Back</div>
        <div className="next-btn">Next</div>
      </div> */}
    </div>
  )
}

export default HostPage
