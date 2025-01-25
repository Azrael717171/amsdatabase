const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const Override = require('./models/Override');
const app = express();

// Middleware setup
app.use(cors());
app.use(bodyParser.json());

// MongoDB connection
mongoose
  .connect('mongodb://localhost:27017/timeOverride', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.log('Failed to connect to MongoDB', err));

// Routes

// Get all overrides
app.get('/overrides', async (req, res) => {
  try {
    const overrides = await Override.find();
    res.json(overrides);
  } catch (err) {
    res.status(400).json({ message: 'Error fetching overrides', error: err });
  }
});

// Add a new override
app.post('/overrides', async (req, res) => {
  try {
    const newOverride = new Override(req.body);
    await newOverride.save();
    res
      .status(201)
      .json({ message: 'Override added successfully', override: newOverride });
  } catch (err) {
    res.status(400).json({ message: 'Error adding override', error: err });
  }
});

// Update an override
app.put('/overrides/:id', async (req, res) => {
  try {
    const override = await Override.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true } // Return the updated document
    );
    if (!override) {
      return res.status(404).json({ message: 'Override not found' });
    }
    res.json({ message: 'Override updated successfully', override });
  } catch (err) {
    res.status(400).json({ message: 'Error updating override', error: err });
  }
});

// Delete an override
app.delete('/overrides/:id', async (req, res) => {
  try {
    const override = await Override.findByIdAndDelete(req.params.id);
    if (!override) {
      return res.status(404).json({ message: 'Override not found' });
    }
    res.json({ message: 'Override deleted successfully' });
  } catch (err) {
    res.status(400).json({ message: 'Error deleting override', error: err });
  }
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
