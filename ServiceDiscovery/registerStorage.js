const NodeCache = require('node-cache')

class RegisterStorage {
    constructor() {
        this.cache = new NodeCache();
        this.cache.set('nodes', new Map())
    }

    listNodes() {
        return this.cache.get('nodes')
    }

    registerNode(requestData) {
        const nodesMap = this.cache.get('nodes')
        nodesMap.set(requestData.port, requestData)
        this.cache.set('nodes', nodesMap)
    }

    deleteNodes(nodes) {
        const nodesMap = this.cache.get('nodes')
        for (let [key, json] of nodes) {
            if (nodesMap.has(key)) {
                nodesMap.delete(key)
            }
        }
        this.cache.set('nodes', nodesMap)
    }
}

module.exports = RegisterStorage