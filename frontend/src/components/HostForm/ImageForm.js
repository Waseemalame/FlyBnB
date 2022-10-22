import React, { useEffect, useState } from 'react'
import { useMultiContext } from '../../context/MultiContext'
import "./ImageForm.css"
import OneLabel from './OneLabel'
const ImageForm = () => {
  const { imagesRef, images, setImages, imageForm, imageErrors, setImageErrors } = useMultiContext()
  const [addFourInputs, setAddFourInputs] = useState(false);
  const [listOfFiles, setListOfFiles] = useState([]);
  const [numInputs, setNumInputs] = useState(0)
  const [rows, setRows] = useState([]);
  const imageFormContainer = document.querySelector('.image-form-container')
  const imageErrorList = document.querySelector('.image-errors')
  useEffect(() => {
    if(images.length === 1){
      setAddFourInputs(true)
    }
  }, [images]);
  useEffect(() => {
    if(imageFormContainer){

      if(imageForm){
        imageFormContainer.style.display = ''
        if(imageErrorList){
          imageErrorList.style.display = ''
        }
      } else {
        imageFormContainer.style.display = 'none'
        if(imageErrorList){
          imageErrorList.style.display = 'none'
        }
      }
    }
  }, [imageForm, imageFormContainer]);

  useEffect(() => {
    let arr = []
    let newArr = []
        for (let i = 0; i < 5; i++) {
          arr.push(
                    <OneLabel index={i} numInputs={numInputs} updateFiles={updateFiles}/>
                  );

                }
        setRows([...rows, ...arr])
  }, []);


    const updateFiles = (e) => {
      e.stopPropagation()
      setNumInputs(numInputs + 1)
      const file = e.target.files[0];
      listOfFiles.push(file)
      console.log(images.length)
      setImages(listOfFiles);
      return
    };



  return (
    <>
    {images.length < 5 && (

      <ul className='image-errors'>{imageErrors}</ul>
    )}
    <div className='image-form-container'>
      {rows}
    </div>
    </>
  )
}

export default ImageForm
