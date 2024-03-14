const jwt = require('jsonwebtoken');
const config = require('../../config');
const bcrypt = require('bcryptjs');

const verifyUser = ({ email, password }, user) => {
    console.log(`authService - verifyUser: email: ${email}, password: ${password}`);
    console.log(`authService - verifyUser: user: ${JSON.stringify(user)}`);
    // console.log(user.email === email && bcrypt.compareSync(password, user.password));
    return user
        ? user.email === email && bcrypt.compareSync(password, user.password) // returns true or false
        : false;
};

const generateToken = (user) => {
    const payload = {
        role: "USER",
        email: user.email,
        name: user.name,
    };
    const token = jwt.sign(payload, config.AUTH_SECRET, {
        expiresIn: '1h'
    });
    return token;
}; 

module.exports = {
    verifyUser,
    generateToken
};
