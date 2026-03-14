const nodemailer = require('nodemailer');

// Configure email transporter
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER || process.env.SMTP_USER || 'your-email@gmail.com',
    pass: process.env.EMAIL_PASSWORD || process.env.SMTP_PASS || 'your-app-password'
  }
});

// Test email connection
transporter.verify((error, success) => {
  if (error) {
    console.log('[Email] Configuration error:', error.message);
  } else {
    console.log('[Email] Server is ready to send emails');
  }
});

// Reusable HTML email template
const emailTemplate = (title, content, type = 'patient') => `
  <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 600px; margin: 0 auto; padding: 0; background-color: #f5f7fa;">
    <!-- Header -->
    <div style="background: linear-gradient(135deg, #1a6b63 0%, #158170 100%); color: white; padding: 30px 20px; text-align: center; border-radius: 12px 12px 0 0;">
      <h1 style="margin: 0; font-size: 28px; font-weight: 700;">HealNow Healthcare</h1>
      <p style="margin: 10px 0 0 0; font-size: 14px; opacity: 0.9;">${type === 'doctor' ? 'Appointment Notification' : 'Your Health, Our Priority'}</p>
    </div>

    <!-- Content -->
    <div style="padding: 30px 20px;">
      <h2 style="color: #1a6b63; margin-top: 0; font-size: 24px; font-weight: 600;">${title}</h2>
      ${content}
    </div>

    <!-- Footer -->
    <div style="background: #f5f7fa; padding: 20px; text-align: center; border-radius: 0 0 12px 12px; border-top: 1px solid #e0e0e0; color: #999; font-size: 12px;">
      <p style="margin: 5px 0;">© 2024 HealNow Healthcare. All rights reserved.</p>
      <p style="margin: 5px 0;">This is an automated email. Please do not reply.</p>
    </div>
  </div>
`;

// Reusable details table
const detailsTable = (details) => `
  <div style="background: white; padding: 25px; border-radius: 12px; border-left: 5px solid #FF7A45; margin: 25px 0; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
    <table style="width: 100%; color: #333; font-size: 14px;">
      ${details.map(item => `
        <tr style="border-bottom: 1px solid #f0f0f0;">
          <td style="padding: 12px 0; font-weight: 600; color: #1a6b63; width: ${item.width || '120px'};">${item.label}</td>
          <td style="padding: 12px 0; color: ${item.color || '#666'};">${item.value}</td>
        </tr>
      `).join('')}
    </table>
  </div>
`;

// Patient email content
const getPatientContent = (data) => `
  <p style="color: #666; font-size: 16px; line-height: 1.6;">Dear <strong>${data.patientName}</strong>,</p>
  <p style="color: #666; font-size: 14px; line-height: 1.6;">Your appointment has been successfully booked. Here are your details:</p>
  
  ${detailsTable([
    { label: ' Date:', value: data.appointmentDate },
    { label: ' Time:', value: data.appointmentTime },
    { label: ' Doctor:', value: `Dr. ${data.doctorName}` },
    { label: ' Specialty:', value: data.specialization },
    { label: ' Reason:', value: data.reason },
    { label: ' Fee:', value: `₹${data.consultationFee}`, color: '#FF7A45', width: '120px' }
  ])}

  <!-- Reminders -->
  <div style="background: #fff3cd; padding: 15px; border-radius: 8px; border-left: 4px solid #ffc107; margin: 20px 0; color: #856404; font-size: 14px;">
    <p style="margin: 0; font-weight: 600;"> Important Reminders:</p>
    <ul style="margin: 8px 0 0 0; padding-left: 20px; font-size: 13px;">
      <li>Please arrive 10-15 minutes before appointment</li>
      <li>Bring your valid ID and medical documents</li>
      <li>Notify us 24 hours in advance if rescheduling</li>
    </ul>
  </div>

  <p style="color: #666; font-size: 14px; line-height: 1.6;">If you have questions, please contact us immediately.</p>
`;

// Doctor email content
const getDoctorContent = (data) => `
  <p style="color: #666; font-size: 16px; line-height: 1.6;">Dear <strong>Dr. ${data.doctorFirstName}</strong>,</p>
  <p style="color: #666; font-size: 14px; line-height: 1.6;">A new appointment has been scheduled. Here are the patient details:</p>
  
  ${detailsTable([
    { label: ' Patient:', value: data.patientName },
    { label: ' Email:', value: `<a href="mailto:${data.patientEmail}" style="color: #FF7A45; text-decoration: none;">${data.patientEmail}</a>` },
    { label: ' Phone:', value: data.patientPhone },
    { label: ' Date:', value: data.appointmentDate },
    { label: ' Time:', value: data.appointmentTime },
    { label: ' Reason:', value: data.reason }
  ])}

  <!-- Confirmation -->
  <div style="background: #e8f5e9; padding: 15px; border-radius: 8px; border-left: 4px solid #4caf50; margin: 20px 0; color: #2e7d32; font-size: 14px;">
    <p style="margin: 0; font-weight: 600;">✓ Appointment confirmed</p>
    <p style="margin: 8px 0 0 0; font-size: 13px;">Please ensure you are available at the scheduled time.</p>
  </div>
`;

// Send appointment confirmation to patient and doctor
const sendAppointmentConfirmation = async (patientEmail, doctorEmail, appointmentData) => {
  try {
    const from = process.env.EMAIL_FROM_EMAIL || process.env.SMTP_FROM || 'noreply@healnow.com';

    // Patient email
    const patientMailOptions = {
      from,
      to: patientEmail,
      subject: '✅ Appointment Confirmed - HealNow Healthcare',
      html: emailTemplate('Appointment Confirmed! ', getPatientContent(appointmentData), 'patient')
    };

    // Doctor email
    const doctorMailOptions = {
      from,
      to: doctorEmail,
      subject: ' New Appointment Scheduled - HealNow Healthcare',
      html: emailTemplate('New Appointment Scheduled', getDoctorContent(appointmentData), 'doctor')
    };

    // Send both emails
    await transporter.sendMail(patientMailOptions);
    await transporter.sendMail(doctorMailOptions);

    console.log('[Email] - Appointment confirmation emails sent');
    return true;

  } catch (error) {
    console.error('[Email Error]:', error.message);
    return false;
  }
};

module.exports = {
  sendAppointmentConfirmation
};