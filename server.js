const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const meetingRoutes = require('./routes/meetings');

const app = express();

// Middleware
app.use(bodyParser.json());

// Routes
app.use('/api/meetings', meetingRoutes);

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/meetings', {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }).then(() => {
    console.log('Connected to MongoDB');
  }).catch(err => {
    console.error('Could not connect to MongoDB', err);
  });
  

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
