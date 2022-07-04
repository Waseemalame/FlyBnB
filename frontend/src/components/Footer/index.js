import React from 'react'
import './Footer.css'
const Footer = () => {
  return (
    <div className='footer-container'>
        <div className='footer-left'>
            <a href='https://github.com/Waseemalame/FlyBnB/'>
            <img src="https://img.icons8.com/ios-glyphs/60/000000/github.png" alt='github'/>
            </a>

        </div>
        <div className='footer-middle'>
            <a href='https://www.linkedin.com/in/waseemalame/'>
            <img src="https://img.icons8.com/ios-filled/60/000000/linkedin-circled--v1.png" alt='linkedin'/>
            </a>
        </div>
    </div>
  )
}

export default Footer