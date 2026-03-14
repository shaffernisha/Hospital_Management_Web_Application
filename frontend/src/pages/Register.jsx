import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Input from '../components/Input';
import Button from '../components/Button';
import { authAPI } from '../api';
import { useAuth } from '../hooks/useAuth';
import Header from '../components/Header';
import Footer from '../components/Footer';

const Register = () => {
  const navigate = useNavigate();
  const { login: contextLogin } = useAuth();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [generalError, setGeneralError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [dateOfBirth, setDateOfBirth] = useState('');
  const [gender, setGender] = useState('');
  const [bloodGroup, setBloodGroup] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [emergencyContactName, setEmergencyContactName] = useState('');
  const [emergencyContactPhone, setEmergencyContactPhone] = useState('');

  const [errors, setErrors] = useState({});

  const registerStyles = `
    .register-page {
      min-height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
      background: #f5f5f5;
      padding: 2rem;
    }

    .register-container {
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
      min-height: 700px;
      gap: 2rem;
    }

    .register-container::before {
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

    .register-info-section {
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

    .register-form-section {
      position: relative;
      flex: 0 0 470px;
      background: #ffffff;
      border-radius: 20px;
      padding: 2rem 2.5rem;
      z-index: 2;
      box-shadow: 0 10px 40px rgba(0, 0, 0, 0.15);
      animation: slideInRight 0.6s ease-out;
      overflow: hidden;
      align-self: center;
    }

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
      flex-shrink: 0;
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
      transition: background 0.4s ease;
    }

    .step-line.completed {
      background: #FF7A45;
    }

    .step-labels {
      display: flex;
      justify-content: space-between;
      margin-bottom: 1.25rem;
      font-size: 0.7rem;
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

    .form-header {
      margin-bottom: 1rem;
    }

    .form-header h2 {
      font-size: 1.45rem;
      margin-bottom: 0.3rem;
      color: #1a6b63;
      font-weight: 700;
    }

    .form-header p {
      color: #6c757d;
      font-size: 0.85rem;
    }

    .form-group { margin-bottom: 0.9rem; }

    .form-row {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 0.85rem;
    }

    .form-step {
      animation: fadeSlide 0.35s ease-out;
    }

    @keyframes fadeSlide {
      from { opacity: 0; transform: translateX(16px); }
      to   { opacity: 1; transform: translateX(0); }
    }

    .form-step.back {
      animation: fadeSlideBack 0.35s ease-out;
    }

    @keyframes fadeSlideBack {
      from { opacity: 0; transform: translateX(-16px); }
      to   { opacity: 1; transform: translateX(0); }
    }

    .step-title {
      font-size: 1rem;
      margin-bottom: 0.85rem;
      color: #1a6b63;
      font-weight: 600;
    }

    .form-actions {
      display: flex;
      gap: 0.75rem;
      margin-top: 1rem;
    }

    .btn-back {
      padding: 0.7rem 1.1rem;
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

    .btn-back:hover { background: #e9ecef; }
    .btn-back svg { width: 15px; height: 15px; }

    .btn-next {
      flex: 1;
      padding: 0.7rem 1.1rem;
      background: linear-gradient(135deg, #1a6b63 0%, #158170 100%);
      color: #ffffff;
      border: none;
      border-radius: 8px;
      font-weight: 600;
      font-size: 0.9rem;
      cursor: pointer;
      transition: all 0.3s ease;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 0.4rem;
    }

    .btn-next:hover:not(:disabled) {
      transform: translateY(-2px);
      box-shadow: 0 8px 20px rgba(26, 107, 99, 0.3);
    }

    .btn-next svg { width: 15px; height: 15px; }

    .btn-submit {
      flex: 1;
      padding: 0.7rem 1.1rem;
      background: linear-gradient(135deg, #FF7A45 0%, #ff5a1f 100%);
      color: #ffffff;
      border: none;
      border-radius: 8px;
      font-weight: 600;
      font-size: 0.9rem;
      cursor: pointer;
      transition: all 0.3s ease;
    }

    .btn-submit:hover:not(:disabled) {
      transform: translateY(-2px);
      box-shadow: 0 8px 20px rgba(255, 122, 69, 0.3);
    }

    .btn-submit:disabled { opacity: 0.6; cursor: not-allowed; }

    .success-message {
      background: rgba(81, 207, 102, 0.1);
      color: #2f9e44;
      border: 1px solid #51cf66;
      padding: 0.8rem 1rem;
      border-radius: 8px;
      margin-bottom: 1rem;
      animation: slideInDown 0.4s ease-out;
      display: flex;
      align-items: center;
      gap: 0.75rem;
      font-size: 0.9rem;
    }

    .success-message svg { width: 18px; height: 18px; flex-shrink: 0; }

    .alert {
      padding: 0.8rem 1rem;
      border-radius: 8px;
      margin-bottom: 1rem;
      animation: slideInDown 0.4s ease-out;
      display: flex;
      align-items: center;
      gap: 0.75rem;
      font-size: 0.9rem;
    }

    .alert-error { background: rgba(255, 107, 107, 0.1); color: #c92a2a; border: 1px solid #ff6b6b; }
    .alert svg { width: 18px; height: 18px; flex-shrink: 0; }

    .auth-footer {
      text-align: center;
      margin-top: 1rem;
      padding-top: 1rem;
      border-top: 1px solid #e9ecef;
      font-size: 0.82rem;
      color: #6c757d;
    }

    .auth-footer a { color: #1a6b63; font-weight: 600; text-decoration: none; transition: color 0.3s ease; }
    .auth-footer a:hover { color: #158170; }

    .custom-select {
      width: 100%;
      padding: 0.75rem 1rem;
      border: 2px solid #e9ecef;
      border-radius: 8px;
      font-size: 0.95rem;
      background: #ffffff;
      color: #1a6b63;
      cursor: pointer;
      font-family: inherit;
      transition: all 0.3s ease;
    }

    .custom-select:focus { outline: none; border-color: #1a6b63; }

    .field-label { font-weight: 600; color: #1a6b63; display: block; margin-bottom: 0.4rem; font-size: 0.88rem; }

    @keyframes slideInRight {
      from { opacity: 0; transform: translateX(30px); }
      to   { opacity: 1; transform: translateX(0); }
    }

    @keyframes slideInDown {
      from { opacity: 0; transform: translateY(-10px); }
      to   { opacity: 1; transform: translateY(0); }
    }

    @media (max-width: 1200px) {
      .register-container {
        padding: 3rem 2rem 3rem 0;
        min-height: auto;
        flex-wrap: wrap;
        gap: 1.5rem;
      }
      .register-info-section {
        flex: 1 1 300px;
        padding: 2rem 2rem 2rem 160px;
      }
      .register-form-section {
        flex: 1 1 400px;
        max-width: 500px;
        margin: 0 auto;
      }
    }

    @media (max-width: 768px) {
      .register-page { padding: 1rem; }
      .register-container { padding: 2rem 1.5rem; border-radius: 16px; flex-direction: column; gap: 1.5rem; }
      .register-container::before { width: 100%; height: 100px; top: 0; bottom: auto; }
      .register-info-section { flex: none; width: 100%; padding: 120px 1.5rem 1.5rem 1.5rem; text-align: center; }
      .register-form-section { flex: none; width: 100%; padding: 1.5rem; }
      .form-row { grid-template-columns: 1fr; }
      .form-actions { flex-direction: column; }
    }

    @media (max-width: 480px) {
      .register-form-section { padding: 1.25rem 1rem; }
      .form-header h2 { font-size: 1.25rem; }
      .register-info-section { padding: 100px 1rem 1rem 1rem; }
    }
  `;

  const validateStep1 = () => {
    const newErrors = {};
    if (!firstName.trim()) newErrors.firstName = 'First name is required';
    if (!lastName.trim()) newErrors.lastName = 'Last name is required';
    if (!email) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = 'Please enter a valid email';
    }
    if (!phone) {
      newErrors.phone = 'Phone is required';
    } else if (!/^\d{10}$/.test(phone.replace(/\D/g, ''))) {
      newErrors.phone = 'Phone must be 10 digits';
    }
    if (!password) {
      newErrors.password = 'Password is required';
    } else if (password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    } else if (!/[A-Z]/.test(password) || !/[a-z]/.test(password) || !/[0-9]/.test(password)) {
      newErrors.password = 'Password must contain uppercase, lowercase, and number';
    }
    if (!confirmPassword) {
      newErrors.confirmPassword = 'Please confirm password';
    } else if (password !== confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateStep2 = () => {
    const newErrors = {};
    if (!dateOfBirth) newErrors.dateOfBirth = 'Date of birth is required';
    if (!gender) newErrors.gender = 'Gender is required';
    if (!bloodGroup) newErrors.bloodGroup = 'Blood group is required';
    if (!address.trim()) newErrors.address = 'Address is required';
    if (!city.trim()) newErrors.city = 'City is required';
    if (!emergencyContactName.trim()) newErrors.emergencyContactName = 'Emergency contact name is required';
    if (!emergencyContactPhone) {
      newErrors.emergencyContactPhone = 'Emergency contact phone is required';
    } else if (!/^\d{10}$/.test(emergencyContactPhone.replace(/\D/g, ''))) {
      newErrors.emergencyContactPhone = 'Phone must be 10 digits';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNextStep = () => {
    if (validateStep1()) setStep(2);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setGeneralError('');
    if (!validateStep2()) return;
    setLoading(true);
    try {
      const userData = { firstName, lastName, email, phone, password, role: 'patient', dateOfBirth, gender, bloodGroup, address, city, emergencyContactName, emergencyContactPhone };
      const response = await authAPI.register(userData);
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
        contextLogin({ id: user.id || user._id, firstName: user.firstName, lastName: user.lastName, email: user.email, role: user.role || 'patient' }, token);
        setSuccessMessage('Registration successful! Redirecting...');
        setTimeout(() => navigate('/patient-dashboard'), 2000);
      }
    } catch (error) {
      setGeneralError(error.message || 'Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <style>{registerStyles}</style>
      <Header />
      <div className="register-page">
        <div className="register-container">
          <div className="register-info-section">
            <div className="info-content">
              <h2>Care Seeker Registration</h2>
              <p>Join HealNow today and experience seamless healthcare management. Get instant access to quality medical services and expert doctors.</p>
              <ul className="info-list">
                <li><div className="check-icon"><svg viewBox="0 0 24 24" fill="none"><path d="M5 13l4 4L19 7" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"/></svg></div><span>Quick and easy registration</span></li>
                <li><div className="check-icon"><svg viewBox="0 0 24 24" fill="none"><path d="M5 13l4 4L19 7" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"/></svg></div><span>Secure and private data protection</span></li>
                <li><div className="check-icon"><svg viewBox="0 0 24 24" fill="none"><path d="M5 13l4 4L19 7" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"/></svg></div><span>24/7 access to healthcare services</span></li>
                <li><div className="check-icon"><svg viewBox="0 0 24 24" fill="none"><path d="M5 13l4 4L19 7" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"/></svg></div><span>Expert medical consultation</span></li>
                <li><div className="check-icon"><svg viewBox="0 0 24 24" fill="none"><path d="M5 13l4 4L19 7" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"/></svg></div><span>Dedicated support team</span></li>
              </ul>
            </div>
          </div>

          <div className="register-form-section">
            <div className="form-header">
              <h2>Create Your Account</h2>
              <p>Register as a care seeker to access healthcare services</p>
            </div>

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
              <span className={`step-label-item ${step === 1 ? 'active' : ''}`}>Basic Info</span>
              <span className={`step-label-item ${step === 2 ? 'active' : ''}`}>Medical Info</span>
            </div>

            {generalError && (
              <div className="alert alert-error">
                <svg viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"/><path d="M12 8v4M12 16h.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/></svg>
                <span>{generalError}</span>
              </div>
            )}

            {successMessage && (
              <div className="success-message">
                <svg viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"/><path d="M8 12l2 2 4-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                <span>{successMessage}</span>
              </div>
            )}

            <form onSubmit={step === 1 ? (e) => { e.preventDefault(); handleNextStep(); } : handleSubmit}>
              {step === 1 && (
                <div className="form-step">
                  <h3 className="step-title">Step 1: Basic Information</h3>
                  <div className="form-row">
                    <Input label="First Name" type="text" placeholder="John" value={firstName} onChange={(e) => setFirstName(e.target.value)} error={errors.firstName} required/>
                    <Input label="Last Name" type="text" placeholder="Doe" value={lastName} onChange={(e) => setLastName(e.target.value)} error={errors.lastName} required/>
                  </div>
                  <Input label="Email Address" type="email" placeholder="yourname@example.com" value={email} onChange={(e) => setEmail(e.target.value)} error={errors.email} required/>
                  <Input label="Phone Number" type="tel" placeholder="9876543210" value={phone} onChange={(e) => setPhone(e.target.value.replace(/\D/g, '').slice(0, 10))} error={errors.phone} required/>
                  <Input label="Password" type="password" placeholder="Min 6 chars with uppercase, lowercase, number" value={password} onChange={(e) => setPassword(e.target.value)} error={errors.password} required/>
                  <Input label="Confirm Password" type="password" placeholder="Re-enter your password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} error={errors.confirmPassword} required/>
                  <div className="form-actions">
                    <button type="submit" className="btn-next">
                      <span>Continue</span>
                      <svg viewBox="0 0 24 24" fill="none"><path d="M5 12h14M12 5l7 7-7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                    </button>
                  </div>
                </div>
              )}

              {step === 2 && (
                <div className="form-step">
                  <h3 className="step-title">Step 2: Medical Information</h3>
                  <div className="form-row">
                    <Input label="Date of Birth" type="date" value={dateOfBirth} onChange={(e) => setDateOfBirth(e.target.value)} error={errors.dateOfBirth} required/>
                    <div className="form-group">
                      <label className="field-label">Gender *</label>
                      <select value={gender} onChange={(e) => setGender(e.target.value)} className="custom-select">
                        <option value="">Select Gender</option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                        <option value="other">Other</option>
                      </select>
                      {errors.gender && <span style={{color:'#c92a2a',fontSize:'0.78rem'}}>{errors.gender}</span>}
                    </div>
                  </div>
                  <div className="form-group">
                    <label className="field-label">Blood Group *</label>
                    <select value={bloodGroup} onChange={(e) => setBloodGroup(e.target.value)} className="custom-select">
                      <option value="">Select Blood Group</option>
                      <option value="A+">A+</option><option value="A-">A-</option>
                      <option value="B+">B+</option><option value="B-">B-</option>
                      <option value="AB+">AB+</option><option value="AB-">AB-</option>
                      <option value="O+">O+</option><option value="O-">O-</option>
                    </select>
                    {errors.bloodGroup && <span style={{color:'#c92a2a',fontSize:'0.78rem'}}>{errors.bloodGroup}</span>}
                  </div>
                  <div className="form-row">
                    <Input label="Address" type="text" placeholder="123 Main Street" value={address} onChange={(e) => setAddress(e.target.value)} error={errors.address} required/>
                    <Input label="City" type="text" placeholder="Chennai" value={city} onChange={(e) => setCity(e.target.value)} error={errors.city} required/>
                  </div>
                  <div className="form-row">
                    <Input label="Emergency Contact Name" type="text" placeholder="Jane Doe" value={emergencyContactName} onChange={(e) => setEmergencyContactName(e.target.value)} error={errors.emergencyContactName} required/>
                    <Input label="Emergency Contact Phone" type="tel" placeholder="9876543211" value={emergencyContactPhone} onChange={(e) => setEmergencyContactPhone(e.target.value.replace(/\D/g, '').slice(0, 10))} error={errors.emergencyContactPhone} required/>
                  </div>
                  <div className="form-actions">
                    <button type="button" className="btn-back" onClick={() => { setStep(1); setErrors({}); setGeneralError(''); }}>
                      <svg viewBox="0 0 24 24" fill="none"><path d="M19 12H5M12 19l-7-7 7-7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                      <span>Back</span>
                    </button>
                    <button type="submit" className="btn-submit" disabled={loading}>
                      {loading ? 'Creating Account...' : 'Create Account'}
                    </button>
                  </div>
                </div>
              )}
            </form>

            <div className="auth-footer">
              Already have an account?<br/>
              <Link to="/login">Sign in here</Link>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Register;