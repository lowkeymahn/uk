const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 5000;

// Trust proxy for Railway
app.set('trust proxy', true);

// Basic middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files
app.use(express.static(path.join(__dirname, 'admin-dashboard')));

// Admin login endpoint
app.post('/api/admin/login', (req, res) => {
  const { username, password } = req.body;
  
  if (username === 'admin' && password === 'admin123') {
    res.json({ success: true, token: 'demo-token-' + Date.now() });
  } else {
    res.status(401).json({ success: false, message: 'Invalid credentials' });
  }
});

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'healthy' });
});

// Serve admin dashboard
app.get('/admin', (req, res) => {
  res.sendFile(path.join(__dirname, 'admin-dashboard', 'index.html'));
});

// Default route
app.get('/', (req, res) => {
  res.redirect('/admin');
});

// Start server
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Admin dashboard running on port ${PORT}`);
  console.log(`Access: http://localhost:${PORT}/admin`);
});