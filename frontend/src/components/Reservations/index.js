import React from 'react'
import "./Reservations.css"
import { Calendar } from "react-calendar"
import "./Calendar.css"
// import 'react-calendar/dist/Calendar.css';

import { useState } from 'react';
import { useMultiContext } from '../../context/MultiContext';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom'
import { CreateReservationThunk, loadListingsReservations } from '../../store/reservation';
import moment from 'moment'
const Reservations = ({ listing, dateArray, setDateArray }) => {
  const reservations = useSelector(state => state.reservations)
  const [showCalendar, setShowCalendar] = useState(false);
  const { numReviews } = useMultiContext()
  const { price, cleaningFee, serviceFee, guests: maxGuests } = listing
  const dispatch = useDispatch()
  const history = useHistory()
  const dateFormat = (dateStr) => {
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
  const [numGuests, setNumGuests] = useState(0);
  const [checkIn, setCheckIn] = useState(today)
  const [checkOut, setCheckOut] = useState(initialCheckOutDate)
  const [checkInISO, setCheckInISO] = useState(new Date().toISOString().slice(0, 10));
  const [checkOutISO, setCheckOutISO] = useState(futureDate.toISOString().slice(0, 10));
  const [totalPrice, setTotalPrice] = useState((3*price) + cleaningFee + serviceFee);
  const [reservedDays, setReservedDays] = useState({});
  const [totalDays, setTotalDays] = useState(3);
  const [validationErrors, setValidationErrors] = useState([]);
  const currentUser = useSelector(state => state.session.user)

  useEffect(() => {
    dispatch(loadListingsReservations(listing.id))
  }, [dispatch, listing]);

  useEffect(() => {
    const allDates = {}
    const tempArr = []
    for(let el in reservations){
      if(reservations[el].listingId !== listing.id){
        return
      }
      const reservedStart = reservations[el].startDate
      const reservedEnd = reservations[el].endDate
      let startDate = moment(reservedStart);
      let stopDate = moment(reservedEnd);
      while (startDate <= stopDate) {
          tempArr.push( moment(startDate).format('YYYY-MM-DD') )
          startDate = moment(startDate).add(1, 'days');
      }
      setDateArray(tempArr);
    }
  }, [reservations, listing]);


  const calcDays = (date1, date2) => {
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

    setTotalDays(days);

    setShowCalendar(false);
  }

  const calendarClick = () => {
    setShowCalendar(!showCalendar)
  }

  const handleGuestsChange = (e) => {
    setNumGuests(e.target.value)
  }

  const handleCreateReservation = async(e) => {
    e.preventDefault();
    const data = {
      startDate: checkInISO,
      endDate: checkOutISO,
      userId: currentUser.id,
      listingId: listing.id,
      numGuests,
      numDays: totalDays,
      finalPrice: totalDays,
    }
    let errors = []
    try{
      await dispatch(CreateReservationThunk(data))
      history.push(`/`)

    } catch{
      errors.push('Start date is already reserved*')
      setValidationErrors(errors)
    }

  }


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
              <Calendar tileDisabled={({date}) => dateArray?.includes(moment(date).format('YYYY-MM-DD'))} onChange={onChange} value={date} minDate={new Date()} selectRange />
            </div>
        )}
        </div>
        <div className="guests">
          <p>Guests</p>
          <input value={numGuests} onChange={handleGuestsChange} type="number" min='0' max={maxGuests} />
        </div>
      </div>
      <div className="res-calendar">
        {validationErrors.length > 0 && (
          <ul className='reservation-errors'>
            {validationErrors.map(error => (
              <li>
                {error}
              </li>
            ))}
          </ul>
        )}
        <button onClick={handleCreateReservation} className='calendar-btn'>Reserve</button>
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
