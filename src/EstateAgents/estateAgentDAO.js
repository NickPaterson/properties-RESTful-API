const neo4jSessionRun = require('../../db');

const findAllEstateAgents = async (done) => {
    const query = `MATCH (e:EstateAgent) RETURN e`;
    const result = await neo4jSessionRun(query);
    let estateAgents = [];
    if (result.records && result.records.length > 0 && result.records[0]._fields[0]) {
        estateAgents = result.records.map(record => {
            return {
                id: record._fields[0].identity.low,
                ...record._fields[0].properties
            };
        });
    };
    done(null, estateAgents);
};

const getEstateAgentById = async (id, done) => {
    const query = `MATCH (e:EstateAgent {id: ${id}}) RETURN e`;
    const result = await neo4jSessionRun(query);
    let EstateAgent = null;
    if (result.records && result.records.length > 0 && result.records[0]._fields[0]) {
        EstateAgent = {
            id: result.records[0]._fields[0].identity.low,
            ...result.records[0]._fields[0].properties
        };
    };
    done(null, EstateAgent);
};

const getPropertiesByEstateAgent = async (estateAgentId, done) => {
    const query = `MATCH (p:Property)-[:LISTED_BY]->(e:EstateAgent {id: ${estateAgentId}}) RETURN p`;
    const result = await neo4jSessionRun(query);
    let properties = [];
    if (result.records && result.records.length > 0 && result.records[0]._fields[0]) {
        properties = result.records.map(record => {
            return {
                id: record._fields[0].identity.low,
                ...record._fields[0].properties
            };
        });
    };
    done(null, properties);
};

const getEstateAgentByApiKey = async (apiKey, done) => {
    const query = `MATCH (e:EstateAgent {apikey: "${apiKey}"}) RETURN e`;
    console.log(query);
    const result = await neo4jSessionRun(query);
    
    if (result.records && result.records.length > 0 && result.records[0]._fields[0]) {
        console.log(`Return true`);
        return true;
    };

    console.log(`Return false`);
    return false;
};

module.exports = {
    findAllEstateAgents,
    getEstateAgentById,
    getPropertiesByEstateAgent,
    getEstateAgentByApiKey
};
