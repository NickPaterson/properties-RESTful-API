const propertyDAO = require('./propertyDAO');

const findAllProperties = (done) => {
    propertyDAO.findAllProperties(done);
};

const getPropertyById = (id, done) => {
    propertyDAO.getPropertyById(id, done);
};

const createProperty = (property, done) => {
    
    propertyDAO.createProperty(property, done);
};

module.exports = {
    findAllProperties,
    getPropertyById,
    createProperty
};