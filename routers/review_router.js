const express = require('express');
const router = express.Router();
const {
    createReview,
    getAllReviews,
} = require('../controllers/controller_review');

router.post('/create_review', createReview);
router.get('/all_reviews', getAllReviews);


module.exports = router;
