import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [loading, setLoading] = useState(false);
  const [showCreateDoctor, setShowCreateDoctor] = useState(false);

  const [stats, setStats] = useState({
    totalDoctors: 0,
    totalCareSeekers: 0,
    totalAppointments: 0,
    todayAppointments: 0,
    totalRevenue: 0
  });

  const [doctors, setDoctors] = useState([]);
  const [seekers, setSeekers] = useState([]);
  const [appointments, setAppointments] = useState([]);
  const [successMessage, setSuccessMessage] = useState('');
  const [showSuccess, setShowSuccess] = useState(false);
  const [doctorForm, setDoctorForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    phone: '',
    gender: '',
    specialization: '',
    experience: '',
    qualification: '',
    consultationFee: ''
  });

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      const userData = JSON.parse(storedUser);
      if (userData.role !== 'admin') {
        navigate('/login');
      }
      setUser(userData);
    } else {
      navigate('/login');
    }
    fetchAllData();
    const interval = setInterval(fetchAllData, 10000);
    return () => clearInterval(interval);
  }, [navigate]);

  const fetchAllData = async () => {
    try {
      const token = localStorage.getItem('token');
      const statsRes = await fetch('https://hospital-management-web-application-2.onrender.com/api/admin/stats', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (statsRes.ok) {
        const data = await statsRes.json();
        if (data.success) setStats(data.data);
      }
      const doctorsRes = await fetch('https://hospital-management-web-application-2.onrender.com/api/admin/doctors', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (doctorsRes.ok) {
        const data = await doctorsRes.json();
        if (data.success) setDoctors(data.data);
      }
      const seekersRes = await fetch('https://hospital-management-web-application-2.onrender.com/api/admin/seekers', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (seekersRes.ok) {
        const data = await seekersRes.json();
        if (data.success) setSeekers(data.data);
      }
      const appointmentsRes = await fetch('https://hospital-management-web-application-2.onrender.com/api/admin/appointments', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (appointmentsRes.ok) {
        const data = await appointmentsRes.json();
        if (data.success) setAppointments(data.data);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const createDoctor = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      const payload = {
        firstName: doctorForm.firstName,
        lastName: doctorForm.lastName,
        email: doctorForm.email,
        password: doctorForm.password,
        phone: doctorForm.phone,
        specialization: doctorForm.specialization,
        experience: doctorForm.experience,
        qualification: doctorForm.qualification,
        consultationFee: doctorForm.consultationFee
      };

      const response = await fetch('https://hospital-management-web-application-2.onrender.com/api/admin/create-doctor', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(payload)
      });
      const data = await response.json();
      if (data.success) {
        setSuccessMessage(`Doctor created!\nEmail: ${doctorForm.email}\nPassword: *********`);
        setShowSuccess(true);
        setTimeout(() => setShowSuccess(false), 3000);
        setDoctorForm({firstName: '', lastName: '', email: '', password: '', phone: '', specialization: '', experience: '', qualification: '', consultationFee: ''});
        setShowCreateDoctor(false);
        fetchAllData();
      } else {
        alert('Error: ' + data.message);
      }
    } catch (error) {
      alert('Error creating doctor: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  const deleteDoctor = async (doctorId) => {
    if (!window.confirm('Are you sure?')) return;
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`https://hospital-management-web-application-2.onrender.com/api/admin/doctor/${doctorId}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (response.ok) fetchAllData();
    } catch (error) {
      alert('Error deleting doctor');
    }
  };

  const deleteSeeker = async (seekerId) => {
    if (!window.confirm('Are you sure?')) return;
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`https://hospital-management-web-application-2.onrender.com/api/admin/seeker/${seekerId}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (response.ok) fetchAllData();
    } catch (error) {
      alert('Error deleting seeker');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  // SVG ICONS
  const HealthIcon = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm3.5-9c.83 0 1.5-.67 1.5-1.5S16.33 8 15.5 8 14 8.67 14 9.5s.67 1.5 1.5 1.5zm-7 0c.83 0 1.5-.67 1.5-1.5S9.33 8 8.5 8 7 8.67 7 9.5 7.67 11 8.5 11zm3.5 6.5c2.33 0 4.31-1.46 5.11-3.5H6.89c.8 2.04 2.78 3.5 5.11 3.5z"/>
    </svg>
  );

  const DashboardIcon = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="3" width="7" height="7"></rect>
      <rect x="14" y="3" width="7" height="7"></rect>
      <rect x="14" y="14" width="7" height="7"></rect>
      <rect x="3" y="14" width="7" height="7"></rect>
    </svg>
  );
const DoctorIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="8" r="4"></circle>
    <path d="M12 14c-4 0-7 2-7 5v3h14v-3c0-3-3-5-7-5z"></path>
    <path d="M12 14l3-3"></path>
  </svg>
);
  const PatientIcon = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
      <circle cx="9" cy="7" r="4"></circle>
      <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
      <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
    </svg>
  );

  const CalendarIcon = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
      <path d="M16 2v4"></path>
      <path d="M8 2v4"></path>
      <line x1="3" y1="10" x2="21" y2="10"></line>
    </svg>
  );

  const ReportIcon = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="18" y1="20" x2="18" y2="10"></line>
      <line x1="12" y1="20" x2="12" y2="4"></line>
      <line x1="6" y1="20" x2="6" y2="14"></line>
    </svg>
  );

  const LogoutIcon = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
      <polyline points="16 8 20 12 16 16"></polyline>
      <line x1="9" y1="12" x2="20" y2="12"></line>
    </svg>
  );

  const PlusIcon = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="12" y1="5" x2="12" y2="19"></line>
      <line x1="5" y1="12" x2="19" y2="12"></line>
    </svg>
  );

  const TrashIcon = () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="3 6 5 6 21 6"></polyline>
      <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
      <line x1="10" y1="11" x2="10" y2="17"></line>
      <line x1="14" y1="11" x2="14" y2="17"></line>
    </svg>
  );

  return (
    <>
      <style>{`
        * { margin: 0; padding: 0; box-sizing: border-box; }
        html, body { height: 100%; background: #f5f8f8; }
        button { font-family: inherit; cursor: pointer; border: none; transition: 0.3s; }
        input, select { font-family: inherit; }
      `}</style>

      <div style={{ display: 'flex', height: '100vh', background: '#f5f8f8', fontFamily: "'Inter', sans-serif", color: '#333' }}>
        
        {/* SIDEBAR */}
        <aside style={{ width: '220px', background: 'white', borderRight: '1px solid #e0e0e0', display: 'flex', flexDirection: 'column', position: 'fixed', height: '100vh', overflowY: 'auto' }}>
          
          {/* LOGO */}
          <div style={{ padding: '1.5rem', borderBottom: '1px solid #e0e0e0', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <svg width="42" height="42" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" style={{ display: 'inline-block', flexShrink: 0 }}>
              <defs>
                <linearGradient id="hgSidebar" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" style={{ stopColor: '#1a6b63', stopOpacity: 1 }} />
                  <stop offset="100%" style={{ stopColor: '#0f4440', stopOpacity: 1 }} />
                </linearGradient>
              </defs>
              <path d="M50 85 C20 70, 5 55, 5 40 C5 25, 15 15, 25 15 C35 15, 45 25, 50 32 C55 25, 65 15, 75 15 C85 15, 95 25, 95 40 C95 55, 80 70, 50 85 Z" fill="url(#hgSidebar)" />
              <path d="M 25 45 L 35 45 L 38 35 L 42 55 L 45 50 L 60 50 L 65 40 L 75 45 L 85 45" stroke="#FF7A45" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
              <g transform="translate(70, 20)">
                <rect x="-8" y="-8" width="16" height="16" fill="#FF7A45" rx="2" />
                <line x1="-4" y1="0" x2="4" y2="0" stroke="white" strokeWidth="2" strokeLinecap="round" />
                <line x1="0" y1="-4" x2="0" y2="4" stroke="white" strokeWidth="2" strokeLinecap="round" />
              </g>
            </svg>
            <div>
              <div style={{ fontSize: '1rem', fontWeight: 800, background: 'linear-gradient(135deg, #0d5450 0%, #1a6b63 50%, #FF7A45 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text', lineHeight: 1, letterSpacing: '0.5px' }}>HealNow</div>
              <div style={{ fontSize: '0.65rem', color: '#999', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.8px', marginTop: '2px' }}>Hospital Admin</div>
            </div>
          </div>

          {/* NAV MENU */}
          <nav style={{ flex: 1, padding: '0.5rem', display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
            {[
              { id: 'dashboard', name: 'Dashboard', icon: DashboardIcon },
              { id: 'doctors', name: 'Doctors', icon: DoctorIcon },
              { id: 'seekers', name: 'Care Seekers', icon: PatientIcon },
              { id: 'appointments', name: 'Appointments', icon: CalendarIcon },
              { id: 'reports', name: 'Reports', icon: ReportIcon }
            ].map(item => {
              const Icon = item.icon;
              return (
                <button key={item.id} onClick={() => setActiveTab(item.id)} style={{
                  padding: '0.85rem 1rem', borderRadius: '8px', textAlign: 'left', fontSize: '0.95rem',
                  background: activeTab === item.id ? '#f0f9f8' : 'transparent',
                  color: activeTab === item.id ? '#1F6F64' : '#666',
                  fontWeight: activeTab === item.id ? 600 : 500,
                  display: 'flex', alignItems: 'center', gap: '0.75rem'
                }}>
                  <Icon />
                  {item.name}
                </button>
              );
            })}
          </nav>

          {/* LOGOUT */}
          <div style={{ padding: '1.5rem', borderTop: '1px solid #e0e0e0' }}>
            <button onClick={handleLogout} style={{
              width: '100%', padding: '0.75rem', background: '#FF6B5C', color: 'white',
              borderRadius: '8px', fontWeight: 600, fontSize: '0.9rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem'
            }}>
              <LogoutIcon />
              Logout
            </button>
          </div>
        </aside>

        {/* MAIN CONTENT */}
        <main style={{ marginLeft: '220px', width: 'calc(100% - 220px)', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
          
          {/* HEADER */}
          <header style={{ background: 'white', padding: '1.5rem 2rem', borderBottom: '1px solid #e0e0e0', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexShrink: 0 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>

            </div>
            <div style={{ textAlign: 'right' }}>
              <div style={{ fontSize: '0.95rem', fontWeight: 600, margin: '0 0 0.25rem 0' }}> {user?.firstName || 'Admin'} {user?.lastName || 'User'}</div>
              <div style={{ fontSize: '0.85rem', color: '#999', margin: 0 }}>Chief Administrator</div>
            </div>
          </header>

          {/* CONTENT */}
          <div style={{ flex: 1, overflowY: 'auto', padding: '2rem' }}>
            
            {/* DASHBOARD */}
            {activeTab === 'dashboard' && (
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.5rem' }}>
                <Card title="Total Doctors" value={stats.totalDoctors} icon={<DoctorIcon />} color="#1F6F64" />
                <Card title="Total Care Seekers" value={stats.totalCareSeekers} icon={<PatientIcon />} color="#1F6F64" />
                <Card title="Total Appointments" value={stats.totalAppointments} icon={<CalendarIcon />} color="#1F6F64" />
                <Card title="Today's Appointments" value={stats.todayAppointments} icon={<CalendarIcon />} color="#1F6F64" />
                <Card title="Total Revenue" value={'₹' + stats.totalRevenue} icon={<ReportIcon />} color="#FF6B5C" />
              </div>
            )}

            {/* DOCTORS */}
            {activeTab === 'doctors' && (
              <>
                <button onClick={() => setShowCreateDoctor(true)} style={{
                  display: 'inline-flex', alignItems: 'center', gap: '0.5rem', padding: '0.75rem 1.5rem',
                  background: '#1F6F64', color: 'white', borderRadius: '8px', fontWeight: 600, marginBottom: '1.5rem'
                }}>
                  <PlusIcon />
                  Create New Doctor
                </button>
                <Table headers={['NAME', 'EMAIL', 'SPECIALIZATION', 'EXPERIENCE', 'FEE', 'ACTIONS']} rows={doctors.map(d => [
                  <b>{d.firstName} {d.lastName}</b>,
                  d.email,
                  <span style={{ background: '#f0f9f8', color: '#1F6F64', padding: '0.3rem 0.75rem', borderRadius: '20px', fontSize: '0.85rem', fontWeight: 600 }}>{d.specialization}</span>,
                  d.experience + ' years',
                  '₹' + d.consultationFee,
                  <button onClick={() => deleteDoctor(d._id)} style={{ padding: '0.5rem 1rem', background: '#FF6B6B', color: 'white', borderRadius: '6px', fontWeight: 600, fontSize: '0.85rem', cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}><TrashIcon /> Delete</button>
                ])} />
              </>
            )}

            {/* CARE SEEKERS */}
            {activeTab === 'seekers' && (
              <>
                <button style={{
                  display: 'inline-flex', alignItems: 'center', gap: '0.5rem', padding: '0.75rem 1.5rem',
                  background: '#1F6F64', color: 'white', borderRadius: '8px', fontWeight: 600, marginBottom: '1.5rem'
                }}>
                  <PlusIcon />
                  Create Care Seeker
                </button>
                <Table headers={['NAME', 'EMAIL', 'PHONE', 'REGISTERED DATE', 'ACTIONS']} rows={seekers.map(s => [
                  <b>{s.firstName} {s.lastName}</b>,
                  s.email,
                  s.phone,
                  new Date(s.createdAt).toLocaleDateString(),
                  <button onClick={() => deleteSeeker(s._id)} style={{ padding: '0.5rem 1rem', background: '#FF6B6B', color: 'white', borderRadius: '6px', fontWeight: 600, fontSize: '0.85rem', cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}><TrashIcon /> Delete</button>
                ])} />
              </>
            )}

            {/* APPOINTMENTS */}
            {activeTab === 'appointments' && (
              <Table headers={['PATIENT', 'DOCTOR', 'DATE', 'TIME', 'STATUS']} rows={appointments.map(a => [
                <b>{a.patientName}</b>,
                a.doctorName,
                new Date(a.appointmentDate).toLocaleDateString(),
                a.appointmentTime,
                <span style={{ background: '#e8f5e9', color: '#2e7d32', padding: '0.4rem 0.8rem', borderRadius: '4px', fontSize: '0.85rem', fontWeight: 600 }}>{a.status}</span>
              ])} />
            )}

            {/* REPORTS */}
            {activeTab === 'reports' && (
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1.5rem' }}>
                <ReportCard title="Monthly Appointments" value="" icon={<ReportIcon />} gradient={true} />
                <ReportCard title="Monthly Revenue" value="" icon={<ReportIcon />} gradient={false} />
                <ReportCard title="New Care Seekers" value="" icon={<PatientIcon />} gradient={false} />
              </div>
            )}
          </div>
        </main>

        {/* MODAL */}
        {showCreateDoctor && (
          <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000 }}>
            <div style={{ background: 'white', borderRadius: '12px', width: '90%', maxWidth: '680px', maxHeight: '90vh', overflowY: 'auto', boxShadow: '0 20px 60px rgba(0,0,0,0.3)' }}>
              <div style={{ padding: '2rem', background: '#1F6F64', color: 'white', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', borderBottom: '1px solid #e0e0e0' }}>
                <div>
                  <h2 style={{ fontSize: '1.5rem', fontWeight: 700, margin: '0 0 0.5rem 0' }}>Create New Doctor</h2>
                  <p style={{ color: '#a0c4c0', fontSize: '0.85rem', margin: 0 }}>Fill in the details to onboard a professional</p>
                </div>
                <button onClick={() => setShowCreateDoctor(false)} style={{ background: 'none', fontSize: '2rem', color: 'white', cursor: 'pointer', padding: 0, width: '32px', height: '32px' }}>×</button>
              </div>
              <form onSubmit={createDoctor} style={{ padding: '2rem', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <Input label="First Name" value={doctorForm.firstName} onChange={(v) => setDoctorForm({...doctorForm, firstName: v})} placeholder="John" />
                <Input label="Last Name" value={doctorForm.lastName} onChange={(v) => setDoctorForm({...doctorForm, lastName: v})} placeholder="Doe" />
                <Input label="Email" type="email" value={doctorForm.email} onChange={(v) => setDoctorForm({...doctorForm, email: v})} placeholder="doctor@healnow.com" />
                <Input label="Password" type="password" value={doctorForm.password} onChange={(v) => setDoctorForm({...doctorForm, password: v})} placeholder="••••••" />
                <Input label="Phone" value={doctorForm.phone} onChange={(v) => setDoctorForm({...doctorForm, phone: v})} placeholder="9876543210" />
                <Select label="Specialization" value={doctorForm.specialization} onChange={(v) => setDoctorForm({...doctorForm, specialization: v})} options={['Cardiology', 'Dermatology', 'Pediatrics', 'Neurology']} />
                <Input label="Qualifications" value={doctorForm.qualification} onChange={(v) => setDoctorForm({...doctorForm, qualification: v})} placeholder="MBBS, MD" />
                <Input label="Experience" type="number" value={doctorForm.experience} onChange={(v) => setDoctorForm({...doctorForm, experience: v})} placeholder="5" />
                <Input label="Consultation Fee" type="number" value={doctorForm.consultationFee} onChange={(v) => setDoctorForm({...doctorForm, consultationFee: v})} placeholder="100" />
                <div style={{ gridColumn: '1 / -1', display: 'flex', gap: '1rem', marginTop: '1.5rem', paddingTop: '1.5rem', borderTop: '1px solid #e0e0e0' }}>
                  <button type="button" onClick={() => setShowCreateDoctor(false)} style={{ flex: 1, padding: '0.75rem', background: '#f5f5f5', borderRadius: '8px', fontWeight: 600, cursor: 'pointer' }}>Cancel</button>
                  <button type="submit" disabled={loading} style={{ flex: 1, padding: '0.75rem', background: '#FF6B5C', color: 'white', borderRadius: '8px', fontWeight: 600, cursor: 'pointer', opacity: loading ? 0.6 : 1 }}>{loading ? 'Creating...' : 'Register Doctor'}</button>
                </div>
              </form>
            </div>
          </div>
        )}

        {showSuccess && (
          <div style={{ position: 'fixed', top: '20px', right: '20px', background: '#4CAF50', color: 'white', padding: '1.5rem', borderRadius: '8px', boxShadow: '0 4px 12px rgba(0,0,0,0.15)', zIndex: 2000, maxWidth: '400px', whiteSpace: 'pre-line' }}>
            <div style={{ fontSize: '1rem', fontWeight: 600 }}>{successMessage}</div>
          </div>
        )}
      </div>
    </>
  );
};

// HELPER COMPONENTS
const Card = ({ title, value, icon, color }) => (
  <div style={{ background: 'white', padding: '1.5rem', borderRadius: '8px', boxShadow: '0 1px 3px rgba(0,0,0,0.08)', borderLeft: `4px solid ${color}` }}>
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem', color: color }}>
      <div style={{ width: '40px', height: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{icon}</div>
      <span style={{ fontSize: '0.8rem', background: '#e8f5e9', color: '#2ecc71', padding: '0.25rem 0.5rem', borderRadius: '4px', fontWeight: 600 }}>Live</span>
    </div>
    <div style={{ fontSize: '1.75rem', fontWeight: 700, marginBottom: '0.5rem' }}>{value}</div>
    <div style={{ fontSize: '0.85rem', color: '#999' }}>{title}</div>
  </div>
);

const Table = ({ headers, rows }) => (
  <div style={{ background: 'white', borderRadius: '8px', boxShadow: '0 1px 3px rgba(0,0,0,0.08)', overflow: 'hidden' }}>
    <table style={{ width: '100%', borderCollapse: 'collapse' }}>
      <thead style={{ background: '#f8f9fa', borderBottom: '1px solid #e0e0e0' }}>
        <tr>
          {headers.map((h, i) => <th key={i} style={{ padding: '1.25rem', textAlign: 'left', fontWeight: 600, color: '#666', fontSize: '0.85rem', textTransform: 'uppercase' }}>{h}</th>)}
        </tr>
      </thead>
      <tbody>
        {rows.length > 0 ? rows.map((row, i) => (
          <tr key={i} style={{ borderBottom: '1px solid #f5f5f5' }}>
            {row.map((cell, j) => <td key={j} style={{ padding: '1.25rem', color: '#333' }}>{cell}</td>)}
          </tr>
        )) : (
          <tr><td colSpan={headers.length} style={{ padding: '2rem', textAlign: 'center', color: '#999' }}>No data found</td></tr>
        )}
      </tbody>
    </table>
  </div>
);

const ReportCard = ({ title, value, icon, gradient }) => (
  <div style={{ background: gradient ? 'linear-gradient(135deg, #1F6F64 0%, #154c45 100%)' : 'white', color: gradient ? 'white' : '#333', padding: '2rem', borderRadius: '8px', boxShadow: '0 1px 3px rgba(0,0,0,0.08)' }}>
    <div style={{ fontSize: '2rem', marginBottom: '1rem' }}>{icon}</div>
    <h3 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>{value}</h3>
    <p style={{ opacity: gradient ? 0.8 : 0.7, margin: 0 }}>{title}</p>
  </div>
);

const Input = ({ label, value, onChange, type = 'text', placeholder }) => (
  <div>
    <label style={{ display: 'block', fontWeight: 600, color: '#333', marginBottom: '0.5rem', fontSize: '0.9rem' }}>{label}</label>
    <input type={type} required value={value} onChange={(e) => onChange(e.target.value)} placeholder={placeholder} style={{ width: '100%', padding: '0.75rem 1rem', border: '2px solid #e0e0e0', borderRadius: '8px', fontSize: '0.95rem', fontFamily: 'inherit' }} />
  </div>
);

const Select = ({ label, value, onChange, options }) => (
  <div>
    <label style={{ display: 'block', fontWeight: 600, color: '#333', marginBottom: '0.5rem', fontSize: '0.9rem' }}>{label}</label>
    <select required value={value} onChange={(e) => onChange(e.target.value)} style={{ width: '100%', padding: '0.75rem 1rem', border: '2px solid #e0e0e0', borderRadius: '8px', fontSize: '0.95rem', fontFamily: 'inherit' }}>
      <option value="">Select {label}</option>
      {options.map(o => <option key={o} value={o}>{o}</option>)}
    </select>
  </div>
);

export default AdminDashboard;
