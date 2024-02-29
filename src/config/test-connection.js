const { Sequelize } = require('sequelize');

const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: 'database.sqlite'
});

async function testConnection() {
    try {
        await sequelize.authenticate();
        await sequelize.sync({ force: true });//Crear tablas automaticamente
        console.log('Connection has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
}

module.exports = {
    testConnection,
    sequelize
};