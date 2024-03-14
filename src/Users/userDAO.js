// const users = require('./users.json');
// const fs = require('fs');
const neo4jSessionRun = require('../../db');
const bcrypt = require('bcryptjs');

const findUser = async (email, done) => {
    const query = `MATCH (user:User {email: "${email}"}) RETURN user`;
    const result = await neo4jSessionRun(query);
    let user = null;
    if (result.records && result.records.length > 0 && result.records[0]._fields[0]) {
        // Extract the user properties from the result
        const userProperties = result.records[0]._fields[0].properties;
        console.log(`UserDAO: findUser: userProperties: ${userProperties}`);

        // Assuming you want to return the entire user object, including its Neo4j identity and labels
        // along with its properties for further processing
        user = {
            id: result.records[0]._fields[0].identity.low, // Adjust according to how you handle IDs
            ...userProperties
        };
    } 

    console.log(`UserDAO: User: ${user}`);
    user
        ? done(null, user)
        : done(null, null);
};

const registerUser = (userData, done) => {
    const { name, email, password } = userData;
    // const userFound = findUser(email, done);
    // console.log(`UserDAO: registerUser: userFound: ${userFound}`);
    // if (userFound) {
    //     done("User already exists", null);
    // }

    const saltRounds = 10;
    const hashedPassword = bcrypt.hashSync(password, saltRounds);

    const createUserQuery = `
        CREATE (user:User {name: "${name}", 
        email: "${email}", 
        password: "${hashedPassword}"}) 
        RETURN user
    `;

    neo4jSessionRun(createUserQuery)
        .then((result) => {
            done(null, result);
        })
        .catch((error) => {
            done(error, null);
        });

};

module.exports = {
    findUser,
    registerUser
};
