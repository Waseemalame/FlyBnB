import React from 'react'
import { useEffect } from 'react'
import { useMultiContext } from '../../../context/MultiContext'
import "./TitleForm.css"
const TitleForm = () => {

  const { titleForm, setTitleForm, title, setTitle } = useMultiContext()
  const titleFormContainer = document.querySelector('.title-form-container')

  return (
    <div className='title-form-container'>
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
