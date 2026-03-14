const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const mongoose = require('mongoose');

dotenv.config();

const app = express();
// Middleware
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));
app.use(cors());

console.log('[Server] Starting...');
// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/healnow')
  .then(() => console.log('[Database] Connected'))
  .catch(err => console.log('[Database Error]', err.message));
// Health check endpoints
// GET /api/health
app.get('/api/health', (req, res) => {
  res.json({ success: true, message: 'Server running', timestamp: new Date() });
});
// GET /api/status
app.get('/api/status', (req, res) => {
  res.json({ 
    success: true, 
    server: 'Running', 
    port: process.env.PORT || 5000,
    mongoConnected: mongoose.connection.readyState === 1
  });
});
// IMPORT ALL ROUTES
const authRoutes = require('./src/routes/auth');
const doctorRoutes = require('./src/routes/doctors');
const appointmentRoutes = require('./src/routes/appointments');
const patientRoutes = require('./src/routes/patients');
const prescriptionRoutes = require('./src/routes/prescriptions');
const adminRoutes = require('./src/routes/admin');
const chatbotRoutes = require('./src/routes/chatbot');
// Endpoints: POST /register, POST /login, POST /logout, POST /forgot-password
//  USE ALL ROUTES
app.use('/api/auth', authRoutes);
// Doctor Routes: /api/doctors
// Endpoints: GET /, GET /:id, PUT /:id, DELETE /:id, GET /specialty/:specialty
app.use('/api/doctors', doctorRoutes);
// Appointment Routes: /api/appointments
// Endpoints: POST /, GET /, GET /:id, PUT /:id, DELETE /:id, POST /:id/confirm
app.use('/api/appointments', appointmentRoutes);
// Patient Routes: /api/patients
// Endpoints: GET /, GET /:id, PUT /:id, DELETE /:id, GET /:id/appointments
app.use('/api/patients', patientRoutes);
// Prescription Routes: /api/prescriptions
// Endpoints: POST /, GET /, GET /:id, PUT /:id, DELETE /:id, POST /:id/download-pdf
app.use('/api/prescriptions', prescriptionRoutes);
// Admin Routes: /api/admin
// Endpoints: GET /users, POST /users, DELETE /users/:id, GET /stats, PUT /users/:id
app.use('/api/admin', adminRoutes);
// Chatbot Routes: /api/chatbot
// Endpoints: POST /send-message, GET /history, DELETE /history
app.use('/api/chatbot', chatbotRoutes);
// Medical History Routes: /api/medical-history
// Endpoints: POST /save, GET /me, GET /patient/:patientId
app.use('/api/medical-history', require('./src/routes/medicalHistory'));
// 404 HANDLER
app.use((req, res) => {
  res.status(404).json({ success: false, message: 'Route not found' });
});

//  ERROR HANDLER 
app.use((err, req, res, next) => {
  console.log('[Error]', err.message);
  res.status(500).json({ success: false, message: err.message });
});

// Start server
const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, () => {
  console.log('ServerRunning on port ' + PORT);
  console.log('Server of Health: http://localhost:' + PORT + '/api/health');
});

module.exports = app;