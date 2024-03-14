const express = require('express');
const router = express.Router();

const userController = require('./userController');

router.get('/', (request, response) => {
    try {
        const userData = request.claims;
        console.log(`UserRouter: userData: ${JSON.stringify(userData)}`);
        if (!userData.email) {
            return response.status(400).send('User email not available');
        }
        userController.findUser(userData.email, (error, results) => {
            console.log(`UserRouter: fetchedUser: ${JSON.stringify(results)}`);
            return error
                ? response.status(400).send({error: 'User not found'})
                : response.status(200).send({status: 'OK', data: results});
        });
    } catch (error) {
        return response.status(400).send({error: 'Unexpected error while fetching user data'});
    }
});

module.exports = router;