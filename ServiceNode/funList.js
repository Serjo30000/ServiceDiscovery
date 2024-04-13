const axios = require('axios')

function funList(url) {
    axios.get(url)
        .then(response => {
            const nodes = response.data;
            console.log(nodes);
        })
        .catch(error => {
            console.error('An error has occurred:', error);
        });
}

module.exports = funList;