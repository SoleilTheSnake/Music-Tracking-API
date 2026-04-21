const { Sequelize, DataTypes } = require('sequelize');
require('dotenv').config();

const db = new Sequelize({
    dialect: process.env.DB_DIALECT || 'sqlite',
    storage: process.env.DB_STORAGE || 'music_library.db',
    logging: false
});

// Track Model
const Track = db.define('Track', {
    trackId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    songTitle: {
        type: DataTypes.STRING,
        allowNull: false
    },
    artistName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    albumName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    genre: {
        type: DataTypes.STRING,
        allowNull: false
    },
    duration: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    releaseYear: {
        type: DataTypes.INTEGER,
        allowNull: true
    }
}, {
    timestamps: false
});

// Async setup function
async function setupDatabase() {
    try {
        await db.authenticate();
        console.log('Connection established.');

        await db.sync();
        console.log('Tables created.');

    } catch (error) {
        console.error('Database setup failed:', error);
    } finally {
        await db.close();
        console.log('Connection closed.');
    }
}

module.exports = { db, Track };
