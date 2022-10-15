import React from 'react'
import "./Reservations.css"
import { Calendar } from "react-calendar"
import "./Calendar.css"
// import 'react-calendar/dist/Calendar.css';

import { useState } from 'react';
import { useMultiContext } from '../../context/MultiContext';
import { useEffect } from 'react';

const Reservations = ({ listing }) => {

  const [showCalendar, setShowCalendar] = useState(false);
  const { numReviews } = useMultiContext()


  const { price, cleaningFee, serviceFee } = listing

  const dateFormat = (dateStr) => {
    console.log(dateStr)
    const day = dateStr.getDate();
    const month = dateStr.getMonth() + 1;
    const year = dateStr.getFullYear();
    const formattedDate = `${month}/${day}/${year}`
    return formattedDate
  }
  const today = dateFormat(new Date());
  const day = new Date()
  const futureDate = new Date(day.setDate(day.getDate() + 2));
  const initialCheckOutDate = dateFormat(futureDate)
  const [date, setDate] = useState();
  const [checkIn, setCheckIn] = useState(today)
  const [checkOut, setCheckOut] = useState(initialCheckOutDate)
  const [checkInISO, setCheckInISO] = useState(new Date().toISOString().slice(0, 10));
  const [checkOutISO, setCheckOutISO] = useState(futureDate.toISOString().slice(0, 10));
  const [totalPrice, setTotalPrice] = useState((3*price) + cleaningFee + serviceFee);
  const [totalDays, setTotalDays] = useState(3);
  const calcDays = (date1, date2) => {
    console.log(date1, date2)
    console.log()
    return Math.round((date2 - date1)/((3600)*24*1000))
  }

  const onChange = (date) => {
    setDate(date)
    const checkInDate = date[0];
    const checkOutDate = date[1];
    setCheckInISO(checkInDate.toISOString().slice(0, 10));
    setCheckOutISO(checkOutDate.toISOString().slice(0, 10));
    setCheckIn(dateFormat(checkInDate))
    setCheckOut(dateFormat(checkOutDate))
    const days = calcDays(checkInDate, checkOutDate)
    setTotalPrice((days * price) + cleaningFee + serviceFee)

    // const days = countDays(checkInDate, checkOutDate);
    setTotalDays(days);
    // setPriceBeforeFees(days * price)
    // setTotalPrice((days * price) + cleaningFee + serviceFee)
    // setCheckIn(formatDate(checkInDate));
    // setCheckOut(formatDate(checkOutDate));

    setShowCalendar(false);
  }

  const calendarClick = () => {
    setShowCalendar(!showCalendar)
  }

  useEffect(() => {

  }, [date, checkInISO, checkOutISO]);
  return (
    <div className='res-container'>
      <div className="res-header">
        <div>${listing.price} night</div>
        <div>{numReviews} reviews</div>
      </div>
      <div className="res-info">
        <div className="checkin-checkout">
          <div onClick={calendarClick} className='checkin'>{checkIn ? checkIn : ''}</div>
          <div onClick={calendarClick} className='checkout'>{checkOut ? checkOut : ''}</div>
          {showCalendar && (
            <div className="calendar-container">
              <Calendar onChange={onChange} value={date} minDate={new Date()} selectRange />
            </div>
        )}
        </div>
        <div className="guests">guests</div>
      </div>
      <div className="res-calendar">
        <button className='calendar-btn'>Reserve</button>
        <div className='calendar-note'>You won't actually be charged</div>
        </div>
      <div className="res-cost-container">
        <div className="price-details">
          <div>${price} x {totalDays}</div>
          <div>${price*totalDays}</div>
        </div>
        <div className="cleaning-details">
          <div>Cleaning fee</div>
          <div>${cleaningFee}</div>
        </div>
        <div className="service-details">
          <div>Service fee</div>
          <div>${serviceFee}</div>
        </div>
        {/* {totalPrice ? totalPrice : ''} */}
      </div>
        <div className='total-cost'>
          <div>Total before taxes</div>
          <div>${totalPrice}</div>
        </div>
    </div>
  )
}

export default Reservations