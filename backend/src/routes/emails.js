const express = require('express');
const router = express.Router();
const EmailLog = require('../models/EmailLog');
const nodemailer = require('nodemailer');
const { protect, doctorOnly } = require('../middleware/auth');
// Configure email service (Gmail)
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.SMTP_USER || 'your-email@gmail.com',
    pass: process.env.SMTP_PASS || 'your-app-password'
  }
});
// Send appointment confirmation email
router.post('/send-confirmation', protect, async (req, res) => {
  try {
    const { patientEmail, doctorName, appointmentDate, appointmentTime } = req.body;
    
    const mailOptions = {
      from: process.env.SMTP_FROM || 'HealNow <noreply@healnow.com>',
      to: patientEmail,
      subject: 'Appointment Confirmation - HealNow',
      html: `
        <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
          <h2 style="color: #1a6b63;">Appointment Confirmed</h2>
          <p>Your appointment has been successfully scheduled.</p>
          <div style="background: #f0f4f8; padding: 15px; border-left: 4px solid #1a6b63;">
            <p><strong>Doctor:</strong> ${doctorName}</p>
            <p><strong>Date:</strong> ${appointmentDate}</p>
            <p><strong>Time:</strong> ${appointmentTime}</p>
          </div>
          <p>Thank you for choosing HealNow!</p>
        </div>
      `
    };
    // Send email and log result
    transporter.sendMail(mailOptions, async (error, info) => {
      if (error) {
        const emailLog = new EmailLog({
          recipientEmail: patientEmail,
          subject: 'Appointment Confirmation',
          type: 'appointment_confirmation',
          status: 'failed',
          errorMessage: error.message
        });
        await emailLog.save();
        
        return res.status(500).json({
          success: false,
          message: 'Failed to send email'
        });
      }
      // Log successful email
      const emailLog = new EmailLog({
        recipientEmail: patientEmail,
        subject: 'Appointment Confirmation',
        type: 'appointment_confirmation',
        status: 'sent'
      });
      await emailLog.save();
      
      res.json({
        success: true,
        message: 'Email sent successfully'
      });
    });
  } catch (error) {
    console.log('[Error] Send email:', error.message);
    res.status(500).json({ success: false, message: 'Email error' });
  }
});
//Get all email logs
router.get('/logs', protect, async (req, res) => {
  try {
    const logs = await EmailLog.find().sort({ sentAt: -1 });
    res.json({ success: true, logs });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to fetch logs' });
  }
});

module.exports = router;