const sequelize = require('../db')
const { DataTypes } = require('sequelize')

const Information = sequelize.define('information', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    hostname: { type: DataTypes.STRING, allowNull: false },
    port: { type: DataTypes.STRING, allowNull: false },
})

module.exports = {
    Information,
}