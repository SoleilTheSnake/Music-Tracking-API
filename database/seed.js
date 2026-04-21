// Import database and models
const {db, User, Services, Artists, Songs, UserMusic} = require('./setup');

// Seed data
const User = [
  {
    userID: 1,
    Username: "AstralAcidApollo",
    email: "Apollo.Lemke@newberry.edu",
  }
];

// Seed database with sample data
async function seedDatabase() {
  try {
    await db.authenticate();
    console.log("Connected.");

    await db.sync({ force: true });
    console.log("Synced.");

    await Track.bulkCreate(sampleTracks);
    console.log("Seeded.");

  } catch (err) {
    console.error("Seeding error:", err);
  } finally {
    await db.close();
    console.log("Closed.");
  }
}

seedDatabase();