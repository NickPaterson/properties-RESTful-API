const estateAgentDAO = require('./estateAgentDAO');

const findAllEstateAgents = (done) => {
    estateAgentDAO.findAllEstateAgents(done);
};

const getEstateAgentById = (id, done) => {
    estateAgentDAO.getEstateAgentById(id, done);
};

const getPropertiesByEstateAgent = (estateAgentId, done) => {
    estateAgentDAO.getPropertiesByEstateAgent(estateAgentId, done);
};

const getEstateAgentByApiKey = (apiKey) => {
    return estateAgentDAO.getEstateAgentByApiKey(apiKey);
};

module.exports = {
    findAllEstateAgents,
    getEstateAgentById,
    getPropertiesByEstateAgent,
    getEstateAgentByApiKey
};