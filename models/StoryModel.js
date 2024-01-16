import { Sequelize } from "sequelize";
import db from "../config/Database.js";

const { DataTypes } = Sequelize;

const Story = db.define('story', {
    title: {
        type: DataTypes.STRING
    },
    author: {
        type: DataTypes.STRING
    },
    synopsis: { 
        type: DataTypes.TEXT
    },
    category: {
        type: DataTypes.STRING
    },
    storyCover: { 
        type: DataTypes.STRING
    },
    url: {
        type: DataTypes.STRING
    },
    tags: { 
        type: DataTypes.JSON,
        get() {
            const tags = this.getDataValue('tags');
            return tags ? JSON.parse(tags) : [];
        },
        set(tags) {
            this.setDataValue('tags', tags ? JSON.stringify(tags) : null);
        }
    },
    status: {
        type: DataTypes.STRING
    }
}, {
    freezeTableName: true
});

export default Story;

(async()=> {
    await db.sync();
})();