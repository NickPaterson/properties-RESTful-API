const express = require('express');
const config = require('./config');
const dateFormat = require('date-format');
const morgan = require('morgan');
const userRouter = require('./src/Users/userRouter');
const authRouter = require('./src/authentication');
const propertyRouter = require('./src/Properties');
const estateAgentRouter = require('./src/EstateAgents');
const verifyToken = require('./src/authentication/authMiddleware');
const verifyAPI = require('./src/authentication/apiMiddleware');

const app = express();

app.use(express.json());

morgan.token('time', () => dateFormat.asString(dateFormat.ISO8601_FORMAT, new Date()));

app.use(morgan('[:time] :remote-addr :method :url :status :res[content-length] :response-time ms'));

app.use('/auth', verifyAPI, authRouter);

app.use('/users', verifyAPI, verifyToken, userRouter);

app.use('/properties', verifyAPI, propertyRouter);

app.use('/estateagents', verifyAPI, estateAgentRouter);

app.listen(config.PORT, () => {
    console.log(`Listening on port ${config.PORT}`);
});
