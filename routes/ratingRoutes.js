const rating = require('../controller/ratingController')
const express = require('express')
const router = express.Router()


router.post('/createRatings', rating.CreateRatings)
router.get('/getRatings',rating.getRatings)
router.get('/ratings/:value',rating.filterRatingsByValue)


module.exports = router;