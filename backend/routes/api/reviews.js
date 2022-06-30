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
router.delete("/:id", asyncHandler(async function (req, res) {
  const id = req.params.id;
  const review = await Review.findByPk(id);
  review.destroy();
  return res.json({ id });
}));


module.exports = router;
