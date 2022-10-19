const express = require('express')
const asyncHandler = require('express-async-handler')
const moment = require('moment');
const { restoreUser, requireAuth, currentUser } = require('../../utils/auth');
const { User, Listing, Image, Review, Reservation } = require('../../db/models');

const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const router = express.Router();


router.get('/', asyncHandler(async (_req, res) => {
  const currentUser = currentUser(_req);
  const reservations = await Reservation.findAll({
    where: { userId: currentUser.id },
  })
  return res.json(reservations);
}));

router.post('/', asyncHandler(async function (req, res) {
  const {
    startDate,
    endDate,
    userId,
    listingId,
    numGuests,
    numDays,
    totalPrice,
  } = req.body;
  const time = moment().format(startDate)

  const reservationSearch = await Reservation.findOne({ where: {startDate: time, listingId}})
  if(reservationSearch === null){

    const reservation = await Reservation.create({
      startDate,
      endDate,
      userId,
      listingId,
      numGuests,
      numDays,
      totalPrice,
    });

    return res.json(reservation);
  } else {
    res.status(400).send('Start date is already reserved*');
  }
}));



module.exports = router;
