const express = require('express')
const asyncHandler = require('express-async-handler');
const router = express.Router();

const { setTokenCookie, restoreUser, requireAuth } = require('../../utils/auth');
const { User, Listing, Image, Review } = require('../../db/models');

const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { singlePublicFileUpload, singleMulterUpload, multiplePublicFileUpload, multipleMulterUpload } = require('../../awsS3');

router.get('/', asyncHandler(async (req, res) => {
  const listings = await Listing.findAll({
    include: [{
      model: Image,
    },
    {
      model: User,
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

router.get('/:id/reviews', asyncHandler(async function(req, res) {
  const id = req.params.id
  const reviews = await Review.findAll({
    where: {
      listingId: id
    },
    include: User
  });

  return res.json(reviews);
}));

router.post('/', requireAuth, multipleMulterUpload("images"), asyncHandler(async function (req, res) {
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
    const allImgs = await multiplePublicFileUpload(req.files);
    const newArr = amenities.split(',')
    const newListing = await Listing.create({
      userId,
      title,
      categoryId,
      guests,
      type,
      beds,
      bedrooms,
      baths,
      price,
      cleaningFee,
      serviceFee,
      city,
      state,
      country,
      amenities: newArr,
      images
    })

    for (let i = 0; i < allImgs.length; i++) {
      const imageUrl = allImgs[i];

      const newImage = await Image.create({
        listingId: newListing.id,
        url: imageUrl
      })
    }
    return res.json({
      newListing,
    });
}))

router.put('/:id', requireAuth, asyncHandler(async function (req, res) {

  const id = req.params.id
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
    await Listing.update({
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
      where: { id }
    })

    const newListing = await Listing.findByPk(id)
      return res.json(newListing);

}))
router.delete('/:id', asyncHandler(async function (req, res) {
  const id = req.params.id
  const listing = await Listing.findByPk(id)
  listing.destroy();
  res.json(listing)
}))

router.post('/:id/reviews', requireAuth, asyncHandler(async function (req, res) {
  const {
    content,
    userId,
    listingId
   } = req.body;
  const review = await Review.create({
    content,
    userId,
    listingId
  })
  const newReview = await Review.findByPk(review.id, {include: User})
  return res.json(newReview);

}))





module.exports = router;
