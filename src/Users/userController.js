const userService = require('./userService');

const findUser = (email, done) => {
    userService.findUser(email, done);
};

module.exports = {
    findUser
};