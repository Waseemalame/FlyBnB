const express = require('express')
const asyncHandler = require('express-async-handler');
const router = express.Router();

const { setTokenCookie, restoreUser } = require('../../utils/auth');
const { User, Category } = require('../../db/models');

const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

router.get('/', async(req, res) => {

  const categories = await Category.findAll();
  res.send(categories)
})

module.exports = router;
