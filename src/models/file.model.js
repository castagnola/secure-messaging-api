const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/test-connection");


const File = sequelize.define('File', {//define recibe dos objetos el primero referencia los campos en BD y el segundo son datos extra para poder crear el modelo como tal
    file_id: {
        type: DataTypes.UUID, // genera uuid automaticos
        defaultValue: DataTypes.UUIDV4,// Generar automaticamente los uuid v4
        primaryKey: true
    },
    data: {
        type: DataTypes.JSON,
        allowNull: false //No permitir nullos
    },

    from: {
        type: DataTypes.STRING,
        allowNull: false
    },
    to: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {});

module.exports = File;