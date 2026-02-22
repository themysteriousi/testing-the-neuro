// server.js
const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Middleware - Allow requests from your Vercel frontend
const allowedOrigins = [
  'http://localhost:5173', // Local Vite dev
  process.env.FRONTEND_URL  // Your Vercel URL (set in Render env vars)
].filter(Boolean);

app.use(cors({
  origin: allowedOrigins,
  credentials: true
}));
app.use(express.json()); // Parses incoming JSON requests

// Import your routes file
const apiRoutes = require('./routes/api');

// Mount the routes and apply the '/api' prefix to all of them
app.use('/api', apiRoutes);

// Health Check
app.get('/', (req, res) => {
  res.send('NEXUS API is running...');
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
