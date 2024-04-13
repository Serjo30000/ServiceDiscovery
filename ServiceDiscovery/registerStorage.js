// const NodeCache = require('node-cache')
// const { Information } = require('./models/models');

// class RegisterStorage {
//     constructor() {
//         this.cache = new NodeCache();
//         this.cache.set('nodes', new Map())
//     }

//     listNodes() {
//         return this.cache.get('nodes')
//     }

//     registerNode(requestData) {
//         const nodesMap = this.cache.get('nodes')
//         nodesMap.set(requestData.port, requestData)
//         this.cache.set('nodes', nodesMap)
//     }

//     deleteNodes(nodes) {
//         const nodesMap = this.cache.get('nodes')
//         for (let [key, json] of nodes) {
//             if (nodesMap.has(key)) {
//                 nodesMap.delete(key)
//             }
//         }
//         this.cache.set('nodes', nodesMap)
//     }
// }

// module.exports = RegisterStorage
const { Information } = require('./models/models');
const { Op } = require('sequelize');

class RegisterStorage {
    async listNodes() {
        try {
            const nodes = await Information.findAll({
                attributes: ['port', 'hostname']
            });
            const nodesMap = new Map()
            nodes.forEach(node => {
                const requestData = {
                    hostname: node.hostname,
                    port: node.port
                };
                nodesMap.set(node.port, requestData)
            });
            return nodesMap;
        } catch (error) {
            console.error('Ошибка при получении узлов:', error);
            throw error;
        }
    }

    async registerNode(requestData) {
        try {
            await Information.create({
                port: requestData.port,
                hostname: requestData.hostname
            });
        } catch (error) {
            console.error('Ошибка при регистрации узла:', error);
            throw error;
        }
    }

    async deleteNodes(nodes) {
        try {
            await Information.destroy({
                where: {
                    port: {
                        [Op.in]: [...nodes.keys()]
                    }
                }
            });
        } catch (error) {
            console.error('Ошибка при удалении узлов:', error);
            throw error;
        }
    }
}

module.exports = RegisterStorage