HealNow Hospital Management System

A comprehensive hospital management application built with modern web technologies. HealNow streamlines patient appointments, doctor consultations, prescription management, and hospital operations in a single integrated platform.

Overview

HealNow is a full-stack web application designed to simplify healthcare management. The platform connects patients, doctors, and hospital administrators in a seamless digital environment. Patients can book appointments and access medical records, doctors can manage their schedules and issue prescriptions, and administrators have tools to oversee hospital operations.

The application features a responsive design that works on desktop, tablet, and mobile devices. It includes professional email notifications for appointments, secure authentication with JWT tokens, and a modern user interface with dark mode support.

Technology Stack

Frontend: React with Vite, React Router, and Tailwind CSS
Backend: Node.js with Express.js
Database: MongoDB
Authentication: JWT (JSON Web Tokens)
Email: Nodemailer with Handlebars templates
Deployment: Vercel (Frontend), Render (Backend), MongoDB Atlas (Database)

Key Features

Patient Features

Book appointments with doctors by specialization and availability
View complete appointment history and medical records
Receive appointment confirmations via email
Download and manage prescriptions
Chat with healthcare professionals
Access medical documents and past treatments

Doctor Features

Manage appointment schedule and availability
View detailed patient information before consultations
Create and send prescriptions with dosage instructions
Track all patient consultations and recommendations
Respond to patient queries and health concerns

Administrator Features

Access hospital dashboard with key statistics
Manage doctor profiles and specializations
Manage patient accounts and permissions
View and monitor all appointments
Generate hospital reports and analytics

Technical Features

Dark mode with persistent theme storage across sessions
Responsive mobile-friendly design for all devices
Secure user authentication with JWT tokens
Professional HTML email templates for notifications
Real-time appointment booking and status updates
Role-based access control for different user types

Getting Started

Prerequisites

Node.js version 14 or higher
npm or yarn package manager
MongoDB local installation or MongoDB Atlas account
Git for version control

Installation

Clone the repository to your local machine:

git clone https://github.com/YOUR-USERNAME/healnow-hospital.git
cd healnow-hospital

Install frontend dependencies:

cd frontend
npm install

Install backend dependencies:

cd ../backend
npm install

Configure environment variables by creating .env files in both frontend and backend directories with the required credentials and settings.

Running the Application

Start the backend server in first terminal:

cd backend
npm run dev

In a new terminal, start the frontend application:

cd frontend
npm run dev

Open your browser and visit http://localhost:5173 to access the application.

Project Structure

frontend: Contains React components, pages, styles, and utilities built with Vite for fast development and optimized production builds

backend: Contains Express server, API routes, MongoDB models, middleware, and email service configuration

src: Main source code directory containing components, pages, context, utilities, and styling

services: Backend services including email configuration and third-party integrations

routes: API endpoints for authentication, appointments, doctors, patients, and prescriptions

models: MongoDB schemas for users, appointments, prescriptions, and medical records

middleware: Authentication, error handling, and request validation middleware

Environment Variables

Frontend configuration file .env:

VITE_API_URL=http://localhost:5000/api

Backend configuration file .env:

MONGODB_URI=mongodb://localhost:27017/healnow
JWT_SECRET=your-secret-key-here
JWT_EXPIRE=7d
PORT=5000
EMAIL_USER=your-email@gmail.com
EMAIL_PASSWORD=your-app-password
FRONTEND_URL=http://localhost:3000
NODE_ENV=development

For production deployment, update these variables with production URLs and credentials from your hosting providers.

User Roles and Credentials

The application supports three user roles with different access levels and permissions.

Patient Role: Can book appointments, view medical records, receive prescriptions, chat with doctors

Doctor Role: Can manage appointments, create prescriptions, view patient information and history

Admin Role: Can manage hospital operations, view statistics, manage users and doctors

Default admin credentials for testing the system:

Email: admin@healnow.com
Password: Admin@123

Features in Detail

Appointment System

Patients can search for available doctors by specialization and view their schedules. The booking interface displays real-time slot availability. Email confirmations are automatically sent to both patients and doctors upon booking. Patients can cancel or reschedule appointments with proper notifications. Doctors receive immediate notifications of new appointment bookings.

Medical Records

Patients can view their complete medical history and previous treatments. Medical documents are securely stored and encrypted. Doctors can access relevant patient history during consultations. Records include allergies, medications, previous treatments, and diagnoses.

Prescription Management

Doctors can create detailed prescriptions with specific medications and dosage instructions. Prescriptions are automatically sent to patients via professional email templates. Patients can download prescriptions as PDF files for their records. Complete prescription history is maintained for future reference and follow-ups.

Email Notifications

Automated appointment confirmations sent to both patients and doctors. Appointment reminders sent before scheduled consultation time. Welcome emails for newly registered users. Prescription sharing notifications with download links. All emails use professional HTML templates with hospital branding.

Dark Mode

User interface automatically adapts to dark or light mode based on preferences. Theme preference is saved and persists across multiple sessions. Smooth transitions between theme changes without page reload. All colors are optimized for readability in both light and dark modes.

Security

Passwords are hashed using bcrypt encryption before storage in database. JWT tokens expire after configured duration for security. API endpoints are protected with authentication middleware. MongoDB is accessed with secure credentials and proper validation. HTTPS is enforced on all production deployments.

API Documentation

Authentication Endpoints

POST /api/auth/register: Register new user account with email and password
POST /api/auth/login: User login and JWT token generation
GET /api/auth/me: Get current user information and profile

Appointment Endpoints

POST /api/appointments: Create new appointment with doctor
GET /api/appointments: Get all appointments for hospital
GET /api/appointments/user/my-appointments: Get current user appointments
PUT /api/appointments/:id: Update appointment details and status
DELETE /api/appointments/:id: Cancel appointment

Doctor Endpoints

GET /api/doctors: Get list of all doctors with specializations
GET /api/doctors/:id: Get specific doctor details and availability
POST /api/doctors: Create new doctor profile

Prescription Endpoints

POST /api/prescriptions/create: Create new prescription for patient
GET /api/prescriptions/patient: Get patient prescriptions
GET /api/prescriptions/doctor: Get doctor issued prescriptions
GET /api/prescriptions/:id/download: Download prescription as PDF file

Deployment Instructions

This application can be deployed to cloud platforms for production use. Frontend is deployed on Vercel for optimal performance and automatic scaling. Backend is deployed on Render with auto-scaling capabilities. Database is hosted on MongoDB Atlas for reliability and automatic backups.

Vercel Deployment for Frontend

Create account on vercel.com and connect GitHub
Import your healnow-hospital repository
Configure root directory as ./frontend
Set environment variable VITE_API_URL to your backend URL
Deploy automatically on each git push to main branch

Render Deployment for Backend

Create account on render.com and authorize GitHub access
Create new web service from your repository
Set root directory as backend
Set build command as npm install
Set start command as npm start
Add all required environment variables including MONGODB_URI
Backend auto-deploys when code is pushed to main

MongoDB Atlas Setup

Create account on mongodb.com/cloud/atlas
Create a free tier cluster in your preferred region
Generate database user credentials
Navigate to Network Access and allow 0.0.0.0/0 for access from anywhere
Copy connection string with credentials
Update MONGODB_URI in Render environment variables

Known Limitations and Future Improvements

Current Limitations

Payment integration for consultation fees not yet implemented
Video consultation feature not available in current version
SMS notifications for reminders not configured
Real-time chat messaging requires WebSocket setup

Planned Features

Integrate payment gateway for paid consultations
Add video consultation capability for remote meetings
Implement SMS reminders before appointments
Real-time messaging between patients and doctors
Mobile application for iOS and Android
Advanced analytics and reporting dashboard
Prescription refill automation
Insurance provider integration

Contributing

Contributions are welcome to improve the project. Please follow the existing code structure and style guidelines. Create a new branch for each feature or bugfix with descriptive names. Write clear and descriptive commit messages. Test thoroughly before submitting pull requests.

Code Standards

Use consistent naming conventions throughout the codebase for clarity
Write comments for complex logic and business rules
Follow ESLint configuration for code quality and consistency
Test all new features before deployment to ensure functionality

Troubleshooting

Connection Refused Error

Ensure backend server is running on port 5000
Verify MongoDB connection string is correct and complete
Check that all environment variables are properly set
Confirm that no firewall is blocking the connection

CORS Error

Update FRONTEND_URL in backend environment variables
Ensure both frontend and backend are running on correct ports
Clear browser cache and cookies if error persists
Check browser console for detailed error messages

MongoDB Connection Failed

Verify MongoDB is installed and running on your machine
Check username and password in connection string
Whitelist your IP address in MongoDB Atlas network settings
Verify database name matches in connection string

Emails Not Sending

Verify EMAIL_USER and EMAIL_PASSWORD are correct in backend
Enable Less Secure Apps for Gmail account if using Gmail
Check that email credentials in environment variables are valid
Verify email service is properly configured in backend

Login Not Working

Ensure backend API URL is correct in frontend environment
Check authentication middleware in backend routes
Verify JWT_SECRET is set in backend environment variables
Clear browser storage and try logging in again

Performance Optimization

The application uses Vite for fast frontend builds and development
React components are code-split for optimal loading performance
Database queries use proper indexing for faster operations
API responses are cached where appropriate for efficiency
Images are optimized before deployment to production

Security Best Practices

All sensitive data is stored in environment variables only
Database passwords are never committed to git repository
HTTPS is enforced on all production endpoints
JWT tokens have configured expiration times
User input is validated on both frontend and backend
SQL injection and XSS attacks are prevented through proper input sanitization

Testing

Manual Testing

Test all user flows from registration to appointment booking
Test email sending functionality with real email addresses
Test dark mode toggle functionality
Test responsive design on different screen sizes
Test login and logout functionality

Automated Testing

Add test cases for critical user paths and features
Use testing frameworks like Jest and React Testing Library
Run tests before deployment to catch issues early
Maintain test coverage for important functions

License

This project is open source and available under the MIT License.

Contact and Support

For support or questions about the project, please contact the development team
Issues can be reported on GitHub repository with clear descriptions
Feature requests are welcome and will be considered for future versions
Feedback helps improve the application for all users

Acknowledgments

Built with React for responsive user interface
Express.js for robust backend API development
MongoDB for flexible database management
Nodemailer for professional email functionality
Vercel and Render for reliable hosting services

Version History

Version 1.0.0 (Current Release)

Initial release with core hospital management features
Includes appointment booking system for patients and doctors
Complete prescription management and PDF generation
Email notifications with professional templates
Dark mode support with persistent theme storage
Role-based access control for different user types
Responsive design for all devices

Future versions will include payment integration, video consultations, and mobile applications based on user feedback and requirements.