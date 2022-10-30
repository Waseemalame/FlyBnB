import React from 'react'
import { useEffect } from 'react'
import { useMultiContext } from '../../../context/MultiContext'
import "./TitleForm.css"
const TitleForm = () => {
  const { titleForm, setTitleForm, title, setTitle, errorValidations, setErrorValidations } = useMultiContext()
  const titleFormContainer = document.querySelector('.title-form-container')
  useEffect(() => {
    const errors = []
    if(!title){
      errors.push('Title is required')
    }
    setErrorValidations(errors)
  }, [title]);

  return (
    <div className='title-form-container'>
      {errorValidations.length > 0 && (
        <div className='type-validation'>{errorValidations[0]}</div>
      )}
      <label>Create your title
        <textarea
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder='Adorable 50-bedroom guesthouse with pool'
        />
      </label>
    </div>
  )
}

export default TitleForm
