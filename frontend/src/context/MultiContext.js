import { createContext, useContext, useState } from "react";

export const MultiContext = createContext()
export const useMultiContext = () => useContext(MultiContext)

export default function MultiContextProvider(props){
  const [typesForm, setTypesForm] = useState(true);
  const [categoriesForm, setCategoriesForm] = useState(false);
  const [mapForm, setMapForm] = useState(false);
  const [latLng, setLatLng] = useState({});
  const [closeAddrForm, setCloseAddrForm] = useState(true);
  const [locationFunc, setLocationFunc] = useState();
  const [address, setAddress] = useState('')
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [country, setCountry] = useState('');
  return (
    <MultiContext.Provider
    value={{
      typesForm, setTypesForm,
      categoriesForm, setCategoriesForm,
      mapForm, setMapForm,
      latLng, setLatLng,
      closeAddrForm, setCloseAddrForm,
      address, setAddress,
      city, setCity,
      state, setState,
      country, setCountry
    }}
    >
      {props.children}
  </MultiContext.Provider>
)
}
