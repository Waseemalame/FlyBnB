import React, { useState } from 'react';
import Map from 'react-map-gl';
import { getCenter } from "geolib/es/getCenter";
import { useEffect } from 'react';
const MapComponent = () => {
  const [latitude, setLatitude] = useState(0);
  const [longitude, setLongitude] = useState(0);
  const [zoom, setZoom] = useState(12);
  const [viewPort, setViewPort] = useState({});
  const options = {
    enableHighAccuracy: true,
    timeout: 5000,
    maximumAge: 0
  };
  const handleChange = (e) => {

  }

  const success = (pos) => {
    const crd = pos.coords;

    setLatitude(crd.latitude)
    setLongitude(crd.longitude)
    setViewPort({
      longitude: crd.longitude,
      latitude: crd.latitude
    })
  }
  function error(err) {
    console.warn(`ERROR(${err.code}): ${err.message}`);
  }
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(success, error)
  }, [longitude, latitude]);
  // const center = getCenter()
  return (
    <Map
    mapStyle='mapbox://styles/waseemalame/cl8juzb7o000c16p7xh61rvi2'
    mapboxAccessToken=''
    {...viewPort}
    onViewportChange={(e) => handleChange(e)}
    >
    </Map>
  )
}

export default MapComponent
