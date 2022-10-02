import React from 'react'
import "./Reservations.css"
import { Calendar } from "react-calendar"
import 'react-calendar/dist/Calendar.css';
import { useState } from 'react';

const Reservations = () => {
  const [showCalendar, setShowCalendar] = useState(false);
  return (
    <div className='res-container'>
      <div className="res-header">
        <div>2500 night</div>
        <div>num reviews</div>
      </div>
      <div className="res-info">
        <div className="checkin-checkout">
          <div>checkin date</div>
          <div>checktine data</div>
        </div>
        <div className="guests">guests</div>
      </div>
      <div className="res-calendar">
        <button className='calendar-btn' onClick={() => setShowCalendar(true)}>Reserve</button>
        {showCalendar && (
          <Calendar minDate={new Date()} selectRange />
        )}
        <div>you wont be charged yet</div>
        </div>
      <div className="res-cost-container"></div>
    </div>
  )
}

export default Reservations
