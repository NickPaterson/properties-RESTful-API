const neo4jSessionRun = require('../../db');

const findAllProperties = async (done) => {
    const query = `MATCH (property:Property) RETURN property`;
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

const getPropertyById = async (id, done) => {
    const query = `MATCH (property:Property {id: ${id}}) RETURN property`;
    const result = await neo4jSessionRun(query);
    let property = null;
    if (result.records && result.records.length > 0 && result.records[0]._fields[0]) {
        property = {
            id: result.records[0]._fields[0].identity.low,
            ...result.records[0]._fields[0].properties
        };
    };
    done(null, property);
};


module.exports = {
    findAllProperties,
    getPropertyById
};
