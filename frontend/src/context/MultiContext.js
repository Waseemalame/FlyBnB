import { createContext, useContext, useState } from "react";

export const MultiContext = createContext()
export const useMultiContext = () => useContext(MultiContext)

export default function MultiContextProvider(props){
  const [typesForm, setTypesForm] = useState(true);
  const [categoriesForm, setCategoriesForm] = useState(false);
  const [mapForm, setMapForm] = useState(false);


  return (
    <MultiContext.Provider
    value={{
      typesForm, setTypesForm,
      categoriesForm, setCategoriesForm,
      mapForm, setMapForm
    }}
    >
      {props.children}
  </MultiContext.Provider>
)
}
