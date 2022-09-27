import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { useMultiContext } from '../../context/MultiContext';
import MapComponent from '../Map';
import AddressForm from './AddressForm';
import "../HostPage/HostPage.css"

const NewHostForm = () => {

  const categories = useSelector(state => Object.values(state.categories))
  const { typesForm, setTypesForm, categoriesForm, setCategoriesForm, mapForm, setMapForm } = useMultiContext()

  const [title, setTitle] = useState('');
  const [categoryId, setCategoryId] = useState('');
  const [type, setType] = useState('');
  const [guests, setGuests] = useState(0);
  const [beds, setBeds] = useState(0);
  const [bedrooms, setBedrooms] = useState(0);
  const [baths, setBaths] = useState(0);
  const [price, setPrice] = useState(0);
  const [amenities, setAmenities] = useState([]);
  const [cleaningFee, setCleaningFee] = useState(0);
  const [serviceFee, setServiceFee] = useState(0);
  const [address, setAddress] = useState('')
  const [cityLocation, setCityLocation] = useState('');
  const [stateLocation, setStateLocation] = useState('');
  const [country, setCountry] = useState('');
  const [selected, setSelected] = useState(false)
  const [imgUrls, setImgUrls] = useState([ { url: "" }, { url: "" }, { url: "" }, { url: "" }, { url: "" } ])
  const [validationErrors, setValidationErrors] = useState([]);
  const [attemptedSubmit, setAttemptedSubmit] = useState(false);

  const chosenType = document.getElementById(`type-${type}`)
  const chosenCategory = document.getElementById(`category-${categoryId}`)
  const types = [ 'Entire home', 'Entire cabin', 'Cabin', 'Entire villa','Tiny Home', 'Bungalow', 'Private room in resort', 'Luxury stay' ]
  types.sort();

  useEffect(() => {
    console.log(type)
    console.log(categoryId)
    // return () => setTypesForm(true)
  }, [type, categoryId]);
  useEffect(() => {
    if(chosenType) chosenType.focus()
    if(chosenCategory) chosenCategory.focus()
  });
  return (
      <form className='newhost-form'>
        {typesForm && (
          <div>
            <div className="types">
              {types.map((type, i) => (
                <div
                  id={`type-${type}`}
                  onClick={() => {
                  setType(type)
                  this.focus()
                  }} className='type-select' tabIndex={i}>
                  {type}
                </div>
              ))}
            </div>
          </div>
        )}
        {categoriesForm && (
          <div>
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
              {/* <AddressForm /> */}
              {/* <MapComponent /> */}
            </div>
          )}

      </form>
  )
}

export default NewHostForm
