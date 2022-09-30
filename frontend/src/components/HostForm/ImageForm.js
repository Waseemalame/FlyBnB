import React, { useEffect, useState } from 'react'
import { useMultiContext } from '../../context/MultiContext'
import "./ImageForm.css"
import OneLabel from './OneLabel'
const ImageForm = () => {
  const { imagesRef, images, setImages, imageForm } = useMultiContext()
  const [addFourInputs, setAddFourInputs] = useState(false);
  const [listOfFiles, setListOfFiles] = useState([]);
  const [numInputs, setNumInputs] = useState(0)
  const [rows, setRows] = useState([]);
const [firstImagePreview, setFirstImagePreview] = useState(null);
  const imageFormContainer = document.querySelector('.image-form-container')
  useEffect(() => {
    console.log(images)
    if(images.length === 1){
      setAddFourInputs(true)
    }
    console.log(listOfFiles, 'list of files!!!!!!!!!!!!!')
  }, [images]);
  useEffect(() => {
    if(imageFormContainer){

      if(imageForm){
        imageFormContainer.style.display = ''
      } else {
        imageFormContainer.style.display = 'none'
      }
    }
  }, [imageForm, imageFormContainer]);

  useEffect(() => {
    let arr = []
    let newArr = []
    if(addFourInputs){
      if(numInputs === 1){

        for (let i = 0; i < 8; i++) {
          arr.push(
                    <OneLabel index={i} numInputs={numInputs} updateFiles={updateFiles}/>
                  );

                }
        setRows([...rows, ...arr])
      }
      // if(numInputs > 4){
      //   arr.push(
      //     <OneLabel numInputs={numInputs} updateFiles={updateFiles}/>
      //     )
      //     setRows(rows, ...arr)
      //   }

    }

  }, [addFourInputs, numInputs]);
  useEffect(() => {
    console.log(images, 'IMAGES IAMGES IMGAEES')

  }, [images]);
    const updateFiles = (e) => {
      // if(images.length < 2){

      //   setFirstImagePreview(URL.createObjectURL(e.target.files[0]))
      // }
      setNumInputs(numInputs + 1)
      const file = e.target.files[0];
      listOfFiles.push(file)
      setImages(listOfFiles);
      return
    };
    const submit = () => {

    }
  return (
    <div className='image-form-container'>
      <div className="all-img-labels">
      {firstImagePreview ? (
            <img className='first-image-preview image-upload-label' src={firstImagePreview} alt="" />
          ) : (

            <label className='image-upload-label' htmlFor="upload-image-input">


              <input
                id="upload-image-input"
                type="file"
                // multiple
                onChange={ (e) => {
                  updateFiles(e)
                  setFirstImagePreview(URL.createObjectURL(e.target.files[0]))
                }} />
        </label>
      )}
        {addFourInputs ? (
          <div className='four-labels'>{rows}</div>
          ) : ''}
      </div>
    </div>
  )
}

export default ImageForm
