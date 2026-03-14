
// EMAIL LOG MODEL
const emailLogSchema = new mongoose.Schema({
  recipientEmail: {
    type: String,
    required: true
  },
  subject: {
    type: String,
    required: true
  },
  type: {
    type: String,
    enum: ['appointment_confirmation', 'prescription_shared', 'password_reset'],
    required: true
  },
  referenceId: {
    type: String,
    default: null
  },
  status: {
    type: String,
    enum: ['sent', 'failed'],
    default: 'sent'
  },
  errorMessage: {
    type: String,
    default: null
  },
  sentAt: {
    type: Date,
    default: Date.now
  }
});

const EmailLog = mongoose.model('EmailLog', emailLogSchema);

module.exports = {
  Patient,
  Appointment,
  Prescription,
  ChatMessage,
  EmailLog
};

