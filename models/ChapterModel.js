import { Sequelize } from "sequelize";
import db from "../config/Database.js";

const { DataTypes } = Sequelize;

const Chapter = db.define('chapter', {
    title: {
        type: DataTypes.STRING
    }
}, {
    freezeTableName: true
})

export default Chapter;

(async()=> {
    await db.sync();
})();