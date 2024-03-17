const propertyService = require('./propertyService');

const findAllProperties = (done) => {
    console.log('propertyController - findAllProperties');
    propertyService.findAllProperties(done);
};

const getPropertyById = (id, done) => {
    propertyService.getPropertyById(id, done);
};

const createProperty = (property, done) => {
    const defaultValues = [
        'description',
        'videos',
        'type',
        'title',
        'homereport',
        'propertyType',
        'tenure',
        'summary',
        'thumbnail',
        'images',
        'floorplans',
        'brochures',
        'address_postcode',
        'virtual_tours',
        'council_tax_band',
        'address_city',
        'address_county',
        'address_street',
        'price_type',
        'epc_certificates',
    ];

    const defaultNumberValues = [
        'latitude',
        'longitude',
        'land_size_acres',
        'price',
        'estate_agent_id',
        'bedroom_count',
        'bathroom_count',
        'receptionroom_count',
        'indoor_floor_sqft',
    ];

    defaultValues.forEach(key => {
        if (!property[key]) {
            property[key] = 'Ask Agent';
        }
    });

    defaultNumberValues.forEach(key => {
        if (!property[key] && property[key] !== 0) { 
            property[key] = 0;
        }
    });

    propertyService.createProperty(property, done);
};

module.exports = {
    findAllProperties,
    getPropertyById,
    createProperty
};