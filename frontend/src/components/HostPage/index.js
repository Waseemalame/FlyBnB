import { useEffect } from 'react'
import { useState } from 'react'
import Geocode from "react-geocode";
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { useMultiContext } from '../../context/MultiContext'
import Form from '../MultiForm';
import './HostPage.css'
const HostPage = () => {

  Geocode.setApiKey("AIzaSyCeFO0R7H2nTlWn4AMMcRcFSeUr7ndzqug");
  const user = useSelector(state => state.session.user)
  const [page, setPage] = useState(0);

  const { typesForm, mapForm, imageForm} = useMultiContext()

  const [showBackBtn, setShowBackBtn] = useState(false);
  const body = document.querySelector('body')
  const rightPage = document.querySelector('.right-page')

  const history = useHistory()

  useEffect(() => {
    body.style.overflowY = 'hidden'

    return () => body.style.overflowY = 'scroll'
  }, []);

  useEffect(() => {
    if(imageForm && rightPage){
      rightPage.style.overflowY = 'hidden'

      return () => rightPage.style.overflowY = 'scroll'
    }

  }, []);


  useEffect(() => {
    if(rightPage){
      if(mapForm){
        rightPage.style.overflowY = 'hidden'
      } else {
        rightPage.style.overflowY = 'scroll'
      }
    }
  });

  useEffect(() => {
      if(typesForm){
        setShowBackBtn(false)
      } else {
        setShowBackBtn(true)
      }
  }, [typesForm]);


//   const getFullAddress = async() => {
//     const errors = []

//     try{

//       const res = await Geocode.fromAddress(`${address} ${city}`)
//       const { lat, lng } = res.results[0].geometry.location;
//       setLatLng({
//         lat: lat,
//         lng: lng
//       })
//     }
//     catch (e){
//       setAddrErrors(errors)
//       return 'error'
//     }

// }

  return (
    <div class="host-page-container">


            <div class="left-page">
                <img onClick={() => history.push('/')} className='host-nav-logo' src="https://media.discordapp.net/attachments/949432407461855244/993630127529414766/flybnb.png" alt="logo" />

                {page === 0 && (
                  <div className='left-header'>What kind of place will you host?</div>
                )}
                {page === 1 && (
                  <div className='left-header'>Please select a category for your home</div>
                )}
                {(page === 2 || page === 3) && (
                  <div className='left-header'>Where's your place located?</div>
                  )}
                {page === 4 && (
                  <div className='left-header'>Let's give your place a name</div>
                )}
                {page === 5 && (
                  <div className='left-header'>Add information for your home</div>
                )}
                {page === 6 && (
                  <div className='left-header'>Add amenities</div>
                )}
                {page === 7 && (
                  <div className='video-box-div'>
                  <video className='video-box' controls>
                  <source src="https://a0.muscache.com/v/9c/d4/9cd47434-c6bd-58ec-90b7-b50aa7dba461/9cd47434c6bd58ec90b7b50aa7dba461_4000k_1.mp4?imformat=h265" type="video/mp4"></source>
                  </video>
                  </div>
                )}
                {page === 8 && (
                  <div className='left-header'>Final step: Add images</div>
                )}

            </div>
            <div className="right-page">
            <Form page={page} setPage={setPage} />
            </div>
    </div>
  )
}

export default HostPage
