const nodemailer = require('nodemailer');

// CREATE EMAIL TRANSPORTER FROM ENV VARIABLES
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD
  }
});

// VERIFY CONNECTION
transporter.verify((error, success) => {
  if (error) {
    console.error('[Email Config Error]', error.message);
  } else {
    console.log('[Email Config] - Nodemailer is ready');
  }
});

// END EMAIL FUNCTION
const sendEmail = async (to, subject, html) => {
  try {
    const mailOptions = {
      from: `${process.env.EMAIL_FROM_NAME} <${process.env.EMAIL_USER}>`,
      to: to,
      subject: subject,
      html: html
    };

    console.log('[Email] Sending email to:', to);
    const info = await transporter.sendMail(mailOptions);
    console.log('[Email] -Email sent successfully:', info.response);
    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error('[Email Error]', error.message);
    return { success: false, error: error.message };
  }
};

// APPOINTMENT CONFIRMATION EMAIL TEMPLATE
const appointmentConfirmationEmail = (patientName, doctorName, appointmentDate, appointmentTime, consultationFee) => {
  return `
    <div style="font-family: Arial, sans-serif; color: #333;">
      <h2 style="color: #1a6b63;">Appointment Confirmation</h2>
      <p>Dear ${patientName},</p>
      
      <p>Your appointment has been confirmed! Here are the details:</p>
      
      <div style="background: #f5f5f5; padding: 20px; border-radius: 8px; margin: 20px 0;">
        <p><strong>Doctor:</strong> Dr. ${doctorName}</p>
        <p><strong>Date:</strong> ${appointmentDate}</p>
        <p><strong>Time:</strong> ${appointmentTime}</p>
        <p><strong>Consultation Fee:</strong> ₹${consultationFee}</p>
      </div>
      
      <p>Please join 10 minutes before your scheduled online consultation.</p>
      
      <p style="color: #666; font-size: 12px; margin-top: 30px;">
        If you need to reschedule or cancel, please contact us at least 24 hours in advance.
      </p>
      
      <p>Best regards,<br/>
      <strong>HealNow Healthcare Team</strong></p>
    </div>
  `;
};

// DOCTOR REGISTRATION EMAIL TEMPLATE
const doctorRegistrationEmail = (doctorName, email, password) => {
  return `
    <div style="font-family: Arial, sans-serif; color: #333;">
      <h2 style="color: #1a6b63;">Welcome to HealNow!</h2>
      <p>Dear Dr. ${doctorName},</p>
      
      <p>Your account has been successfully created. Here are your login credentials:</p>
      
      <div style="background: #f5f5f5; padding: 20px; border-radius: 8px; margin: 20px 0;">
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Temporary Password:</strong> <code style="background: #e0e0e0; padding: 5px;">${password}</code></p>
      </div>
      
      <p><strong>⚠️ Important:</strong> Please change your password immediately after your first login.</p>
      
      <p>You can now log in at: <a href="http://localhost:5173/login">http://localhost:5173/login</a></p>
      
      <p>Best regards,<br/>
      <strong>HealNow Healthcare Team</strong></p>
    </div>
  `;
};

// PATIENT REGISTRATION EMAIL TEMPLATE
const patientRegistrationEmail = (patientName) => {
  return `
    <div style="font-family: Arial, sans-serif; color: #333;">
      <h2 style="color: #1a6b63;">Welcome to HealNow!</h2>
      <p>Dear ${patientName},</p>
      
      <p>Your account has been successfully created. You can now:</p>
      <ul style="color: #666;">
        <li>Book appointments with our expert doctors</li>
        <li>View your medical records</li>
        <li>Get prescriptions from doctors</li>
        <li>Chat with our AI health assistant</li>
      </ul>
      
      <p>Get started by exploring our available doctors and booking your first appointment.</p>
      
      <p>Access your account at: <a href="http://localhost:5173/login">http://localhost:5173/login</a></p>
      
      <p>Best regards,<br/>
      <strong>HealNow Healthcare Team</strong></p>
    </div>
  `;
};

// PRESCRIPTION SHARED EMAIL TEMPLATE
const prescriptionSharedEmail = (patientName, doctorName, prescriptionId) => {
  return `
    <div style="font-family: Arial, sans-serif; color: #333;">
      <h2 style="color: #1a6b63;">Prescription Shared</h2>
      <p>Dear ${patientName},</p>
      
      <p>Dr. ${doctorName} has shared a prescription with you.</p>
      
      <p><a href="http://localhost:5173/prescriptions/${prescriptionId}" style="background: #1a6b63; color: white; padding: 10px 20px; border-radius: 5px; text-decoration: none; display: inline-block;">View Prescription</a></p>
      
      <p>Best regards,<br/>
      <strong>HealNow Healthcare Team</strong></p>
    </div>
  `;
};

module.exports = {
  transporter,
  sendEmail,
  appointmentConfirmationEmail,
  doctorRegistrationEmail,
  patientRegistrationEmail,
  prescriptionSharedEmail
};