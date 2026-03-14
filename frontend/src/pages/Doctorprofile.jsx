import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { doctors } from './Doctors';

// ─── SVG ICONS ────────────────────────────────────────────────────────────────
const StarIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="#F4A524" stroke="#F4A524" strokeWidth="1">
    <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26"/>
  </svg>
);
const StarOutlineIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#F4A524" strokeWidth="1.5">
    <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26"/>
  </svg>
);
const MapPinIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" stroke="currentColor" strokeWidth="2"/>
    <circle cx="12" cy="10" r="3" stroke="currentColor" strokeWidth="2"/>
  </svg>
);
const GlobeIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
    <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"/>
    <path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" stroke="currentColor" strokeWidth="2"/>
  </svg>
);
const BriefcaseIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
    <rect x="2" y="7" width="20" height="14" rx="2" stroke="currentColor" strokeWidth="2"/>
    <path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2" stroke="currentColor" strokeWidth="2"/>
  </svg>
);
const CalendarIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
    <rect x="3" y="4" width="18" height="18" rx="2" stroke="currentColor" strokeWidth="2"/>
    <path d="M16 2v4M8 2v4M3 10h18" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
  </svg>
);
const VideoIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
    <polygon points="23,7 16,12 23,17" stroke="currentColor" strokeWidth="2" fill="currentColor"/>
    <rect x="1" y="5" width="15" height="14" rx="2" stroke="currentColor" strokeWidth="2"/>
  </svg>
);
const GraduationIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
    <path d="M22 10v6M2 10l10-5 10 5-10 5z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M6 12v5c3 3 9 3 12 0v-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);
const HospitalIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
    <rect x="3" y="3" width="18" height="18" rx="2" stroke="currentColor" strokeWidth="2"/>
    <path d="M12 8v8M8 12h8" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
  </svg>
);
const ArrowLeftIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
    <path d="M19 12H5M12 19l-7-7 7-7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);
const HeartIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" stroke="currentColor" strokeWidth="2"/>
  </svg>
);
const PhoneIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" stroke="currentColor" strokeWidth="2"/>
  </svg>
);
const CheckCircleIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
    <circle cx="12" cy="12" r="10" stroke="#16a34a" strokeWidth="2"/>
    <path d="M9 12l2 2 4-4" stroke="#16a34a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);
const RupeeIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
    <path d="M6 3h12M6 8h12M15 21L6 8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M6 8c0 4 3 7 9 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
  </svg>
);

// ─── REVIEW DATA ──────────────────────────────────────────────────────────────
const reviewPool = [
  { name: 'Ramesh K.', text: 'Outstanding doctor! Took time to listen to every concern and explained everything clearly in Hindi. My treatment has been excellent.', date: 'January 2025', stars: 5 },
  { name: 'Sunita M.', text: 'Very professional and compassionate. The diagnosis was spot-on and I saw improvement within two weeks. Highly recommend.', date: 'December 2024', stars: 5 },
  { name: 'Arvind S.', text: 'Excellent physician with deep knowledge. Waited a bit for the appointment but it was absolutely worth it.', date: 'November 2024', stars: 4 },
  { name: 'Priya L.', text: 'Brilliant doctor. Explained the condition in layman terms and gave a practical treatment plan. No unnecessary tests.', date: 'October 2024', stars: 5 },
  { name: 'Deepak R.', text: 'One of the best specialists I have consulted. Very thorough and patient-centric approach. Staff is also very helpful.', date: 'September 2024', stars: 5 },
  { name: 'Geetha N.', text: 'I had been to many doctors before finding this specialist. Finally got a clear diagnosis and a path to recovery. Thank you!', date: 'August 2024', stars: 4 },
];

// ─── SCHEDULE DATA ────────────────────────────────────────────────────────────
const schedule = [
  { day: 'Monday',    time: '09:00 AM – 05:00 PM', closed: false },
  { day: 'Tuesday',   time: '09:00 AM – 05:00 PM', closed: false },
  { day: 'Wednesday', time: '10:00 AM – 03:00 PM', closed: false },
  { day: 'Thursday',  time: '09:00 AM – 05:00 PM', closed: false },
  { day: 'Friday',    time: '09:00 AM – 02:00 PM', closed: false },
  { day: 'Saturday',  time: 'Emergency Only',       closed: false, emergency: true },
  { day: 'Sunday',    time: 'CLOSED',               closed: true },
];

export default function DoctorProfile() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('about');
  const [liked, setLiked] = useState(false);
  const [booked, setBooked] = useState(false);

  const doctor = doctors.find(d => d.id === Number(id));

  if (!doctor) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: '16px' }}>
        <h2 style={{ color: '#1a6b63' }}>Doctor not found</h2>
        <button onClick={() => navigate('/doctors')} style={{ padding: '10px 24px', background: '#1a6b63', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: 700 }}>Back to Doctors</button>
      </div>
    );
  }

  const styles = `
    @import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display&family=DM+Sans:wght@400;500;600;700;800&display=swap');
    *,*::before,*::after{box-sizing:border-box;margin:0;padding:0;}
    body{font-family:'DM Sans','Segoe UI',sans-serif;}

    .dp-page { background: #f4f8f7; min-height:100vh; }

    /* Breadcrumb */
    .dp-breadcrumb {
      background: white;
      border-bottom: 1px solid #e8f0ee;
      padding: 12px 40px;
    }
    .dp-breadcrumb-inner {
      max-width: 1280px;
      margin: 0 auto;
      display: flex;
      align-items: center;
      gap: 8px;
      font-size: 0.85rem;
      color: #aaa;
    }
    .dp-breadcrumb a {
      color: #1a6b63;
      text-decoration: none;
      font-weight: 600;
      cursor: pointer;
      transition: color 0.2s;
    }
    .dp-breadcrumb a:hover { color: #0f4440; }
    .dp-breadcrumb-sep { color: #ccc; font-size: 0.75rem; }
    .dp-breadcrumb-current { color: #555; font-weight: 600; }

    /* Layout */
    .dp-layout {
      max-width: 1280px;
      margin: 0 auto;
      padding: 32px 40px 80px;
      display: grid;
      grid-template-columns: 1fr 340px;
      gap: 28px;
      align-items: start;
    }

    /* Left */
    .dp-left { display: flex; flex-direction: column; gap: 22px; }

    /* Profile Card */
    .dp-profile-card {
      background: white;
      border-radius: 16px;
      overflow: hidden;
      border: 1.5px solid #eef2f0;
    }
    .dp-profile-header {
      background: linear-gradient(135deg, #0f4440, #1a6b63);
      padding: 32px 32px 0;
      display: flex;
      align-items: flex-end;
      gap: 24px;
    }
    .dp-profile-img {
      width: 130px;
      height: 150px;
      border-radius: 12px 12px 0 0;
      object-fit: cover;
      object-position: top;
      flex-shrink: 0;
      border: 3px solid rgba(255,255,255,0.3);
    }
    .dp-profile-header-info { padding-bottom: 24px; flex: 1; }
    .dp-profile-name {
      font-family: 'DM Serif Display', Georgia, serif;
      font-size: 1.9rem;
      font-weight: 400;
      color: white;
      line-height: 1.2;
      margin-bottom: 4px;
    }
    .dp-profile-title { color: rgba(255,255,255,0.8); font-size:1rem; font-weight:500; margin-bottom:10px; }
    .dp-profile-rating-row {
      display: flex;
      align-items: center;
      gap: 6px;
      margin-bottom: 14px;
    }
    .dp-profile-rating-score { color:white; font-weight:800; font-size:1rem; }
    .dp-profile-rating-label { color:rgba(255,255,255,0.65); font-size:0.83rem; }
    .dp-profile-chips { display:flex; gap:10px; flex-wrap:wrap; }
    .dp-chip {
      display: flex;
      align-items: center;
      gap: 5px;
      background: rgba(255,255,255,0.12);
      border: 1px solid rgba(255,255,255,0.2);
      color: rgba(255,255,255,0.9);
      font-size: 0.8rem;
      font-weight: 600;
      padding: 5px 12px;
      border-radius: 99px;
    }

    .dp-profile-actions {
      padding: 20px 32px;
      display: flex;
      gap: 10px;
      border-bottom: 1px solid #eef2f0;
      flex-wrap: wrap;
    }
    .dp-like-btn {
      display: flex;
      align-items: center;
      gap: 6px;
      padding: 9px 18px;
      background: white;
      border: 1.5px solid #eee;
      border-radius: 8px;
      font-size: 0.85rem;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.2s;
      font-family: inherit;
      color: #666;
      margin-left: auto;
    }
    .dp-like-btn.liked { border-color:#ef4444; color:#ef4444; }
    .dp-like-btn:hover { border-color:#ef4444; color:#ef4444; }

    /* Tabs */
    .dp-tabs {
      display: flex;
      padding: 0 32px;
      border-bottom: 1px solid #eef2f0;
    }
    .dp-tab {
      padding: 14px 20px;
      font-size:0.9rem;
      font-weight:600;
      color:#888;
      cursor:pointer;
      border-bottom:2.5px solid transparent;
      transition:all 0.2s;
      font-family:inherit;
      background:none;
      border-left:none;
      border-right:none;
      border-top:none;
    }
    .dp-tab.active { color:#1a6b63; border-bottom-color:#1a6b63; }
    .dp-tab:hover { color:#1a6b63; }

    .dp-tab-content { padding: 28px 32px; }

    /* About */
    .dp-section-title {
      font-size:1.05rem;
      font-weight:800;
      color:#1a2e2c;
      margin-bottom:12px;
    }
    .dp-about-text {
      font-size:0.95rem;
      color:#555;
      line-height:1.8;
      margin-bottom:24px;
    }
    .dp-specialty-tags {
      display:flex;
      flex-wrap:wrap;
      gap:8px;
      margin-bottom:24px;
    }
    .dp-specialty-tag {
      padding:6px 14px;
      background:#e8f5f3;
      color:#1a6b63;
      border:1px solid #c2e0db;
      border-radius:6px;
      font-size:0.84rem;
      font-weight:600;
    }
    .dp-edu-list { display:flex; flex-direction:column; gap:14px; }
    .dp-edu-item {
      display:flex;
      align-items:center;
      gap:14px;
      padding:14px;
      background:#f7faf9;
      border-radius:10px;
    }
    .dp-edu-icon {
      width:40px;height:40px;
      background:#e8f5f3;
      border-radius:10px;
      display:flex;
      align-items:center;
      justify-content:center;
      color:#1a6b63;
      flex-shrink:0;
    }
    .dp-edu-item h4 { font-size:0.9rem; font-weight:700; color:#222; margin-bottom:2px; }
    .dp-edu-item p { font-size:0.8rem; color:#888; }

    /* Reviews */
    .dp-reviews-header {
      display:flex;
      align-items:center;
      justify-content:space-between;
      margin-bottom:20px;
    }
    .dp-see-all {
      color:#1a6b63;
      font-size:0.88rem;
      font-weight:600;
      cursor:pointer;
      text-decoration:none;
    }
    .dp-review-card {
      padding:18px;
      background:#f7faf9;
      border-radius:10px;
      margin-bottom:14px;
      border:1px solid #eef2f0;
    }
    .dp-review-top {
      display:flex;
      align-items:center;
      justify-content:space-between;
      margin-bottom:8px;
    }
    .dp-reviewer-name { font-size:0.9rem; font-weight:700; color:#222; }
    .dp-review-stars { display:flex; gap:2px; }
    .dp-review-text { font-size:0.87rem; color:#555; line-height:1.65; margin-bottom:6px; font-style:italic; }
    .dp-review-date { font-size:0.75rem; color:#bbb; }

    /* Right Sidebar */
    .dp-right { display:flex; flex-direction:column; gap:20px; }

    /* Booking Card */
    .dp-booking-card {
      background:white;
      border-radius:16px;
      overflow:hidden;
      border:1.5px solid #eef2f0;
    }
    .dp-booking-header {
      background:linear-gradient(135deg,#0f4440,#1a6b63);
      padding:18px 22px;
    }
    .dp-booking-header h3 { color:white; font-size:1rem; font-weight:700; margin-bottom:4px; }
    .dp-booking-avail {
      display:inline-block;
      background:rgba(255,255,255,0.15);
      color:rgba(255,255,255,0.9);
      font-size:0.75rem;
      font-weight:600;
      text-transform:uppercase;
      letter-spacing:0.8px;
      padding:3px 10px;
      border-radius:99px;
      margin-bottom:2px;
    }
    .dp-booking-date { color:white; font-size:1.1rem; font-weight:800; }

    .dp-booking-body { padding:20px 22px; }
    .dp-fee-row {
      display:flex;
      align-items:center;
      gap:6px;
      padding:10px 14px;
      background:#f7faf9;
      border-radius:8px;
      margin-bottom:14px;
    }
    .dp-fee-label { font-size:0.8rem; color:#888; flex:1; }
    .dp-fee-amount { font-size:1.1rem; font-weight:800; color:#1a6b63; }
    .dp-book-btn {
      display:flex;
      align-items:center;
      justify-content:center;
      gap:8px;
      width:100%;
      padding:13px;
      background:linear-gradient(135deg,#FF7A45,#FF6B35);
      color:white;
      border:none;
      border-radius:10px;
      font-weight:700;
      font-size:0.95rem;
      cursor:pointer;
      transition:all 0.25s;
      margin-bottom:10px;
      font-family:inherit;
    }
    .dp-book-btn:hover { filter:brightness(1.06); transform:translateY(-1px); }
    .dp-book-btn.booked { background:linear-gradient(135deg,#16a34a,#15803d); }
    .dp-video-btn {
      display:flex;
      align-items:center;
      justify-content:center;
      gap:8px;
      width:100%;
      padding:12px;
      background:transparent;
      color:#1a6b63;
      border:1.5px solid #1a6b63;
      border-radius:10px;
      font-weight:700;
      font-size:0.9rem;
      cursor:pointer;
      transition:all 0.2s;
      margin-bottom:10px;
      font-family:inherit;
    }
    .dp-video-btn:hover { background:#1a6b63; color:white; }
    .dp-book-note {
      text-align:center;
      font-size:0.78rem;
      color:#aaa;
      display:flex;
      align-items:center;
      justify-content:center;
      gap:5px;
    }

    /* Schedule Card */
    .dp-schedule-card {
      background:white;
      border-radius:16px;
      border:1.5px solid #eef2f0;
      overflow:hidden;
    }
    .dp-schedule-header {
      padding:16px 20px;
      border-bottom:1px solid #eef2f0;
      display:flex;
      align-items:center;
      gap:8px;
    }
    .dp-schedule-header h3 { font-size:0.95rem; font-weight:700; color:#1a2e2c; }
    .dp-schedule-rows { padding:8px 0; }
    .dp-schedule-row {
      display:flex;
      align-items:center;
      justify-content:space-between;
      padding:9px 20px;
      font-size:0.84rem;
      border-bottom:1px solid #f5f5f5;
      transition:background 0.15s;
    }
    .dp-schedule-row:last-child{border-bottom:none;}
    .dp-schedule-row:hover{background:#f8fbfa;}
    .dp-schedule-day{font-weight:600;color:#444;min-width:90px;}
    .dp-schedule-time{color:#666;font-weight:500;}
    .dp-schedule-closed{color:#ef4444;font-weight:700;}
    .dp-schedule-emergency{color:#FF7A45;font-weight:700;font-style:italic;}

    /* Hospital Card */
    .dp-hospital-card {
      background:white;
      border-radius:16px;
      border:1.5px solid #eef2f0;
      padding:20px;
    }
    .dp-hospital-card h3{font-size:0.95rem;font-weight:700;color:#1a2e2c;margin-bottom:14px;display:flex;align-items:center;gap:8px;}
    .dp-hospital-name{font-size:1rem;font-weight:800;color:#1a2e2c;margin-bottom:4px;}
    .dp-hospital-addr{font-size:0.84rem;color:#777;line-height:1.5;margin-bottom:12px;display:flex;gap:6px;align-items:flex-start;}
    .dp-hospital-contact{display:flex;flex-direction:column;gap:8px;}
    .dp-hospital-contact-item{display:flex;align-items:center;gap:8px;font-size:0.84rem;color:#555;font-weight:500;}
    .dp-hospital-contact-item svg{color:#1a6b63;flex-shrink:0;}
    .dp-directions-btn{
      display:flex;align-items:center;justify-content:center;
      gap:6px;width:100%;margin-top:14px;
      padding:10px;background:#f0faf8;color:#1a6b63;
      border:1.5px solid #c2e0db;border-radius:8px;
      font-weight:700;font-size:0.84rem;cursor:pointer;
      transition:all 0.2s;font-family:inherit;
    }
    .dp-directions-btn:hover{background:#1a6b63;color:white;border-color:#1a6b63;}

    /* Stats row */
    .dp-stats-row{
      display:grid;
      grid-template-columns:repeat(3,1fr);
      gap:12px;
    }
    .dp-stat-box{
      background:white;
      border-radius:12px;
      padding:18px 14px;
      text-align:center;
      border:1.5px solid #eef2f0;
    }
    .dp-stat-val{font-size:1.5rem;font-weight:800;color:#1a6b63;line-height:1;margin-bottom:4px;}
    .dp-stat-lbl{font-size:0.72rem;color:#999;font-weight:600;text-transform:uppercase;letter-spacing:0.6px;}

    @media(max-width:900px){
      .dp-layout{grid-template-columns:1fr;padding:20px;}
      .dp-breadcrumb{padding:12px 20px;}
    }
    @media(max-width:560px){
      .dp-profile-header{flex-direction:column;align-items:flex-start;padding:20px 20px 0;}
      .dp-tab-content{padding:20px;}
      .dp-profile-actions{padding:14px 20px;}
      .dp-tabs{padding:0 20px;}
      .dp-stats-row{grid-template-columns:repeat(2,1fr);}
    }
  `;

  const titleMap = {
    Cardiology: 'Senior Cardiologist', Neurology: 'Consultant Neurologist',
    Pediatrics: 'Senior Paediatrician', Orthopedics: 'Orthopaedic Surgeon',
    Dermatology: 'Consultant Dermatologist', Oncology: 'Medical Oncologist',
    Psychiatry: 'Consultant Psychiatrist', 'General Medicine': 'Senior Physician',
    Gynecology: 'Gynaecologist & Obstetrician', Gastroenterology: 'Gastroenterologist',
    Ophthalmology: 'Ophthalmologist', Urology: 'Urologist',
    Endocrinology: 'Consultant Endocrinologist', Pulmonology: 'Pulmonologist',
  };

  return (
    <div className="dp-page">
      <style>{styles}</style>
      <Header />

      {/* Breadcrumb */}
      <div className="dp-breadcrumb">
        <div className="dp-breadcrumb-inner">
          <a onClick={() => navigate('/')}>Home</a>
          <span className="dp-breadcrumb-sep">›</span>
          <a onClick={() => navigate('/doctors')}>Find a Doctor</a>
          <span className="dp-breadcrumb-sep">›</span>
          <span className="dp-breadcrumb-current">{doctor.name}</span>
        </div>
      </div>

      {/* Layout */}
      <div className="dp-layout">

        {/* ── LEFT ── */}
        <div className="dp-left">

          {/* Stats Row */}
          <div className="dp-stats-row">
            <div className="dp-stat-box">
              <div className="dp-stat-val">{doctor.experience}+</div>
              <div className="dp-stat-lbl">Years Exp.</div>
            </div>
            <div className="dp-stat-box">
              <div className="dp-stat-val">{doctor.reviews}</div>
              <div className="dp-stat-lbl">Reviews</div>
            </div>
            <div className="dp-stat-box">
              <div className="dp-stat-val">{doctor.rating}</div>
              <div className="dp-stat-lbl">Rating</div>
            </div>
          </div>

          {/* Profile Card */}
          <div className="dp-profile-card">
            <div className="dp-profile-header">
              <img src={doctor.img} alt={doctor.name} className="dp-profile-img" />
              <div className="dp-profile-header-info">
                <div className="dp-profile-name">{doctor.name}, MD</div>
                <div className="dp-profile-title">{titleMap[doctor.specialty] || doctor.specialty}</div>
                <div className="dp-profile-rating-row">
                  {[1,2,3,4,5].map(i => i <= Math.floor(doctor.rating) ? <StarIcon key={i}/> : <StarOutlineIcon key={i}/>)}
                  <span className="dp-profile-rating-score">{doctor.rating}</span>
                  <span className="dp-profile-rating-label">({doctor.reviews} verified reviews)</span>
                </div>
                <div className="dp-profile-chips">
                  <span className="dp-chip"><BriefcaseIcon /> {doctor.experience}+ Years</span>
                  <span className="dp-chip"><GlobeIcon /> {doctor.languages.join(', ')}</span>
                  <span className="dp-chip"><MapPinIcon /> {doctor.city}</span>
                </div>
              </div>
            </div>

            <div className="dp-profile-actions">
              <button
                className={`dp-like-btn ${liked ? 'liked' : ''}`}
                onClick={() => setLiked(!liked)}
              >
                <HeartIcon />
                {liked ? 'Saved' : 'Save'}
              </button>
            </div>

            {/* Tabs */}
            <div className="dp-tabs">
              {['about','reviews'].map(t => (
                <button key={t} className={`dp-tab ${activeTab === t ? 'active' : ''}`} onClick={() => setActiveTab(t)}>
                  {t.charAt(0).toUpperCase() + t.slice(1)}
                </button>
              ))}
            </div>

            <div className="dp-tab-content">
              {activeTab === 'about' && (
                <>
                  <div className="dp-section-title">Professional Summary</div>
                  <p className="dp-about-text">{doctor.about}</p>

                  <div className="dp-section-title">Specialties</div>
                  <div className="dp-specialty-tags">
                    {doctor.specialties.map((s,i) => <span key={i} className="dp-specialty-tag">{s}</span>)}
                  </div>

                  <div className="dp-section-title">Education &amp; Training</div>
                  <div className="dp-edu-list">
                    <div className="dp-edu-item">
                      <div className="dp-edu-icon"><GraduationIcon /></div>
                      <div>
                        <h4>{doctor.education.split('–')[1]?.trim() || 'Medical College'}</h4>
                        <p>{doctor.education.split('–')[0]?.trim()}</p>
                      </div>
                    </div>
                    <div className="dp-edu-item">
                      <div className="dp-edu-icon"><HospitalIcon /></div>
                      <div>
                        <h4>{doctor.hospital}</h4>
                        <p>Residency &amp; Clinical Training &middot; {doctor.city}</p>
                      </div>
                    </div>
                  </div>
                </>
              )}

              {activeTab === 'reviews' && (
                <>
                  <div className="dp-reviews-header">
                    <div className="dp-section-title" style={{marginBottom:0}}>Patient Reviews</div>
                    <a className="dp-see-all">See all {doctor.reviews} reviews</a>
                  </div>
                  {reviewPool.slice(0,4).map((r,i) => (
                    <div key={i} className="dp-review-card">
                      <div className="dp-review-top">
                        <span className="dp-reviewer-name">{r.name}</span>
                        <span className="dp-review-stars">{[1,2,3,4,5].map(s => s <= r.stars ? <StarIcon key={s}/> : <StarOutlineIcon key={s}/>)}</span>
                      </div>
                      <p className="dp-review-text">"{r.text}"</p>
                      <span className="dp-review-date">{r.date}</span>
                    </div>
                  ))}
                </>
              )}
            </div>
          </div>

        </div>

        {/* ── RIGHT SIDEBAR ── */}
        <div className="dp-right">

          {/* Booking Card */}
          <div className="dp-booking-card">
            <div className="dp-booking-header">
              <h3>Book an Appointment</h3>
              <div>
                <div className="dp-booking-avail">Next Available</div>
                <div className="dp-booking-date">{doctor.available ? 'Tomorrow, 10:30 AM' : 'In 3 Days'}</div>
              </div>
            </div>
            <div className="dp-booking-body">
              <div className="dp-fee-row">
                <RupeeIcon />
                <span className="dp-fee-label">Consultation Fee</span>
                <span className="dp-fee-amount">₹{doctor.fee}</span>
              </div>
              <button
                className={`dp-book-btn ${booked ? 'booked' : ''}`}
                onClick={() => setBooked(!booked)}
              >
                {booked ? <><CheckCircleIcon /> Appointment Booked!</> : <><CalendarIcon /> Request Appointment</>}
              </button>
              <button className="dp-video-btn"><VideoIcon /> Video Consultation</button>
              <div className="dp-book-note"><CheckCircleIcon /> No payment required for booking</div>
            </div>
          </div>

          {/* Schedule */}
          <div className="dp-schedule-card">
            <div className="dp-schedule-header">
              <CalendarIcon />
              <h3>Weekly Schedule</h3>
            </div>
            <div className="dp-schedule-rows">
              {schedule.map((s,i) => (
                <div key={i} className="dp-schedule-row">
                  <span className="dp-schedule-day">{s.day}</span>
                  {s.closed
                    ? <span className="dp-schedule-closed">CLOSED</span>
                    : s.emergency
                    ? <span className="dp-schedule-emergency">{s.time}</span>
                    : <span className="dp-schedule-time">{s.time}</span>
                  }
                </div>
              ))}
            </div>
          </div>

          {/* Hospital Info */}
          <div className="dp-hospital-card">
            <h3><HospitalIcon /> Location</h3>
            <div className="dp-hospital-name">{doctor.hospital}</div>
            <div className="dp-hospital-addr">
              <MapPinIcon />
              <span>Medical Complex, {doctor.city}, India</span>
            </div>
            <div className="dp-hospital-contact">
              <div className="dp-hospital-contact-item"><PhoneIcon /> 1800-HEAL-NOW</div>
              <div className="dp-hospital-contact-item"><GlobeIcon /> www.healnow.in</div>
            </div>
            <button className="dp-directions-btn"><MapPinIcon /> Get Directions</button>
          </div>

        </div>
      </div>

      <Footer />
    </div>
  );
}