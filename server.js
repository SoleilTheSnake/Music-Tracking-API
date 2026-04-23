const express = require('express');
require('dotenv').config();
const { db, User, Services, Artists, Songs, UserMusic } = require('./database/setup');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const app = express();
const PORT = process.env.PORT || 3000;
const { authenticateToken, authorizeAdmin } = require('./middleware');

// Middleware to parse JSON
app.use(express.json());
// POST register
app.post('/register', async (req, res) => {
    try {
        const { Username, email, password } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await User.create({
            Username,
            email,
            password: hashedPassword,
            role: 'user' // new users are always regular users
        });
        res.status(201).json({ message: 'User created successfully' });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// POST login
app.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ where: { email } });
        if (!user) return res.status(404).json({ error: 'User not found' });

        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword) return res.status(401).json({ error: 'Invalid password' });

        const token = jwt.sign(
            { userId: user.userId, role: user.role },
            process.env.JWT_SECRET,
            { expiresIn: '7d' }
        );
        res.json({ token });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

//API Endpoint for Users
// GET all Users
app.get('/users', async (req, res) => {
    try {
        const users = await User.findAll();
        res.json(users);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});
// GET one user by ID
app.get('/users/:id', async (req, res) => {
    try {
        const user = await User.findByPk(req.params.id);
        if (!user) return res.status(404).json({ error: 'User not found' });
        res.json(user);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});
// POST create a new user
app.post('/users', async (req, res) => {
    try {
        const user = await User.create(req.body);
        res.status(201).json(user);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});
// PUT update a user
app.put('/users/:id', async (req, res) => {
    try {
        const user = await User.findByPk(req.params.id);
        if (!user) return res.status(404).json({ error: 'User not found' });
        await user.update(req.body);
        res.json(user);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});
// DELETE a user
app.delete('/users/:id', async (req, res) => {
    try {        const user = await User.findByPk(req.params.id);
        if (!user) return res.status(404).json({ error: 'User not found' });
        await user.destroy();
        res.json({ message: 'User deleted' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
  });

//API Endpoint for Services
// GET all Services
app.get('/services', async (req, res) => {
    try {
        const services = await Services.findAll();
        res.json(services);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// GET one service by ID
app.get('/services/:id', async (req, res) => {
    try {
        const service = await Services.findByPk(req.params.id);
        if (!service) return res.status(404).json({ error: 'Service not found' });
        res.json(service);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// POST create a new service
app.post('/services', async (req, res) => {
    try {
        const service = await Services.create(req.body);
        res.status(201).json(service);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// PUT update a service
app.put('/services/:id', async (req, res) => {
    try {
        const service = await Services.findByPk(req.params.id);
        if (!service) return res.status(404).json({ error: 'Service not found' });
        await service.update(req.body);
        res.json(service);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});
// DELETE a service
app.delete('/services/:id', async (req, res) => {
    try {
        const service = await Services.findByPk(req.params.id);
        if (!service) return res.status(404).json({ error: 'Service not found' });
        await service.destroy();
        res.json({ message: 'Service deleted' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

//API Endpoints for Artists
// GET all artists
app.get('/artists', async (req, res) => {
    try {        const artists = await Artists.findAll();
        res.json(artists);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});
// GET one artist by ID
app.get('/artists/:id', async (req, res) => {
    try {        const artist = await Artists.findByPk(req.params.id);
        if (!artist) return res.status(404).json({ error: 'Artist not found' });
        res.json(artist);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});
// POST create a new artist
app.post('/artists', async (req, res) => {
    try {        const artist = await Artists.create(req.body);
        res.status(201).json(artist);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});
// PUT update an artist
app.put('/artists/:id', async (req, res) => {
    try {        const artist = await Artists.findByPk(req.params.id);
        if (!artist) return res.status(404).json({ error: 'Artist not found' });
        await artist.update(req.body);
        res.json(artist);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});
// DELETE an artist
app.delete('/artists/:id', async (req, res) => {
    try {
        const artist = await Artists.findByPk(req.params.id);
        if (!artist) return res.status(404).json({ error: 'Artist not found' });
        await artist.destroy();
        res.json({ message: 'Artist deleted' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// API Endpoints for Songs
// GET all songs
app.get('/songs', async (req, res) => {
    try {
        const songs = await Songs.findAll();
        res.json(songs);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});
// GET one song by ID
app.get('/songs/:id', async (req, res) => {
    try {
        const song = await Songs.findByPk(req.params.id);
        if (!song) return res.status(404).json({ error: 'Song not found' });
        res.json(song);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});
// POST create a new song
app.post('/songs', async (req, res) => {
    try {
        const song = await Songs.create(req.body);
        res.status(201).json(song);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});
// PUT update a song
app.put('/songs/:id', async (req, res) => {
    try {
        const song = await Songs.findByPk(req.params.id);
        if (!song) return res.status(404).json({ error: 'Song not found' });
        await song.update(req.body);
        res.json(song);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});
// DELETE a song
app.delete('/songs/:id', async (req, res) => {
    try {
        const song = await Songs.findByPk(req.params.id);
        if (!song) return res.status(404).json({ error: 'Song not found' });
        await song.destroy();
        res.json({ message: 'Song deleted' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});
// API Endpoints for UserMusic
// GET all user music entries
app.get('/usermusic', async (req, res) => {
    try {        const userMusic = await UserMusic.findAll();
        res.json(userMusic);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});
// GET one user music entry by ID
app.get('/usermusic/:id', async (req, res) => {
    try {        const entry = await UserMusic.findByPk(req.params.id);
        if (!entry) return res.status(404).json({ error: 'Entry not found' });
        res.json(entry);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});
// POST create a new user music entry
app.post('/usermusic', async (req, res) => {
    try {        const entry = await UserMusic.create(req.body);
        res.status(201).json(entry);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});
// PUT update a user music entry
app.put('/usermusic/:id', async (req, res) => {
    try {        const entry = await UserMusic.findByPk(req.params.id);
        if (!entry) return res.status(404).json({ error: 'Entry not found' });
        await entry.update(req.body);
        res.json(entry);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});
// DELETE a user music entry
app.delete('/usermusic/:id', async (req, res) => {
    try {        const entry = await UserMusic.findByPk(req.params.id);
        if (!entry) return res.status(404).json({ error: 'Entry not found' });
        await entry.destroy();
        res.json({ message: 'Entry deleted' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});