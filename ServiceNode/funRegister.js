const axios = require('axios')

function funRegister(url, hostname, port) {
    const requestData = {
        hostname: hostname,
        port: port
    }
    axios.post(url, requestData)
        .then(response => {
            console.log(`Service registered with status code: ${response.status}`)
        })
        .catch(error => {
            console.error(`Error while registering service: ${error.message}`)
        })
}

module.exports = funRegister;