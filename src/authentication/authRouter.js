const express = require('express');
const router = express.Router();
const authController = require('./authController');

router.post('/register', (request, response) => {
    try {
        const { name, email, password } = request.body;
        if (!name || !email || !password) {
            return response.status(400).send('Name, email and password are required');
        }
        const newUser = { name, email, password };
        authController.registerUser(newUser, (error, results) => {
            // return error    
            //     ? response.status(400).send({error: 'User already exists'})
            //     : response.status(201).send({status: 'OK', data: results});
            if (error) {
                console.log(`Error sending response: ${error}`);
                return response.status(400).send({error: 'User already exists'});
            } else {
                console.log(`Results sending response: ${results}`);
                return response.status(201).send({status: 'OK', data: {name, email}});
            }
        });
    } catch (error){
        console.log(`Error in catch, sending response: ${error}`);
        return response.status(400).send({error: 'Unexpected error while registering user'});
    }
});

router.post('/login', (request, response) => {
    try {
        const { email, password } = request.body;
        if (!email || !password) {
            return response.status(400).send('Email and password are required');
        }
        
        authController.loginUser(email, password, (error, results) => {
            return error    
                ? response.status(400).send({error: 'Invalid email or password'})
                : response.status(200).send({status: 'OK', data: results});
        });
    } catch (error){
        return response.status(400).send({error: 'Unexpected error while logging in user'});
    }
});
module.exports = router;