const express = require('express')
const asyncHandler = require('express-async-handler');
const router = express.Router();

const { setTokenCookie, restoreUser, requireAuth } = require('../../utils/auth');
const { User, Listing, Image, Review } = require('../../db/models');

const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');


// router.get(`/reviews`, async(req, res) => {
//   const reviews = await Review.findAll({})

// })


module.exports = router;
