const express = require('express');
const router = express.Router();

const estateAgentController = require('./estateAgentController');

router.get('/', (request, response) => {
    try {
        estateAgentController.findAllEstateAgents((error, results) => {
            return error
                ? response.status(400).send({error: 'estate agents not found'})
                : response.status(200).send({status: 'OK', data: results});
        });
    } catch (error) {
        return response.status(400).send({error: 'Unexpected error while fetching estate agents'});
    }
});

router.get('/:id', (request, response) => {
    try {
        const id = request.params.id;
        estateAgentController.getEstateAgentById(id, (error, results) => {
            return error
                ? response.status(400).send({error: 'Estate agent not found'})
                : response.status(200).send({status: 'OK', data: results});
        });
    } catch (error) {
        return response.status(400).send({error: 'Unexpected error while fetching estate agent'});
    }
});

router.get('/:estateAgentId/properties', (request, response) => {
    try {
        const estateAgentId = request.params.estateAgentId;
        estateAgentController.getPropertiesByEstateAgent(estateAgentId, (error, results) => {
            return error
                ? response.status(400).send({error: 'Estate agent properties not found'})
                : response.status(200).send({status: 'OK', data: results});
        });
    } catch (error) {
        return response.status(400).send({error: 'Unexpected error while fetching estate agent properties'});
    }
});

module.exports = router;
