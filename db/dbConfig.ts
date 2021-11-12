import { Sequelize } from 'sequelize';

const db = new Sequelize({
    database: 'node',
    username: 'root',
    password: 'jotaerre01',
    host: 'localhost',
    dialect: 'mysql',
});

export default db;