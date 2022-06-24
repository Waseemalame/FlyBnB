const express = require('express')
const asyncHandler = require('express-async-handler');
const router = express.Router();

const { setTokenCookie, restoreUser } = require('../../utils/auth');
const { User, Category, Image } = require('../../db/models');

router.get('/', async(req, res) => {
    const images = await Image.findAll();
    res.json(images)
})

module.exports = router;
