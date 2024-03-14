const userService = require('../Users/userService');
const authService = require('./authService');

const registerUser = (userData, done) => {
    userService.findUser(userData.email, (error, userFound) => {
        console.log(`authController - registerUser: ${userFound} - error: ${error}`);
        if (error) {
            done(error);
        } else {
            userFound
                ? done({ message: 'User already exists' })
                : userService.registerUser(userData, done);
        }
    });
};

const loginUser = (email, password, done) => {
    userService.findUser(email, (error, userFound) => {
        if (error) {
            done(error);
        } else {
            const userVerified = authService.verifyUser({ email, password }, userFound);
            // userFound should be userVerified
            if (userVerified) {
                const jwtToken = authService.generateToken(userFound);
                done(null, jwtToken);
            } else {
                done({ error: 'Invalid email or password' });
            }
        }
    });
};

module.exports = { 
    registerUser, 
    loginUser 
};