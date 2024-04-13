const express = require('express')
const RegisterStorage = require('./registerStorage.js')
const Checker = require('./checker.js')
const bodyParser = require('body-parser')
const sequelize = require("./db");

const app = express()

const PORT = 8090

sequelize.authenticate()
    .catch(error => console.error(error))

sequelize.sync();

const storage = new RegisterStorage()
const checker = new Checker(5000, storage)

app.use(bodyParser.json())

app.get('/api/list', (req, res) => {
    const nodes = Array.from(checker.storage.listNodes())
    res.send(nodes)
});

app.post('/api/register', (req, res) => {
    const { hostname, port } = req.body
    const requestData = {
        hostname: hostname,
        port: port
    };
    checker.storage.registerNode(requestData)
    res.sendStatus(200)
});

const server = app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
    setInterval(() => {
        checker.check()
    }, checker.timeout)
});