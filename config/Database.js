import { Sequelize } from "sequelize";

const db = new Sequelize('story', 'root', '', {
    host: 'localhost',
    dialect: 'mysql'
})

export default db;