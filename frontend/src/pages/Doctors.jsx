import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';

// ─── SVG ICONS ────────────────────────────────────────────────────────────────
const SearchIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
    <circle cx="11" cy="11" r="8" stroke="currentColor" strokeWidth="2"/>
    <path d="M21 21l-4.35-4.35" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
  </svg>
);
const StarIcon = ({ filled = true }) => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill={filled ? '#F4A524' : 'none'} stroke="#F4A524" strokeWidth="1.5">
    <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26"/>
  </svg>
);
const BriefcaseIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
    <rect x="2" y="7" width="20" height="14" rx="2" stroke="currentColor" strokeWidth="2"/>
    <path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2" stroke="currentColor" strokeWidth="2"/>
  </svg>
);
const ArrowRightIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none">
    <path d="M5 12h14M12 5l7 7-7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);
const ChevronDownIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none">
    <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);
const FilterIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
    <polygon points="22,3 2,3 10,12.46 10,19 14,21 14,12.46" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);
const UserIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
    <circle cx="12" cy="7" r="4" stroke="currentColor" strokeWidth="2"/>
  </svg>
);

// ─── 50 INDIAN DOCTORS DATA ───────────────────────────────────────────────────
export const doctors = [
  { id: 1,  name: 'Dr. Priya Sharma',       specialty: 'Cardiology',       experience: 15, rating: 4.9, reviews: 312, hospital: 'AIIMS Delhi',                  city: 'New Delhi',   available: true,  gender: 'female', img: '/Dr-1.jpg?v=1',  languages: ['Hindi','English'], fee: 800,  education: 'MBBS, MD – AIIMS New Delhi',        about: 'Dr. Priya Sharma is a leading cardiologist at AIIMS Delhi with expertise in interventional cardiology and heart failure management. She has published over 40 peer-reviewed papers and is known for her patient-first approach.', specialties: ['Interventional Cardiology','Heart Failure','Echocardiography'] },
  { id: 2,  name: 'Dr. Arjun Mehta',         specialty: 'Neurology',        experience: 18, rating: 4.8, reviews: 278, hospital: 'Fortis Hospital',              city: 'Mumbai',      available: false, gender: 'male',   img: '/Dr-2.jpg?v=1',  languages: ['Hindi','English','Marathi'], fee: 1000, education: 'MBBS, DM Neurology – KEM Hospital', about: 'Dr. Arjun Mehta specialises in stroke management and epilepsy. With 18 years of clinical experience, he heads the Neuroscience department at Fortis Hospital Mumbai.', specialties: ['Stroke Management','Epilepsy','Parkinson\'s Disease'] },
  { id: 3,  name: 'Dr. Sneha Iyer',           specialty: 'Pediatrics',       experience: 10, rating: 4.9, reviews: 195, hospital: 'Apollo Hospitals',            city: 'Chennai',     available: true,  gender: 'female', img: '/Dr-3.jpg?v=1',  languages: ['Tamil','English','Hindi'], fee: 600,  education: 'MBBS, MD Pediatrics – Madras Medical College', about: 'Dr. Sneha Iyer is a compassionate paediatrician with a decade of experience treating children from newborns to adolescents. She runs a special immunisation clinic every Saturday.', specialties: ['Neonatal Care','Childhood Immunisation','Growth Disorders'] },
  { id: 4,  name: 'Dr. Rajesh Kumar',         specialty: 'Orthopedics',      experience: 20, rating: 4.7, reviews: 410, hospital: 'Medanta Medicity',            city: 'Gurugram',    available: true,  gender: 'male',   img: '/Dr-4.jpg?v=1',  languages: ['Hindi','English'], fee: 1200, education: 'MBBS, MS Ortho – PGIMER Chandigarh', about: 'Dr. Rajesh Kumar has performed over 5,000 joint replacement surgeries and is a pioneer in minimally invasive orthopaedic techniques in India.', specialties: ['Joint Replacement','Spine Surgery','Sports Injuries'] },
  { id: 5,  name: 'Dr. Ananya Krishnan',      specialty: 'Dermatology',      experience: 8,  rating: 4.8, reviews: 167, hospital: 'Manipal Hospital',            city: 'Bengaluru',   available: true,  gender: 'female', img: '/Dr-5.webp?v=2', languages: ['Kannada','English','Tamil'], fee: 700,  education: 'MBBS, MD Dermatology – Manipal University', about: 'Dr. Ananya Krishnan is an award-winning dermatologist specialising in cosmetic dermatology and skin cancer detection. She is a faculty member at Manipal University.', specialties: ['Cosmetic Dermatology','Skin Cancer','Acne Management'] },
  { id: 6,  name: 'Dr. Vikram Singh',         specialty: 'Oncology',         experience: 14, rating: 4.9, reviews: 223, hospital: 'Tata Memorial Hospital',       city: 'Mumbai',      available: false, gender: 'male',   img: '/Dr-6.jpg?v=1',  languages: ['Hindi','English','Marathi'], fee: 1500, education: 'MBBS, MD, DM Oncology – Tata Memorial Centre', about: 'Dr. Vikram Singh is a senior medical oncologist at Tata Memorial Hospital with specialisation in lung and breast cancers. He is part of several national cancer research committees.', specialties: ['Lung Cancer','Breast Oncology','Chemotherapy'] },
  { id: 7,  name: 'Dr. Meera Nair',           specialty: 'Psychiatry',       experience: 11, rating: 4.8, reviews: 142, hospital: 'NIMHANS',                     city: 'Bengaluru',   available: true,  gender: 'female', img: '/Dr-7.jpg?v=1',  languages: ['Malayalam','Kannada','English'], fee: 900,  education: 'MBBS, MD Psychiatry – NIMHANS Bengaluru', about: 'Dr. Meera Nair is a compassionate psychiatrist at NIMHANS with expertise in mood disorders, OCD, and addiction psychiatry. She is also a certified CBT therapist.', specialties: ['Mood Disorders','OCD','Addiction Psychiatry'] },
  { id: 8,  name: 'Dr. Suresh Patel',         specialty: 'General Medicine',  experience: 22, rating: 4.6, reviews: 530, hospital: 'Sterling Hospital',           city: 'Ahmedabad',   available: true,  gender: 'male',   img: '/Dr-8.jpg?v=1',  languages: ['Gujarati','Hindi','English'], fee: 500,  education: 'MBBS, MD Medicine – B.J. Medical College', about: 'Dr. Suresh Patel has over two decades of experience in general and internal medicine. He is known for his thorough diagnostic approach and patient education.', specialties: ['Diabetes Management','Hypertension','Preventive Medicine'] },
  { id: 9,  name: 'Dr. Kavita Rao',           specialty: 'Gynecology',       experience: 16, rating: 4.9, reviews: 388, hospital: 'Cloudnine Hospital',          city: 'Hyderabad',   available: true,  gender: 'female', img: '/Dr.9.png?v=1',  languages: ['Telugu','Hindi','English'], fee: 900,  education: 'MBBS, MS OBG – Osmania Medical College', about: 'Dr. Kavita Rao is a distinguished gynaecologist and obstetrician known for high-risk pregnancy management. She has delivered over 8,000 babies in her distinguished career.', specialties: ['High-Risk Pregnancy','Laparoscopic Surgery','Infertility'] },
  { id: 10, name: 'Dr. Aditya Banerjee',      specialty: 'Gastroenterology', experience: 13, rating: 4.7, reviews: 201, hospital: 'AMRI Hospital',               city: 'Kolkata',     available: false, gender: 'male',   img: '/Dr.13.jpg?v=1',  languages: ['Bengali','Hindi','English'], fee: 1100, education: 'MBBS, DM Gastroenterology – IPGMER Kolkata', about: 'Dr. Aditya Banerjee specialises in hepatology and advanced endoscopy. He heads the GI department at AMRI Hospital and is a national mentor for GI trainees.', specialties: ['Hepatology','Colonoscopy','Liver Disease'] },
  { id: 11, name: 'Dr. Lakshmi Venkatesh',    specialty: 'Ophthalmology',    experience: 9,  rating: 4.8, reviews: 176, hospital: 'Sankara Nethralaya',          city: 'Chennai',     available: true,  gender: 'female', img: '/Dr.11.webp?v=1',  languages: ['Tamil','Telugu','English'], fee: 750,  education: 'MBBS, MS Ophthalmology – JIPMER Puducherry', about: 'Dr. Lakshmi Venkatesh is a skilled ophthalmologist at Sankara Nethralaya specialising in cataract surgery and retinal diseases. She has restored sight for patients across rural Tamil Nadu through outreach camps.', specialties: ['Cataract Surgery','Retinal Disease','Glaucoma'] },
  { id: 12, name: 'Dr. Rohit Gupta',          specialty: 'Urology',          experience: 17, rating: 4.7, reviews: 259, hospital: 'Max Healthcare',              city: 'New Delhi',   available: true,  gender: 'male',   img: '/Dr.15.jpg?v=1',  languages: ['Hindi','English','Punjabi'], fee: 1300, education: 'MBBS, MS, MCh Urology – SGPGIMS Lucknow', about: 'Dr. Rohit Gupta is a senior urologist with expertise in robotic-assisted urological surgeries. He has performed over 3,000 laparoscopic procedures and trains young urologists.', specialties: ['Robotic Urology','Kidney Stones','Prostate Surgery'] },
  { id: 13, name: 'Dr. Divya Pillai',         specialty: 'Endocrinology',    experience: 12, rating: 4.9, reviews: 143, hospital: 'KIMS Hospital',               city: 'Thiruvananthapuram', available: true, gender: 'female', img: '/Dr.14.webp?v=2', languages: ['Malayalam','English'], fee: 850,  education: 'MBBS, MD, DM Endocrinology – AIIMS New Delhi', about: 'Dr. Divya Pillai is a leading endocrinologist managing complex diabetes and thyroid disorders. She is an invited speaker at several national diabetes conferences.', specialties: ['Diabetes','Thyroid Disorders','Hormonal Imbalance'] },
  { id: 14, name: 'Dr. Sanjay Mishra',        specialty: 'Pulmonology',      experience: 19, rating: 4.6, reviews: 312, hospital: 'Sir Ganga Ram Hospital',      city: 'New Delhi',   available: false, gender: 'male',   img: '/Dr.19.png?v=1',  languages: ['Hindi','English'], fee: 950,  education: 'MBBS, MD Respiratory Medicine – Maulana Azad Medical College', about: 'Dr. Sanjay Mishra has nearly two decades of experience treating chronic obstructive pulmonary disease, asthma, and interstitial lung diseases. He set up Delhi\'s first dedicated ILD clinic.', specialties: ['COPD','Asthma','Interstitial Lung Disease'] },
  { id: 15, name: 'Dr. Pooja Agarwal',        specialty: 'Cardiology',       experience: 7,  rating: 4.8, reviews: 98,  hospital: 'Kokilaben Hospital',         city: 'Mumbai',      available: true,  gender: 'female', img: '/Dr-10.webp?v=1',  languages: ['Hindi','Marathi','English'], fee: 1100, education: 'MBBS, MD, DM Cardiology – Grant Medical College', about: 'Dr. Pooja Agarwal is a dynamic young cardiologist at Kokilaben Hospital specialising in preventive cardiology and women\'s heart health. She runs a structured cardiac rehab programme.', specialties: ['Preventive Cardiology','Women\'s Heart Health','Cardiac Rehab'] },
  { id: 16, name: 'Dr. Kiran Reddy',          specialty: 'Neurology',        experience: 21, rating: 4.9, reviews: 445, hospital: 'Apollo Hospitals',           city: 'Hyderabad',   available: true,  gender: 'male',   img: '/Dr-20.jpg?v=1',  languages: ['Telugu','Hindi','English'], fee: 1200, education: 'MBBS, DM Neurology – Nizam\'s Institute of Medical Sciences', about: 'Dr. Kiran Reddy is a legendary neurologist at Apollo Hyderabad, celebrated for his groundbreaking work in stroke thrombolysis. He trained at Johns Hopkins and brought advanced neuro techniques to India.', specialties: ['Stroke Thrombolysis','Multiple Sclerosis','Movement Disorders'] },
  { id: 17, name: 'Dr. Nandita Chatterjee',   specialty: 'Dermatology',      experience: 14, rating: 4.7, reviews: 189, hospital: 'Medica Superspecialty',      city: 'Kolkata',     available: false, gender: 'female', img: '/dr-21.jpg?v=1',  languages: ['Bengali','Hindi','English'], fee: 700,  education: 'MBBS, MD Dermatology – Calcutta Medical College', about: 'Dr. Nandita Chatterjee is a senior dermatologist known for her expertise in autoimmune skin conditions and hair disorders. She is a founder member of the Dermatology Society of West Bengal.', specialties: ['Autoimmune Skin Conditions','Hair Disorders','Vitiligo'] },
  { id: 18, name: 'Dr. Harish Joshi',         specialty: 'Orthopedics',      experience: 16, rating: 4.8, reviews: 267, hospital: 'Jaypee Hospital',            city: 'Noida',       available: true,  gender: 'male',   img: '/Dr.22.jpg?v=1',  languages: ['Hindi','English'], fee: 1000, education: 'MBBS, MS Ortho – King George\'s Medical University', about: 'Dr. Harish Joshi is a renowned spine surgeon with expertise in scoliosis correction and complex spinal deformity surgery. He has performed surgeries for patients from over 20 countries.', specialties: ['Spine Surgery','Scoliosis','Disc Replacement'] },
  { id: 19, name: 'Dr. Geeta Bhatia',         specialty: 'Gynecology',       experience: 24, rating: 4.9, reviews: 612, hospital: 'Hinduja Hospital',           city: 'Mumbai',      available: true,  gender: 'female', img: '/Dr.23.jpg?v=1',  languages: ['Hindi','Marathi','Gujarati','English'], fee: 1400, education: 'MBBS, MS OBG – Grant Medical College Mumbai', about: 'Dr. Geeta Bhatia is a legend in obstetrics and gynaecology with 24 years at Hinduja Hospital. She pioneered the hospital\'s foetal medicine unit and runs a dedicated endometriosis clinic.', specialties: ['Foetal Medicine','Endometriosis','Minimally Invasive Gynaecology'] },
  { id: 20, name: 'Dr. Rajeev Nambiar',       specialty: 'General Medicine',  experience: 11, rating: 4.6, reviews: 298, hospital: 'Lakeshore Hospital',         city: 'Kochi',       available: false, gender: 'male',   img: '/Dr.24.webp?v=1',  languages: ['Malayalam','English'], fee: 550,  education: 'MBBS, MD General Medicine – Calicut Medical College', about: 'Dr. Rajeev Nambiar is a trusted general physician in Kochi with a warm bedside manner. He focuses on holistic primary care including lifestyle medicine and chronic disease prevention.', specialties: ['Lifestyle Medicine','Chronic Disease Prevention','Geriatrics'] },
  { id: 21, name: 'Dr. Sunita Verma',         specialty: 'Psychiatry',       experience: 9,  rating: 4.8, reviews: 134, hospital: 'Vimhans Hospital',           city: 'New Delhi',   available: true,  gender: 'female', img: '/DR.25.webp?v=2', languages: ['Hindi','English'], fee: 800,  education: 'MBBS, MD Psychiatry – Lady Hardinge Medical College', about: 'Dr. Sunita Verma is a child and adolescent psychiatrist at Vimhans Hospital, Delhi. She specialises in ADHD, autism spectrum disorders, and adolescent mental health.', specialties: ['Child Psychiatry','ADHD','Autism Spectrum'] },
  { id: 22, name: 'Dr. Mohan Das',            specialty: 'Gastroenterology', experience: 20, rating: 4.7, reviews: 356, hospital: 'Christian Medical College',   city: 'Vellore',     available: true,  gender: 'male',   img: '/26.jpg?v=1',  languages: ['Tamil','Telugu','English'], fee: 800,  education: 'MBBS, DM Gastroenterology – CMC Vellore', about: 'Dr. Mohan Das is a distinguished gastroenterologist at CMC Vellore, renowned for his expertise in inflammatory bowel disease and advanced endoscopy.', specialties: ['IBD','Therapeutic Endoscopy','Liver Cirrhosis'] },
  { id: 23, name: 'Dr. Preethi Subramaniam', specialty: 'Pediatrics',       experience: 6,  rating: 4.9, reviews: 87,  hospital: 'Rainbow Children\'s Hospital', city: 'Bengaluru',   available: true,  gender: 'female', img: '/27.jpg?v=1',  languages: ['Kannada','Tamil','English'], fee: 650,  education: 'MBBS, MD Pediatrics – St. John\'s Medical College', about: 'Dr. Preethi Subramaniam is a young, enthusiastic paediatrician at Rainbow Hospital Bengaluru. She has a special interest in neonatal jaundice and childhood nutrition.', specialties: ['Neonatology','Childhood Nutrition','Developmental Paediatrics'] },
  { id: 24, name: 'Dr. Amitabh Sinha',        specialty: 'Oncology',         experience: 17, rating: 4.8, reviews: 198, hospital: 'Rajiv Gandhi Cancer Institute', city: 'New Delhi', available: false, gender: 'male',   img: '/28.jpg?v=1',  languages: ['Hindi','English','Bengali'], fee: 1600, education: 'MBBS, MD, DM Oncology – PGI Chandigarh', about: 'Dr. Amitabh Sinha is a surgical oncologist at Rajiv Gandhi Cancer Institute with particular expertise in head-and-neck and gastrointestinal cancers.', specialties: ['Head & Neck Oncology','GI Cancers','Robotic Oncosurgery'] },
  { id: 25, name: 'Dr. Rekha Chandrasekar',   specialty: 'Ophthalmology',    experience: 13, rating: 4.7, reviews: 221, hospital: 'Aravind Eye Hospital',        city: 'Coimbatore',  available: true,  gender: 'female', img: '/Dr-1.jpg?v=1',  languages: ['Tamil','English'], fee: 600,  education: 'MBBS, MS Ophthalmology – PSG Institute of Medical Sciences', about: 'Dr. Rekha Chandrasekar is part of the world-renowned Aravind Eye Hospital system. She has performed over 15,000 cataract surgeries and leads vision restoration camps across Tamil Nadu.', specialties: ['Phacoemulsification','Retinal Detachment','Paediatric Ophthalmology'] },
  { id: 26, name: 'Dr. Pranav Kulkarni',      specialty: 'Cardiology',       experience: 16, rating: 4.8, reviews: 304, hospital: 'Ruby Hall Clinic',           city: 'Pune',        available: true,  gender: 'male',   img: '/Dr-2.jpg?v=1',  languages: ['Marathi','Hindi','English'], fee: 1000, education: 'MBBS, MD, DM Cardiology – BJ Medical College Pune', about: 'Dr. Pranav Kulkarni is a highly respected interventional cardiologist at Ruby Hall Clinic, Pune. He specialises in complex coronary interventions and structural heart disease.', specialties: ['Complex PCI','Structural Heart Disease','Cardiac CT'] },
  { id: 27, name: 'Dr. Sarika Mathur',        specialty: 'Endocrinology',    experience: 10, rating: 4.8, reviews: 156, hospital: 'Medanta Medicity',           city: 'Gurugram',    available: false, gender: 'female', img: '/Dr-3.jpg?v=1',  languages: ['Hindi','English'], fee: 900,  education: 'MBBS, MD, DM Endocrinology – PGIMER Chandigarh', about: 'Dr. Sarika Mathur is a dedicated endocrinologist with a focus on bone metabolism disorders and adrenal diseases, in addition to comprehensive diabetes management.', specialties: ['Osteoporosis','Adrenal Disorders','Type 1 Diabetes'] },
  { id: 28, name: 'Dr. Gaurav Tiwari',        specialty: 'Urology',          experience: 12, rating: 4.7, reviews: 178, hospital: 'Sanjay Gandhi PGI',          city: 'Lucknow',     available: true,  gender: 'male',   img: '/Dr-4.jpg?v=1',  languages: ['Hindi','English'], fee: 800,  education: 'MBBS, MS, MCh Urology – SGPGI Lucknow', about: 'Dr. Gaurav Tiwari is a senior urologist at SGPGI Lucknow known for his expertise in laparoscopic kidney surgery and paediatric urology.', specialties: ['Paediatric Urology','Laparoscopic Nephrectomy','PCNL'] },
  { id: 29, name: 'Dr. Madhuri Gokhale',      specialty: 'Pulmonology',      experience: 15, rating: 4.9, reviews: 241, hospital: 'Deenanath Mangeshkar Hospital', city: 'Pune',      available: true,  gender: 'female', img: '/Dr-5.webp?v=2', languages: ['Marathi','Hindi','English'], fee: 850,  education: 'MBBS, MD Pulmonary Medicine – BJ Medical College', about: 'Dr. Madhuri Gokhale is a pulmonologist with extensive experience in sleep medicine and thoracic oncology. She established Pune\'s first dedicated sleep disorders clinic.', specialties: ['Sleep Disorders','Thoracic Oncology','Pulmonary Fibrosis'] },
  { id: 30, name: 'Dr. Deepak Anand',         specialty: 'Neurology',        experience: 8,  rating: 4.7, reviews: 112, hospital: 'Manipal Hospital',           city: 'Bengaluru',   available: true,  gender: 'male',   img: '/Dr-6.jpg?v=1',  languages: ['Kannada','Hindi','English'], fee: 1000, education: 'MBBS, DM Neurology – NIMHANS Bengaluru', about: 'Dr. Deepak Anand is a young and dynamic neurologist specialising in headache disorders and neuroimmunology. He runs a dedicated migraine clinic at Manipal Hospital.', specialties: ['Migraine','Neuroimmunology','Dementia'] },
  { id: 31, name: 'Dr. Rupa Ghosh',           specialty: 'Gynecology',       experience: 18, rating: 4.8, reviews: 427, hospital: 'AMRI Hospital',              city: 'Kolkata',     available: false, gender: 'female', img: '/Dr-7.jpg?v=1',  languages: ['Bengali','Hindi','English'], fee: 950,  education: 'MBBS, MS OBG – Medical College Kolkata', about: 'Dr. Rupa Ghosh is a renowned gynaecologist at AMRI Kolkata with expertise in advanced laparoscopic procedures and reproductive medicine.', specialties: ['Reproductive Medicine','PCOS','Hysteroscopy'] },
  { id: 32, name: 'Dr. Ashok Pillai',         specialty: 'Orthopedics',      experience: 23, rating: 4.6, reviews: 512, hospital: 'Amrita Institute',           city: 'Kochi',       available: true,  gender: 'male',   img: '/Dr-8.jpg?v=1',  languages: ['Malayalam','English'], fee: 1100, education: 'MBBS, MS Ortho – Calicut Medical College', about: 'Dr. Ashok Pillai is a veteran orthopaedic surgeon at Amrita Institute with over two decades of experience in hip and knee arthroplasty.', specialties: ['Hip Replacement','Knee Arthroplasty','Trauma Surgery'] },
  { id: 33, name: 'Dr. Neha Kapoor',          specialty: 'Dermatology',      experience: 7,  rating: 4.9, reviews: 143, hospital: 'Fortis Memorial',            city: 'Gurugram',    available: true,  gender: 'female', img: '/Dr-1.jpg?v=1',  languages: ['Hindi','Punjabi','English'], fee: 800,  education: 'MBBS, MD Dermatology – MAMC New Delhi', about: 'Dr. Neha Kapoor is a cosmetic and clinical dermatologist at Fortis Memorial who blends evidence-based medicine with aesthetic excellence. She is the youngest dermatologist to receive the Delhi Medical Association award.', specialties: ['Laser Dermatology','Psoriasis','Aesthetic Procedures'] },
  { id: 34, name: 'Dr. Venkatesh Murthy',     specialty: 'Cardiology',       experience: 26, rating: 4.9, reviews: 578, hospital: 'Sri Jayadeva Institute',     city: 'Bengaluru',   available: true,  gender: 'male',   img: '/Dr-2.jpg?v=1',  languages: ['Kannada','Telugu','English'], fee: 1300, education: 'MBBS, MD, DM Cardiology – Bangalore Medical College', about: 'Dr. Venkatesh Murthy is a cardiologist of national repute at Sri Jayadeva Institute. He has pioneered cardiac catheterisation techniques and has trained over 200 cardiology fellows.', specialties: ['Cardiac Catheterisation','Valvular Heart Disease','Electrophysiology'] },
  { id: 35, name: 'Dr. Anjali Tripathi',      specialty: 'Psychiatry',       experience: 13, rating: 4.8, reviews: 167, hospital: 'KGMU',                       city: 'Lucknow',     available: false, gender: 'female', img: '/Dr-3.jpg?v=1',  languages: ['Hindi','English'], fee: 700,  education: 'MBBS, MD Psychiatry – King George\'s Medical University', about: 'Dr. Anjali Tripathi is a consultant psychiatrist at KGMU known for her expertise in schizophrenia and bipolar disorder. She also runs a rural mental health outreach programme in Uttar Pradesh.', specialties: ['Schizophrenia','Bipolar Disorder','Geriatric Psychiatry'] },
  { id: 36, name: 'Dr. Manoj Sharma',         specialty: 'General Medicine',  experience: 14, rating: 4.7, reviews: 341, hospital: 'SMS Hospital',               city: 'Jaipur',      available: true,  gender: 'male',   img: '/Dr-4.jpg?v=1',  languages: ['Rajasthani','Hindi','English'], fee: 450,  education: 'MBBS, MD Medicine – SMS Medical College Jaipur', about: 'Dr. Manoj Sharma is a general physician at SMS Hospital Jaipur, well-known for his expertise in infectious diseases and tropical medicine.', specialties: ['Infectious Disease','Tropical Medicine','Typhoid Management'] },
  { id: 37, name: 'Dr. Priya Desai',          specialty: 'Oncology',         experience: 11, rating: 4.8, reviews: 189, hospital: 'HCG Cancer Centre',          city: 'Ahmedabad',   available: true,  gender: 'female', img: '/Dr-5.webp?v=2', languages: ['Gujarati','Hindi','English'], fee: 1400, education: 'MBBS, MD, DM Medical Oncology – Gujarat Cancer Society', about: 'Dr. Priya Desai is a medical oncologist at HCG Cancer Centre Ahmedabad with expertise in haematological malignancies and targeted therapies.', specialties: ['Haematological Oncology','Targeted Therapy','Bone Marrow Transplant'] },
  { id: 38, name: 'Dr. Suresh Babu',          specialty: 'Gastroenterology', experience: 17, rating: 4.7, reviews: 286, hospital: 'Vijaya Hospital',            city: 'Chennai',     available: false, gender: 'male',   img: '/Dr-6.jpg?v=1',  languages: ['Tamil','English'], fee: 950,  education: 'MBBS, DM Gastroenterology – Madras Medical College', about: 'Dr. Suresh Babu is a senior gastroenterologist at Vijaya Hospital Chennai known for his expertise in ERCP, EUS and management of complex biliary diseases.', specialties: ['ERCP','Endoscopic Ultrasound','Pancreatic Disease'] },
  { id: 39, name: 'Dr. Lalitha Menon',        specialty: 'Pediatrics',       experience: 19, rating: 4.9, reviews: 498, hospital: 'SAT Hospital',               city: 'Thiruvananthapuram', available: true, gender: 'female', img: '/Dr-7.jpg?v=1',  languages: ['Malayalam','English'], fee: 600,  education: 'MBBS, MD Pediatrics – Government Medical College Thiruvananthapuram', about: 'Dr. Lalitha Menon is a beloved paediatrician at SAT Hospital with nearly two decades of experience in paediatric critical care and infectious diseases.', specialties: ['Paediatric Critical Care','Infectious Diseases','Neonatology'] },
  { id: 40, name: 'Dr. Vivek Choudhary',      specialty: 'Neurology',        experience: 15, rating: 4.7, reviews: 233, hospital: 'SGPGI',                     city: 'Lucknow',     available: true,  gender: 'male',   img: '/Dr-8.jpg?v=1',  languages: ['Hindi','English'], fee: 1000, education: 'MBBS, DM Neurology – Sanjay Gandhi PGI', about: 'Dr. Vivek Choudhary is a neurologist at SGPGI Lucknow with special expertise in neuromuscular diseases and electromyography.', specialties: ['Neuromuscular Diseases','EMG/NCS','Peripheral Neuropathy'] },
  { id: 41, name: 'Dr. Shweta Doshi',         specialty: 'Endocrinology',    experience: 8,  rating: 4.8, reviews: 119, hospital: 'Kokilaben Hospital',         city: 'Mumbai',      available: true,  gender: 'female', img: '/Dr-1.jpg?v=1',  languages: ['Gujarati','Marathi','Hindi','English'], fee: 1000, education: 'MBBS, MD, DM Endocrinology – KEM Hospital Mumbai', about: 'Dr. Shweta Doshi is a young, passionate endocrinologist at Kokilaben Hospital with expertise in polycystic ovary syndrome, obesity medicine, and complex diabetes.', specialties: ['PCOS','Obesity Medicine','Gestational Diabetes'] },
  { id: 42, name: 'Dr. Naresh Yadav',         specialty: 'Urology',          experience: 20, rating: 4.6, reviews: 378, hospital: 'AIIMS Delhi',               city: 'New Delhi',   available: false, gender: 'male',   img: '/Dr-2.jpg?v=1',  languages: ['Hindi','English'], fee: 1200, education: 'MBBS, MS, MCh Urology – AIIMS New Delhi', about: 'Dr. Naresh Yadav is a professor of urology at AIIMS Delhi and a national authority on urological cancers and reconstructive urology.', specialties: ['Urological Cancers','Reconstructive Urology','Uro-Oncology'] },
  { id: 43, name: 'Dr. Bhavana Krishnaswamy', specialty: 'Dermatology',      experience: 11, rating: 4.7, reviews: 198, hospital: 'JSS Hospital',               city: 'Mysuru',      available: true,  gender: 'female', img: '/Dr-3.jpg?v=1',  languages: ['Kannada','Tamil','English'], fee: 650,  education: 'MBBS, MD Dermatology – JSS Medical College', about: 'Dr. Bhavana Krishnaswamy is a dermatologist at JSS Hospital Mysuru with a special interest in paediatric dermatology and phototherapy for chronic skin conditions.', specialties: ['Paediatric Dermatology','Phototherapy','Lichen Planus'] },
  { id: 44, name: 'Dr. Ramesh Iyer',          specialty: 'Pulmonology',      experience: 13, rating: 4.8, reviews: 212, hospital: 'Apollo Hospitals',           city: 'Chennai',     available: true,  gender: 'male',   img: '/Dr-4.jpg?v=1',  languages: ['Tamil','English'], fee: 900,  education: 'MBBS, MD Respiratory Medicine – Madras Medical College', about: 'Dr. Ramesh Iyer is a pulmonologist at Apollo Chennai with expertise in bronchoscopy, mechanical ventilation, and critical care pulmonology.', specialties: ['Critical Care Pulmonology','Bronchoscopy','Mechanical Ventilation'] },
  { id: 45, name: 'Dr. Smita Saxena',         specialty: 'Gynecology',       experience: 20, rating: 4.9, reviews: 543, hospital: 'Medanta Medicity',           city: 'Gurugram',    available: true,  gender: 'female', img: '/Dr-5.webp?v=2', languages: ['Hindi','Punjabi','English'], fee: 1500, education: 'MBBS, MS OBG – Lady Hardinge Medical College Delhi', about: 'Dr. Smita Saxena is an eminent gynaecologist at Medanta with expertise in gynaecological oncology and advanced robotic surgery. She is a national committee member for gynaecological cancer guidelines.', specialties: ['Gynaecological Oncology','Robotic Surgery','Uterine Fibroids'] },
  { id: 46, name: 'Dr. Arun Krishnan',        specialty: 'Orthopedics',      experience: 9,  rating: 4.8, reviews: 154, hospital: 'Aster Medcity',             city: 'Kochi',       available: false, gender: 'male',   img: '/Dr-6.jpg?v=1',  languages: ['Malayalam','English'], fee: 950,  education: 'MBBS, MS Ortho – Amrita Institute Kochi', about: 'Dr. Arun Krishnan is a sports medicine and joint preservation specialist at Aster Medcity. He is the orthopaedic consultant to several national-level athletes and IPL cricket teams.', specialties: ['Sports Medicine','Ligament Reconstruction','Cartilage Repair'] },
  { id: 47, name: 'Dr. Leena Agarwal',        specialty: 'Psychiatry',       experience: 16, rating: 4.8, reviews: 201, hospital: 'Fortis Hospital',            city: 'Jaipur',      available: true,  gender: 'female', img: '/Dr-7.jpg?v=1',  languages: ['Hindi','English'], fee: 850,  education: 'MBBS, MD Psychiatry – SMS Medical College Jaipur', about: 'Dr. Leena Agarwal is a senior psychiatrist at Fortis Jaipur with expertise in women\'s mental health, postpartum depression, and anxiety disorders.', specialties: ['Women\'s Mental Health','Postpartum Depression','Anxiety Disorders'] },
  { id: 48, name: 'Dr. Santosh Patil',        specialty: 'Oncology',         experience: 22, rating: 4.7, reviews: 334, hospital: 'Kidwai Memorial Institute',   city: 'Bengaluru',   available: true,  gender: 'male',   img: '/Dr-8.jpg?v=1',  languages: ['Kannada','Hindi','English'], fee: 1300, education: 'MBBS, MS, MCh Surgical Oncology – Kidwai Memorial Institute', about: 'Dr. Santosh Patil is a surgical oncologist at Kidwai Memorial Institute Bengaluru with decades of expertise in colorectal and hepatobiliary cancer surgery.', specialties: ['Colorectal Surgery','Hepatobiliary Oncology','Peritoneal Malignancies'] },
  { id: 49, name: 'Dr. Champa Devi',          specialty: 'General Medicine',  experience: 28, rating: 4.8, reviews: 689, hospital: 'PGI Chandigarh',            city: 'Chandigarh',  available: true,  gender: 'female', img: '/Dr-1.jpg?v=1',  languages: ['Punjabi','Hindi','English'], fee: 600,  education: 'MBBS, MD Medicine – PGIMER Chandigarh', about: 'Dr. Champa Devi is a living legend at PGIMER Chandigarh with 28 years of experience in internal medicine. She has trained three generations of doctors and is revered for her diagnostic acumen.', specialties: ['Rheumatology','Geriatric Medicine','Complex Internal Medicine'] },
  { id: 50, name: 'Dr. Tarun Bose',           specialty: 'Gastroenterology', experience: 10, rating: 4.8, reviews: 144, hospital: 'Narayana Health',            city: 'Kolkata',     available: false, gender: 'male',   img: '/Dr-2.jpg?v=1',  languages: ['Bengali','Hindi','English'], fee: 850,  education: 'MBBS, DM Gastroenterology – IPGMER Kolkata', about: 'Dr. Tarun Bose is a gastroenterologist at Narayana Health Kolkata specialising in non-alcoholic fatty liver disease and advanced therapeutic endoscopy for early GI cancers.', specialties: ['NAFLD','Endoscopic Mucosal Resection','Hepatitis B&C'] },
];

const specialties = ['All Specialists', 'Cardiology', 'Neurology', 'Pediatrics', 'Orthopedics', 'Dermatology', 'Oncology', 'Psychiatry', 'General Medicine', 'Gynecology', 'Gastroenterology', 'Ophthalmology', 'Urology', 'Endocrinology', 'Pulmonology'];

const INITIAL_SHOW = 12;
const LOAD_MORE = 8;

export default function Doctors() {
  const navigate = useNavigate();
  const [search, setSearch] = useState('');
  const [activeSpec, setActiveSpec] = useState('All Specialists');
  const [visible, setVisible] = useState(INITIAL_SHOW);

  const filtered = useMemo(() => {
    return doctors.filter(d => {
      const matchSpec = activeSpec === 'All Specialists' || d.specialty === activeSpec;
      const q = search.toLowerCase();
      const matchSearch = !q || d.name.toLowerCase().includes(q) || d.specialty.toLowerCase().includes(q) || d.city.toLowerCase().includes(q);
      return matchSpec && matchSearch;
    });
  }, [search, activeSpec]);

  const shown = filtered.slice(0, visible);
  const hasMore = visible < filtered.length;

  const styles = `
    @import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display&family=DM+Sans:wght@400;500;600;700;800&display=swap');
    *,*::before,*::after{box-sizing:border-box;margin:0;padding:0;}
    body{font-family:'DM Sans','Segoe UI',sans-serif;}

    .doc-page { background: #f4f8f7; min-height: 100vh; }

    /* Hero */
    .doc-hero {
      background: linear-gradient(135deg, #0f4440 0%, #1a6b63 100%);
      padding: 60px 40px 50px;
    }
    .doc-hero-inner { max-width: 1280px; margin: 0 auto; }
    .doc-hero h1 { font-family:'DM Serif Display',Georgia,serif; font-size:2.8rem; color:#fff; font-weight:400; margin-bottom:10px; }
    .doc-hero p { color:rgba(255,255,255,0.75); font-size:1rem; line-height:1.7; max-width:560px; margin-bottom:32px; }

    /* Search */
    .doc-search-wrap {
      background: white;
      border-radius: 12px;
      display: flex;
      align-items: center;
      gap: 12px;
      padding: 0 16px;
      box-shadow: 0 4px 24px rgba(0,0,0,0.12);
      max-width: 640px;
    }
    .doc-search-wrap svg { color: #aaa; flex-shrink:0; }
    .doc-search-wrap input {
      flex: 1;
      border: none;
      outline: none;
      padding: 16px 0;
      font-size: 0.95rem;
      font-family: inherit;
      color: #333;
      background: transparent;
    }
    .doc-search-btn {
      padding: 10px 22px;
      background: #FF7A45;
      color: white;
      border: none;
      border-radius: 8px;
      font-weight: 700;
      font-size: 0.88rem;
      cursor: pointer;
      font-family: inherit;
      transition: background 0.2s;
      white-space: nowrap;
    }
    .doc-search-btn:hover { background: #e86a38; }

    /* Filter bar */
    .doc-filter-bar {
      background: white;
      border-bottom: 1px solid #e2ece9;
      padding: 0 40px;
      overflow-x: auto;
      scrollbar-width: none;
    }
    .doc-filter-bar::-webkit-scrollbar { display:none; }
    .doc-filter-inner {
      max-width: 1280px;
      margin: 0 auto;
      display: flex;
      align-items: center;
      gap: 6px;
      padding: 14px 0;
    }
    .doc-filter-label {
      display: flex;
      align-items: center;
      gap: 5px;
      font-size: 0.78rem;
      font-weight: 700;
      color: #999;
      text-transform: uppercase;
      letter-spacing: 0.8px;
      margin-right: 8px;
      white-space: nowrap;
      flex-shrink: 0;
    }
    .doc-filter-btn {
      padding: 7px 18px;
      border-radius: 99px;
      border: 1.5px solid #d8e8e5;
      background: white;
      color: #666;
      font-size: 0.85rem;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.2s;
      font-family: inherit;
      white-space: nowrap;
      flex-shrink: 0;
    }
    .doc-filter-btn:hover { border-color:#1a6b63; color:#1a6b63; }
    .doc-filter-btn.active { background:#1a6b63; color:white; border-color:#1a6b63; }

    /* Main */
    .doc-main { max-width:1280px; margin:0 auto; padding:40px 40px 80px; }
    .doc-count { font-size:0.9rem; color:#888; margin-bottom:28px; font-weight:500; }
    .doc-count span { color:#1a6b63; font-weight:700; }

    /* Grid */
    .doc-grid { display:grid; grid-template-columns:repeat(4,1fr); gap:22px; }

    /* Card */
    .doc-card {
      background: white;
      border-radius: 16px;
      overflow: hidden;
      border: 1.5px solid #eef2f0;
      transition: all 0.3s cubic-bezier(0.4,0,0.2,1);
      cursor: pointer;
      position: relative;
    }
    .doc-card:hover { transform:translateY(-6px); box-shadow:0 20px 48px rgba(0,0,0,0.1); border-color:#1a6b63; }

    .doc-card-img-wrap {
      width:100%;
      height:200px;
      overflow:hidden;
      position:relative;
      background:#e8f0ee;
    }
    .doc-card-img-wrap img {
      width:100%;
      height:100%;
      object-fit:cover;
      object-position:top;
      transition:transform 0.4s ease;
    }
    .doc-card:hover .doc-card-img-wrap img { transform:scale(1.05); }

    .doc-avail-badge {
      position:absolute;
      top:12px;
      left:12px;
      background:#16a34a;
      color:white;
      font-size:0.65rem;
      font-weight:800;
      text-transform:uppercase;
      letter-spacing:0.8px;
      padding:4px 10px;
      border-radius:99px;
      display:flex;
      align-items:center;
      gap:5px;
    }
    .doc-avail-dot {
      width:6px;height:6px;
      background:white;
      border-radius:50%;
      animation:pulse-dot 1.5s infinite;
    }
    @keyframes pulse-dot{0%,100%{transform:scale(1);opacity:1;}50%{transform:scale(1.5);opacity:0.6;}}

    .doc-card-body { padding:18px; }
    .doc-specialty-tag {
      font-size:0.7rem;
      font-weight:700;
      text-transform:uppercase;
      letter-spacing:0.8px;
      color:#1a6b63;
      margin-bottom:5px;
    }
    .doc-card-name {
      font-size:1rem;
      font-weight:800;
      color:#1a2e2c;
      margin-bottom:3px;
      line-height:1.3;
    }
    .doc-card-hospital {
      font-size:0.8rem;
      color:#999;
      margin-bottom:10px;
    }
    .doc-card-meta {
      display:flex;
      align-items:center;
      justify-content:space-between;
      margin-bottom:14px;
    }
    .doc-exp {
      display:flex;
      align-items:center;
      gap:5px;
      font-size:0.78rem;
      color:#666;
      font-weight:500;
    }
    .doc-rating {
      display:flex;
      align-items:center;
      gap:4px;
      font-size:0.82rem;
      font-weight:700;
      color:#444;
    }
    .doc-rating-count { color:#aaa; font-weight:500; font-size:0.75rem; }
    .doc-card-btn {
      display:flex;
      align-items:center;
      justify-content:center;
      gap:6px;
      width:100%;
      padding:10px;
      background:transparent;
      color:#1a6b63;
      border:1.5px solid #1a6b63;
      border-radius:8px;
      font-weight:700;
      font-size:0.84rem;
      cursor:pointer;
      transition:all 0.2s;
      font-family:inherit;
    }
    .doc-card-btn:hover { background:#1a6b63; color:white; }

    /* Load more */
    .doc-load-wrap { text-align:center; margin-top:44px; }
    .doc-load-btn {
      display:inline-flex;
      align-items:center;
      gap:8px;
      padding:14px 36px;
      background:white;
      color:#1a6b63;
      border:1.5px solid #1a6b63;
      border-radius:99px;
      font-weight:700;
      font-size:0.95rem;
      cursor:pointer;
      transition:all 0.25s;
      font-family:inherit;
    }
    .doc-load-btn:hover { background:#1a6b63; color:white; }

    .doc-no-results {
      text-align:center;
      padding:80px 20px;
      color:#aaa;
    }
    .doc-no-results h3 { font-size:1.3rem; color:#555; margin-bottom:8px; }

    @media(max-width:1100px){ .doc-grid{grid-template-columns:repeat(3,1fr);} }
    @media(max-width:768px){
      .doc-grid{grid-template-columns:repeat(2,1fr);}
      .doc-hero{padding:40px 20px 36px;}
      .doc-hero h1{font-size:2rem;}
      .doc-filter-bar{padding:0 20px;}
      .doc-main{padding:28px 20px 60px;}
    }
    @media(max-width:480px){ .doc-grid{grid-template-columns:1fr;} }
  `;

  return (
    <div className="doc-page">
      <style>{styles}</style>
      <Header />

      {/* Hero */}
      <section className="doc-hero">
        <div className="doc-hero-inner">
          <h1>Our Specialists</h1>
          <p>Connect with our world-class medical professionals. Use the filters below to find the right expert for your healthcare needs.</p>
          <div className="doc-search-wrap">
            <SearchIcon />
            <input
              type="text"
              placeholder="Search by name, expertise, or city..."
              value={search}
              onChange={e => { setSearch(e.target.value); setVisible(INITIAL_SHOW); }}
            />
            <button className="doc-search-btn">Search</button>
          </div>
        </div>
      </section>

      {/* Filter Bar */}
      <div className="doc-filter-bar">
        <div className="doc-filter-inner">
          <span className="doc-filter-label"><FilterIcon /> Filters:</span>
          {specialties.map(s => (
            <button
              key={s}
              className={`doc-filter-btn ${activeSpec === s ? 'active' : ''}`}
              onClick={() => { setActiveSpec(s); setVisible(INITIAL_SHOW); }}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      {/* Main Grid */}
      <main className="doc-main">
        <p className="doc-count">Showing <span>{Math.min(visible, filtered.length)}</span> of <span>{filtered.length}</span> specialists</p>

        {filtered.length === 0 ? (
          <div className="doc-no-results">
            <h3>No doctors found</h3>
            <p>Try a different search term or filter</p>
          </div>
        ) : (
          <>
            <div className="doc-grid">
              {shown.map(doc => (
                <div key={doc.id} className="doc-card" onClick={() => navigate(`/doctors/${doc.id}`)}>
                  <div className="doc-card-img-wrap">
                    <img src={doc.img} alt={doc.name} />
                    {doc.available && (
                      <span className="doc-avail-badge">
                        <span className="doc-avail-dot" />
                        Available Today
                      </span>
                    )}
                  </div>
                  <div className="doc-card-body">
                    <div className="doc-specialty-tag">{doc.specialty}</div>
                    <div className="doc-card-name">{doc.name}</div>
                    <div className="doc-card-hospital">{doc.hospital} &middot; {doc.city}</div>
                    <div className="doc-card-meta">
                      <span className="doc-exp"><BriefcaseIcon /> {doc.experience} yrs exp.</span>
                      <span className="doc-rating">
                        <StarIcon /> {doc.rating}
                        <span className="doc-rating-count">({doc.reviews})</span>
                      </span>
                    </div>
                    <button className="doc-card-btn" onClick={e => { e.stopPropagation(); navigate(`/doctors/${doc.id}`); }}>
                      View Profile <ArrowRightIcon />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {hasMore && (
              <div className="doc-load-wrap">
                <button className="doc-load-btn" onClick={() => setVisible(v => v + LOAD_MORE)}>
                  Load More Doctors <ChevronDownIcon />
                </button>
              </div>
            )}
          </>
        )}
      </main>

      <Footer />
    </div>
  );
}