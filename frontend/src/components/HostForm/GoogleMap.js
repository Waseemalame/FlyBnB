import React from 'react'
import "../HostPage/HostPage.css"
import { GoogleMap, useLoadScript, Marker } from "@react-google-maps/api"
import { useEffect } from 'react'
import { useMultiContext } from '../../context/MultiContext'

const GMap = () => {

  const { latLng } = useMultiContext()


  const { lat, lng } = latLng

  useEffect(() => {
    console.log(latLng)

  }, [latLng]);
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: 'AIzaSyDJeW_TICl79Y1eJqiVKJwwQnUAPUeWRiI',
  })
  if(!isLoaded) return <div>Loading...</div>
    if (Object.values(latLng).length > 1){

      return (
        <GoogleMap zoom={10} center={{lat: lat, lng: lng}} mapContainerClassName="map-container" />
        )
      } else {
        return (
          <GoogleMap zoom={10} center={{lat: 44, lng: -80}} mapContainerClassName="map-container" />
        )
      }

}

export default GMap
