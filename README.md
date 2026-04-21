# Final Project: Music Tracking API

A RESTful API for managing multiple songs and artists from various streaming platforms, all into one place.

## Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```

3. Create environment file:
   ```bash
   cp .env.example .env
   ```

4. Set up the database:
   ```bash
   node database/setup.js
   ```

5. Seed the database with sample data:
   ```bash
   node database/seed.js
   ```

6. Start the server:
   ```bash
   node server.js
   ```

## API Endpoints



## Database Schema

1. The `Users` table contains the following fields:

- `Id` (INTEGER, Primary Key, Auto Increment)
- `Username` (STRING, Required)
- `Email` (STRING, Required)


2. The `Services` table contains the following fields:

- `Id` (INTEGER, Primary Key, Auto Increment)
- `ServiceName` (STRING, Required)

3. The `Artists` table contains the following fields:

- `Id` (INTEGER, Primary Key, Auto Increment)
- `ArtistName` (STRING, Required)

4. The `Songs` table contains the following fields:

- `Id` (INTEGER, Primary Key, Auto Increment)
- `SongTitle` (STRING, Required)
- `Artist_Id` (INTEGER, Required)
- `Duration` (INTEGER)

5. The `UserSongs` table contains the following fields:
- `User_Id` (INTEGER, Foreign Key → Users.Id, Required)
- `Song_Id` (INTEGER, Foreign Key → Songs.Id, Required)
- `Service_Id` (INTEGER, Foreign Key → Services.Id, Required)
- `PlayCount` (INTEGER, Required, Default: 0)
- `LastPlayed` (DATETIME)

## Project Structure

```
music-library-api/
├── database/
│   ├── setup.js    # Database setup and model definitions
│   └── seed.js     # Sample data seeding
├── server.js       # Main server file with API routes
├── package.json
├── .env            # Environment variables
├── .gitignore
└── README.md
```