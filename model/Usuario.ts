import { DataTypes } from 'sequelize';
import db from '../db/dbConfig';


const Usuario = db.define('Usuario', {
    id:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    nombre: {
        type: DataTypes.STRING,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    estado: {
        type: DataTypes.BOOLEAN,
    },
}, 
{
    timestamps: false, //-> desabilitar ambos
    // createdAt: false, -> solo desabilitar createdAt
    // updatedAt: false, -> solo desabilitar updatedAt
});


export default Usuario;