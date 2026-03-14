import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ChatWindow from '../components/ChatWindow';

const LandingPage = () => {
  const landingStyles = `
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }

    body {
      font-family: 'Segoe UI', 'Roboto', -apple-system, BlinkMacSystemFont, sans-serif;
    }

    .landing-page {
      width: 100%;
      background: #ffffff;
    }

    /* Hero Section */
    .hero-section {
      background: linear-gradient(135deg, #E8F5F3 0%, #F0F9F8 100%);
      min-height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
      position: relative;
      overflow: hidden;
      padding: 0;
      margin: 0;
    }

    .hero-container {
      max-width: 1400px;
      margin: 0 auto;
      padding: 0 40px;
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 50px;
      align-items: center;
      width: 100%;
      height: 100%;
    }

    .hero-content h1 {
      font-size: 3.2rem;
      color: #1a6b63;
      font-weight: 800;
      line-height: 1.25;
      margin-bottom: 25px;
    }

    .hero-taglines {
      display: flex;
      flex-direction: column;
      gap: 12px;
      margin-bottom: 25px;
    }

    .tagline-main {
      font-size: 2rem;
      color: #FF7A45;
      font-weight: 700;
    }

    .tagline-sub {
      font-size: 1.2rem;
      color: #1a6b63;
      font-weight: 700;
    }

    .hero-content p {
      font-size: 1.05rem;
      color: #666;
      line-height: 1.8;
      margin-bottom: 30px;
    }

    .hero-buttons-container {
      display: flex;
      gap: 20px;
      margin-bottom: 40px;
      flex-wrap: wrap;
    }

    .hero-button {
      display: flex;
      align-items: center;
      gap: 12px;
      padding: 14px 32px;
      border: none;
      border-radius: 8px;
      font-weight: 700;
      font-size: 0.95rem;
      cursor: pointer;
      transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
      text-decoration: none;
      box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
    }

    .btn-appointment {
      background: linear-gradient(135deg, #FF7A45 0%, #FF6B35 100%);
      color: white;
    }

    .btn-appointment:hover {
      transform: translateY(-3px);
      box-shadow: 0 8px 25px rgba(255, 107, 53, 0.4);
    }

    .btn-emergency {
      background: linear-gradient(135deg, #1a6b63 0%, #0f4440 100%);
      color: white;
    }

    .btn-emergency:hover {
      transform: translateY(-3px);
      box-shadow: 0 8px 25px rgba(26, 107, 99, 0.4);
    }

    .button-icon {
      width: 20px;
      height: 20px;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .hero-image {
      position: relative;
      height: 550px;
      background: transparent;
      display: flex;
      align-items: center;
      justify-content: center;
      overflow: hidden;
    }

    .hero-image img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      display: block;
    }

    /* Features Section */
    .features-below-section {
      padding: 50px 0;
      background: white;
    }

    .features-below-grid {
      max-width: 1400px;
      margin: 0 auto;
      padding: 0 40px;
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 25px;
    }

    .feature-below-card {
      padding: 30px;
      background: #FFF8F0;
      border-radius: 12px;
      text-align: center;
      border-left: 5px solid #FF7A45;
      transition: all 0.3s;
    }

    .feature-below-card.blue {
      background: #E6F4FB;
      border-left-color: #4FA3D1;
    }

    .feature-below-card.teal {
      background: #E6F5F3;
      border-left-color: #1a6b63;
    }

    .feature-below-card:hover {
      transform: translateY(-5px);
      box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
    }

    .feature-below-icon {
      font-size: 2.5rem;
      margin-bottom: 15px;
      height: 50px;
      width: 50px;
      display: flex;
      align-items: center;
      justify-content: center;
      background: rgba(255, 122, 69, 0.15);
      border-radius: 50%;
      margin-left: auto;
      margin-right: auto;
    }

    .feature-below-card.blue .feature-below-icon {
      background: rgba(79, 163, 209, 0.15);
    }

    .feature-below-card.teal .feature-below-icon {
      background: rgba(26, 107, 99, 0.15);
    }

    .feature-below-card h3 {
      font-size: 1.15rem;
      color: #1a6b63;
      margin-bottom: 10px;
      font-weight: 700;
    }

    .feature-below-card p {
      font-size: 0.9rem;
      color: #666;
      line-height: 1.6;
    }

    /* Honest Care Section */
    .honest-care-section {
      padding: 80px 0;
      background: white;
    }

    .honest-care-container {
      max-width: 1400px;
      margin: 0 auto;
      padding: 0 40px;
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 50px;
      align-items: center;
    }

    .honest-care-content h2 {
      font-size: 2.5rem;
      color: #1a6b63;
      margin-bottom: 25px;
      font-weight: 800;
      line-height: 1.3;
    }

    .honest-care-content p {
      font-size: 1rem;
      color: #666;
      line-height: 1.8;
      margin-bottom: 20px;
    }

    .care-features {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 20px;
      margin-top: 30px;
    }

    .care-feature-item {
      display: flex;
      gap: 12px;
      align-items: flex-start;
    }

    .care-feature-item .check {
      width: 24px;
      height: 24px;
      background: #FF7A45;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      color: white;
      font-size: 13px;
      font-weight: bold;
      flex-shrink: 0;
      margin-top: 2px;
    }

    .care-feature-item p {
      font-size: 0.95rem;
      color: #333;
      margin: 0;
    }

    .btn-learn-more {
      background: linear-gradient(135deg, #FF7A45 0%, #FF6B35 100%);
      color: white;
      padding: 14px 32px;
      border: none;
      border-radius: 8px;
      font-weight: 700;
      font-size: 0.95rem;
      cursor: pointer;
      transition: all 0.3s;
      text-decoration: none;
      display: inline-block;
      box-shadow: 0 4px 15px rgba(255, 107, 53, 0.3);
      margin-top: 30px;
    }

    .btn-learn-more:hover {
      transform: translateY(-3px);
      box-shadow: 0 8px 25px rgba(255, 107, 53, 0.4);
    }

    .honest-care-image {
      position: relative;
      height: 550px;
      background: #f0f0f0;
      display: flex;
      align-items: center;
      justify-content: center;
      overflow: hidden;
    }

    .honest-care-image img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      display: block;
    }

    /* Services Grid Section */
    .services-section {
      padding: 80px 0;
      background: #F5F5F5;
    }

    .section-title {
      text-align: center;
      margin-bottom: 60px;
      max-width: 1400px;
      margin-left: auto;
      margin-right: auto;
      padding: 0 40px;
    }

    .section-title h2 {
      font-size: 2.5rem;
      color: #1a6b63;
      margin-bottom: 15px;
      font-weight: 800;
    }

    .services-grid {
      max-width: 1400px;
      margin: 0 auto;
      padding: 0 40px;
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 25px;
      margin-bottom: 50px;
    }

    .service-card {
      background: white;
      padding: 35px 25px;
      border-radius: 12px;
      text-align: center;
      transition: all 0.3s;
      box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
    }

    .service-card:hover {
      transform: translateY(-8px);
      box-shadow: 0 15px 40px rgba(0, 0, 0, 0.15);
    }

    .service-card.yellow {
      background: #FFF8F0;
    }

    .service-card.blue {
      background: #E6F4FB;
    }

    .service-card.pink {
      background: #FCE4EC;
    }

    .service-card.green {
      background: #E6F5F3;
    }

    .service-icon {
      font-size: 3.5rem;
      margin-bottom: 15px;
      height: 70px;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .service-card h3 {
      font-size: 1.15rem;
      color: #1a6b63;
      margin-bottom: 12px;
      font-weight: 700;
    }

    .service-card p {
      font-size: 0.9rem;
      color: #666;
      line-height: 1.6;
    }

    .btn-view-services {
      background: linear-gradient(135deg, #FF7A45 0%, #FF6B35 100%);
      color: white;
      padding: 14px 32px;
      border: none;
      border-radius: 8px;
      font-weight: 700;
      font-size: 0.95rem;
      cursor: pointer;
      transition: all 0.3s;
      text-decoration: none;
      display: inline-block;
      box-shadow: 0 4px 15px rgba(255, 107, 53, 0.3);
    }

    .btn-view-services:hover {
      transform: translateY(-3px);
      box-shadow: 0 8px 25px rgba(255, 107, 53, 0.4);
    }

    /* Professional Network Section */
    .network-section {
      padding: 80px 0;
      background: white;
    }

    .network-container {
      max-width: 1400px;
      margin: 0 auto;
      padding: 0 40px;
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 50px;
      align-items: center;
    }

    .network-image {
      position: relative;
      height: 450px;
      background: #f0f0f0;
      display: flex;
      align-items: center;
      justify-content: center;
      overflow: hidden;
    }

    .network-image img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      display: block;
    }

    .network-content h2 {
      font-size: 2.5rem;
      color: #1a6b63;
      margin-bottom: 25px;
      font-weight: 800;
      line-height: 1.3;
    }

    .network-content p {
      font-size: 1rem;
      color: #666;
      line-height: 1.8;
      margin-bottom: 20px;
    }

    .btn-find-doctor {
      background: linear-gradient(135deg, #FF7A45 0%, #FF6B35 100%);
      color: white;
      padding: 14px 32px;
      border: none;
      border-radius: 8px;
      font-weight: 700;
      font-size: 0.95rem;
      cursor: pointer;
      transition: all 0.3s;
      text-decoration: none;
      display: inline-block;
      box-shadow: 0 4px 15px rgba(255, 107, 53, 0.3);
      margin-top: 20px;
    }

    .btn-find-doctor:hover {
      transform: translateY(-3px);
      box-shadow: 0 8px 25px rgba(255, 107, 53, 0.4);
    }

    /* Doctors Section */
    .doctors-section {
      padding: 80px 0;
      background: white;
    }

    .doctors-grid {
      max-width: 1400px;
      margin: 0 auto;
      padding: 0 40px;
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 25px;
      margin-top: 50px;
    }

    .doctor-card {
      text-align: center;
      background: #F9F9F9;
      border-radius: 12px;
      overflow: hidden;
      transition: all 0.3s;
      box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
    }

    .doctor-card:hover {
      transform: translateY(-5px);
      box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
    }

    .doctor-image {
      width: 100%;
      height: 220px;
      background: #f0f0f0;
      display: flex;
      align-items: center;
      justify-content: center;
      overflow: hidden;
    }

    .doctor-image img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      display: block;
    }

    .doctor-content {
      padding: 20px;
    }

    .doctor-card h3 {
      font-size: 1rem;
      color: #1a6b63;
      margin-bottom: 5px;
      font-weight: 700;
    }

    .doctor-card .specialty {
      font-size: 0.85rem;
      color: #FF7A45;
      margin-bottom: 8px;
      font-weight: 600;
    }

    .doctor-card .experience {
      font-size: 0.85rem;
      color: #666;
    }

    /* Experience Section */
    .experience-section {
      padding: 80px 0;
      background: linear-gradient(135deg, #1a6b63 0%, #0f4440 100%);
      color: white;
    }

    .experience-container {
      max-width: 1400px;
      margin: 0 auto;
      padding: 0 40px;
      display: grid;
      grid-template-columns: repeat(6, 1fr);
      gap: 20px;
    }

    .experience-item {
      background: rgba(255, 255, 255, 0.1);
      padding: 30px 20px;
      border-radius: 12px;
      text-align: center;
      border: 1px solid rgba(255, 255, 255, 0.2);
      transition: all 0.3s;
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 12px;
    }

    .experience-item:hover {
      background: rgba(255, 255, 255, 0.15);
      transform: translateY(-5px);
    }

    .experience-icon {
      width: 60px;
      height: 60px;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .experience-item h3 {
      font-size: 1.3rem;
      margin: 0;
      font-weight: 700;
       color: #ffffff;
    }

    .experience-item p {
      font-size: 0.85rem;
      color: rgba(255, 255, 255, 0.85);
      margin: 0;
    }

    /* Blog Section */
    .blog-section {
      padding: 80px 0;
      background: white;
    }

    .blog-grid {
      max-width: 1400px;
      margin: 0 auto;
      padding: 0 40px;
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 30px;
      margin-top: 50px;
    }

    .blog-card {
      background: white;
      border-radius: 12px;
      overflow: hidden;
      transition: all 0.3s;
      box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
    }

    .blog-card:hover {
      transform: translateY(-8px);
      box-shadow: 0 12px 35px rgba(0, 0, 0, 0.15);
    }

    .blog-image {
      width: 100%;
      height: 220px;
      background: #f0f0f0;
      display: flex;
      align-items: center;
      justify-content: center;
      overflow: hidden;
    }

    .blog-image img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      display: block;
    }

    .blog-content {
      padding: 30px;
    }

    .blog-content h3 {
      font-size: 1.1rem;
      color: #1a6b63;
      margin-bottom: 12px;
      font-weight: 700;
      line-height: 1.4;
    }

    .blog-content p {
      font-size: 0.9rem;
      color: #666;
      line-height: 1.6;
      margin-bottom: 15px;
    }

    .blog-link {
      color: #FF7A45;
      font-weight: 700;
      text-decoration: none;
      display: inline-flex;
      align-items: center;
      gap: 8px;
      transition: all 0.3s;
    }

    .blog-link:hover {
      gap: 12px;
    }

    /* Appointment Section */
    .appointment-section {
      padding: 80px 0;
      background: #F0F0F0;
    }

    .appointment-container {
      max-width: 1400px;
      margin: 0 auto;
      padding: 0 40px;
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 50px;
      align-items: center;
    }

    .appointment-content h2 {
      font-size: 2.2rem;
      color: #1a6b63;
      margin-bottom: 20px;
      font-weight: 800;
    }

    .appointment-content p {
      font-size: 1rem;
      color: #666;
      line-height: 1.8;
      margin-bottom: 30px;
    }

    .appointment-form {
      display: flex;
      gap: 10px;
      margin-bottom: 30px;
    }

    .appointment-form input {
      flex: 1;
      padding: 14px 18px;
      border: 1px solid #ddd;
      border-radius: 0px;
      font-size: 1rem;
      font-family: inherit;
    }

    .appointment-image {
      position: relative;
      height: 400px;
      background: transparent;
      display: flex;
      align-items: center;
      justify-content: center;
      overflow: hidden;
    }

    .appointment-image img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      display: block;
    }

    /* Testimonials Section */
    .testimonials-section {
      padding: 80px 0;
      background: white;
    }

    .testimonials-grid {
      max-width: 1400px;
      margin: 0 auto;
      padding: 0 40px;
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 25px;
      margin-top: 50px;
    }

    .testimonial-card {
      background: #F9F9F9;
      padding: 30px;
      border-radius: 12px;
      text-align: center;
      transition: all 0.3s;
    }

    .testimonial-card:hover {
      background: #F0F0F0;
      transform: translateY(-5px);
    }

    .testimonial-text {
      font-size: 0.95rem;
      color: #666;
      margin-bottom: 20px;
      line-height: 1.6;
      font-style: italic;
    }

    .testimonial-author {
      font-size: 1rem;
      color: #1a6b63;
      font-weight: 700;
      margin-bottom: 5px;
    }

    .testimonial-role {
      font-size: 0.85rem;
      color: #FF7A45;
      margin-bottom: 15px;
    }

    .rating {
      margin-bottom: 15px;
      color: #FFB800;
      font-size: 1.1rem;
      letter-spacing: 2px;

    /* ===== DARK THEME - ENTIRE PAGE ===== */
    [data-theme="dark"],
    body.dark-mode {
      background: #0a0a0a;
    }

    [data-theme="dark"] .landing-page,
    body.dark-mode .landing-page {
      background: #0a0a0a;
      color: #ffffff;
    }

    /* Hero Section */
    [data-theme="dark"] .hero-section,
    body.dark-mode .hero-section {
      background: linear-gradient(135deg, #0a0a0a 0%, #1a1a1a 100%);
    }

    [data-theme="dark"] .hero-content h1,
    body.dark-mode .hero-content h1 {
      color: #ffffff;
    }

    [data-theme="dark"] .tagline-sub,
    body.dark-mode .tagline-sub {
      color: #ffffff;
    }

    [data-theme="dark"] .hero-content p,
    body.dark-mode .hero-content p {
      color: #d0d0d0;
    }

    /* Features Section */
    [data-theme="dark"] .features-below-section,
    body.dark-mode .features-below-section {
      background: #1a1a1a;
    }

    [data-theme="dark"] .feature-below-card,
    body.dark-mode .feature-below-card {
      background: #2a2a2a;
      border-left-color: #FF7A45;
    }

    [data-theme="dark"] .feature-below-card.blue,
    body.dark-mode .feature-below-card.blue {
      background: #1f3a4a;
    }

    [data-theme="dark"] .feature-below-card.teal,
    body.dark-mode .feature-below-card.teal {
      background: #1a3a35;
    }

    [data-theme="dark"] .feature-below-card h3,
    body.dark-mode .feature-below-card h3 {
      color: #ffffff;
    }

    [data-theme="dark"] .feature-below-card p,
    body.dark-mode .feature-below-card p {
      color: #d0d0d0;
    }

    /* Honest Care Section */
    [data-theme="dark"] .honest-care-section,
    body.dark-mode .honest-care-section {
      background: #0a0a0a;
    }

    [data-theme="dark"] .honest-care-content h2,
    body.dark-mode .honest-care-content h2 {
      color: #ffffff;
    }

    [data-theme="dark"] .honest-care-content p,
    body.dark-mode .honest-care-content p {
      color: #d0d0d0;
    }

    [data-theme="dark"] .care-feature-item p,
    body.dark-mode .care-feature-item p {
      color: #d0d0d0;
    }

    /* Services Section */
    [data-theme="dark"] .services-section,
    body.dark-mode .services-section {
      background: #1a1a1a;
    }

    [data-theme="dark"] .section-title h2,
    body.dark-mode .section-title h2 {
      color: #ffffff;
    }

    [data-theme="dark"] .service-card,
    body.dark-mode .service-card {
      background: #2a2a2a;
    }

    [data-theme="dark"] .service-card.yellow,
    body.dark-mode .service-card.yellow {
      background: #2a2215;
    }

    [data-theme="dark"] .service-card.blue,
    body.dark-mode .service-card.blue {
      background: #1a2a3a;
    }

    [data-theme="dark"] .service-card.pink,
    body.dark-mode .service-card.pink {
      background: #2a1a25;
    }

    [data-theme="dark"] .service-card.green,
    body.dark-mode .service-card.green {
      background: #1a2a25;
    }

    [data-theme="dark"] .service-card h3,
    body.dark-mode .service-card h3 {
      color: #ffffff;
    }

    [data-theme="dark"] .service-card p,
    body.dark-mode .service-card p {
      color: #d0d0d0;
    }

    /* Network Section */
    [data-theme="dark"] .network-section,
    body.dark-mode .network-section {
      background: #0a0a0a;
    }

    [data-theme="dark"] .network-content h2,
    body.dark-mode .network-content h2 {
      color: #ffffff;
    }

    [data-theme="dark"] .network-content p,
    body.dark-mode .network-content p {
      color: #d0d0d0;
    }

    /* Doctors Section */
    [data-theme="dark"] .doctors-section,
    body.dark-mode .doctors-section {
      background: #0a0a0a;
    }

    [data-theme="dark"] .doctor-card,
    body.dark-mode .doctor-card {
      background: #2a2a2a;
    }

    [data-theme="dark"] .doctor-card h3,
    body.dark-mode .doctor-card h3 {
      color: #ffffff;
    }

    [data-theme="dark"] .doctor-card .specialty,
    body.dark-mode .doctor-card .specialty {
      color: #FFB380;
    }

    [data-theme="dark"] .doctor-card .experience,
    body.dark-mode .doctor-card .experience {
      color: #d0d0d0;
    }

    /* Experience Section */
    [data-theme="dark"] .experience-section,
    body.dark-mode .experience-section {
      background: linear-gradient(135deg, #1a1a1a 0%, #0f1415 100%);
    }

    [data-theme="dark"] .experience-item,
    body.dark-mode .experience-item {
      background: rgba(255, 255, 255, 0.05);
      border-color: rgba(255, 255, 255, 0.1);
    }

    /* Blog Section */
    [data-theme="dark"] .blog-section,
    body.dark-mode .blog-section {
      background: #0a0a0a;
    }

    [data-theme="dark"] .blog-card,
    body.dark-mode .blog-card {
      background: #2a2a2a;
    }

    [data-theme="dark"] .blog-content h3,
    body.dark-mode .blog-content h3 {
      color: #ffffff;
    }

    [data-theme="dark"] .blog-content p,
    body.dark-mode .blog-content p {
      color: #d0d0d0;
    }

    [data-theme="dark"] .blog-link,
    body.dark-mode .blog-link {
      color: #FFB380;
    }

    /* Appointment Section */
    [data-theme="dark"] .appointment-section,
    body.dark-mode .appointment-section {
      background: #1a1a1a;
    }

    [data-theme="dark"] .appointment-content h2,
    body.dark-mode .appointment-content h2 {
      color: #ffffff;
    }

    [data-theme="dark"] .appointment-content p,
    body.dark-mode .appointment-content p {
      color: #d0d0d0;
    }

    [data-theme="dark"] .appointment-form input,
    body.dark-mode .appointment-form input {
      background: #2a2a2a;
      border-color: #3a3a3a;
      color: #ffffff;
    }

    [data-theme="dark"] .appointment-form input::placeholder,
    body.dark-mode .appointment-form input::placeholder {
      color: #999999;
    }

    /* Testimonials Section */
    [data-theme="dark"] .testimonials-section,
    body.dark-mode .testimonials-section {
      background: #0a0a0a;
    }

    [data-theme="dark"] .testimonial-card,
    body.dark-mode .testimonial-card {
      background: #2a2a2a;
    }

    [data-theme="dark"] .testimonial-card:hover,
    body.dark-mode .testimonial-card:hover {
      background: #333333;
    }

    [data-theme="dark"] .testimonial-text,
    body.dark-mode .testimonial-text {
      color: #d0d0d0;
    }

    [data-theme="dark"] .testimonial-author,
    body.dark-mode .testimonial-author {
      color: #ffffff;
    }

    [data-theme="dark"] .testimonial-role,
    body.dark-mode .testimonial-role {
      color: #FFB380;
    }

    }

    /* Responsive */
    @media (max-width: 1200px) {
      .hero-container,
      .honest-care-container,
      .appointment-container,
      .network-container {
        grid-template-columns: 1fr;
        gap: 40px;
      }

      .hero-image,
      .honest-care-image,
      .network-image,
      .appointment-image {
        height: 350px;
      }

      .services-grid,
      .doctors-grid,
      .testimonials-grid {
        grid-template-columns: repeat(2, 1fr);
      }

      .experience-container {
        grid-template-columns: repeat(3, 1fr);
      }
    }

    @media (max-width: 768px) {
      .hero-section {
        min-height: auto;
        padding: 40px 0;
      }

      .hero-content h1 {
        font-size: 2rem;
      }

      .section-title h2 {
        font-size: 1.8rem;
      }

      .services-grid,
      .doctors-grid,
      .blog-grid {
        grid-template-columns: 1fr;
      }

      .features-below-grid {
        grid-template-columns: 1fr;
      }

      .experience-container {
        grid-template-columns: 1fr;
      }

      .hero-buttons-container {
        flex-direction: column;
      }

      .appointment-form {
        flex-direction: column;
      }
    }
  `;

  // SVG Icons
  const BookAppointmentIcon = () => (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="button-icon">
      <rect x="3" y="4" width="18" height="18" rx="2" stroke="currentColor" strokeWidth="2"/>
      <path d="M16 2V6M8 2V6M3 10H21" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
      <circle cx="12" cy="16" r="2" fill="currentColor"/>
    </svg>
  );

  const EmergencyIcon = () => (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="button-icon">
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );

  // Award Icon
  const AwardIcon = () => (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 2L15.09 8.26H21.77L16.84 12.32L18.93 18.58L12 14.51L5.07 18.58L7.16 12.32L2.23 8.26H8.91L12 2Z" fill="white" stroke="white" strokeWidth="1.5" strokeLinejoin="round"/>
      <circle cx="12" cy="20" r="3" fill="white"/>
      <path d="M12 20V23" stroke="white" strokeWidth="2" strokeLinecap="round"/>
      <path d="M9 23H15" stroke="white" strokeWidth="2" strokeLinecap="round"/>
    </svg>
  );

  const UsersIcon = () => (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M17 21V19C17 17.9391 16.5786 16.9217 15.8284 16.1716C15.0783 15.4214 14.0609 15 13 15H5C3.93913 15 2.92172 15.4214 2.17157 16.1716C1.42143 16.9217 1 17.9391 1 19V21M23 21V19C22.9993 18.1137 22.7044 17.2528 22.1614 16.5523C21.6184 15.8519 20.8581 15.3516 20 15.13M16 3.13C16.8604 3.35031 17.623 3.85071 18.1676 4.55229C18.7122 5.25388 19.0078 6.11501 19.0078 7C19.0078 7.88499 18.7122 8.74611 18.1676 9.44771C17.623 10.1493 16.8604 10.6497 16 10.87M13 7C13 9.20914 11.2091 11 9 11C6.79086 11 5 9.20914 5 7C5 4.79086 6.79086 3 9 3C11.2091 3 13 4.79086 13 7Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );

  const StarIcon = () => (
    <svg width="48" height="48" viewBox="0 0 24 24" fill="white" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 2L15.09 8.26H21.77L16.84 12.32L18.93 18.58L12 14.51L5.07 18.58L7.16 12.32L2.23 8.26H8.91L12 2Z"/>
    </svg>
  );

  const ClockIcon = () => (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="12" cy="12" r="9" stroke="white" strokeWidth="2"/>
      <path d="M12 6V12L16 14" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );

  const BuildingIcon = () => (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M3 21H21M5 21V5C5 3.89543 5.89543 3 7 3H17C18.1046 3 19 3.89543 19 5V21M9 8H9.01M9 12H9.01M9 16H9.01M13 8H13.01M13 12H13.01M13 16H13.01M17 8H17.01M17 12H17.01M17 16H17.01" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );

  // Image URLs
  const doctorImages = [
    '/Dr-1.jpg?v=1',
    '/Dr-2.jpg?v=1',
    '/Dr-3.jpg?v=1',
    '/Dr-4.jpg?v=1',
    '/Dr-5.webp?v=2',
    '/Dr-6.jpg?v=1',
    '/Dr-7.jpg?v=1',
    '/Dr-8.jpg?v=1'
  ];

  const heroImage = '/land_image.webp';
  const carePatientsImage = '/patient.jpg';
  const networkImage = '/doctor-team.webp?v=' + Date.now();
  const appointmentImage = '/patient-2.png';

  const blogImages = [
    '/network-doctors.jpg',
    '/mental_health.webp',
    'https://images.unsplash.com/photo-1574482620811-1aa16ffe3c82?w=500&h=300&fit=crop&q=80'
  ];

  const ImageWithFallback = ({ src, alt, height = '450px' }) => {
    const [imageError, setImageError] = React.useState(false);

    return (
      <div style={{ height, overflow: 'hidden' }}>
        {!imageError ? (
          <img
            src={src}
            alt={alt}
            onError={() => setImageError(true)}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              display: 'block'
            }}
          />
        ) : (
          <div style={{
            width: '100%',
            height: '100%',
            background: 'linear-gradient(135deg, #E6F5F3 0%, #E6F4FB 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#1a6b63'
          }}>
            Loading healthcare image...
          </div>
        )}
      </div>
    );
  };

  return (
    <>
      <Header />
      <style>{landingStyles}</style>
      
      <div className="landing-page">
        {/* Hero Section */}
        <section className="hero-section">
          <div className="hero-container">
            <div className="hero-content">
              <h1>Get the Care you Need Faster.</h1>
              <div className="hero-taglines">
                <div className="tagline-main">Skip the waiting room.</div>
                <div className="tagline-sub">Book smarter. Heal faster.</div>
              </div>
              
              <p>Experience world-class healthcare services delivered by expert medical professionals. HealNow connects you with the best doctors and hospitals for all your healthcare needs.</p>
              
              <div className="hero-buttons-container">
                <Link to="/login" className="hero-button btn-appointment">
                  <BookAppointmentIcon />
                  <span>Book an Appointment</span>
                </Link>
                <a href="tel:+919876543210" className="hero-button btn-emergency">
                  <EmergencyIcon />
                  <span>Emergency: +91 9876543210</span>
                </a>
              </div>
            </div>
            <div className="hero-image">
              <ImageWithFallback src={heroImage} alt="Healthcare Professionals" height="550px" />
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="features-below-section">
          <div className="features-below-grid">
            <div className="feature-below-card">
              <div className="feature-below-icon">
                <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="15" cy="15" r="12" stroke="#FF7A45" strokeWidth="2"/>
                  <path d="M10 15L13 18L20 11" stroke="#FF7A45" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <h3>Expert Doctors</h3>
              <p>Access highly qualified and experienced medical professionals available 24/7</p>
            </div>

            <div className="feature-below-card blue">
              <div className="feature-below-icon">
                <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="15" cy="15" r="12" stroke="#4FA3D1" strokeWidth="2"/>
                  <path d="M15 10V20M10 15H20" stroke="#4FA3D1" strokeWidth="2" strokeLinecap="round"/>
                </svg>
              </div>
              <h3>24/7 Support</h3>
              <p>Round-the-clock medical assistance and emergency support for your peace of mind</p>
            </div>

            <div className="feature-below-card teal">
              <div className="feature-below-icon">
                <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M15 3C8.4 3 3 8.4 3 15C3 21.6 8.4 27 15 27C21.6 27 27 21.6 27 15" stroke="#1a6b63" strokeWidth="2" fill="none"/>
                  <path d="M15 8V15L20 18" stroke="#1a6b63" strokeWidth="2" strokeLinecap="round"/>
                </svg>
              </div>
              <h3>Quick Booking</h3>
              <p>Easy appointment scheduling in just a few clicks from anywhere</p>
            </div>
          </div>
        </section>

        {/* Honest Patient Care */}
        <section className="honest-care-section">
          <div className="honest-care-container">
            <div className="honest-care-content">
              <h2>We Provide Honest Patient's Care & Amenities</h2>
              <p>At HealNow, we're committed to delivering exceptional healthcare with integrity and compassion. Our holistic approach ensures every patient receives personalized care tailored to their unique health needs.</p>
              <p>We combine cutting-edge medical technology with the human touch that makes healthcare truly exceptional.</p>
              
              <div className="care-features">
                <div className="care-feature-item">
                  <div className="check">✓</div>
                  <p>Modern Facilities</p>
                </div>
                <div className="care-feature-item">
                  <div className="check">✓</div>
                  <p>Expert Staff</p>
                </div>
                <div className="care-feature-item">
                  <div className="check">✓</div>
                  <p>Patient Comfort</p>
                </div>
                <div className="care-feature-item">
                  <div className="check">✓</div>
                  <p>Emergency Care</p>
                </div>
              </div>

              <Link to="/login" className="btn-learn-more">Learn More</Link>
            </div>
            <div className="honest-care-image">
              <ImageWithFallback src={carePatientsImage} alt="Patient Care" height="550px" />
            </div>
          </div>
        </section>

        {/* Services Grid */}
        <section className="services-section">
          <div className="section-title">
            <h2>We Serve In Different Areas For Our Patients</h2>
          </div>

          <div className="services-grid">
            <div className="service-card yellow">
              <div className="service-icon">
                <svg width="60" height="60" viewBox="0 0 187.059 187.059" xmlns="http://www.w3.org/2000/svg">
                  <path fill="#FF7A45" d="M119.928,89.251c-1.193-0.244-2.362,0.511-2.63,1.69c-0.329,1.379-0.975,4.445-1.583,8.202V80.38
                    c0-1.242-0.999-2.232-2.229-2.232c-1.242,0-2.241,0.99-2.241,2.232v18.739c-0.597-3.757-1.248-6.805-1.571-8.178
                    c-0.28-1.19-1.455-1.945-2.643-1.69c-12.902,2.646-22.283,13.6-22.283,26.052c0,3.058,0.588,6.126,1.723,9.098
                    c0.274,0.718,0.898,1.242,1.65,1.4c0.295,0.061,7.209,1.431,12.966,1.431h0.013c3.952,0,6.467-0.646,7.922-1.997
                    c3.684-3.435,3.812-12.062,3.026-19.905h2.88c-0.779,7.843-0.639,16.483,3.026,19.905c1.449,1.37,3.971,1.997,7.922,1.997
                    c5.761,0,12.678-1.382,12.971-1.431c0.755-0.158,1.376-0.683,1.662-1.4c1.145-2.972,1.711-6.04,1.711-9.098
                    C142.233,102.852,132.856,91.897,119.928,89.251z M105.96,121.966c-0.049,0.036-0.901,0.791-4.859,0.791h-0.013
                    c-3.937,0-8.643-0.743-10.832-1.126c-0.667-2.089-1.011-4.208-1.011-6.327c0-9.633,6.841-18.206,16.544-21.117
                    C107.927,104.587,109.249,118.872,105.96,121.966z M136.729,121.631c-2.198,0.383-6.905,1.126-10.839,1.126
                    c-3.988,0-4.829-0.755-4.854-0.791c-3.288-3.081-1.96-17.366,0.152-27.779c9.725,2.923,16.544,11.497,16.544,21.13
                    C137.733,117.423,137.392,119.542,136.729,121.631z M152.074,106.365c0-13.442-6.875-25.312-17.275-32.291l0.013-8.235
                    c-0.037-9.216-7.526-16.7-16.733-16.7c0,0-0.013,0-0.024,0l-18.9,0.018c7.44-4.731,12.409-13.037,12.409-22.496
                    C111.562,11.965,99.603,0,84.895,0C70.189,0,58.224,11.965,58.224,26.661c0,9.484,4.996,17.796,12.465,22.53l-19.004,0.024
                    c-9.222,0-16.712,7.514-16.7,16.736v56.38c0,1.229,0.999,2.229,2.235,2.229h19.184v45.778c0,9.219,7.17,16.721,15.999,16.721
                    h24.941c8.829,0,16.015-7.502,16.015-16.721v-25.124C134.713,145.104,152.074,127.726,152.074,106.365z M62.709,26.655
                    c0-12.239,9.962-22.198,22.198-22.198c12.239,0,22.198,9.959,22.198,22.198c0,12.233-9.959,22.186-22.198,22.186
                    C72.652,48.841,62.709,38.888,62.709,26.655z M97.362,182.564H86.889c0.137-0.305,0.243-0.621,0.243-0.968v-40.938
                    c0-1.229-0.999-2.229-2.237-2.229c-1.236,0-2.241,0.999-2.241,2.229v40.938c0,0.347,0.101,0.663,0.244,0.968H72.424
                    c-6.36,0-11.536-5.492-11.536-12.238v-47.965c0-0.012,0.012-0.024,0.012-0.043c0-0.018-0.012-0.023-0.012-0.049V84.027
                    c0-1.228-0.999-2.232-2.231-2.232c-1.236,0-2.241,1.004-2.241,2.232v36.038h-16.94V65.921c-0.006-3.258,1.261-6.342,3.559-8.656
                    c2.314-2.314,5.383-3.586,8.656-3.592l66.381-0.073h0.012c6.734,0,12.228,5.492,12.239,12.227v5.672
                    c-5.157-2.542-10.96-4.019-17.092-4.019c-21.434,0-38.855,17.428-38.855,38.843c0,19.961,15.144,36.443,34.532,38.6v25.367
                    C108.895,177.072,103.719,182.564,97.362,182.564z M113.218,140.721c-18.952,0-34.379-15.418-34.379-34.367
                    c0-18.953,15.427-34.38,34.379-34.38c18.949,0,34.367,15.427,34.367,34.38C147.585,125.314,132.167,140.721,113.218,140.721z"/>
                </svg>
              </div>
              <h3>Internal Medicine</h3>
              <p>Comprehensive patient care and medical diagnosis</p>
            </div>

            <div className="service-card blue">
              <div className="service-icon">
                <svg width="60" height="60" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                  <path fill="#4FA3D1" d="M93.998,45.312c0-3.676-1.659-7.121-4.486-9.414c0.123-0.587,0.184-1.151,0.184-1.706c0-4.579-3.386-8.382-7.785-9.037c0.101-0.526,0.149-1.042,0.149-1.556c0-4.875-3.842-8.858-8.655-9.111c-0.079-0.013-0.159-0.024-0.242-0.024c-0.04,0-0.079,0.005-0.12,0.006c-0.04-0.001-0.079-0.006-0.12-0.006c-0.458,0-0.919,0.041-1.406,0.126c-0.846-4.485-4.753-7.825-9.437-7.825c-5.311,0-9.632,4.321-9.632,9.633v65.918c0,6.723,5.469,12.191,12.191,12.191c4.46,0,8.508-2.413,10.646-6.246c0.479,0.104,0.939,0.168,1.401,0.198c2.903,0.185,5.73-0.766,7.926-2.693c2.196-1.927,3.51-4.594,3.7-7.51c0.079-1.215-0.057-2.434-0.403-3.638c3.796-2.691,6.027-6.952,6.027-11.621c0-3.385-1.219-6.635-3.445-9.224C92.731,51.505,93.998,48.471,93.998,45.312z"/>
                  <path fill="#4FA3D1" d="M38.179,6.766c-4.684,0-8.59,3.34-9.435,7.825c-0.488-0.085-0.949-0.126-1.407-0.126c-0.04,0-0.079,0.005-0.12,0.006c-0.04-0.001-0.079-0.006-0.12-0.006c-0.083,0-0.163,0.011-0.242,0.024c-4.813,0.253-8.654,4.236-8.654,9.111c0,0.514,0.049,1.03,0.149,1.556c-4.399,0.655-7.785,4.458-7.785,9.037c0,0.554,0.061,1.118,0.184,1.706c-2.827,2.293-4.486,5.738-4.486,9.414c0,3.159,1.266,6.193,3.505,8.463c-2.227,2.589-3.446,5.839-3.446,9.224c0,4.669,2.231,8.929,6.027,11.621c-0.347,1.204-0.482,2.423-0.402,3.639c0.19,2.915,1.503,5.582,3.699,7.509c2.196,1.928,5.015,2.879,7.926,2.693c0.455-0.03,0.919-0.096,1.4-0.199c2.138,3.834,6.186,6.247,10.646,6.247c6.722,0,12.191-5.469,12.191-12.191V16.399C47.811,11.087,43.49,6.766,38.179,6.766z"/>
                </svg>
              </div>
              <h3>Neurology</h3>
              <p>Specialized nervous system treatment</p>
            </div>

            <div className="service-card pink">
              <div className="service-icon">
                <svg width="60" height="60" viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
                  <path d="M3.184 4.304a.407.407 0 0 1 .162-.555l2.97-1.618a.406.406 0 0 1 .554.164l1.191 2.173c4.503-1.35 9.492.57 11.835 4.861l-5.755 3.142a3.599 3.599 0 0 1-6.321 3.447l-5.757 3.138C-.282 14.767.795 9.533 4.373 6.478L3.184 4.303z" fill="#FF1493"/>
                  <path d="M43.731 43.446H63.1v20.022H43.731V43.446z" fill="#FF1493"/>
                  <path d="M41.511 53.453H25.868a4.947 4.947 0 0 1-4.946-4.942a4.944 4.944 0 0 1 4.946-4.941h15.643v9.883z" fill="#FF1493"/>
                  <path d="M7.784 57.462c0-1.105.895-2.002 2.001-2.002H41.51v8.006H7.784v-6.005z" fill="#FF1493"/>
                  <path d="M19.814 47.487a5.972 5.972 0 0 1-5.975 5.966a5.971 5.971 0 0 1-5.976-5.966c0-3.293 2.675-5.963 5.976-5.963c3.299 0 5.975 2.67 5.975 5.963z" fill="#FF1493"/>
                  <path d="M52.474 30.78l-3.361-9.569c-.652-1.804-1.904-3.212-5.438-3.212H28.159c-3.533 0-4.787 1.408-5.436 3.212l-3.36 9.569c-.251.618-.381 2.007.986 2.937l7.901 5.206a2.507 2.507 0 0 0 3.469-.707a2.503 2.503 0 0 0-.713-3.468l-6.271-4.133l1.765-4.869h2.443l-1.431 3.95l4.761 3.138a4.757 4.757 0 0 1 2.057 3.039a4.762 4.762 0 0 1-.692 3.608a4.815 4.815 0 0 1-1.016 1.098h6.592a4.91 4.91 0 0 1-1.017-1.098a4.772 4.772 0 0 1-.694-3.608a4.77 4.77 0 0 1 2.058-3.039l4.764-3.138l-1.437-3.95h2.445l1.769 4.869l-6.274 4.133c-1.153.76-1.475 2.317-.712 3.468s2.317 1.469 3.47.707l7.9-5.206c1.368-.931 1.239-2.319.989-2.937z" fill="#FF1493"/>
                  <path d="M37.461 8.634a2.361 2.361 0 0 1-2.144 1.373a2.367 2.367 0 0 1-2.149-1.373H28.84c-.07.38-.111.769-.111 1.17a6.608 6.608 0 0 0 6.611 6.603a6.607 6.607 0 0 0 6.612-6.603c0-.402-.043-.79-.11-1.17h-4.38z" fill="#FF1493"/>
                  <path d="M33.022 7.075a2.368 2.368 0 0 1 2.295-1.788c1.106 0 2.039.764 2.291 1.788h3.75a6.61 6.61 0 0 0-6.017-3.876a6.612 6.612 0 0 0-6.017 3.876h3.699z" fill="#FF1493"/>
                </svg>
              </div>
              <h3>Surgery</h3>
              <p>Advanced surgical procedures</p>
            </div>

            <div className="service-card green">
              <div className="service-icon">
                <svg width="60" height="60" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M20.4037 12.5C20.778 11.6322 21 10.7013 21 9.71405C21 6 18.9648 4 16.4543 4C15.2487 4 14.0925 4.49666 13.24 5.38071L12.7198 5.92016C12.3266 6.32798 11.6734 6.32798 11.2802 5.92016L10.76 5.38071C9.90749 4.49666 8.75128 4 7.54569 4C5 4 3 6 3 9.71405C3 10.7013 3.222 11.6322 3.59627 12.5M20.4037 12.5C18.395 17.1578 12 20 12 20C12 20 5.60502 17.1578 3.59627 12.5M20.4037 12.5L16.3249 12.5C16.1273 12.5 15.9483 12.3837 15.868 12.2031L14.4483 9.00872C14.2737 8.61588 13.7176 8.61194 13.5374 9.00226L11.436 13.5555C11.2603 13.9361 10.7223 13.9445 10.5348 13.5695L9.44721 11.3944C9.26295 11.0259 8.73705 11.0259 8.55279 11.3944L8.1382 12.2236C8.0535 12.393 7.88037 12.5 7.69098 12.5L3.59627 12.5" stroke="#1a6b63" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <h3>Cardiology</h3>
              <p>Heart and cardiovascular care</p>
            </div>

            <div className="service-card yellow">
              <div className="service-icon">
                <svg width="60" height="60" viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
                  <path fill="#FF7A45" d="M23.149,28.571l0.72-0.36c3.17-1.584,7.089-1.585,10.262,0l0.714,0.358C35.409,28.851,36.04,29,36.669,29h0.26v-2h-0.26c-0.32,0-0.642-0.076-0.928-0.219l-0.714-0.358c-3.728-1.861-8.328-1.861-12.051-0.001l-0.722,0.361C21.971,26.925,21.651,27,21.331,27h-0.26v2h0.26C21.961,29,22.59,28.852,23.149,28.571z"/>
                  <path fill="#FF7A45" d="M45.143,25.308l-0.159-0.045C44.988,25.151,45,25.041,45,24.929c0-2.156-0.84-4.183-2.364-5.707C39.646,16.232,38,12.257,38,8.029V1H20v7.029c0,4.228-1.646,8.203-4.636,11.192C13.84,20.746,13,22.773,13,24.929c0,1.408,0.364,2.731,1,3.884v4.715c0,3.001,0.691,6.005,2,8.705v6.162c0,2.593,1.288,4.999,3.445,6.438L19.697,55H22V44.692c0-1.489,0.265-2.943,0.748-4.309c2.1,2.744,3.252,6.073,3.252,9.587V63h18V49.971c0-4.228,1.646-8.203,4.636-11.192C50.16,37.254,51,35.227,51,33.071C51,29.483,48.592,26.291,45.143,25.308z M16.508,20.934l6.023,0.072l3.425-5.137L28.434,20H34v-2h-4.434l-2.014-3.357l6.691-1.673l-0.485-1.94l-8.375,2.094l-3.913,5.87l-3.227-0.039C20.67,15.841,22,12.041,22,8.029V3h14v5.029c0,4.762,1.854,9.239,5.222,12.606C42.369,21.783,43,23.307,43,24.929C43,28.276,40.276,31,36.929,31h-0.259c-0.938,0-1.877-0.222-2.715-0.641L33.236,30c-1.309-0.654-2.773-1-4.236-1s-2.928,0.346-4.236,1l-0.718,0.359C23.208,30.778,22.269,31,21.331,31h-0.259C17.724,31,15,28.276,15,24.929C15,23.442,15.536,22.041,16.508,20.934z M20,44.692v8.055c-1.263-1.083-2-2.665-2-4.353v-6.631l-0.105-0.211C16.655,39.075,16,36.3,16,33.528V31.2c0.874,0.708,1.899,1.231,3.017,1.526C19.012,32.841,19,32.956,19,33.071c0,2.12,0.816,4.113,2.293,5.629c-0.178,0.321-0.205,0.386-0.222,0.428C20.36,40.906,20,42.778,20,44.692z M47.222,37.364C43.854,40.731,42,45.208,42,49.971V61H28V49.971c0-4.762-1.854-9.239-5.222-12.606C21.631,36.217,21,34.693,21,33.071c0-0.025,0.003-0.05,0.004-0.075c0.023,0,0.045,0.003,0.068,0.003h0.259c1.247,0,2.496-0.295,3.61-0.852l0.718-0.359c2.064-1.032,4.619-1.032,6.684,0l0.718,0.359C34.174,32.705,35.422,33,36.669,33h0.259c3.642,0,6.725-2.426,7.726-5.746C47.215,28.012,49,30.393,49,33.071C49,34.693,48.369,36.217,47.222,37.364z"/>
                  <path fill="#FF7A45" d="M38.714,36.237c-2.795,1.118-6.039,0.983-8.73-0.363l-1.537-0.769l-0.895,1.789l1.537,0.769c1.524,0.762,3.208,1.19,4.91,1.293V43.5l-4,3V53h2v-5.5l2.906-2.18l4.387,4.387l1.414-1.414L36,43.586v-4.649c1.184-0.116,2.343-0.397,3.458-0.843l2.914-1.166l-0.743-1.857L38.714,36.237z"/>
                </svg>
              </div>
              <h3>Orthopedics</h3>
              <p>Bone and joint specialization</p>
            </div>

            <div className="service-card blue">
              <div className="service-icon">
                <svg width="60" height="60" viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
                  <path d="M27.83 32.711v-.01c.605-.236 1.004-.757 1.004-1.741c0-1.401-.911-2.036-2.304-2.036c-.666 0-1.269.02-1.916.092v6.786h1.322V33.12h.686c.174 0 .215.092.266.286l.627 2.395h1.381l-.83-2.774c-.041-.172-.092-.275-.236-.316zm-1.157-.646h-.737v-2.067c.216-.02.43-.031.644-.031c.79 0 .953.471.953 1.074c0 .717-.255 1.024-.86 1.024z" fill="#4FA3D1"/>
                  <path d="M36.926 32.814h1.795v-1.096h-1.795v-1.637h1.99v-1.106h-3.309v6.827h3.39v-1.076h-2.071z" fill="#4FA3D1"/>
                  <path d="M10.486 32.814h1.793v-1.096h-1.793v-1.637h1.987v-1.106H9.165v6.827h3.391v-1.076h-2.069z" fill="#4FA3D1"/>
                  <path d="M21.458 32.814h1.795v-1.096h-1.795v-1.637h1.989v-1.106h-3.309v6.827h3.39v-1.076h-2.07z" fill="#4FA3D1"/>
                  <path d="M16.223 31.564l-1.342-2.589h-1.239v6.827h1.291v-4.411l1.291 2.589l1.28-2.599h.041v4.421h1.239v-6.827h-1.239z" fill="#4FA3D1"/>
                  <path d="M32.339 33.109h.93v.245c0 .708-.102 1.506-.982 1.506c-1.147 0-1.177-1.627-1.177-2.466c0-.831.083-2.406 1.219-2.406c.532 0 .788.296 1.084.664l.728-.973c-.524-.52-1.066-.819-1.793-.819c-1.935 0-2.623 1.843-2.623 3.541c0 1.68.626 3.512 2.521 3.512c1.852 0 2.222-1.608 2.222-3.092v-.797h-2.13v1.084z" fill="#4FA3D1"/>
                  <path d="M52.439 35.802h1.312v-2.61l1.731-4.218h-1.343l-1.034 3.111l-1.035-3.111h-1.414l1.784 4.289z" fill="#4FA3D1"/>
                  <path d="M40.084 35.802h1.291v-4.216h.031l2.192 4.216h1.157v-6.827h-1.28v4.042h-.019l-2.091-4.043h-1.28z" fill="#4FA3D1"/>
                  <path d="M55.653.826H8.298C4.232.826.425 4.641.425 8.706v47.342c0,4.067 3.822 7.901 7.89 7.901h47.34c4.066 0 7.895-3.814 7.895-7.88V8.712c0-4.065-3.829-7.885-7.897-7.885zm1.611 39.984h-16.85v16.833H23.565V40.81H6.71V23.965h16.855V7.132h16.849v16.833h16.85V40.81z" fill="#4FA3D1"/>
                  <path d="M48.464 35.914c.839.001 1.495-.389 1.947-.942l-.676-.963c-.338.45-.643.788-1.199.788c-1.065 0-1.251-1.483-1.251-2.404c0-1.229.287-2.406 1.221-2.406c.503 0 .78.337 1.075.789l.79-.933c-.525-.623-1.047-.983-1.845-.983c-1.895 0-2.623 1.781-2.623 3.533c0 1.853.676 3.521 2.561 3.521z" fill="#4FA3D1"/>
                </svg>
              </div>
              <h3>Emergency</h3>
              <p>24/7 emergency care services</p>
            </div>

            <div className="service-card pink">
              <div className="service-icon">
                <svg width="60" height="60" viewBox="0 0 403.647 403.647" xmlns="http://www.w3.org/2000/svg">
                  <path fill="#FF1493" d="M124.149,306.024c9.399,13.524,17.334,19.823,24.969,19.823c2.879,0,9.97-1.094,13.638-11.241c3.023-8.362,5.729-17.91,8.592-28.019c6.969-24.6,16.515-58.291,29.998-58.291h0.957c5.804,0,11.184,5.359,16.446,16.385c5.529,11.578,9.77,27.111,13.87,42.135c2.742,10.044,5.332,19.531,8.265,27.757c3.599,10.101,10.627,11.194,13.486,11.196c7.606,0,15.537-6.395,24.954-20.122c7.482-10.905,15.357-25.708,22.777-42.808c16.646-38.359,26.584-77.285,26.584-104.125c0-19.684-6.971-38.33-19.631-52.505c-13.352-14.946-31.728-23.178-51.744-23.178c-15.719,0-32.351,9.175-44.498,15.876c-3.248,1.793-9.15,5.05-10.985,5.578c-1.851-0.534-7.712-3.777-10.94-5.564c-12.121-6.706-28.719-15.89-44.549-15.89c-20.017,0-38.393,8.232-51.743,23.178c-12.661,14.175-19.634,32.822-19.634,52.505c0,27.63,9.888,66.849,26.451,104.91C108.791,280.576,116.653,295.237,124.149,306.024z M146.338,97.6c9.202,0,21.379,4.246,32.571,11.358c1.614,1.026,3.964,2.833,6.237,4.581c0.918,0.705,1.822,1.4,2.667,2.036c2.756,2.064,6.479,4.762,10.846,7.33c2.31,1.365,4.414,2.576,6.778,3.579c9.515,4.04,19.603,6.087,29.981,6.087c10.612,0,15.996-1.187,18.013-1.667c3.782-0.902,12.638-3.308,12.465-4.616c-0.153-1.155-9.903-0.581-13.196-0.866c-3.82-0.332-15.516-1.051-29.567-4.772c-4.219-1.118-9.933-3.373-10.19-4.619c-0.195-0.941,3.885-3.556,6.989-5.46c10.873-6.671,25.408-12.97,37.378-12.97c35.56,0,56.81,31.074,56.81,61.116c0,24.573-9.726,62.249-25.38,98.327c-6.959,16.034-14.567,30.37-21.427,40.365c-6.63,9.663-10.519,13.98-12.212,13.458c-0.32-0.099-0.744-0.554-0.919-1.046c-2.734-7.67-4.826-17.008-7.51-26.84c-4.271-15.641-8.686-31.812-14.777-44.574c-7.928-16.604-17.608-24.675-29.592-24.675h-0.957c-11.576,0-21.045,8.008-28.948,24.481c-6.066,12.643-10.638,28.781-15.079,44.455c-2.786,9.836-4.879,19.043-7.72,26.902c-0.203,0.561-0.771,1.307-1.126,1.421c-1.676,0.536-5.612-3.569-12.361-13.278c-6.862-9.875-14.441-24.045-21.342-39.899c-15.569-35.777-25.241-73.748-25.241-99.097C89.528,128.673,110.778,97.6,146.338,97.6z"/>
                </svg>
              </div>
              <h3>Dental</h3>
              <p>Complete dental care solutions</p>
            </div>

            <div className="service-card green">
              <div className="service-icon">
                <svg width="60" height="60" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg">
                  <path fill="#1a6b63" d="M204.991,249.798c0-10.436-8.468-18.889-18.888-18.889c-10.436,0-18.896,8.453-18.896,18.889c0,10.428,8.46,18.895,18.896,18.895C196.524,268.694,204.991,260.226,204.991,249.798z"/>
                  <path fill="#1a6b63" d="M344.793,249.798c0-10.436-8.468-18.889-18.889-18.889c-10.436,0-18.896,8.453-18.896,18.889c0,10.428,8.46,18.895,18.896,18.895C336.326,268.694,344.793,260.226,344.793,249.798z"/>
                  <path fill="#1a6b63" d="M255.996,351.331c-16.97-0.006-32.479,6.926-43.58,18.057c-11.131,11.101-18.063,26.61-18.049,43.58c-0.014,16.97,6.918,32.479,18.049,43.581c11.101,11.13,26.61,18.056,43.58,18.048c16.971,0.007,32.479-6.918,43.58-18.048c11.13-11.102,18.063-26.61,18.048-43.581c0.015-16.97-6.918-32.479-18.048-43.58C288.475,358.257,272.967,351.324,255.996,351.331z M284.669,425.075c-2.352,5.558-6.311,10.341-11.29,13.699c-4.978,3.359-10.884,5.298-17.383,5.305c-4.342-0.007-8.395-0.876-12.1-2.446c-5.565-2.345-10.349-6.311-13.706-11.283c-3.358-4.986-5.297-10.891-5.297-17.383c0-4.342,0.868-8.394,2.431-12.107c2.352-5.558,6.318-10.342,11.289-13.699c4.979-3.358,10.892-5.298,17.383-5.304c4.342,0.007,8.388,0.875,12.107,2.439c5.565,2.352,10.342,6.318,13.7,11.289c3.358,4.979,5.297,10.891,5.304,17.383C287.1,417.302,286.232,421.354,284.669,425.075z"/>
                  <path fill="#1a6b63" d="M255.996,314.365c-41.858,0-75.799,20.292-75.799,45.339c0,7.483,3.025,14.546,8.41,20.777c3.256-5.384,7.23-10.428,11.796-14.994c14.821-14.842,34.563-23.035,55.572-23.035c21.081,0,40.808,8.192,55.658,23.071c4.56,4.53,8.496,9.574,11.76,14.958c5.376-6.231,8.416-13.294,8.416-20.777C331.81,334.657,297.884,314.365,255.996,314.365z"/>
                  <path fill="#1a6b63" d="M494.002,217.702c-10.059-10.066-23.722-16.666-38.818-17.773c-9.437-44.376-33.188-83.456-66.174-112.157c-36.039-31.35-83.231-50.368-134.75-50.368c-51.44,0-98.566,18.96-134.584,50.217c-33.188,28.795-57.048,68.077-66.426,112.678c-13.692,1.788-26.017,8.134-35.288,17.404C6.882,228.782,0,244.226,0,261.145c0,16.891,6.882,32.334,17.962,43.414c11.08,11.08,26.53,17.969,43.45,17.969c1.158,0,2.294-0.029,3.43-0.087c14.792,35.142,39.05,65.32,69.597,87.312c14.054,10.118,29.475,18.505,45.918,24.851c-1.99-6.94-3.011-14.227-3.011-21.652c0-3.424,0.232-6.853,0.68-10.197c-9.523-4.538-18.562-9.915-27.037-16.008c-29.077-20.921-51.577-50.477-63.742-84.852l-4.385-12.411l-12.693,3.488c-2.924,0.789-5.818,1.216-8.757,1.216c-9.176,0-17.376-3.684-23.383-9.69c-5.999-6.014-9.69-14.198-9.69-23.354c0-9.184,3.691-17.375,9.69-23.382c6.007-6.006,14.206-9.69,23.383-9.69c0.564,0,1.418,0.058,2.606,0.138l13.178,1.02l1.961-13.026c6.398-42.575,27.992-80.178,59.082-107.156c7.772-6.738,16.124-12.809,24.982-18.136c0.767,4.806,1.954,9.307,3.604,13.439c2.613,6.564,6.274,12.252,10.61,17.108c7.613,8.518,17.137,14.517,27.065,19.431c14.93,7.33,31.053,12.411,44.601,18.744c6.773,3.14,12.874,6.556,17.868,10.493c5.016,3.959,8.923,8.344,11.709,13.685c1.506,2.887,4.486,4.653,7.744,4.58c3.257-0.079,6.151-1.983,7.518-4.943c14.698-31.842,19.996-56.896,20.004-76.573c0.021-13.432-2.512-24.294-6.072-32.848c23.288,7.396,44.5,19.453,62.541,35.128c31.118,27.074,52.656,64.763,59.01,107.439l2.098,14.054l14.054-2.15c1.874-0.289,3.517-0.427,5.014-0.427c9.184,0,17.347,3.684,23.383,9.69c6.006,6.007,9.668,14.199,9.69,23.382c-0.022,9.155-3.684,17.339-9.69,23.354c-6.036,6.006-14.199,9.69-23.383,9.69c-3.799,0-7.418-0.688-10.935-1.896l-13.432-4.74l-4.682,13.432c-12.006,34.606-34.484,64.393-63.62,85.475c-7.62,5.522-15.689,10.457-24.171,14.712c0.594,3.88,0.883,7.794,0.883,11.782c0,6.889-0.883,13.634-2.591,20.126c15.168-6.231,29.426-14.199,42.487-23.665c30.403-22.022,54.552-52.149,69.264-87.284c2.208,0.254,4.501,0.398,6.795,0.398c16.927,0,32.334-6.89,43.414-17.969C505.089,293.48,512,278.036,512,261.145C512,244.226,505.089,228.782,494.002,217.702z"/>
                </svg>
              </div>
              <h3>Pediatrics</h3>
              <p>Child health and wellness</p>
            </div>
          </div>

          <div style={{textAlign: 'center', marginTop: '40px', maxWidth: '1400px', margin: '40px auto 0', padding: '0 40px'}}>
            <button className="btn-view-services">View All Services</button>
          </div>
        </section>

        {/* Professional Network */}
        <section className="network-section">
          <div className="network-container">
            <div className="network-image">
              <ImageWithFallback src={networkImage} alt="Professional Network" height="450px" />
            </div>
            <div className="network-content">
              <h2>Professional Medical Network With Large Directory Listings</h2>
              <p>Access our comprehensive network of verified medical professionals. HealNow connects you with thousands of specialist doctors, healthcare providers, and medical centers across the region.</p>
              <p>Browse detailed profiles, check credentials, read patient reviews, and book appointments with the right specialist for your healthcare needs.</p>
              <button className="btn-find-doctor">Find a Doctor</button>
            </div>
          </div>
        </section>

        {/* Doctors Section */}
        <section className="doctors-section" id="doctors">
          <div className="section-title">
            <h2>Our Experts, Our Doctors for You</h2>
          </div>

          <div className="doctors-grid">
            {[
              { name: 'Dr. Sarah Williams', specialty: 'Cardiology', exp: '15+ years' },
              { name: 'Dr. Sanjay Kumar ', specialty: 'Neurology', exp: '12+ years' },
              { name: 'Dr. Sneha Krish', specialty: 'General Surgery', exp: '20+ years' },
              { name: 'Dr. Vivek Reddy', specialty: 'Pediatrics', exp: '10+ years' },
              { name: 'Dr. Sana Yusra', specialty: 'Orthopedics', exp: '18+ years' },
              { name: 'Dr. Ashwin Subramanian', specialty: 'Dentistry', exp: '14+ years' },
              { name: 'Dr. Shazmina Farzeen', specialty: 'Emergency Medicine', exp: '16+ years' },
              { name: 'Dr. Visakh Venugopalan', specialty: 'Internal Medicine', exp: '13+ years' }
            ].map((doctor, index) => (
              <div key={index} className="doctor-card">
                <div className="doctor-image">
                  <ImageWithFallback src={doctorImages[index]} alt={doctor.name} height="220px" />
                </div>
                <div className="doctor-content">
                  <h3>{doctor.name}</h3>
                  <div className="specialty">{doctor.specialty}</div>
                  <div className="experience">{doctor.exp} experience</div>
                </div>
              </div>
            ))}
          </div>

          <div style={{textAlign: 'center', marginTop: '40px', maxWidth: '1400px', margin: '40px auto 0', padding: '0 40px'}}>
            <button className="btn-view-services">View All Doctors</button>
          </div>
        </section>

        {/* Experience Section */}
        <section className="experience-section">
          <div className="experience-container">
            <div className="experience-item">
              <div className="experience-icon">
                <AwardIcon />
              </div>
              <h3>Award Winning</h3>
              <p>Excellence recognized</p>
            </div>
            <div className="experience-item">
              <div className="experience-icon">
                <UsersIcon />
              </div>
              <h3>500+</h3>
              <p>Medical Experts</p>
            </div>
            <div className="experience-item">
              <div className="experience-icon">
                <UsersIcon />
              </div>
              <h3>100K+</h3>
              <p>Happy Patients</p>
            </div>
            <div className="experience-item">
              <div className="experience-icon">
                <StarIcon />
              </div>
              <h3>4.9/5</h3>
              <p>Average Rating</p>
            </div>
            <div className="experience-item">
              <div className="experience-icon">
                <BuildingIcon />
              </div>
              <h3>50+</h3>
              <p>Cities Covered</p>
            </div>
            <div className="experience-item">
              <div className="experience-icon">
                <ClockIcon />
              </div>
              <h3>24/7</h3>
              <p>Online Support</p>
            </div>
          </div>
        </section>

        {/* Blog Section */}
        <section className="blog-section">
          <div className="section-title">
            <h2>Read Top Articles From Expert Doctors</h2>
          </div>

          <div className="blog-grid">
            {[
              { title: 'Heart Health Tips for Every Age', desc: 'Essential guidelines to maintain cardiovascular health throughout your life', img: blogImages[0] },
              { title: 'Mental Health Matters - Expert Advice', desc: 'Understanding stress, anxiety and ways to achieve mental wellness', img: blogImages[1] },
              { title: 'Nutrition Guide for Healthy Living', desc: 'Balanced diet strategies recommended by leading nutritionists', img: blogImages[2] }
            ].map((article, index) => (
              <div key={index} className="blog-card">
                <div className="blog-image">
                  <ImageWithFallback src={article.img} alt={article.title} height="220px" />
                </div>
                <div className="blog-content">
                  <h3>{article.title}</h3>
                  <p>{article.desc}</p>
                  <a href="#blog" className="blog-link">Read More →</a>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Appointment Section */}
        <section className="appointment-section">
          <div className="appointment-container">
            <div className="appointment-content">
              <h2>Request Your Appointment</h2>
              <p>Book your consultation with our expert doctors. Fill in your details and we'll confirm your appointment within 24 hours.</p>
              <div className="appointment-form">
                <input type="email" placeholder="Enter your email address" />
                <Link to="/login" className="hero-button btn-appointment">
                  <BookAppointmentIcon />
                  <span>Book Now</span>
                </Link>
              </div>
            </div>
            <div className="appointment-image">
              <ImageWithFallback src={appointmentImage} alt="Book Appointment" height="400px" />
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="testimonials-section">
          <div className="section-title">
            <h2>Our Patients' Experiences Speak For Themselves</h2>
          </div>

          <div className="testimonials-grid">
            {[
              { text: 'Excellent healthcare experience. The doctors are professional and caring. Highly recommended!', author: 'Fairose Fathima', role: 'Patient' },
              { text: 'The appointment process was smooth and hassle-free. Great customer service throughout!', author: 'Preethi', role: 'Patient' },
              { text: "HealNow has revolutionized how I manage my family's healthcare. Fantastic platform!", author: 'Senjila', role: 'Patient' },
              { text: 'Professional medical team and state-of-the-art facilities. Worth every penny!', author: 'Shaffer Nisha', role: 'Patient' }
            ].map((testimonial, index) => (
              <div key={index} className="testimonial-card">
                <div className="rating">★★★★★</div>
                <p className="testimonial-text">"{testimonial.text}"</p>
                <p className="testimonial-author">{testimonial.author}</p>
                <p className="testimonial-role">{testimonial.role}</p>
              </div>
            ))}
          </div>
        </section>
      </div>

      <ChatWindow />
      <Footer />
    </>
  );
};

export default LandingPage;