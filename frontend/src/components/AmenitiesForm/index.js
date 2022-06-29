import React from 'react'
import { AmenitiesData, AmenitiesIcons } from '../HostForm/AmenitiesData'

const AmenititesForm = ({ changeBg }) => {
  return (
    <label className='amenities-label'>Amenities
    <div className='all-amenities'>
      {AmenitiesData.map((amenity, index) => (
        <>
        <div
        id={'amenity-' + index}
        className="amenity-div"
        onClick={() => changeBg(index + 1)}
        >
            <img src={AmenitiesIcons[index]} alt="icon" />
            <div id='amenity-string'>{amenity}</div>
        </div>
        </>
        ))}
    </div>

  </label>
  )
}

export default AmenititesForm
