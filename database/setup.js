const { Sequelize, DataTypes } = require('sequelize');
require('dotenv').config();

const db = new Sequelize({
    dialect: process.env.DB_DIALECT || 'sqlite',
    storage: process.env.DB_STORAGE || 'music_tracking.db',
    logging: false
});

const User = db.define('User', {
    userId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    username: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    role: {
        type: DataTypes.STRING,
        defaultValue: 'user'
    }
}, {
    timestamps: false
});
// Services Model
const Services = db.define('Services', {
    serviceId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    ServiceName: {
        type: DataTypes.STRING,
        allowNull: false
    },
}, {
    timestamps: false
});
// Artists Model
const Artists = db.define('Artists', {
    artistId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    ArtistName: {
        type: DataTypes.STRING,
        allowNull: false
    },
}, {
    timestamps: false
});

// Songs Model
const Songs = db.define('Songs', {
    songId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    SongName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    artistId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    Duration: {
        type: DataTypes.INTEGER,
        allowNull: true
}
}, {
    timestamps: false
});

// UserMusic Model (Join Table)
const UserMusic = db.define('UserMusic', {
    id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: User,
            key: 'userId'
        }
    },
    songId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Songs,
            key: 'songId'
        }
    },

    serviceId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Services,
            key: 'serviceId'
        }
    },
    PlayCount: {
        type: DataTypes.INTEGER,
        defaultValue: 0
    },
    LastPlayed: {
    type: DataTypes.DATE,
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

        await db.sync({ alter: true });
        console.log('Tables Edited.');

    } catch (error) {
        console.error('Database setup failed:', error);
    }
}

// Associations
Songs.belongsTo(Artists, { foreignKey: 'artistId' });
Artists.hasMany(Songs, { foreignKey: 'artistId' });
UserMusic.belongsTo(User, { foreignKey: 'userId' });
UserMusic.belongsTo(Songs, { foreignKey: 'songId' });
UserMusic.belongsTo(Services, { foreignKey: 'serviceId' });

module.exports = { db, User, Services, Artists, Songs, UserMusic, setupDatabase };
