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

const createProperty = async (property, done) => {
    const query = `
    CREATE (property:Property {
        latitude: ${property.latitude},
        description: "${property.description}",
        videos: "${property.videos}",
        type: "${property.type}",
        title: "${property.title}",
        bedroom_count: ${property.bedroom_count},
        homereport: "${property.homereport}",
        land_size_acres: ${property.land_size_acres},
        price: ${property.price},
        propertyType: "${property.propertyType}",
        estate_agent_id: ${property.estate_agent_id},
        bathroom_count: ${property.bathroom_count},
        tenure: "${property.tenure}",
        longitude: ${property.longitude},
        summary: "${property.summary}",
        thumbnail: "${property.thumbnail}",
        images: "${property.images}",
        floorplans: "${property.floorplans}",
        brochures: "${property.brochures}",
        address_postcode: "${property.address_postcode}",
        virtual_tours: "${property.virtual_tours}",
        council_tax_band: "${property.council_tax_band}",
        address_city: "${property.address_city}",
        address_county: "${property.address_county}",
        address_street: "${property.address_street}",
        price_type: "${property.price_type}",
        receptionroom_count: ${property.receptionroom_count},
        epc_certificates: "${property.epc_certificates}",
        indoor_floor_sqft: ${property.indoor_floor_sqft}
    }) RETURN property`;
    
    const result = await neo4jSessionRun(query);
    let newProperty = null;
    if (result.records && result.records.length > 0 && result.records[0]._fields[0]) {
        newProperty = {
            id: result.records[0]._fields[0].identity.low,
            ...result.records[0]._fields[0].properties
        };
    };
    done(null, newProperty);
}


module.exports = {
    findAllProperties,
    getPropertyById,
    createProperty
};
