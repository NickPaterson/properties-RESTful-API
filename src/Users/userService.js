const userDAO = require('./userDAO');

const findUser = (email, done) => {
    userDAO.findUser(email, done);
};

const registerUser = (userData, done) => {
    userDAO.registerUser(userData, done);
};

module.exports = {
    findUser,
    registerUser    
};
