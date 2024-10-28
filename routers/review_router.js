const express = require('express');
const router = express.Router();
const {
    createReview,
    getAllReviews,
    getReviewById,
    updateReview,
    deleteReview
} = require('../controllers/controller_review');

router.post('/create_review', createReview);
router.get('/all_reviews', getAllReviews);
router.get('/get_review/:id', getReviewById);
router.patch('/update_review/:id', updateReview);
router.delete('/delete_review/:id', deleteReview);

module.exports = router;
