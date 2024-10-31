const Messages = require('../errormessages/messages');
const Cars = require('../models/cars');




async function createCar(req,res) {
    try {
        const car = new Cars(req.body);
        await Company.save();
    
        res.status(201).send({message:Messages.SUCCESSFULL_REGISTER});

    } catch (error) {
        console.log(error);
        
        res.status(400).send(error);        

    }
    
}




module.exports = {
    createCar
}