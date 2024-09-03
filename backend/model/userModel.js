const { DataTypes } = require('sequelize');
const sequelize = require('../configDB/db');

const User = sequelize.define('User', {
    id: {
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
        type: DataTypes.INTEGER,
    },
    firstName: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    lastName: {
        type: DataTypes.STRING,
        allowNull: true, //default to @true
        get() {
            const rawValue = this.getDataValue('lastName');
            return rawValue ? rawValue.toUpperCase() : null;
        },
    },
    fullName: {
        type: DataTypes.VIRTUAL,
        get() {
            return `${this.firstName} ${this.lastName}`;
        },
        set(value) {
            throw new Error('Do not try to set the `fullName` value!');
        },
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    // Имена таблиц и полей принято писать всегда в нижнем регистре
    // tableName: 'user',
});

module.exports = User;
