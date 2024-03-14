const propertyService = require('./propertyService');

const findAllProperties = (done) => {
    console.log('propertyController - findAllProperties');
    propertyService.findAllProperties(done);
};

const getPropertyById = (id, done) => {
    propertyService.getPropertyById(id, done);
};  

module.exports = {
    findAllProperties,
    getPropertyById
};