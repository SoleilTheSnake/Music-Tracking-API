const { db, User, Services, Artists, Songs, UserMusic } = require('./setup');
const bcrypt = require('bcryptjs');
require('dotenv').config();

async function seedDatabase() {
    const seedUsers = [
        { 
            userId: 1, 
            username: "AstralAcidApollo", 
            email: "Apollo.Lemke@newberry.edu",
            password: await bcrypt.hash(process.env.SEED_PASSWORD_1, 10),
            role: 'admin'
        },
        { 
            userId: 2, 
            username: "JohnDoe", 
            email: "John.Doe@gmail.com",
            password: await bcrypt.hash(process.env.SEED_PASSWORD_2, 10),
            role: 'user'
        }
    ];

    const seedServices = [
        { serviceId: 1, ServiceName: "Spotify" },
        { serviceId: 2, ServiceName: "Youtube Music" }
    ];

    const seedArtists = [
        { artistId: 1, ArtistName: "DAGames" },
        { artistId: 2, ArtistName: "Toby Fox" }
    ];

    const seedSongs = [
        { songId: 1, SongName: "Build Our Machine", artistId: 1, Duration: 245 },
        { songId: 2, SongName: "Megalovania", artistId: 2, Duration: 156 }
    ];

    const seedUserMusic = [
        { id: 1, userId: 1, songId: 1, serviceId: 1, PlayCount: 5, LastPlayed: new Date() },
        { id: 2, userId: 1, songId: 2, serviceId: 2, PlayCount: 3, LastPlayed: new Date() }
    ];

    try {
        await db.authenticate();
        console.log("Connected.");
        await db.sync({ force: true });
        console.log("Synced.");
        await User.bulkCreate(seedUsers);
        await Services.bulkCreate(seedServices);
        await Artists.bulkCreate(seedArtists);
        await Songs.bulkCreate(seedSongs);
        await UserMusic.bulkCreate(seedUserMusic);
        console.log("Seeded.");
    } catch (err) {
        console.error("Seeding error:", err);
    } finally {
        await db.close();
        console.log("Closed.");
    }
}

seedDatabase();