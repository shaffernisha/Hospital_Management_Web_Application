import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const HealNowLogo = ({ size = 'md', dark = false }) => {
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
          <stop offset="0%" style={{ stopColor: '#1a6b63', stopOpacity: 1 }} />
          <stop offset="100%" style={{ stopColor: '#0f4440', stopOpacity: 1 }} />
        </linearGradient>
      </defs>
      <path
        d="M50 85 C20 70, 5 55, 5 40 C5 25, 15 15, 25 15 C35 15, 45 25, 50 32 C55 25, 65 15, 75 15 C85 15, 95 25, 95 40 C95 55, 80 70, 50 85 Z"
        fill="url(#heartGradient)"
      />
      <path
        d="M 25 45 L 35 45 L 38 35 L 42 55 L 45 50 L 60 50 L 65 40 L 75 45 L 85 45"
        stroke="#FF7A45"
        strokeWidth="2.5"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <g transform="translate(70, 20)">
        <rect x="-8" y="-8" width="16" height="16" fill="#FF7A45" rx="2" />
        <line x1="-4" y1="0" x2="4" y2="0" stroke="white" strokeWidth="2" strokeLinecap="round" />
        <line x1="0" y1="-4" x2="0" y2="4" stroke="white" strokeWidth="2" strokeLinecap="round" />
      </g>
    </svg>
  );
};

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDark, setIsDark] = useState(() => {
    return localStorage.getItem('theme') === 'dark';
  });
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  const user = token ? JSON.parse(localStorage.getItem('user') || '{}') : null;

  // Apply dark mode class to <html> so entire app benefits
  useEffect(() => {
    if (isDark) {
      document.documentElement.setAttribute('data-theme', 'dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.removeAttribute('data-theme');
      localStorage.setItem('theme', 'light');
    }
  }, [isDark]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/');
    setIsMenuOpen(false);
  };

  const headerStyles = `
    /* ── Dark mode global tokens - PURE BLACK & WHITE ── */
    [data-theme="dark"] {
      --bg-header: #000000;              /* ✅ Pure black */
      --border-header: #2a2a2a;          /* ✅ Dark gray border */
      --shadow-header: 0 1px 6px rgba(0,0,0,0.6);
      --text-nav: #e0e0e0;               /* ✅ Light gray text */
      --text-nav-hover: #ffffff;         /* ✅ Pure white on hover */
      --logo-tagline: #b0b0b0;           /* ✅ Medium gray */
    }
    :root {
      --bg-header: #ffffff;
      --border-header: #e9ecef;
      --shadow-header: 0 1px 3px rgba(0,0,0,0.08);
      --text-nav: #666;
      --text-nav-hover: #1a6b63;
      --logo-tagline: #666;
    }

    .header {
      background: var(--bg-header);
      border-bottom: 1px solid var(--border-header);
      position: sticky;
      top: 0;
      z-index: 100;
      box-shadow: var(--shadow-header);
      transition: background 0.3s ease, border-color 0.3s ease;
    }

    .header-content {
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 0.85rem 40px;
      gap: 2rem;
      max-width: 1400px;
      margin: 0 auto;
      position: relative;
    }

    .logo-wrapper {
      display: flex;
      align-items: center;
      gap: 0.75rem;
      text-decoration: none;
      transition: all 0.3s ease;
      flex-shrink: 0;
      position: absolute;
      left: 40px;
    }

    .logo-wrapper:hover { transform: translateY(-2px); }

    .logo-text { display: flex; flex-direction: column; }

    .logo-name {
      font-weight: 800;
      font-size: 1.5rem;
      background: linear-gradient(135deg, #0d5450 0%, #1a6b63 50%, #FF7A45 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
      line-height: 1;
      letter-spacing: 0.5px;
    }

    .logo-tagline {
      font-size: 0.65rem;
      color: var(--logo-tagline);
      font-weight: 600;
      text-transform: uppercase;
      letter-spacing: 0.8px;
      transition: color 0.3s ease;
    }

    .nav-center {
      display: flex;
      align-items: center;
      flex: 1;
      justify-content: center;
    }

    .nav {
      display: flex;
      align-items: center;
      gap: 2rem;
      justify-content: center;
    }

    .nav-link {
      color: var(--text-nav);
      font-weight: 600;
      font-size: 0.95rem;
      transition: all 0.3s ease;
      position: relative;
      text-decoration: none;
      padding: 0.5rem 0;
    }

    .nav-link::after {
      content: '';
      position: absolute;
      bottom: -4px;
      left: 50%;
      transform: translateX(-50%);
      width: 0;
      height: 2.5px;
      background: linear-gradient(135deg, #1a6b63 0%, #FF7A45 100%);
      transition: width 0.3s ease;
    }

    .nav-link:hover { color: var(--text-nav-hover); }
    .nav-link:hover::after { width: 100%; }

    /* ── Right side: toggle + auth ── */
    .auth-section {
      display: flex;
      align-items: center;
      gap: 0.85rem;
      flex-shrink: 0;
      position: absolute;
      right: 40px;
    }

    /* ── Dark/Light Toggle ── */
    .theme-toggle {
      display: flex;
      align-items: center;
      justify-content: space-between;
      width: 52px;
      height: 26px;
      background: #e2eeec;
      border-radius: 999px;
      padding: 3px;
      cursor: pointer;
      border: 1.5px solid #b6d4cf;
      transition: background 0.3s ease, border-color 0.3s ease;
      position: relative;
      flex-shrink: 0;
    }

    [data-theme="dark"] .theme-toggle {
      background: #1a1a1a;           /* ✅ Dark gray toggle background */
      border-color: #404040;         /* ✅ Dark gray border */
    }

    .theme-toggle-thumb {
      width: 18px;
      height: 18px;
      border-radius: 50%;
      background: #ffffff;
      box-shadow: 0 1px 4px rgba(0,0,0,0.2);
      transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1), background 0.3s ease;
      transform: translateX(0);
      display: flex;
      align-items: center;
      justify-content: center;
      position: absolute;
      left: 3px;
    }

    [data-theme="dark"] .theme-toggle-thumb {
      transform: translateX(26px);
      background: #FF7A45;
    }

    .theme-toggle-thumb svg {
      width: 11px;
      height: 11px;
      flex-shrink: 0;
    }

    /* Sun icon (light mode) */
    .icon-sun { display: block; }
    .icon-moon { display: none; }
    [data-theme="dark"] .icon-sun { display: none; }
    [data-theme="dark"] .icon-moon { display: block; }

    .auth-buttons {
      display: flex;
      align-items: center;
      gap: 0.6rem;
    }

    .btn-login {
      padding: 0.38rem 1rem;
      color: #1a6b63;
      border: 1.5px solid #1a6b63;
      border-radius: 6px;
      font-weight: 600;
      font-size: 0.82rem;
      transition: all 0.2s ease;
      background: transparent;
      cursor: pointer;
      text-decoration: none;
      display: inline-block;
      letter-spacing: 0.2px;
      line-height: 1.5;
    }

    [data-theme="dark"] .btn-login {
      color: #ffffff;                /* ✅ Pure white text */
      border-color: #ffffff;         /* ✅ Pure white border */
    }

    .btn-login:hover {
      background: #1a6b63;
      color: #ffffff;
      box-shadow: 0 2px 8px rgba(26, 107, 99, 0.2);
    }

    [data-theme="dark"] .btn-login:hover {
      background: #ffffff;           /* ✅ White background */
      color: #000000;                /* ✅ Black text */
      box-shadow: 0 2px 8px rgba(255, 255, 255, 0.3);
    }

    .btn-register {
      padding: 0.38rem 1rem;
      background: #FF7A45;
      color: #ffffff;
      border: 1.5px solid #FF7A45;
      border-radius: 6px;
      font-weight: 600;
      font-size: 0.82rem;
      transition: all 0.2s ease;
      cursor: pointer;
      text-decoration: none;
      display: inline-block;
      letter-spacing: 0.2px;
      line-height: 1.5;
    }

    .btn-register:hover {
      background: #e86a38;
      border-color: #e86a38;
      box-shadow: 0 2px 8px rgba(255, 122, 69, 0.3);
    }

    .user-menu {
      display: flex;
      align-items: center;
      gap: 1rem;
    }

    .user-info {
      display: flex;
      flex-direction: column;
      align-items: flex-end;
      gap: 0.2rem;
    }

    .user-name { 
      color: #1a6b63; 
      font-weight: 600; 
      font-size: 0.9rem; 
    }
    [data-theme="dark"] .user-name { 
      color: #ffffff;           /* ✅ Pure white */
    }

    .user-role {
      font-size: 0.7rem;
      text-transform: uppercase;
      color: #FF7A45;
      font-weight: 700;
      letter-spacing: 0.5px;
    }

    .btn-logout {
      padding: 0.38rem 1rem;
      background: #FF6B6B;
      color: #ffffff;
      border: none;
      border-radius: 6px;
      font-weight: 600;
      font-size: 0.82rem;
      cursor: pointer;
      transition: all 0.2s ease;
      line-height: 1.5;
    }

    .btn-logout:hover {
      background: #e55555;
      box-shadow: 0 2px 8px rgba(255, 107, 107, 0.3);
    }

    .hamburger {
      display: none;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      width: 30px;
      height: 30px;
      background: none;
      border: none;
      cursor: pointer;
      z-index: 20;
    }

    .hamburger span {
      width: 25px;
      height: 2px;
      background: #1a6b63;
      border-radius: 2px;
      transition: all 0.3s ease;
      margin: 4px 0;
    }

    [data-theme="dark"] .hamburger span { 
      background: #ffffff;    /* ✅ Pure white */
    }

    .hamburger.active span:nth-child(1) { transform: rotate(45deg) translate(8px, 8px); }
    .hamburger.active span:nth-child(2) { opacity: 0; }
    .hamburger.active span:nth-child(3) { transform: rotate(-45deg) translate(8px, -8px); }

    @media (max-width: 1024px) { .nav { gap: 1.5rem; } }

    @media (max-width: 768px) {
      .header-content { padding: 0.75rem 20px; gap: 1rem; }

      .logo-wrapper { position: relative; left: 0; }
      .logo-name { font-size: 1.2rem; }
      .logo-tagline { display: none; }

      .nav-center { display: none; }

      .nav {
        position: absolute;
        top: 60px;
        left: 0;
        right: 0;
        flex-direction: column;
        background: var(--bg-header);
        border-bottom: 1px solid var(--border-header);
        padding: 1.25rem 1.5rem;
        gap: 1rem;
        display: none;
        justify-content: flex-start;
        z-index: 99;
      }

      .nav.mobile-open { display: flex; }

      .hamburger { display: flex; }

      .auth-section { display: none; }
    }
  `;

  return (
    <>
      <style>{headerStyles}</style>
      <header className="header">
        <div className="header-content">

          {/* Logo */}
          <Link to="/" className="logo-wrapper">
            <HealNowLogo size="md" dark={isDark} />
            <div className="logo-text">
              <div className="logo-name">HealNow</div>
              <div className="logo-tagline">Healthcare</div>
            </div>
          </Link>

          {/* Nav Links */}
          <div className="nav-center">
            <nav className={`nav ${isMenuOpen ? 'mobile-open' : ''}`}>
              <Link to="/" className="nav-link">Home</Link>
              <Link to="/services" className="nav-link">Services</Link>
              <Link to="/doctors" className="nav-link">Doctors</Link>
              <Link to="/contact" className="nav-link">Contact</Link>
            </nav>
          </div>

          {/* Right: Theme Toggle + Auth */}
          <div className="auth-section">

            {/* Dark / Light Toggle */}
            <button
              className="theme-toggle"
              onClick={() => setIsDark(!isDark)}
              aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
              title={isDark ? 'Light mode' : 'Dark mode'}
            >
              <div className="theme-toggle-thumb">
                {/* Sun icon — shown in light mode */}
                <svg className="icon-sun" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="12" cy="12" r="4" stroke="#FF7A45" strokeWidth="2"/>
                  <path d="M12 2v2M12 20v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M2 12h2M20 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" stroke="#FF7A45" strokeWidth="2" strokeLinecap="round"/>
                </svg>
                {/* Moon icon — shown in dark mode */}
                <svg className="icon-moon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M21 12.79A9 9 0 1 1 11.21 3a7 7 0 0 0 9.79 9.79z" fill="white" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
            </button>

            {token && user ? (
              <div className="user-menu">
                <span className="user-info">
                  <span className="user-role">{user.role}</span>
                  <span className="user-name">{user.firstName}</span>
                </span>
                <button onClick={handleLogout} className="btn-logout">Logout</button>
              </div>
            ) : (
              <div className="auth-buttons">
                <Link to="/login" className="btn-login">Login</Link>
                <Link to="/register" className="btn-register">Register</Link>
              </div>
            )}
          </div>

          {/* Mobile Hamburger */}
          <button
            className={`hamburger ${isMenuOpen ? 'active' : ''}`}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            <span></span>
            <span></span>
            <span></span>
          </button>

        </div>
      </header>
    </>
  );
};

export default Header;