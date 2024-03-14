const propertyDAO = require('./propertyDAO');

const findAllProperties = (done) => {
    propertyDAO.findAllProperties(done);
};

const getPropertyById = (id, done) => {
    propertyDAO.getPropertyById(id, done);
};


module.exports = {
    findAllProperties,
    getPropertyById
};