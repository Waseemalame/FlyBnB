import { useRef } from "react";
import { createContext, useContext, useState } from "react";

export const MultiContext = createContext()
export const useMultiContext = () => useContext(MultiContext)

export default function MultiContextProvider(props){
  // HOST FORM VARIABLES
  const [typesForm, setTypesForm] = useState(true);
  const [categoriesForm, setCategoriesForm] = useState(false);
  const [mapForm, setMapForm] = useState(false);
  const [latLng, setLatLng] = useState({});
  const [closeAddrForm, setCloseAddrForm] = useState(true);
  const [address, setAddress] = useState('')
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [country, setCountry] = useState('');
  const [addrErrors, setAddrErrors] = useState([]);
  const [errorValidations, setErrorValidations] = useState([])
  const [imageErrors, setImageErrors] = useState([]);
  const [infoForm, setInfoForm] = useState(false);
  const [guests, setGuests] = useState(0);
  const [beds, setBeds] = useState(0);
  const [bedrooms, setBedrooms] = useState(0);
  const [baths, setBaths] = useState(.5);
  const [amenitiesForm, setAmenitiesForm] = useState(false);
  const [amenities, setAmenities] = useState([]);
  const [categoryId, setCategoryId] = useState('');
  const [type, setType] = useState('');
  const [checkedLabels, setCheckedLabels] = useState();
  const [imageForm, setImageForm] = useState(false);
  const [price, setPrice] = useState(0);
  const [cleaningFee, setCleaningFee] = useState(0);
  const [serviceFee, setServiceFee] = useState(0);
  const [priceForm, setPriceForm] = useState(false);
  const [titleForm, setTitleForm] = useState(false);
  const [title, setTitle] = useState('');

  const amenityRef = useRef()
  const imagesRef = useRef()

  // LISTING DETAILS VARIABLES
  const [numReviews, setNumReviews] = useState(0);

  return (
    <MultiContext.Provider
    value={{
      type, setType,
      categoryId, setCategoryId,
      address, setAddress,
      city, setCity,
      state, setState,
      country, setCountry,
      guests, setGuests,
      beds, setBeds,
      bedrooms, setBedrooms,
      baths, setBaths,
      amenities, setAmenities,
      typesForm, setTypesForm,
      categoriesForm, setCategoriesForm,
      mapForm, setMapForm,
      latLng, setLatLng,
      closeAddrForm, setCloseAddrForm,
      addrErrors, setAddrErrors,
      errorValidations, setErrorValidations,
      imageErrors, setImageErrors,
      infoForm, setInfoForm,
      amenitiesForm, setAmenitiesForm,
      checkedLabels, setCheckedLabels,
      amenityRef, imagesRef,
      imageForm, setImageForm,
      price, setPrice,
      cleaningFee, setCleaningFee,
      serviceFee, setServiceFee,
      priceForm, setPriceForm,
      titleForm, setTitleForm,
      title, setTitle,
      numReviews, setNumReviews
    }}
    >
      {props.children}
  </MultiContext.Provider>
)
}
