import React from 'react'
import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useMultiContext } from '../../context/MultiContext'

const CategoriesForm = () => {
  const categories = useSelector(state => Object.values(state.categories))
  const { categoryId, setCategoryId, errorValidations, setErrorValidations } = useMultiContext()
  useEffect(() => {
    const errors = []
    if(!categoryId) errors.push('Category is required')
    setErrorValidations(errors)
  }, [categoryId]);

  useEffect(() => {
    const chosenCategory = document.getElementById(`category-${categoryId}`)
    const allCatChecked = document.querySelectorAll('.cat-checked')
    if(allCatChecked){
      allCatChecked.forEach(el => {
        el.classList.remove('cat-checked')
      })
    }
    if(chosenCategory) chosenCategory.classList.add('cat-checked')
  });


  return (
    <>
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
    </>
  )
}

export default CategoriesForm
