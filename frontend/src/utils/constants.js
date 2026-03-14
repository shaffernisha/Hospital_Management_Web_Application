
// Blood Groups
export const BLOOD_GROUPS = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];

// Doctor Specializations
export const SPECIALIZATIONS = [
  'Cardiology',
  'Neurology',
  'Surgery',
  'Pediatrics',
  'Orthopedics',
  'Dermatology',
  'Psychiatry',
  'Oncology',
  'Urology',
  'Gastroenterology',
  'Pulmonology',
  'Nephrology',
  'General Medicine',
  'Obstetrics & Gynecology',
  'ENT',
];

// Appointment Status
export const APPOINTMENT_STATUS = {
  PENDING: 'pending',
  CONFIRMED: 'confirmed',
  COMPLETED: 'completed',
  CANCELLED: 'cancelled',
};

// User Roles
export const USER_ROLES = {
  PATIENT: 'patient',
  DOCTOR: 'doctor',
  ADMIN: 'admin',
};

// API Endpoints
export const API_ENDPOINTS = {
  AUTH: '/auth',
  PATIENTS: '/patients',
  DOCTORS: '/doctors',
  APPOINTMENTS: '/appointments',
  BLOOD_BANK: '/blood-bank',
  CHATBOT: '/chatbot',
  ADMIN: '/admin',
  EMAILS: '/emails',
  PRESCRIPTIONS: '/prescriptions',
};

// HTTP Status Codes
export const HTTP_STATUS = {
  OK: 200,
  CREATED: 201,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  CONFLICT: 409,
  INTERNAL_SERVER_ERROR: 500,
  SERVICE_UNAVAILABLE: 503,
};

// Error Messages
export const ERROR_MESSAGES = {
  INVALID_EMAIL: 'Please enter a valid email address',
  INVALID_PASSWORD: 'Password must be at least 6 characters with uppercase, lowercase, and number',
  INVALID_PHONE: 'Please enter a valid 10-digit phone number',
  INVALID_AGE: 'You must be at least 18 years old',
  INVALID_DATE: 'Please select a future date',
  INVALID_TIME: 'Please enter a valid time',
  REQUIRED_FIELD: 'This field is required',
  UNAUTHORIZED: 'You are not authorized to perform this action',
  SERVER_ERROR: 'Something went wrong. Please try again later.',
  NETWORK_ERROR: 'Network error. Please check your connection.',
};

// Success Messages
export const SUCCESS_MESSAGES = {
  REGISTER_SUCCESS: 'Registration successful! Please login.',
  LOGIN_SUCCESS: 'Login successful!',
  LOGOUT_SUCCESS: 'Logged out successfully',
  APPOINTMENT_BOOKED: 'Appointment booked successfully',
  APPOINTMENT_CANCELLED: 'Appointment cancelled successfully',
  PRESCRIPTION_CREATED: 'Prescription created successfully',
  PROFILE_UPDATED: 'Profile updated successfully',
  PASSWORD_CHANGED: 'Password changed successfully',
};

// Validation Patterns
export const VALIDATION_PATTERNS = {
  EMAIL: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  PHONE: /^[0-9]{10}$/,
  PASSWORD: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d@$!%*?&]{6,}$/,
  NAME: /^[a-zA-Z\s]{2,50}$/,
  LICENSE: /^[a-zA-Z0-9]{5,}$/,
};

// Time Slots
export const TIME_SLOTS = [
  '09:00', '09:30', '10:00', '10:30', '11:00', '11:30',
  '12:00', '12:30', '14:00', '14:30', '15:00', '15:30',
  '16:00', '16:30', '17:00', '17:30', '18:00',
];

// Experience Range
export const EXPERIENCE_RANGE = Array.from({ length: 51 }, (_, i) => i);

// Consultation Fee Range
export const CONSULTATION_FEE_RANGE = [100, 200, 300, 500, 750, 1000, 1500, 2000];

// Colors
export const COLORS = {
  PRIMARY: '#1a6b63',
  SECONDARY: '#158170',
  ACCENT: '#FF7A45',
  WHITE: '#ffffff',
  BLACK: '#000000',
  LIGHT: '#f5f5f5',
  LIGHT_GRAY: '#e9ecef',
  GRAY: '#666666',
  DARK_GRAY: '#333333',
  ERROR: '#ff6b6b',
  SUCCESS: '#51cf66',
  WARNING: '#ffd93d',
  INFO: '#1a9bcf',
};

// Status Colors
export const STATUS_COLORS = {
  pending: '#ffd93d',
  confirmed: '#51cf66',
  completed: '#51cf66',
  cancelled: '#ff6b6b',
};

// Local Storage Keys
export const STORAGE_KEYS = {
  TOKEN: 'token',
  USER: 'user',
  THEME: 'theme',
  LANGUAGE: 'language',
  PREFERENCES: 'preferences',
};

// Regex Patterns
export const REGEX = {
  EMAIL: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  URL: /^https?:\/\/.+/,
  PHONE: /^[0-9]{10}$/,
  NUMERIC: /^[0-9]+$/,
  ALPHANUMERIC: /^[a-zA-Z0-9]+$/,
};
