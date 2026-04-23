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
## Environment Variables
Create a `.env` file with the following:
DB_DIALECT=sqlite
DB_STORAGE=music_library.db
NODE_ENV=development
PORT=3000
JWT_SECRET=your_secret_key_here
SEED_PASSWORD_1=your_admin_password
SEED_PASSWORD_2=your_user_password

## Authentication
This API uses JWT authentication. To access protected routes:
1. Register a new account via `POST /register` or login via `POST /login`
2. Copy the token from the response
3. Include it in the `Authorization` header as `Bearer <token>`

### User Roles
- **admin** — full access to all routes including DELETE and user management
- **user** — can read all data and manage their own listening history

## API Endpoints

### Auth (Public)
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/register` | Register a new user |
| POST | `/login` | Login and receive a token |

### Users (Admin only)
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/users` | Get all users |
| GET | `/users/:id` | Get a user by ID |
| POST | `/users` | Create a new user |
| PUT | `/users/:id` | Update a user |
| DELETE | `/users/:id` | Delete a user |

### Artists
| Method | Endpoint | Description | Access |
|--------|----------|-------------|--------|
| GET | `/artists` | Get all artists | Any logged in user |
| GET | `/artists/:id` | Get an artist by ID | Any logged in user |
| POST | `/artists` | Create a new artist | Admin only |
| PUT | `/artists/:id` | Update an artist | Admin only |
| DELETE | `/artists/:id` | Delete an artist | Admin only |

### Songs
| Method | Endpoint | Description | Access |
|--------|----------|-------------|--------|
| GET | `/songs` | Get all songs | Any logged in user |
| GET | `/songs/:id` | Get a song by ID | Any logged in user |
| POST | `/songs` | Create a new song | Admin only |
| PUT | `/songs/:id` | Update a song | Admin only |
| DELETE | `/songs/:id` | Delete a song | Admin only |

### Services
| Method | Endpoint | Description | Access |
|--------|----------|-------------|--------|
| GET | `/services` | Get all services | Any logged in user |
| GET | `/services/:id` | Get a service by ID | Any logged in user |
| POST | `/services` | Create a new service | Admin only |
| PUT | `/services/:id` | Update a service | Admin only |
| DELETE | `/services/:id` | Delete a service | Admin only |

### UserMusic
| Method | Endpoint | Description | Access |
|--------|----------|-------------|--------|
| GET | `/usermusic` | Get all entries | Any logged in user |
| GET | `/usermusic/:id` | Get an entry by ID | Any logged in user |
| POST | `/usermusic` | Log a song play | Any logged in user |
| PUT | `/usermusic/:id` | Update an entry | Any logged in user |
| DELETE | `/usermusic/:id` | Delete an entry | Admin only |

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

5. The `UserMusic` table contains the following fields:
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