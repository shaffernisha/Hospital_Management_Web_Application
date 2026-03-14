const express = require('express');
const cors = require('cors');
require('dotenv').config();
// Route imports
const authRoutes = require('./routes/auth');
const patientRoutes = require('./routes/patients');
const doctorRoutes = require('./routes/doctors');
const appointmentRoutes = require('./routes/appointments');
const bloodBankRoutes = require('./routes/bloodBank');
const chatbotRoutes = require('./routes/chatbot');
const prescriptionRoutes = require('./routes/prescriptions');
const adminRoutes = require('./routes/admin');
const emailRoutes = require('./routes/emails');
// Middleware
const errorHandler = require('./middleware/errorHandler');

const app = express();
 
// Parse JSON and URL-encoded requests
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  cors({
    origin: process.env.FRONTEND_URL || 'http://localhost:5173',
    credentials: true,
  })
);

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/patients', patientRoutes);
app.use('/api/doctors', doctorRoutes);
app.use('/api/appointments', appointmentRoutes);
app.use('/api/blood-bank', bloodBankRoutes);
app.use('/api/chatbot', chatbotRoutes);
app.use('/api/prescriptions', prescriptionRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/emails', emailRoutes);

// Health check
app.get('/api/health', (req, res) => {
  res.status(200).json({ status: 'OK', message: 'Server is running' });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ message: 'Route not found' });
});

// Error handler
app.use(errorHandler);

module.exports = app;
