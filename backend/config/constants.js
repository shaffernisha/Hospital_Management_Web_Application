// User roles in the system
const ROLES = {
  ADMIN: 'admin',
  DOCTOR: 'doctor',
  PATIENT: 'patient'
};
// Appointment statuses
const APPOINTMENT_STATUS = {
  PENDING: 'pending',
  CONFIRMED: 'confirmed',
  COMPLETED: 'completed',
  CANCELLED: 'cancelled'
};
// Email notification types
const EMAIL_TYPES = {
  APPOINTMENT_CONFIRMATION: 'appointment_confirmation',
  PRESCRIPTION_SHARED: 'prescription_shared',
  PASSWORD_RESET: 'password_reset'
};

module.exports = {
  ROLES,
  APPOINTMENT_STATUS,
  EMAIL_TYPES
};
