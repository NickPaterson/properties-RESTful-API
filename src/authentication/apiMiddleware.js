const estateAgentService = require('../EstateAgents/estateAgentService');

const apiKeyMiddleware = (req, res, next) => {
    const apiKey = req.headers['x-api-key'];

    if (!apiKey) {
        return res.status(401).json({ message: 'API Key required' });
    }

    const hasApiKey = estateAgentService.getEstateAgentByApiKey(apiKey);
    console.log(hasApiKey);
    if (!hasApiKey) {
        return res.status(401).send('Invalid API Key');
    } else {
        next();
    }
};

module.exports = apiKeyMiddleware;