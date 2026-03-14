import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Input from '../components/Input';
import Button from '../components/Button';
import { authAPI } from '../api';
import { useAuth } from '../hooks/useAuth';
import Header from '../components/Header';
import Footer from '../components/Footer';

const Login = () => {
  const navigate = useNavigate();
  const { login: contextLogin } = useAuth();
  const [role, setRole] = useState('patient');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [generalError, setGeneralError] = useState('');

  // Multi-step state
  const [step, setStep] = useState(1); // Step 1: Role, Step 2: Credentials

  const loginStyles = `
    .login-page {
      min-height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
      background: #f5f5f5;
      padding: 2rem;
    }

    .login-container {
      max-width: 1200px;
      width: 100%;
      position: relative;
      display: flex;
      align-items: stretch;
      justify-content: space-between;
      background: linear-gradient(135deg, #1a6b63 0%, #158170 100%);
      border-radius: 24px;
      box-shadow: 0 20px 60px rgba(0, 0, 0, 0.15);
      padding: 3rem 2.5rem 3rem 0;
      min-height: 600px;
      gap: 2rem;
    }

    /* Orange vertical bar on left */
    .login-container::before {
      content: '';
      position: absolute;
      left: 0;
      top: 0;
      bottom: 0;
      width: 140px;
      background: #FF7A45;
      z-index: 0;
      border-radius: 24px 0 0 24px;
    }

    /* Left Info Section */
    .login-info-section {
      position: relative;
      flex: 1;
      color: #ffffff;
      padding: 3rem 2rem 3rem 180px;
      display: flex;
      flex-direction: column;
      justify-content: center;
      z-index: 1;
    }

    .info-content h2 {
      font-size: 2.2rem;
      margin-bottom: 1.5rem;
      color: #ffffff;
      font-weight: 700;
      text-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
      line-height: 1.2;
    }

    .info-content > p {
      font-size: 1.1rem;
      margin-bottom: 2.5rem;
      color: #ffffff;
      line-height: 1.8;
      text-shadow: 0 1px 3px rgba(0, 0, 0, 0.2);
      font-weight: 400;
    }

    .info-list {
      list-style: none;
      margin: 0;
      padding: 0;
    }

    .info-list li {
      display: flex;
      align-items: center;
      gap: 1rem;
      margin-bottom: 1.5rem;
      font-size: 1.05rem;
      color: #ffffff;
      text-shadow: 0 1px 3px rgba(0, 0, 0, 0.2);
      font-weight: 400;
      line-height: 1.5;
    }

    .check-icon {
      width: 28px;
      height: 28px;
      background: rgba(255, 255, 255, 0.3);
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    }

    .check-icon svg {
      width: 16px;
      height: 16px;
      stroke: white;
      stroke-width: 3;
      filter: drop-shadow(0 1px 2px rgba(0, 0, 0, 0.3));
    }

    /* White Form Card — fixed inside green container, no scroll */
    .login-form-section {
      position: relative;
      flex: 0 0 450px;
      background: #ffffff;
      border-radius: 20px;
      padding: 2.5rem;
      z-index: 2;
      box-shadow: 0 10px 40px rgba(0, 0, 0, 0.15);
      animation: slideInRight 0.6s ease-out;
      overflow: hidden;
      align-self: center;
    }

    /* Step indicator */
    .step-indicator {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 0;
      margin-bottom: 0.4rem;
    }

    .step-dot {
      width: 32px;
      height: 32px;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 0.8rem;
      font-weight: 700;
      transition: all 0.3s ease;
      border: 2px solid #e9ecef;
      background: #fff;
      color: #adb5bd;
    }

    .step-dot.active {
      background: #1a6b63;
      border-color: #1a6b63;
      color: #fff;
      box-shadow: 0 4px 12px rgba(26, 107, 99, 0.3);
    }

    .step-dot.completed {
      background: #FF7A45;
      border-color: #FF7A45;
      color: #fff;
    }

    .step-line {
      width: 60px;
      height: 2px;
      background: #e9ecef;
      transition: background 0.3s ease;
    }

    .step-line.completed {
      background: #FF7A45;
    }

    /* Step label below dots */
    .step-labels {
      display: flex;
      justify-content: space-between;
      margin-top: 0.4rem;
      margin-bottom: 1.5rem;
      font-size: 0.72rem;
      color: #adb5bd;
      font-weight: 600;
      text-transform: uppercase;
      letter-spacing: 0.5px;
      padding: 0 0.5rem;
    }

    .step-label-item {
      text-align: center;
      flex: 1;
      transition: color 0.3s;
    }

    .step-label-item.active {
      color: #1a6b63;
    }

    /* Slide animation for steps */
    .step-panel {
      animation: fadeSlide 0.35s ease-out;
    }

    @keyframes fadeSlide {
      from { opacity: 0; transform: translateX(18px); }
      to   { opacity: 1; transform: translateX(0); }
    }

    @keyframes fadeSlideBack {
      from { opacity: 0; transform: translateX(-18px); }
      to   { opacity: 1; transform: translateX(0); }
    }

    .step-panel.back {
      animation: fadeSlideBack 0.35s ease-out;
    }

    .form-header {
      margin-bottom: 1.5rem;
    }

    .form-header h2 {
      font-size: 1.65rem;
      margin-bottom: 0.4rem;
      color: #1a6b63;
      font-weight: 700;
    }

    .form-header p {
      color: #6c757d;
      font-size: 0.9rem;
    }

    .form-group {
      margin-bottom: 1.25rem;
    }

    .role-label {
      font-weight: 600;
      color: #1a6b63;
      display: block;
      margin-bottom: 0.75rem;
      font-size: 0.9rem;
    }

    .role-options {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 0.75rem;
    }

    .role-option {
      position: relative;
      cursor: pointer;
    }

    .role-option input[type="radio"] {
      position: absolute;
      opacity: 0;
      cursor: pointer;
    }

    .role-option label {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 0.5rem;
      padding: 1rem 0.5rem;
      border: 2px solid #e9ecef;
      border-radius: 10px;
      transition: all 0.3s ease;
      text-align: center;
      cursor: pointer;
      font-weight: 600;
      color: #1a6b63;
      font-size: 0.85rem;
    }

    .role-option:hover label {
      border-color: #1a6b63;
      background: rgba(26, 107, 99, 0.05);
    }

    .role-option input[type="radio"]:checked + label {
      border-color: #1a6b63;
      background: rgba(26, 107, 99, 0.1);
      color: #1a6b63;
    }

    .role-icon {
      width: 32px;
      height: 32px;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .role-icon svg {
      width: 24px;
      height: 24px;
      stroke: currentColor;
      fill: none;
    }

    .login-options {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin: 1rem 0;
      font-size: 0.85rem;
      gap: 1rem;
    }

    .remember-me {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      cursor: pointer;
      user-select: none;
      color: #6c757d;
    }

    .remember-me input[type="checkbox"] {
      width: 16px;
      height: 16px;
      cursor: pointer;
      accent-color: #1a6b63;
    }

    .forgot-link {
      color: #1a6b63;
      font-weight: 600;
      text-decoration: none;
      transition: color 0.3s ease;
    }

    .forgot-link:hover {
      color: #158170;
    }

    /* Navigation buttons row */
    .step-nav {
      display: flex;
      gap: 0.75rem;
      margin-top: 1.25rem;
    }

    .btn-back {
      flex: 0 0 auto;
      padding: 0.75rem 1.25rem;
      background: #f1f3f5;
      color: #495057;
      border: none;
      border-radius: 8px;
      font-weight: 600;
      font-size: 0.9rem;
      cursor: pointer;
      transition: all 0.3s ease;
      display: flex;
      align-items: center;
      gap: 0.4rem;
    }

    .btn-back:hover {
      background: #e9ecef;
    }

    .btn-next {
      flex: 1;
      padding: 0.75rem;
      background: linear-gradient(135deg, #1a6b63 0%, #158170 100%);
      color: #ffffff;
      border: none;
      border-radius: 8px;
      font-weight: 600;
      font-size: 0.95rem;
      cursor: pointer;
      transition: all 0.3s ease;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 0.4rem;
    }

    .btn-next:hover {
      transform: translateY(-2px);
      box-shadow: 0 8px 20px rgba(26, 107, 99, 0.25);
    }

    .submit-btn {
      flex: 1;
      padding: 0.75rem;
      background: linear-gradient(135deg, #FF7A45 0%, #ff5a1f 100%);
      color: #ffffff;
      border: none;
      border-radius: 8px;
      font-weight: 600;
      font-size: 0.95rem;
      cursor: pointer;
      transition: all 0.3s ease;
    }

    .submit-btn:hover:not(:disabled) {
      transform: translateY(-2px);
      box-shadow: 0 8px 20px rgba(255, 122, 69, 0.3);
    }

    .submit-btn:disabled {
      opacity: 0.6;
      cursor: not-allowed;
    }

    .alert {
      padding: 1rem 1.25rem;
      border-radius: 8px;
      margin-bottom: 1.25rem;
      animation: slideInDown 0.4s ease-out;
      display: flex;
      align-items: center;
      gap: 0.75rem;
    }

    .alert-error {
      background: rgba(255, 107, 107, 0.1);
      color: #c92a2a;
      border: 1px solid #ff6b6b;
    }

    .alert svg {
      width: 20px;
      height: 20px;
      flex-shrink: 0;
    }

    .auth-footer {
      text-align: center;
      margin-top: 1.5rem;
      padding-top: 1.25rem;
      border-top: 1px solid #e9ecef;
      font-size: 0.85rem;
      color: #6c757d;
    }

    .auth-footer a {
      color: #1a6b63;
      font-weight: 600;
      text-decoration: none;
      transition: color 0.3s ease;
    }

    .auth-footer a:hover {
      color: #158170;
    }

    /* Selected role summary badge on step 2 */
    .selected-role-badge {
      display: inline-flex;
      align-items: center;
      gap: 0.5rem;
      background: rgba(26, 107, 99, 0.08);
      border: 1px solid rgba(26, 107, 99, 0.2);
      color: #1a6b63;
      border-radius: 20px;
      padding: 0.3rem 0.9rem;
      font-size: 0.8rem;
      font-weight: 600;
      margin-bottom: 1.25rem;
      cursor: pointer;
      transition: background 0.2s;
    }

    .selected-role-badge:hover {
      background: rgba(26, 107, 99, 0.14);
    }

    .selected-role-badge svg {
      width: 13px;
      height: 13px;
      stroke: #1a6b63;
      fill: none;
    }

    @keyframes slideInRight {
      from { opacity: 0; transform: translateX(30px); }
      to   { opacity: 1; transform: translateX(0); }
    }

    @keyframes slideInDown {
      from { opacity: 0; transform: translateY(-10px); }
      to   { opacity: 1; transform: translateY(0); }
    }

    @media (max-width: 1200px) {
      .login-container {
        padding: 3rem 2rem 3rem 0;
        min-height: auto;
        flex-wrap: wrap;
        gap: 1.5rem;
      }
      .login-info-section {
        flex: 1 1 300px;
        padding: 2rem 2rem 2rem 160px;
      }
      .login-form-section {
        flex: 1 1 380px;
        max-width: 480px;
        margin: 0 auto;
      }
    }

    @media (max-width: 768px) {
      .login-page {
        padding: 1rem;
      }

      .login-container {
        flex-direction: column;
        padding: 2rem 1.5rem;
        border-radius: 16px;
        gap: 1.5rem;
      }

      .login-container::before {
        width: 100%;
        height: 100px;
        top: 0;
        bottom: auto;
      }

      .login-info-section {
        flex: none;
        width: 100%;
        padding: 120px 1.5rem 1.5rem 1.5rem;
        text-align: center;
      }

      .login-form-section {
        flex: none;
        width: 100%;
        padding: 2rem 1.5rem;
      }

      .role-options {
        grid-template-columns: 1fr;
      }

      .role-option label {
        flex-direction: row;
        gap: 1rem;
        text-align: left;
        justify-content: flex-start;
        padding: 1rem;
      }

      .login-options {
        flex-direction: column;
        align-items: flex-start;
      }
    }

    @media (max-width: 480px) {
      .login-form-section {
        padding: 1.5rem 1rem;
      }

      .form-header h2 {
        font-size: 1.3rem;
      }

      .login-info-section {
        padding: 100px 1rem 1rem 1rem;
      }
    }
  `;

  const roleLabels = {
    patient: 'Care Seeker',
    doctor: 'Doctor',
    admin: 'Admin',
  };

  const validateStep1 = () => true; // Role always selected (default: patient)

  const validateStep2 = () => {
    const newErrors = {};

    if (!email) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = 'Please enter a valid email';
    }

    if (!password) {
      newErrors.password = 'Password is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (step === 1 && validateStep1()) {
      setStep(2);
    }
  };

  const handleBack = () => {
    setGeneralError('');
    setErrors({});
    setStep(1);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setGeneralError('');

    if (!validateStep2()) {
      return;
    }

    setLoading(true);

    try {
      const response = await authAPI.login(email, password);

      console.log('Login response:', response);

      // Handle response format: { success: true, message: "...", data: { token, user } }
      let token = null;
      let user = null;

      if (response?.data?.token && response?.data?.user) {
        token = response.data.token;
        user = response.data.user;
      } else if (response?.token && response?.user) {
        token = response.token;
        user = response.user;
      } else {
        throw new Error(response?.message || 'Invalid response format');
      }

      if (token && user) {
        // Use context login function
        contextLogin({
          id: user.id || user._id,
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          role: user.role,
        }, token);

        if (rememberMe) {
          localStorage.setItem('rememberedEmail', email);
        } else {
          localStorage.removeItem('rememberedEmail');
        }

        // Redirect based on role
        setTimeout(() => {
          const userRole = user.role;
          if (userRole === 'patient') {
            navigate('/patient-dashboard');
          } else if (userRole === 'doctor') {
            navigate('/doctor-dashboard');
          } else if (userRole === 'admin') {
            navigate('/admin-dashboard');
          } else {
            navigate('/');
          }
        }, 500);
      }
    } catch (error) {
      setGeneralError(error.message || 'Login failed. Please check your credentials.');
      console.error('Login error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <style>{loginStyles}</style>
      <Header />
      <div className="login-page">
        <div className="login-container">
          {/* Left Info Section */}
          <div className="login-info-section">
            <div className="info-content">
              <h2>Welcome Back!</h2>
              <p>
                Sign in to access your medical records, book appointments, and
                manage your healthcare with HealNow.
              </p>

              <ul className="info-list">
                <li>
                  <div className="check-icon">
                    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M5 13l4 4L19 7" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                  <span>Secure access to health records</span>
                </li>
                <li>
                  <div className="check-icon">
                    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M5 13l4 4L19 7" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                  <span>Book appointments instantly</span>
                </li>
                <li>
                  <div className="check-icon">
                    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M5 13l4 4L19 7" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                  <span>Connect with expert doctors</span>
                </li>
                <li>
                  <div className="check-icon">
                    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M5 13l4 4L19 7" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                  <span>Manage prescriptions online</span>
                </li>
              </ul>
            </div>
          </div>

          {/* White Form Card — fixed inside green container, no scroll */}
          <div className="login-form-section">
            <div className="form-header">
              <h2>Sign In</h2>
              <p>Access your HealNow account</p>
            </div>

            {/* Step Indicator */}
            <div className="step-indicator">
              <div className={`step-dot ${step === 1 ? 'active' : 'completed'}`}>
                {step > 1 ? (
                  <svg viewBox="0 0 24 24" fill="none" width="14" height="14">
                    <path d="M5 13l4 4L19 7" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                ) : '1'}
              </div>
              <div className={`step-line ${step > 1 ? 'completed' : ''}`} />
              <div className={`step-dot ${step === 2 ? 'active' : ''}`}>2</div>
            </div>
            <div className="step-labels">
              <span className={`step-label-item ${step === 1 ? 'active' : ''}`}>Select Role</span>
              <span className={`step-label-item ${step === 2 ? 'active' : ''}`}>Credentials</span>
            </div>

            {/* STEP 1: Role Selection */}
            {step === 1 && (
              <div className="step-panel">
                <div className="form-group">
                  <label className="role-label">I am signing in as:</label>
                  <div className="role-options">
                    <div className="role-option">
                      <input
                        type="radio"
                        id="patient"
                        name="role"
                        value="patient"
                        checked={role === 'patient'}
                        onChange={(e) => setRole(e.target.value)}
                      />
                      <label htmlFor="patient">
                        <span className="role-icon">
                          <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2M12 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                        </span>
                        <span>Care Seeker</span>
                      </label>
                    </div>
                    <div className="role-option">
                      <input
                        type="radio"
                        id="doctor"
                        name="role"
                        value="doctor"
                        checked={role === 'doctor'}
                        onChange={(e) => setRole(e.target.value)}
                      />
                      <label htmlFor="doctor">
                        <span className="role-icon">
                          <img src="data:image/webp;base64,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" alt="Doctor" style={{ width: '28px', height: '28px', filter: 'invert(31%) sepia(50%) saturate(500%) hue-rotate(130deg) brightness(90%) contrast(90%)', objectFit: 'contain' }} />
                        </span>
                        <span>Doctor</span>
                      </label>
                    </div>
                    <div className="role-option">
                      <input
                        type="radio"
                        id="admin"
                        name="role"
                        value="admin"
                        checked={role === 'admin'}
                        onChange={(e) => setRole(e.target.value)}
                      />
                      <label htmlFor="admin">
                        <span className="role-icon">
                          <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <rect x="3" y="11" width="18" height="11" rx="2" ry="2" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            <path d="M7 11V7a5 5 0 0 1 10 0v4" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                        </span>
                        <span>Admin</span>
                      </label>
                    </div>
                  </div>
                </div>

                <div className="step-nav">
                  <button type="button" className="btn-next" onClick={handleNext}>
                    Next
                    <svg viewBox="0 0 24 24" fill="none" width="16" height="16">
                      <path d="M9 18l6-6-6-6" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </button>
                </div>

                <div className="auth-footer">
                  Don't have an account?
                  <br />
                  <Link to="/register">Create account here</Link>
                </div>
              </div>
            )}

            {/* STEP 2: Email & Password */}
            {step === 2 && (
              <div className="step-panel">
                {/* Show selected role as a clickable badge */}
                <div
                  className="selected-role-badge"
                  onClick={handleBack}
                  title="Click to change role"
                >
                  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M15 18l-6-6 6-6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  Signing in as: <strong>{roleLabels[role]}</strong>
                </div>

                {generalError && (
                  <div className="alert alert-error">
                    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"/>
                      <path d="M12 8v4M12 16h.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                    </svg>
                    <span>{generalError}</span>
                  </div>
                )}

                <form onSubmit={handleSubmit}>
                  {/* Email Field */}
                  <Input
                    label="Email Address"
                    type="email"
                    placeholder="your@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    error={errors.email}
                    icon={
                      <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M22 6l-10 7L2 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    }
                    required
                  />

                  {/* Password Field */}
                  <Input
                    label="Password"
                    type="password"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    error={errors.password}
                    icon={
                      <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <rect x="3" y="11" width="18" height="11" rx="2" ry="2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M7 11V7a5 5 0 0 1 10 0v4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    }
                    required
                  />

                  {/* Remember Me & Forgot Password */}
                  <div className="login-options">
                    <label className="remember-me">
                      <input
                        type="checkbox"
                        checked={rememberMe}
                        onChange={(e) => setRememberMe(e.target.checked)}
                      />
                      Remember me
                    </label>
                    <a href="#forgot" className="forgot-link">
                      Forgot Password?
                    </a>
                  </div>

                  {/* Back + Submit */}
                  <div className="step-nav">
                    <button type="button" className="btn-back" onClick={handleBack}>
                      <svg viewBox="0 0 24 24" fill="none" width="15" height="15">
                        <path d="M15 18l-6-6 6-6" stroke="#495057" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                      Back
                    </button>
                    <button type="submit" className="submit-btn" disabled={loading}>
                      {loading ? 'Signing In...' : 'Sign In'}
                    </button>
                  </div>
                </form>

                <div className="auth-footer">
                  Don't have an account?
                  <br />
                  <Link to="/register">Create account here</Link>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Login;