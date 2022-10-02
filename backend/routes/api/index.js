const router = require('express').Router();
const sessionRouter = require('./session.js');
const usersRouter = require('./users.js');
const listingsRouter = require('./listings.js')
const categoriesRouter = require('./categories.js')
const imagesRouter = require('./images')
const reviewsRouter = require('./reviews')
const reservationsRouter = require('./reservations')

router.use('/session', sessionRouter);
router.use('/users', usersRouter);
router.use('/listings', listingsRouter);
router.use('/categories', categoriesRouter);
router.use('/images', imagesRouter);
router.use('/reviews', reviewsRouter);
router.use('/reservations', reservationsRouter)

router.post('/test', (req, res) => {
  res.json({ requestBody: req.body });
});

module.exports = router;
