const express = require('express')
const asyncHandler = require('express-async-handler');
const router = express.Router();

const { setTokenCookie, restoreUser, requireAuth } = require('../../utils/auth');
const { User, Listing, Image } = require('../../db/models');

const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

router.get('/', asyncHandler(async (req, res) => {
  const listings = await Listing.findAll({
    include: {
      model: Image,
    }
  });


  res.send(listings)

}))

router.get('/:id(\\d+)', asyncHandler(async (req, res) => {
  const { id } = req.params;


  const listing = await Listing.findByPk(id, {
    include: {
      model: Image,
      where: {
        listingId: id
      }
    }
  });
  res.json(listing)

}))


router.get('/:id/images', async(req, res) => {
  const id = parseInt(req.params.id, 10);

  const images = await Image.findAll({
    where: {
      listingId: req.params.id
    }
  })
  res.json(images)
})

router.post('/', requireAuth, asyncHandler(async function (req, res) {
    const {
      userId,
      title,
      categoryId,
      type,
      guests,
      beds,
      bedrooms,
      baths,
      amenities,
      price,
      cleaningFee,
      serviceFee,
      city,
      state,
      country,
      images
     } = req.body
    console.log(req.body)
    const newListing = await Listing.create({
      userId,
      title,
      categoryId,
      type,
      guests,
      beds,
      bedrooms,
      baths,
      amenities,
      price,
      cleaningFee,
      serviceFee,
      city,
      state,
      country
    })

    res.json(newListing);
    for (let i = 0; i < images.length; i++) {
      const imageUrl = images[i];
      const newImage = await Image.create({
        listingId: newListing.id,
        url: imageUrl
      })
    }
}))






module.exports = router;
