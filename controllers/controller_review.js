const Review = require('../models/reviews');
const Messages = require('../errormessages/messages');
const Company = require('../models/company');

async function createReview(req, res) {
    try {
       
        const review = await Review.create(req.body);

        
        const reviews = await Review.findAll({
            where: { companyId: review.companyId }
        });

        
        
        const totalNotes = reviews.reduce((acc, curr) => acc + curr.grade, 0);
        const averageNote = totalNotes / reviews.length;

        console.log("tamanho do array de notas",reviews.length,"total", totalNotes);
        await Company.update(
            { reviews_note: averageNote }, 
            { where: { id: review.companyId } } 
        );

      
        res.status(201).send({ message: Messages.CREATED_Review, review });
    } catch (error) {
        console.log(error);
        res.status(400).send(error);
    }
}


async function getAllReviews(req, res) {
    try {
        const { id, company_id} = req.query;
        const whereClause = {};

      
    
        if (id) {
            const reviewsIdArray = id.split(',');
            if (reviewsArray.length > 1) {
                
               
                whereClause.id = { [Op.in]: reviewsIdArray }; 
            } else {
                
                whereClause.id = { [Op.eq]: id };
            }
        }

        const reviews = await Review.findAll({
            where: whereClause,
            attributes: ['id', 'description','grade','customerId','companyId'], 
        });
        res.status(200).send(reviews);
    } catch (error) {
        console.log(error);
        
        res.status(500).send(error);
    }
}



module.exports = {
    createReview,
    getAllReviews,
};
