import React from 'react';
import { Link } from 'react-router-dom';

const HealNowLogo = ({ size = 'md' }) => {
  return (
    <svg
      width={size === 'md' ? 50 : 40}
      height={size === 'md' ? 50 : 40}
      viewBox="0 0 100 100"
      xmlns="http://www.w3.org/2000/svg"
      style={{ display: 'inline-block' }}
    >
      <defs>
        <linearGradient id="heartGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style={{ stopColor: '#FF7A45', stopOpacity: 1 }} />
          <stop offset="100%" style={{ stopColor: '#FF6B35', stopOpacity: 1 }} />
        </linearGradient>
      </defs>

      <path
        d="M50 85 C20 70, 5 55, 5 40 C5 25, 15 15, 25 15 C35 15, 45 25, 50 32 C55 25, 65 15, 75 15 C85 15, 95 25, 95 40 C95 55, 80 70, 50 85 Z"
        fill="url(#heartGradient)"
      />

      <path
        d="M 25 45 L 35 45 L 38 35 L 42 55 L 45 50 L 60 50 L 65 40 L 75 45 L 85 45"
        stroke="white"
        strokeWidth="2.5"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      <g transform="translate(70, 20)">
        <rect x="-8" y="-8" width="16" height="16" fill="white" rx="2" />
        <line x1="-4" y1="0" x2="4" y2="0" stroke="#FF7A45" strokeWidth="2" strokeLinecap="round" />
        <line x1="0" y1="-4" x2="0" y2="4" stroke="#FF7A45" strokeWidth="2" strokeLinecap="round" />
      </g>
    </svg>
  );
};

// SVG Icon Components
const PhoneIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const EmailIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="2" y="4" width="20" height="16" rx="2" stroke="currentColor" strokeWidth="2"/>
    <path d="M2 6l10 7.5L22 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const LocationIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <circle cx="12" cy="10" r="3" stroke="currentColor" strokeWidth="2"/>
  </svg>
);

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerStyles = `
    .footer {
      background: linear-gradient(135deg, #1a6b63 0%, #0f4440 100%);
      color: white;
      padding: 60px 0 30px;
      margin-top: 100px;
    }

    .footer-content {
      position: relative;
      z-index: 1;
    }

    .footer-grid {
      display: grid;
      grid-template-columns: 1.5fr 1fr 1fr 1.5fr;
      gap: 3rem;
      margin-bottom: 3rem;
      max-width: 1400px;
      margin-left: auto;
      margin-right: auto;
      padding: 0 40px;
    }

    .footer-section {
      animation: fadeIn 0.8s ease-out;
    }

    .footer-section h4 {
      color: #ffffff;
      margin-bottom: 1.5rem;
      font-size: 1.1rem;
      font-weight: 700;
    }

    .footer-logo-wrapper {
      display: flex;
      align-items: center;
      gap: 0.75rem;
      color: #ffffff;
      text-decoration: none;
      margin-bottom: 1rem;
      font-weight: 700;
      font-size: 1.4rem;
      transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    }

    .footer-logo-wrapper:hover {
      transform: translateY(-2px);
    }

    .footer-logo-text {
      display: flex;
      flex-direction: column;
      gap: 0.2rem;
    }

    .footer-logo-name {
      font-size: 1.2rem;
      color: #ffffff;
      font-weight: 800;
      line-height: 1;
    }

    .footer-logo-tagline {
      font-size: 0.6rem;
      color: rgba(255, 255, 255, 0.8);
      font-weight: 600;
      text-transform: uppercase;
      letter-spacing: 0.6px;
    }

    .footer-section > p {
      color: rgba(255, 255, 255, 0.75);
      font-size: 0.95rem;
      line-height: 1.8;
    }

    .footer-links {
      list-style: none;
      padding: 0;
    }

    .footer-links li {
      margin-bottom: 0.75rem;
    }

    .footer-links a {
      color: rgba(255, 255, 255, 0.75);
      transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
      font-weight: 500;
      text-decoration: none;
      font-size: 0.95rem;
    }

    .footer-links a:hover {
      color: #FF7A45;
      transform: translateX(4px);
    }

    .contact-info {
      display: flex;
      flex-direction: column;
      gap: 1.5rem;
    }

    .contact-item {
      display: flex;
      align-items: flex-start;
      gap: 1rem;
      color: rgba(255, 255, 255, 0.75);
      transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
      text-decoration: none;
      font-size: 0.95rem;
    }

    .contact-item:hover {
      color: #FF7A45;
    }

    .contact-icon {
      display: flex;
      align-items: center;
      justify-content: center;
      min-width: 24px;
      height: 24px;
      flex-shrink: 0;
      color: #FF7A45;
    }

    .contact-item a {
      color: rgba(255, 255, 255, 0.75);
      transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
      text-decoration: none;
    }

    .contact-item a:hover {
      color: #FF7A45;
    }

    .footer-bottom {
      border-top: 1px solid rgba(255, 255, 255, 0.1);
      padding-top: 2rem;
      display: flex;
      justify-content: space-between;
      align-items: center;
      flex-wrap: wrap;
      gap: 2rem;
      max-width: 1400px;
      margin: 0 auto;
      padding-left: 40px;
      padding-right: 40px;
    }

    .footer-bottom p {
      color: rgba(255, 255, 255, 0.6);
      font-size: 0.9rem;
      margin: 0;
    }

    .footer-links-bottom {
      display: flex;
      gap: 2rem;
    }

    .footer-links-bottom a {
      color: rgba(255, 255, 255, 0.6);
      font-size: 0.9rem;
      transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
      text-decoration: none;
    }

    .footer-links-bottom a:hover {
      color: #FF7A45;
    }

    @keyframes fadeIn {
      from {
        opacity: 0;
        transform: translateY(20px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }

    @media (max-width: 768px) {
      .footer {
        padding: 3rem 0 1.5rem;
        margin-top: 4rem;
      }

      .footer-grid {
        grid-template-columns: 1fr;
        gap: 2rem;
      }

      .footer-bottom {
        flex-direction: column;
        align-items: flex-start;
        gap: 1.5rem;
      }

      .footer-links-bottom {
        flex-wrap: wrap;
        gap: 1rem;
      }

      .footer-grid,
      .footer-bottom {
        padding: 0 20px;
      }
    }
  `;

  return (
    <>
      <style>{footerStyles}</style>
      <footer className="footer">
        <div className="footer-content">
          <div className="footer-grid">
            {/* Company Info */}
            <div className="footer-section">
              <Link to="/" className="footer-logo-wrapper">
                <HealNowLogo size="md" />
                <div className="footer-logo-text">
                  <div className="footer-logo-name">HealNow</div>
                  <div className="footer-logo-tagline">Healthcare</div>
                </div>
              </Link>
              <p>Professional healthcare management system connecting patients with expert medical professionals. Your health is our priority.</p>
            </div>

            {/* Quick Links */}
            <div className="footer-section">
              <h4>Quick Links</h4>
              <ul className="footer-links">
                <li><Link to="/">Home</Link></li>
                <li><a href="#services">Services</a></li>
                <li><a href="#doctors">Doctors</a></li>
                <li><a href="#contact">Contact</a></li>
              </ul>
            </div>

            {/* Services */}
            <div className="footer-section">
              <h4>Services</h4>
              <ul className="footer-links">
                <li><a href="#services">Patient Management</a></li>
                <li><a href="#services">Doctor Appointments</a></li>
                <li><a href="#services">Medical Records</a></li>
                <li><a href="#services">Billing System</a></li>
              </ul>
            </div>

            {/* Contact Info */}
            <div className="footer-section">
              <h4>Contact Us</h4>
              <div className="contact-info">
                <div className="contact-item">
                  <span className="contact-icon">
                    <PhoneIcon />
                  </span>
                  <a href="tel:+919876543210">+91 9876543210</a>
                </div>
                <div className="contact-item">
                  <span className="contact-icon">
                    <EmailIcon />
                  </span>
                  <a href="mailto:support@healnow.com">support@healnow.com</a>
                </div>
                <div className="contact-item">
                  <span className="contact-icon">
                    <LocationIcon />
                  </span>
                  <span>245,Medical Plaza,Coimbatore.</span>
                </div>
              </div>
            </div>
          </div>

          {/* Footer Bottom */}
          <div className="footer-bottom">
            <p>&copy; {currentYear} HealNow Healthcare. All rights reserved. Your Health Our Priority...</p>
            <div className="footer-links-bottom">
              <a href="#privacy">Privacy Policy</a>
              <a href="#terms">Terms of Service</a>
              <a href="#security">Security</a>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;