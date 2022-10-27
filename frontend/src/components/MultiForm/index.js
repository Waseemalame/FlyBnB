import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useMultiContext } from '../../context/MultiContext';
import AddressForm from '../HostForm/AddressForm';
import CategoriesForm from '../HostForm/CategoriesForm';
import GMap from '../HostForm/GoogleMap';
import TitleForm from '../HostForm/TitleForm/TitleForm';
import TypeForm from '../HostForm/TypeForm';

import InfoForm from '../HostForm/InfoForm';
import PriceForm from '../HostForm/PriceForm/PriceForm';
import ImageForm from '../HostForm/ImageForm';
import AmenitiesForm from '../HostForm/AmenitiesForm';

import Geocode from "react-geocode";

import { addListingThunk } from '../../store/listing';

const Form = () => {

  const currentUser = useSelector(state => state.session.user)
  const {
    type, setType,
    categoryId,
    address, setAddress,
    city, setCity,
    state, setState,
    country, setCountry,
    errorValidations,
    guests, beds, bedrooms, baths,
    title,
    amenities,
    price, serviceFee, cleaningFee,
    setAddrErrors
   } = useMultiContext()

  const [images, setImages] = useState({});
  const [page, setPage] = useState(0);
  const [latLng, setLatLng] = useState({});

  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    if(address && city){
      const getFullAddress = async() => {
        const errors = []

        try{

          const res = await Geocode.fromAddress(`${address} ${city}`)
          const { lat, lng } = res.results[0].geometry.location;
          setLatLng({
            lat: lat,
            lng: lng
          })
        }
        catch (e){
          setAddrErrors(errors)
          return 'error'
        }

    }
      getFullAddress()
    }
  }, [address, city, setAddrErrors]);



  const FormTitles = ["Type", "Category", "Address", "Map", "Title", "Info", "Amenities", "Price", "Images"];

  const PageDisplay = () => {
    if (page === 0) {
      return <TypeForm type={type} setType={setType} errorValidations={errorValidations} categoryId={categoryId} />;
    } else if (page === 1) {
      return <CategoriesForm />;
    } else if (page === 2) {
      return (

      <>
        <AddressForm
                  address={address}
                  setAddress={setAddress}
                  city={city}
                  setCity={setCity}
                  state={state}
                  setState={setState}
                  country={country}
                  setCountry={setCountry} />
        <GMap latLng={latLng}/>
      </>
      )
    } else if (page === 3){
      return <GMap latLng={latLng} />
    } else if (page === 4){
      return <TitleForm />
    } else if (page === 5){
      return <InfoForm />
    } else if (page === 6){
      return <AmenitiesForm />
    } else if (page === 7){
      return <PriceForm />
    } else if (page === 8){
      return <ImageForm images={images} setImages={setImages} />
    }

  };

  return (
    <div className='multi-form-container'>
      <div className="body">
        {PageDisplay()}
      </div>
      <div className="form-buttons">
        <button
            className='back-button'
            disabled={page === 0}
            onClick={() => {
              setPage((currPage) => currPage - 1);
            }}
          >
            Back
        </button>
        <button
          className='next-button'
          onClick={async() => {
            if (page === FormTitles.length - 1) {
              alert("FORM SUBMITTED");
              const data = { userId: currentUser.id, type, categoryId, address, city, state, country, title, price, cleaningFee, serviceFee, amenities, guests, beds, bedrooms, baths, images }
              await dispatch(addListingThunk(data))
              history.push('/')
            } else {
              setPage((currPage) => currPage + 1);
            }
          }}
        >
          {page === FormTitles.length - 1 ? "Submit" : "Next"}
        </button>
      </div>
    </div>
  )
}

export default Form
