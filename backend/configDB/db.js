const { Sequelize } = require('sequelize');
const dotenv = require('dotenv');

dotenv.config();

const sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
        host: process.env.DB_HOST,
        dialect: 'mysql',
    }
);

sequelize
    .authenticate()
    .then(() => {
        console.log('Connection to the DB');
    })
    .catch((error) => {
        console.log('Unable to connect to the DB:', error);
    });

module.exports = sequelize;
