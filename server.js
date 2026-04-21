const express = require('express');
const { db, Track } = require('./database/setup');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to parse JSON
app.use(express.json());

//GET api endpoint to fetch all tracks
app.get('/api/tracks', async (req, res) => {
  try {
    const tracks = await Track.findAll();
    res.json(tracks);
  } catch (error) {
    res.status(404).json({ error: 'Failed to fetch tracks' });
  }
});

//GET api endpoint to fetch a track by id
app.get('/api/tracks/:id', async (req, res) => {
  try {
    const track = await Track.findByPk(req.params.id);
    if (track) {
      res.json(track);
    } else {
      res.status(404).json({ error: 'Track not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch track' });
  }
});

//POST api endpoint to create a new track
app.post('/api/tracks', async (req, res) => {
    try {
        const newTrack = await Track.create(req.body);
        res.status(201).json(newTrack);
    } catch (error) {
        res.status(400).json({ error: 'Failed to create track' });
    }
});

//DELETE api endpoint to delete a track by id
app.delete('/api/tracks/:id', async (req, res) => {
    try {
        const deleted = await Track.destroy({
            where: { trackId: req.params.id }
        });

        if (deleted) {
            res.json({ message: 'Track deleted successfully' });
        } else {
            res.status(404).json({ error: 'Track not found' });
        }

    } catch (error) {
        res.status(500).json({ error: 'Failed to delete track' });
    }
});


// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});