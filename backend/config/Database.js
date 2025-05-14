import { Sequelize } from "sequelize";

const db = new Sequelize('RECOVER_YOUR_DATA', 'root', '', {
    host: '34.69.50.38',
    dialect: 'mysql'
});

export default db;