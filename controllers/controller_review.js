const Review = require('../models/reviews');
const Messages = require('../errormessages/messages');

async function createReview(req, res) {
    try {
        const review = new Review(req.body);
        await review.save();
        res.status(201).send({ message: Messages.CREATED_Review, Review });
    } catch (error) {
        res.status(400).send(error);
    }
}

async function getAllReviews(req, res) {
    try {
        const { id, customer_id, company_id, mechanic_b2b_id, status } = req.query;
        let filter = {};
        if (id) filter.id = new RegExp(id, 'i');
        if (customer_id) filter.customer_id = customer_id;
        if (company_id) filter.company_id = company_id;
        if (mechanic_b2b_id) filter.mechanic_b2b_id = mechanic_b2b_id;
        if (status) filter.status = new RegExp(status, 'i');
        
        const reviews = await Review.find(filter).select('_id id customer_id company_id mechanic_b2b_id Review_date status');
        res.status(200).send(reviews);
    } catch (error) {
        res.status(500).send(error);
    }
}

async function getReviewById(req, res) {
    try {
        const review = await Review.findOne({ id: req.params.id }).select('-id');
        if (!review) {
            return res.status(404).json({ error: Messages.NOT_FOUND_Review });
        }
        res.status(200).send(Review);
    } catch (error) {
        res.status(500).send(error);
    }
}

async function updateReview(req, res) {
    try {
        const review = await Review.findOneAndUpdate({ id: req.params.id }, req.body, { new: true }).select('-_id');
        if (!review) return res.status(404).send();
        res.status(200).send(review);
    } catch (error) {
        res.status(400).send(error);
    }
}

async function deleteReview(req, res) {
    try {
        const review = await Review.findOneAndDelete({ id: req.params.id }).select('-id');
        if (!review) return res.status(404).send();
        res.status(200).send(review);
    } catch (error) {
        res.status(500).send(error);
    }
}

module.exports = {
    createReview,
    getAllReviews,
    getReviewById,
    updateReview,
    deleteReview
};
