require('dotenv').config();
const express = require('express')
const RegisterStorage = require('./registerStorage.js')
const Checker = require('./checker.js')
const bodyParser = require('body-parser')
const sequelize = require("./db");

const app = express()

const PORT = 8090

const storage = new RegisterStorage()
const checker = new Checker(5000, storage)

app.use(bodyParser.json())

app.get('/api/list', async (req, res) => {
    const nodes = Array.from(await checker.storage.listNodes())
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
const start = async () => {
    await sequelize.authenticate();
    await sequelize.sync();
    const server = app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`)
        setInterval(() => {
            checker.check()
        }, checker.timeout)
    });
}

start()