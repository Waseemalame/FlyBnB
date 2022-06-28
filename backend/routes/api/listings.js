const express = require('express')
const asyncHandler = require('express-async-handler');
const router = express.Router();

const { setTokenCookie, restoreUser, requireAuth } = require('../../utils/auth');
const { User, Listing, Image, Category } = require('../../db/models');

const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

router.get('/', asyncHandler(async (req, res) => {
  const listings = await Listing.findAll({
    include: [{
      model: Image,
    },{
      model: User
    }]
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
     } = req.body

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
    }, {
      include: [{
        model: User,
        where: {userId}
      }]
    })

    console.log(newListing)

    res.json(newListing);
    // for (let i = 0; i < images.length; i++) {
    //   const imageUrl = images[i];
    //   const newImage = await Image.create({
    //     listingId: newListing.id,
    //     url: imageUrl
    //   })
    // }
}))

router.put('/:id', requireAuth, asyncHandler(async function (req, res) {
  console.log('re .params.ID')
  console.log('re .params.ID')
  console.log('re .params.ID')
  console.log('re .params.ID')
  console.log('re .params.ID')
  console.log(req.params.id)
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
     } = req.body
    const newListing = await Listing.update({
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
    }, {
      include: User,
      where: {
        userId
      }
     })
    console.log(req.body.images)
    // for (let i = 0; i < images.length; i++) {
    //   const imageUrl = images[i];
    //   const newImg = await Image.update({
    //     listingId: newListing.id,
    //     url: imageUrl
    //   })
    //   }
      return res.json(newListing);
      // res.json(newImage)

}))






module.exports = router;
