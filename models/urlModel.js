const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/db");

module.exports = (sequelize, DataTypes) => {
    const url = sequelize.define('url', {
        urlID: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        longurl: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        shorturl: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        qrcode: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    }, {
        timestamps: false,
        tableName: "url",
    });
    return url;
};   