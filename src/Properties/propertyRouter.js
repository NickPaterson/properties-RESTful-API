const express = require('express');
const router = express.Router();

const propertyController = require('./propertyController');

router.get('/', (request, response) => {
    console.log('Fetching properties');
    try {
        propertyController.findAllProperties((error, results) => {
            return error
                ? response.status(400).send({error: 'Properties not found'})
                : response.status(200).send({status: 'OK', data: results});
        });
    } catch (error) {
        return response.status(400).send({error: 'Unexpected error while fetching properties'});
    }
});

router.get('/:id', (request, response) => {
    try {
        const id = request.params.id;
        propertyController.getPropertyById(id, (error, results) => {
            return error
                ? response.status(400).send({error: 'Property not found'})
                : response.status(200).send({status: 'OK', data: results});
        });
    } catch (error) {
        return response.status(400).send({error: 'Unexpected error while fetching property'});
    }
});

router.post('/', (request, response) => {
    try {
        const property = request.body;
        propertyController.createProperty(property, (error, results) => {
            return error
                ? response.status(400).send({error: 'Property not created'})
                : response.status(201).send({status: 'OK', data: results});
        });
    } catch (error) {
        return response.status(400).send({error: 'Unexpected error while creating property'});
    }
});



module.exports = router;
