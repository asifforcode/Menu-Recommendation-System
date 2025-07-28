const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB connection
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/combo-menu', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});

// Routes
app.use('/api/combos', require('./routes/combos'));
app.use('/api/menu', require('./routes/menu'));

app.get('/', (req, res) => {
  res.json({ message: 'Combo Meal Recommendation Engine API' });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
