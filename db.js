const neo4j = require('neo4j-driver');
const dotenv = require('dotenv');
dotenv.config();

const URI = process.env.NEO4J_URI;
const USERNAME = process.env.NEO4J_USERNAME;
const PASSWORD = process.env.NEO4J_PASSWORD;

const driver = neo4j.driver(URI, neo4j.auth.basic(USERNAME, PASSWORD));

const neo4jSessionRun = async (query) => {
    const session = driver.session();
    try {
        const result = await session.run(query);
        return result;
    } catch (error) {
        return error;
    } 
    finally {
        session.close();
    }
}

module.exports = neo4jSessionRun;