import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { useMultiContext } from '../../context/MultiContext';
import AddressForm from './AddressForm';
import "../HostPage/HostPage.css"
import GMap from './GoogleMap';
import InfoForm from './InfoForm';
import AmenitiesForm from './AmenitiesForm';
import ImageForm from './ImageForm';
const NewHostForm = () => {

  const categories = useSelector(state => Object.values(state.categories))
  const { typesForm, setTypesForm,
        categoriesForm, setCategoriesForm, mapForm, setMapForm,
        closeAddrForm, setCloseAddrForm,
        type, setType,
        categoryId, setCategoryId,
        address, setAddress,
        city, setCity,
        state, setState,
        country, setCountry,
        errorValidations, setErrorValidations,
        infoForm, setInfoForm,
        amenitiesForm, setAmenitiesForm,
        imageForm, setImageForm
       } = useMultiContext()

  const [title, setTitle] = useState('');

  const [price, setPrice] = useState(0);
  const [amenities, setAmenities] = useState([]);
  const [cleaningFee, setCleaningFee] = useState(0);
  const [serviceFee, setServiceFee] = useState(0);

  const [selected, setSelected] = useState(false)
  const [imgUrls, setImgUrls] = useState([ { url: "" }, { url: "" }, { url: "" }, { url: "" }, { url: "" } ])
  const [validationErrors, setValidationErrors] = useState([]);
  const [attemptedSubmit, setAttemptedSubmit] = useState(false);
  const [lngLat, setLngLat] = useState({});

  const types = [ 'Entire home', 'Entire cabin', 'Cabin', 'Entire villa','Tiny Home', 'Bungalow', 'Private room in resort', 'Luxury stay' ]
  types.sort();


  useEffect(() => {
    const chosenType = document.getElementById(`type-${type}`)
    const chosenCategory = document.getElementById(`category-${categoryId}`)
    if(chosenType) chosenType.classList.add('type-checked')
    const allChecked = document.querySelectorAll('.type-checked')
    if(allChecked){
      allChecked.forEach(el => {
        el.classList.remove('type-checked')
      })
    }
    if(chosenType) chosenType.classList.add('type-checked')
    const allCatChecked = document.querySelectorAll('.cat-checked')
    if(allCatChecked){
      allCatChecked.forEach(el => {
        el.classList.remove('cat-checked')
      })
    }
    if(chosenCategory) chosenCategory.classList.add('cat-checked')
  });
  useEffect(() => {
    let errors = []
    if(typesForm){
      if(!type) errors.push('A type is required *')
    }
    if(categoriesForm){
      if(!categoryId) errors.push('A category is required *')
    }
    setErrorValidations(errors)
  }, [type, typesForm, categoriesForm, categoryId]);

  return (
      <form className='newhost-form'>
        {typesForm && (
          <div>
            {errorValidations.length > 0 && (
              <div className='type-validation'>{errorValidations[0]}</div>
            )}
            <div className="types">
              {types.map((type, i) => (
                <div
                  id={`type-${type}`}
                  onClick={() => {
                  setType(type)
                  }} className='type-select' tabIndex={i}>
                  {type}
                </div>
              ))}
            </div>
          </div>
        )}
        {categoriesForm && (
          <div>
            {errorValidations.length > 0 && (
              <div className='type-validation'>{errorValidations[0]}</div>
            )}
            {categories.map((category, i) => (
              <div
                  id={`category-${category.id}`}
                  onClick={() => setCategoryId(category.id)}
                  className='type-select'
                  tabIndex={i}>
                <span>
                  {category.name}
                  </span>
              </div>
            ))}
          </div>
          )}
          {mapForm && (
            <div className="address-section">
              {!closeAddrForm ? (

                <AddressForm
                address={address}
                setAddress={setAddress}
                city={city}
                setCity={setCity}
                state={state}
                setState={setState}
                country={country}
                setCountry={setCountry} />
                ) : ''}
              <GMap />
            </div>
          )}
          {infoForm && (
            <InfoForm />
          )}
          {amenitiesForm && (
            <AmenitiesForm />
          )}
          {imageForm && (
            <ImageForm />

          )}

      </form>
  )
}

export default NewHostForm
