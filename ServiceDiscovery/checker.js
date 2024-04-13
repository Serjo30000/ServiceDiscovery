// const axios = require('axios');

// class Checker {
//     constructor(timeout, storage) {
//         this.timeout = timeout
//         this.storage = storage
//     }

//     async check() {
//         const nodesMap = this.storage.listNodes()
//         const nodes = new Map();
//         for (let [key, value] of nodesMap) {
//             try {
//                 const response = await axios.get(`http://${value.hostname}:${value.port}/api/health`)
//                 console.log('The check was successful')
//             } catch (error) {
//                 nodes.set(key, value)
//                 console.log('The check was unsuccessful')
//             }
//         }
//         this.storage.deleteNodes(nodes)
//     }
// }

// module.exports = Checker;
const axios = require('axios');

class Checker {
    constructor(timeout, storage) {
        this.timeout = timeout
        this.storage = storage
    }

    async check() {
        const nodesMap = await this.storage.listNodes()
        const nodes = new Map();
        for (let [key, value] of nodesMap) {
            try {
                const response = await axios.get(`http://${value.hostname}:${value.port}/api/health`)
                console.log('The check was successful')
            } catch (error) {
                nodes.set(key, value)
                console.log('The check was unsuccessful')
            }
        }
        await this.storage.deleteNodes(nodes)
    }
}

module.exports = Checker;