const express = require('express')
const bodyParser = require('body-parser')
const funRegister = require('./funRegister.js')
const funList = require('./funList.js')
const app = express()
const PORT = Math.floor(Math.random() * (7000 - 6000 + 1)) + 6000

app.use(bodyParser.json())

app.get('/api/health', (req, res) => {
    res.sendStatus(200)
})

const server = app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
    setInterval(() => {
        funList('http://localhost:8090/api/list')
        funRegister('http://localhost:8090/api/register', 'localhost', PORT)
    }, 5000)
});