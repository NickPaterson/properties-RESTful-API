const estateAgentService = require('./estateAgentService');

const findAllEstateAgents = (done) => {
    estateAgentService.findAllEstateAgents(done);
};

const getEstateAgentById = (id, done) => {
    estateAgentService.getEstateAgentById(id, done);
};  

const getPropertiesByEstateAgent = (estateAgentId, done) => {
    estateAgentService.getPropertiesByEstateAgent(estateAgentId, done);
};

module.exports = {
    findAllEstateAgents,
    getEstateAgentById,
    getPropertiesByEstateAgent
};