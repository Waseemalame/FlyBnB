import React from 'react'
import "../HostPage/HostPage.css"
import { GoogleMap, useLoadScript, Marker } from "@react-google-maps/api"
import { useEffect } from 'react'
import { useMultiContext } from '../../context/MultiContext'

const GMap = ({ latLng }) => {

  const { lat, lng } = latLng

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: 'AIzaSyDJeW_TICl79Y1eJqiVKJwwQnUAPUeWRiI',
  })

  if(!isLoaded) return <div>Loading...</div>
    if (Object.values(latLng).length > 1){

      return (
        <GoogleMap zoom={10} center={{lat: lat, lng: lng}} mapContainerClassName="map-container" stylers= {{ visibility: 'off' }}>
          <Marker key="marker_1"
                  position={{
                    lat: lat,
                    lng: lng
                          }}/>
        </GoogleMap>
        )
      } else {
        return (
          <GoogleMap zoom={10} center={{lat: 44, lng: -80}} mapContainerClassName="map-container"></GoogleMap>
        )
      }

}

export default GMap
