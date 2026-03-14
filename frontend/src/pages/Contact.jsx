import React, { useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

const Contact = () => {
  const [formData, setFormData] = useState({ name: '', email: '', subject: 'General Inquiry', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
    setFormData({ name: '', email: '', subject: 'General Inquiry', message: '' });
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap');

        .contact-page {
          font-family: 'Plus Jakarta Sans', sans-serif;
          color: #1a1a2e;
          background: #f5f8f8;
          min-height: 100vh;
        }

        /* HERO */
        .contact-hero {
          position: relative;
          background: linear-gradient(135deg, #0d4f4a 0%, #1a6b63 50%, #0f5c55 100%);
          padding: 5rem 2rem 4rem;
          text-align: center;
          overflow: hidden;
        }

        .contact-hero::before {
          content: '';
          position: absolute;
          inset: 0;
          background: url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.04'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
        }

        .contact-hero-badge {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          background: rgba(255,255,255,0.12);
          border: 1px solid rgba(255,255,255,0.2);
          color: #ffffff;
          padding: 0.4rem 1rem;
          border-radius: 999px;
          font-size: 0.82rem;
          font-weight: 600;
          margin-bottom: 1.5rem;
          backdrop-filter: blur(10px);
        }

        .contact-hero-badge::before {
          content: '';
          width: 8px;
          height: 8px;
          background: #4ade80;
          border-radius: 50%;
          animation: pulse-dot 2s infinite;
        }

        @keyframes pulse-dot {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.6; transform: scale(1.3); }
        }

        .contact-hero h1 {
          font-size: clamp(2.5rem, 5vw, 3.5rem);
          font-weight: 800;
          color: #ffffff;
          margin: 0 0 1rem 0;
          line-height: 1.15;
          letter-spacing: -0.02em;
        }

        .contact-hero p {
          font-size: 1.05rem;
          color: rgba(255,255,255,0.78);
          max-width: 520px;
          margin: 0 auto;
          line-height: 1.7;
        }

        /* MAIN GRID */
        .contact-body {
          max-width: 1100px;
          margin: 0 auto;
          padding: 3.5rem 1.5rem 5rem;
          display: grid;
          grid-template-columns: 1fr 420px;
          gap: 2.5rem;
          align-items: start;
        }

        /* FORM CARD */
        .form-card {
          background: #ffffff;
          border-radius: 16px;
          padding: 2.5rem;
          box-shadow: 0 4px 24px rgba(26,107,99,0.08);
          border: 1px solid #e8f0ef;
        }

        .form-card-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          margin-bottom: 2rem;
        }

        .form-card-header h2 {
          font-size: 1.4rem;
          font-weight: 700;
          color: #0d4f4a;
          margin: 0;
        }

        .wait-badge {
          text-align: right;
        }

        .wait-badge span:first-child {
          display: block;
          font-size: 0.7rem;
          font-weight: 700;
          letter-spacing: 1px;
          text-transform: uppercase;
          color: #999;
          margin-bottom: 0.2rem;
        }

        .wait-badge span:last-child {
          font-size: 1rem;
          font-weight: 700;
          color: #FF7A45;
        }

        .form-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1rem;
          margin-bottom: 1rem;
        }

        .form-group {
          display: flex;
          flex-direction: column;
          gap: 0.45rem;
          margin-bottom: 1rem;
        }

        .form-group label {
          font-size: 0.82rem;
          font-weight: 600;
          color: #4a5568;
          letter-spacing: 0.2px;
        }

        .form-group input,
        .form-group select,
        .form-group textarea {
          padding: 0.75rem 1rem;
          border: 1.5px solid #e2eceb;
          border-radius: 8px;
          font-size: 0.92rem;
          font-family: inherit;
          color: #1a1a2e;
          background: #fafefe;
          transition: all 0.2s ease;
          outline: none;
        }

        .form-group input:focus,
        .form-group select:focus,
        .form-group textarea:focus {
          border-color: #1a6b63;
          background: #fff;
          box-shadow: 0 0 0 3px rgba(26,107,99,0.08);
        }

        .form-group input::placeholder,
        .form-group textarea::placeholder {
          color: #bbb;
        }

        .form-group textarea {
          resize: vertical;
          min-height: 130px;
        }

        .btn-send {
          width: 100%;
          padding: 0.9rem;
          background: #FF7A45;
          color: white;
          border: none;
          border-radius: 10px;
          font-size: 0.95rem;
          font-weight: 700;
          font-family: inherit;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.6rem;
          transition: all 0.2s ease;
          letter-spacing: 0.2px;
        }

        .btn-send:hover {
          background: #e86a38;
          box-shadow: 0 6px 20px rgba(255,122,69,0.35);
          transform: translateY(-1px);
        }

        .btn-send.success {
          background: #1a6b63;
        }

        /* MAP */
        .map-card {
          margin-top: 1.5rem;
          border-radius: 14px;
          overflow: hidden;
          border: 1px solid #e8f0ef;
          box-shadow: 0 4px 16px rgba(26,107,99,0.07);
        }

        .map-placeholder {
          height: 220px;
          background: linear-gradient(135deg, #e8f4f3 0%, #d4ebe8 100%);
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
          overflow: hidden;
        }

        .map-placeholder::before {
          content: '';
          position: absolute;
          inset: 0;
          background-image: 
            linear-gradient(rgba(26,107,99,0.06) 1px, transparent 1px),
            linear-gradient(90deg, rgba(26,107,99,0.06) 1px, transparent 1px);
          background-size: 30px 30px;
        }

        .map-pin {
          width: 48px;
          height: 48px;
          background: #FF7A45;
          border-radius: 50% 50% 50% 0;
          transform: rotate(-45deg);
          box-shadow: 0 4px 16px rgba(255,122,69,0.4);
          position: relative;
          z-index: 1;
        }

        .map-pin::after {
          content: '';
          width: 18px;
          height: 18px;
          background: white;
          border-radius: 50%;
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
        }

        .map-footer {
          background: white;
          padding: 1rem 1.25rem;
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .map-location {
          display: flex;
          align-items: center;
          gap: 0.75rem;
        }

        .map-location-icon {
          width: 32px;
          height: 32px;
          background: #f0f9f8;
          border-radius: 8px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #1a6b63;
          flex-shrink: 0;
        }

        .map-location-text strong {
          display: block;
          font-size: 0.88rem;
          font-weight: 700;
          color: #0d4f4a;
        }

        .map-location-text span {
          font-size: 0.78rem;
          color: #888;
        }

        .map-directions {
          font-size: 0.82rem;
          font-weight: 700;
          color: #FF7A45;
          text-decoration: none;
          letter-spacing: 0.2px;
        }

        .map-directions:hover {
          text-decoration: underline;
        }

        /* RIGHT COLUMN */
        .right-col {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }

        .contact-info-card {
          background: #ffffff;
          border-radius: 16px;
          padding: 2rem;
          box-shadow: 0 4px 24px rgba(26,107,99,0.08);
          border: 1px solid #e8f0ef;
        }

        .contact-info-card h3 {
          font-size: 1.1rem;
          font-weight: 700;
          color: #0d4f4a;
          margin: 0 0 1.5rem 0;
        }

        .contact-item {
          display: flex;
          align-items: flex-start;
          gap: 1rem;
          padding: 1rem;
          border-radius: 10px;
          border: 1px solid #f0f4f4;
          margin-bottom: 0.75rem;
          transition: all 0.2s ease;
        }

        .contact-item:last-child { margin-bottom: 0; }

        .contact-item:hover {
          border-color: #c8e6e3;
          background: #fafefe;
        }

        .contact-item-icon {
          width: 42px;
          height: 42px;
          border-radius: 10px;
          background: #f0f9f8;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #1a6b63;
          flex-shrink: 0;
        }

        .contact-item-label {
          font-size: 0.68rem;
          font-weight: 700;
          letter-spacing: 1.2px;
          text-transform: uppercase;
          color: #999;
          margin-bottom: 0.2rem;
        }

        .contact-item-value {
          font-size: 1rem;
          font-weight: 700;
          color: #0d4f4a;
          margin-bottom: 0.15rem;
        }

        .contact-item-sub {
          font-size: 0.78rem;
          color: #888;
        }

        /* HELP CARD */
        .help-card {
          background: linear-gradient(135deg, #0d4f4a 0%, #1a6b63 100%);
          border-radius: 16px;
          padding: 2rem;
          position: relative;
          overflow: hidden;
        }

        .help-card::before {
          content: '?';
          position: absolute;
          right: 1.5rem;
          bottom: -0.5rem;
          font-size: 8rem;
          font-weight: 900;
          color: rgba(255,255,255,0.06);
          line-height: 1;
          font-family: inherit;
        }

        .help-card h3 {
          font-size: 1.15rem;
          font-weight: 700;
          color: #ffffff;
          margin: 0 0 0.75rem 0;
        }

        .help-card p {
          font-size: 0.88rem;
          color: rgba(255,255,255,0.72);
          line-height: 1.6;
          margin: 0 0 1.5rem 0;
        }

        .btn-help {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.65rem 1.25rem;
          background: rgba(255,255,255,0.12);
          color: white;
          border: 1.5px solid rgba(255,255,255,0.25);
          border-radius: 8px;
          font-size: 0.85rem;
          font-weight: 600;
          font-family: inherit;
          cursor: pointer;
          text-decoration: none;
          transition: all 0.2s ease;
          backdrop-filter: blur(10px);
        }

        .btn-help:hover {
          background: rgba(255,255,255,0.2);
          border-color: rgba(255,255,255,0.4);
        }

        /* RESPONSIVE */
        @media (max-width: 900px) {
          .contact-body {
            grid-template-columns: 1fr;
          }
          .form-row {
            grid-template-columns: 1fr;
          }
        }

        @media (max-width: 600px) {
          .contact-hero { padding: 3.5rem 1.5rem 3rem; }
          .form-card { padding: 1.75rem; }
          .contact-info-card { padding: 1.5rem; }
        }
      `}</style>

      <div className="contact-page">
        <Header />

        {/* HERO */}
        <section className="contact-hero">
          <div className="contact-hero-badge">Live Support Active</div>
          <h1>Get in Touch</h1>
          <p>Our dedicated team is here to support your health journey. Reach out to us for any inquiries, medical assistance, or emergency support.</p>
        </section>

        {/* BODY */}
        <div className="contact-body">

          {/* LEFT — FORM + MAP */}
          <div>
            <div className="form-card">
              <div className="form-card-header">
                <h2>Send us a Message</h2>
                <div className="wait-badge">
                  <span>WAIT TIME</span>
                  <span>&lt; 5 mins</span>
                </div>
              </div>

              <form onSubmit={handleSubmit}>
                <div className="form-row">
                  <div className="form-group">
                    <label>Name</label>
                    <input
                      type="text"
                      placeholder="Your name"
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>Email Address</label>
                    <input
                      type="email"
                      placeholder="name@example.com"
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                      required
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label>Subject</label>
                  <select value={formData.subject} onChange={(e) => setFormData({...formData, subject: e.target.value})}>
                    <option>General Inquiry</option>
                    <option>Appointment Booking</option>
                    <option>Medical Emergency</option>
                    <option>Billing & Insurance</option>
                    <option>Doctor Feedback</option>
                    <option>Technical Support</option>
                  </select>
                </div>

                <div className="form-group">
                  <label>Message</label>
                  <textarea
                    placeholder="How can we help you today?"
                    value={formData.message}
                    onChange={(e) => setFormData({...formData, message: e.target.value})}
                    required
                  />
                </div>

                <button type="submit" className={`btn-send ${submitted ? 'success' : ''}`}>
                  {submitted ? (
                    <>✓ Message Sent!</>
                  ) : (
                    <>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="22" y1="2" x2="11" y2="13"></line>
                        <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
                      </svg>
                      Send Message
                    </>
                  )}
                </button>
              </form>
            </div>

            {/* MAP */}
            <div className="map-card">
              <div className="map-placeholder">
                <div className="map-pin"></div>
              </div>
              <div className="map-footer">
                <div className="map-location">
                  <div className="map-location-icon">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                      <circle cx="12" cy="10" r="3"></circle>
                    </svg>
                  </div>
                  <div className="map-location-text">
                    <strong>Medical Center Plaza</strong>
                    <span>123 Health Ave, Coimbatore</span>
                  </div>
                </div>
                <a href="#" className="map-directions">Get Directions →</a>
              </div>
            </div>
          </div>

          {/* RIGHT — CONTACT INFO + HELP */}
          <div className="right-col">
            <div className="contact-info-card">
              <h3>Contact Information</h3>

              <div className="contact-item">
                <div className="contact-item-icon">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.61 3.4 2 2 0 0 1 3.6 1.22h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.85a16 16 0 0 0 6.29 6.29l.95-.96a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"></path>
                  </svg>
                </div>
                <div>
                  <div className="contact-item-label">Emergency 24/7</div>
                  <div className="contact-item-value">+91 98765-43210</div>
                  <div className="contact-item-sub">Direct medical assistance line</div>
                </div>
              </div>

              <div className="contact-item">
                <div className="contact-item-icon">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                    <polyline points="22,6 12,13 2,6"></polyline>
                  </svg>
                </div>
                <div>
                  <div className="contact-item-label">Email Support</div>
                  <div className="contact-item-value">help@healnow.com</div>
                  <div className="contact-item-sub">Response within 12 hours</div>
                </div>
              </div>

              <div className="contact-item">
                <div className="contact-item-icon">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect>
                    <line x1="8" y1="21" x2="16" y2="21"></line>
                    <line x1="12" y1="17" x2="12" y2="21"></line>
                  </svg>
                </div>
                <div>
                  <div className="contact-item-label">Main Reception</div>
                  <div className="contact-item-value">Ground Floor, Wing A</div>
                  <div className="contact-item-sub">Mon - Sun: 8:00 AM - 10:00 PM</div>
                </div>
              </div>
            </div>

            {/* HELP CARD */}
            <div className="help-card">
              <h3>Need a faster answer?</h3>
              <p>Check our frequently asked questions for instant information about insurance, parking, and visits.</p>
              <a href="#" className="btn-help">
                Browse Help Center
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                  <polyline points="15 3 21 3 21 9"></polyline>
                  <line x1="10" y1="14" x2="21" y2="3"></line>
                </svg>
              </a>
            </div>
          </div>

        </div>
        <Footer />
      </div>
    </>
  );
};

export default Contact;