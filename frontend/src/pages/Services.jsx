import React, { useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

// SVG ICONS
const HeartPulseIcon = ({ size = 32 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M7 12h2l1-3 2 6 1-3h3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const StethoscopeIcon = ({ size = 32 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M4.8 2.3A.3.3 0 1 0 5 2H4a2 2 0 0 0-2 2v5a6 6 0 0 0 6 6 6 6 0 0 0 6-6V4a2 2 0 0 0-2-2h-1a.3.3 0 1 0 .3.3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M8 15v2a4 4 0 0 0 8 0v-2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <circle cx="16" cy="18" r="3" stroke="currentColor" strokeWidth="2"/>
    <circle cx="16" cy="18" r="1" fill="currentColor"/>
  </svg>
);

// Pediatrics 
const BabyIcon = ({ size = 32 }) => (
  <svg width={size} height={size} viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg">
    <path fill="currentColor" d="M204.991,249.798c0-10.436-8.468-18.889-18.888-18.889c-10.436,0-18.896,8.453-18.896,18.889c0,10.428,8.46,18.895,18.896,18.895C196.524,268.694,204.991,260.226,204.991,249.798z"/>
    <path fill="currentColor" d="M344.793,249.798c0-10.436-8.468-18.889-18.889-18.889c-10.436,0-18.896,8.453-18.896,18.889c0,10.428,8.46,18.895,18.896,18.895C336.326,268.694,344.793,260.226,344.793,249.798z"/>
    <path fill="currentColor" d="M255.996,351.331c-16.97-0.006-32.479,6.926-43.58,18.057c-11.131,11.101-18.063,26.61-18.049,43.58c-0.014,16.97,6.918,32.479,18.049,43.581c11.101,11.13,26.61,18.056,43.58,18.048c16.971,0.007,32.479-6.918,43.58-18.048c11.13-11.102,18.063-26.61,18.048-43.581c0.015-16.97-6.918-32.479-18.048-43.58C288.475,358.257,272.967,351.324,255.996,351.331z M284.669,425.075c-2.352,5.558-6.311,10.341-11.29,13.699c-4.978,3.359-10.884,5.298-17.383,5.305c-4.342-0.007-8.395-0.876-12.1-2.446c-5.565-2.345-10.349-6.311-13.706-11.283c-3.358-4.986-5.297-10.891-5.297-17.383c0-4.342,0.868-8.394,2.431-12.107c2.352-5.558,6.318-10.342,11.289-13.699c4.979-3.358,10.892-5.298,17.383-5.304c4.342,0.007,8.388,0.875,12.107,2.439c5.565,2.352,10.342,6.318,13.7,11.289c3.358,4.979,5.297,10.891,5.304,17.383C287.1,417.302,286.232,421.354,284.669,425.075z"/>
    <path fill="currentColor" d="M255.996,314.365c-41.858,0-75.799,20.292-75.799,45.339c0,7.483,3.025,14.546,8.41,20.777c3.256-5.384,7.23-10.428,11.796-14.994c14.821-14.842,34.563-23.035,55.572-23.035c21.081,0,40.808,8.192,55.658,23.071c4.56,4.53,8.496,9.574,11.76,14.958c5.376-6.231,8.416-13.294,8.416-20.777C331.81,334.657,297.884,314.365,255.996,314.365z"/>
    <path fill="currentColor" d="M494.002,217.702c-10.059-10.066-23.722-16.666-38.818-17.773c-9.437-44.376-33.188-83.456-66.174-112.157c-36.039-31.35-83.231-50.368-134.75-50.368c-51.44,0-98.566,18.96-134.584,50.217c-33.188,28.795-57.048,68.077-66.426,112.678c-13.692,1.788-26.017,8.134-35.288,17.404C6.882,228.782,0,244.226,0,261.145c0,16.891,6.882,32.334,17.962,43.414c11.08,11.08,26.53,17.969,43.45,17.969c1.158,0,2.294-0.029,3.43-0.087c14.792,35.142,39.05,65.32,69.597,87.312c14.054,10.118,29.475,18.505,45.918,24.851c-1.99-6.94-3.011-14.227-3.011-21.652c0-3.424,0.232-6.853,0.68-10.197c-9.523-4.538-18.562-9.915-27.037-16.008c-29.077-20.921-51.577-50.477-63.742-84.852l-4.385-12.411l-12.693,3.488c-2.924,0.789-5.818,1.216-8.757,1.216c-9.176,0-17.376-3.684-23.383-9.69c-5.999-6.014-9.69-14.198-9.69-23.354c0-9.184,3.691-17.375,9.69-23.382c6.007-6.006,14.206-9.69,23.383-9.69c0.564,0,1.418,0.058,2.606,0.138l13.178,1.02l1.961-13.026c6.398-42.575,27.992-80.178,59.082-107.156c7.772-6.738,16.124-12.809,24.982-18.136c0.767,4.806,1.954,9.307,3.604,13.439c2.613,6.564,6.274,12.252,10.61,17.108c7.613,8.518,17.137,14.517,27.065,19.431c14.93,7.33,31.053,12.411,44.601,18.744c6.773,3.14,12.874,6.556,17.868,10.493c5.016,3.959,8.923,8.344,11.709,13.685c1.506,2.887,4.486,4.653,7.744,4.58c3.257-0.079,6.151-1.983,7.518-4.943c14.698-31.842,19.996-56.896,20.004-76.573c0.021-13.432-2.512-24.294-6.072-32.848c23.288,7.396,44.5,19.453,62.541,35.128c31.118,27.074,52.656,64.763,59.01,107.439l2.098,14.054l14.054-2.15c1.874-0.289,3.517-0.427,5.014-0.427c9.184,0,17.347,3.684,23.383,9.69c6.006,6.007,9.668,14.199,9.69,23.382c-0.022,9.155-3.684,17.339-9.69,23.354c-6.036,6.006-14.199,9.69-23.383,9.69c-3.799,0-7.418-0.688-10.935-1.896l-13.432-4.74l-4.682,13.432c-12.006,34.606-34.484,64.393-63.62,85.475c-7.62,5.522-15.689,10.457-24.171,14.712c0.594,3.88,0.883,7.794,0.883,11.782c0,6.889-0.883,13.634-2.591,20.126c15.168-6.231,29.426-14.199,42.487-23.665c30.403-22.022,54.552-52.149,69.264-87.284c2.208,0.254,4.501,0.398,6.795,0.398c16.927,0,32.334-6.89,43.414-17.969C505.089,293.48,512,278.036,512,261.145C512,244.226,505.089,228.782,494.002,217.702z"/>
  </svg>
);

// Orthopedics 
const BoneIcon = ({ size = 32 }) => (
  <svg width={size} height={size} viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
    <path fill="currentColor" d="M23.149,28.571l0.72-0.36c3.17-1.584,7.089-1.585,10.262,0l0.714,0.358C35.409,28.851,36.04,29,36.669,29h0.26v-2h-0.26c-0.32,0-0.642-0.076-0.928-0.219l-0.714-0.358c-3.728-1.861-8.328-1.861-12.051-0.001l-0.722,0.361C21.971,26.925,21.651,27,21.331,27h-0.26v2h0.26C21.961,29,22.59,28.852,23.149,28.571z"/>
    <path fill="currentColor" d="M45.143,25.308l-0.159-0.045C44.988,25.151,45,25.041,45,24.929c0-2.156-0.84-4.183-2.364-5.707C39.646,16.232,38,12.257,38,8.029V1H20v7.029c0,4.228-1.646,8.203-4.636,11.192C13.84,20.746,13,22.773,13,24.929c0,1.408,0.364,2.731,1,3.884v4.715c0,3.001,0.691,6.005,2,8.705v6.162c0,2.593,1.288,4.999,3.445,6.438L19.697,55H22V44.692c0-1.489,0.265-2.943,0.748-4.309c2.1,2.744,3.252,6.073,3.252,9.587V63h18V49.971c0-4.228,1.646-8.203,4.636-11.192C50.16,37.254,51,35.227,51,33.071C51,29.483,48.592,26.291,45.143,25.308z M16.508,20.934l6.023,0.072l3.425-5.137L28.434,20H34v-2h-4.434l-2.014-3.357l6.691-1.673l-0.485-1.94l-8.375,2.094l-3.913,5.87l-3.227-0.039C20.67,15.841,22,12.041,22,8.029V3h14v5.029c0,4.762,1.854,9.239,5.222,12.606C42.369,21.783,43,23.307,43,24.929C43,28.276,40.276,31,36.929,31h-0.259c-0.938,0-1.877-0.222-2.715-0.641L33.236,30c-1.309-0.654-2.773-1-4.236-1s-2.928,0.346-4.236,1l-0.718,0.359C23.208,30.778,22.269,31,21.331,31h-0.259C17.724,31,15,28.276,15,24.929C15,23.442,15.536,22.041,16.508,20.934z M20,44.692v8.055c-1.263-1.083-2-2.665-2-4.353v-6.631l-0.105-0.211C16.655,39.075,16,36.3,16,33.528V31.2c0.874,0.708,1.899,1.231,3.017,1.526C19.012,32.841,19,32.956,19,33.071c0,2.12,0.816,4.113,2.293,5.629c-0.178,0.321-0.205,0.386-0.222,0.428C20.36,40.906,20,42.778,20,44.692z M47.222,37.364C43.854,40.731,42,45.208,42,49.971V61H28V49.971c0-4.762-1.854-9.239-5.222-12.606C21.631,36.217,21,34.693,21,33.071c0-0.025,0.003-0.05,0.004-0.075c0.023,0,0.045,0.003,0.068,0.003h0.259c1.247,0,2.496-0.295,3.61-0.852l0.718-0.359c2.064-1.032,4.619-1.032,6.684,0l0.718,0.359C34.174,32.705,35.422,33,36.669,33h0.259c3.642,0,6.725-2.426,7.726-5.746C47.215,28.012,49,30.393,49,33.071C49,34.693,48.369,36.217,47.222,37.364z"/>
    <path fill="currentColor" d="M38.714,36.237c-2.795,1.118-6.039,0.983-8.73-0.363l-1.537-0.769l-0.895,1.789l1.537,0.769c1.524,0.762,3.208,1.19,4.91,1.293V43.5l-4,3V53h2v-5.5l2.906-2.18l4.387,4.387l1.414-1.414L36,43.586v-4.649c1.184-0.116,2.343-0.397,3.458-0.843l2.914-1.166l-0.743-1.857L38.714,36.237z"/>
  </svg>
);

const BrainIcon = ({ size = 32 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M9.5 2A2.5 2.5 0 0 1 12 4.5v15a2.5 2.5 0 0 1-4.96-.46 2.5 2.5 0 0 1-2.96-3.08 3 3 0 0 1-.34-5.58 2.5 2.5 0 0 1 1.32-4.24 2.5 2.5 0 0 1 4.44-1.14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M14.5 2A2.5 2.5 0 0 0 12 4.5v15a2.5 2.5 0 0 0 4.96-.46 2.5 2.5 0 0 0 2.96-3.08 3 3 0 0 0 .34-5.58 2.5 2.5 0 0 0-1.32-4.24 2.5 2.5 0 0 0-4.44-1.14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const ScanIcon = ({ size = 32 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M3 7V5a2 2 0 0 1 2-2h2M17 3h2a2 2 0 0 1 2 2v2M21 17v2a2 2 0 0 1-2 2h-2M7 21H5a2 2 0 0 1-2-2v-2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <line x1="7" y1="12" x2="17" y2="12" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
    <line x1="12" y1="7" x2="12" y2="17" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeDasharray="2 2"/>
  </svg>
);

const EyeIcon = ({ size = 32 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="2"/>
  </svg>
);

// Dental Care 
const ToothIcon = ({ size = 32 }) => (
  <svg width={size} height={size} viewBox="0 0 403.647 403.647" xmlns="http://www.w3.org/2000/svg">
    <path fill="currentColor" d="M124.149,306.024c9.399,13.524,17.334,19.823,24.969,19.823c2.879,0,9.97-1.094,13.638-11.241c3.023-8.362,5.729-17.91,8.592-28.019c6.969-24.6,16.515-58.291,29.998-58.291h0.957c5.804,0,11.184,5.359,16.446,16.385c5.529,11.578,9.77,27.111,13.87,42.135c2.742,10.044,5.332,19.531,8.265,27.757c3.599,10.101,10.627,11.194,13.486,11.196c7.606,0,15.537-6.395,24.954-20.122c7.482-10.905,15.357-25.708,22.777-42.808c16.646-38.359,26.584-77.285,26.584-104.125c0-19.684-6.971-38.33-19.631-52.505c-13.352-14.946-31.728-23.178-51.744-23.178c-15.719,0-32.351,9.175-44.498,15.876c-3.248,1.793-9.15,5.05-10.985,5.578c-1.851-0.534-7.712-3.777-10.94-5.564c-12.121-6.706-28.719-15.89-44.549-15.89c-20.017,0-38.393,8.232-51.743,23.178c-12.661,14.175-19.634,32.822-19.634,52.505c0,27.63,9.888,66.849,26.451,104.91C108.791,280.576,116.653,295.237,124.149,306.024z M146.338,97.6c9.202,0,21.379,4.246,32.571,11.358c1.614,1.026,3.964,2.833,6.237,4.581c0.918,0.705,1.822,1.4,2.667,2.036c2.756,2.064,6.479,4.762,10.846,7.33c2.31,1.365,4.414,2.576,6.778,3.579c9.515,4.04,19.603,6.087,29.981,6.087c10.612,0,15.996-1.187,18.013-1.667c3.782-0.902,12.638-3.308,12.465-4.616c-0.153-1.155-9.903-0.581-13.196-0.866c-3.82-0.332-15.516-1.051-29.567-4.772c-4.219-1.118-9.933-3.373-10.19-4.619c-0.195-0.941,3.885-3.556,6.989-5.46c10.873-6.671,25.408-12.97,37.378-12.97c35.56,0,56.81,31.074,56.81,61.116c0,24.573-9.726,62.249-25.38,98.327c-6.959,16.034-14.567,30.37-21.427,40.365c-6.63,9.663-10.519,13.98-12.212,13.458c-0.32-0.099-0.744-0.554-0.919-1.046c-2.734-7.67-4.826-17.008-7.51-26.84c-4.271-15.641-8.686-31.812-14.777-44.574c-7.928-16.604-17.608-24.675-29.592-24.675h-0.957c-11.576,0-21.045,8.008-28.948,24.481c-6.066,12.643-10.638,28.781-15.079,44.455c-2.786,9.836-4.879,19.043-7.72,26.902c-0.203,0.561-0.771,1.307-1.126,1.421c-1.676,0.536-5.612-3.569-12.361-13.278c-6.862-9.875-14.441-24.045-21.342-39.899c-15.569-35.777-25.241-73.748-25.241-99.097C89.528,128.673,110.778,97.6,146.338,97.6z"/>
  </svg>
);

// Cardiology 
const CardiologyIcon = ({ size = 32 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M20.4037 12.5C20.778 11.6322 21 10.7013 21 9.71405C21 6 18.9648 4 16.4543 4C15.2487 4 14.0925 4.49666 13.24 5.38071L12.7198 5.92016C12.3266 6.32798 11.6734 6.32798 11.2802 5.92016L10.76 5.38071C9.90749 4.49666 8.75128 4 7.54569 4C5 4 3 6 3 9.71405C3 10.7013 3.222 11.6322 3.59627 12.5M20.4037 12.5C18.395 17.1578 12 20 12 20C12 20 5.60502 17.1578 3.59627 12.5M20.4037 12.5L16.3249 12.5C16.1273 12.5 15.9483 12.3837 15.868 12.2031L14.4483 9.00872C14.2737 8.61588 13.7176 8.61194 13.5374 9.00226L11.436 13.5555C11.2603 13.9361 10.7223 13.9445 10.5348 13.5695L9.44721 11.3944C9.26295 11.0259 8.73705 11.0259 8.55279 11.3944L8.1382 12.2236C8.0535 12.393 7.88037 12.5 7.69098 12.5L3.59627 12.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const VirusIcon = ({ size = 32 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="2"/>
    <path d="M12 2v3M12 19v3M2 12h3M19 12h3M4.93 4.93l2.12 2.12M16.95 16.95l2.12 2.12M4.93 19.07l2.12-2.12M16.95 7.05l2.12-2.12" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
    <circle cx="12" cy="12" r="1.5" fill="currentColor"/>
  </svg>
);

const SyringeIcon = ({ size = 32 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M18 2l4 4-4 4M10 10L2 18l4 4 8-8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M8 16l-1.5 1.5M12 12l-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    <path d="M14 6l4 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
    <path d="M10 10l4 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
  </svg>
);

const CheckCircleIcon = ({ size = 20 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"/>
    <path d="M9 12l2 2 4-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const ArrowRightIcon = ({ size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M5 12h14M12 5l7 7-7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const ClockIcon = ({ size = 20 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"/>
    <path d="M12 6v6l4 2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const StarIcon = ({ size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26"/>
  </svg>
);

const ShieldIcon = ({ size = 20 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M9 12l2 2 4-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const CalendarIcon = ({ size = 20 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="3" y="4" width="18" height="18" rx="2" stroke="currentColor" strokeWidth="2"/>
    <path d="M16 2v4M8 2v4M3 10h18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const FilterIcon = ({ size = 18 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <polygon points="22,3 2,3 10,12.46 10,19 14,21 14,12.46" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

//DATA 
const allServices = [
  {
    id: 1,
    category: 'General',
    icon: HeartPulseIcon,
    title: 'Primary Care',
    shortDesc: 'Your first stop for health concerns, checkups, and preventive care for all ages.',
    features: ['Annual health checkups', 'Immunizations & vaccines', 'Chronic disease management', 'Preventive screenings'],
    duration: '30–60 min',
    rating: 4.9,
    badge: 'Most Popular',
    color: '#FF7A45',
    bgLight: '#FFF3EE',
  },
  {
    id: 2,
    category: 'Specialist',
    icon: CardiologyIcon,
    title: 'Cardiology',
    shortDesc: 'Expert heart health management with advanced diagnostics and comprehensive cardiovascular care.',
    features: ['ECG & echocardiography', 'Heart disease prevention', 'Arrhythmia treatment', 'Cardiac rehabilitation'],
    duration: '45–90 min',
    rating: 4.8,
    badge: null,
    color: '#1a6b63',
    bgLight: '#E8F5F3',
  },
  {
    id: 3,
    category: 'General',
    icon: BabyIcon,
    title: 'Pediatrics',
    shortDesc: 'Specialized medical attention for children from infancy through adolescence in a child-friendly environment.',
    features: ['Well-child visits', 'Growth & development tracking', 'Childhood vaccinations', 'Behavioral assessments'],
    duration: '30–60 min',
    rating: 4.9,
    badge: null,
    color: '#FF7A45',
    bgLight: '#E6F4FB',
  },
  {
    id: 4,
    category: 'Specialist',
    icon: BoneIcon,
    title: 'Orthopedics',
    shortDesc: 'Comprehensive treatment for musculoskeletal issues including bones, joints, ligaments, and tendons.',
    features: ['Joint replacement surgery', 'Sports injury treatment', 'Spine care', 'Fracture management'],
    duration: '45–120 min',
    rating: 4.7,
    badge: null,
    color: '#1a6b63',
    bgLight: '#F0EEFF',
  },
  {
    id: 5,
    category: 'Wellness',
    icon: BrainIcon,
    title: 'Mental Health',
    shortDesc: 'Compassionate counseling and psychiatric services for holistic well-being and recovery.',
    features: ['Individual therapy', 'Psychiatric evaluations', 'Anxiety & depression care', 'Addiction counseling'],
    duration: '50–60 min',
    rating: 4.9,
    badge: 'High Demand',
    color: '#FF7A45',
    bgLight: '#FEF0EC',
  },
  {
    id: 6,
    category: 'Diagnostic',
    icon: ScanIcon,
    title: 'Imaging & Radiology',
    shortDesc: 'State-of-the-art diagnostic imaging including MRI, CT scans, and high-resolution X-rays.',
    features: ['MRI & CT scans', 'Digital X-rays', 'Ultrasound imaging', 'PET scans'],
    duration: '20–90 min',
    rating: 4.8,
    badge: null,
    color: '#1a6b63',
    bgLight: '#E6F5F3',
  },
  {
    id: 7,
    category: 'Specialist',
    icon: EyeIcon,
    title: 'Ophthalmology',
    shortDesc: 'Comprehensive eye care from routine vision exams to advanced surgical treatments.',
    features: ['Vision testing', 'Cataract surgery', 'Glaucoma management', 'Retinal disease care'],
    duration: '30–60 min',
    rating: 4.7,
    badge: null,
    color:'#FF7A45' ,
    bgLight: '#E8F2F8',
  },
  {
    id: 8,
    category: 'Specialist',
    icon: ToothIcon,
    title: 'Dental Care',
    shortDesc: 'Complete oral health solutions from preventive cleanings to restorative and cosmetic treatments.',
    features: ['Routine cleanings', 'Dental implants', 'Orthodontics', 'Cosmetic dentistry'],
    duration: '30–90 min',
    rating: 4.8,
    badge: null,
    color: '#1a6b63',
    bgLight: '#E6F7FA',
  },
  {
    id: 9,
    category: 'Diagnostic',
    icon: VirusIcon,
    title: 'Pathology & Lab',
    shortDesc: 'Accurate and fast diagnostic testing with over 500 lab tests and rapid result turnaround.',
    features: ['Blood & urine tests', 'Biopsy analysis', 'Genetic testing', 'Culture & sensitivity'],
    duration: '15–30 min',
    rating: 4.6,
    badge: 'Fast Results',
    color: '#FF7A45',
    bgLight: '#FFFBEE',
  },
  {
    id: 10,
    category: 'Wellness',
    icon: SyringeIcon,
    title: 'Vaccination Center',
    shortDesc: 'Comprehensive immunization services for children, adults, and international travelers.',
    features: ['Travel vaccines', 'Flu shots', 'COVID-19 vaccines', 'HPV & hepatitis vaccines'],
    duration: '15–20 min',
    rating: 4.9,
    badge: null,
    color: '#1a6b63',
    bgLight: '#EAF7F3',
  },
  {
    id: 11,
    category: 'Wellness',
    icon: HeartPulseIcon,
    title: 'Physiotherapy',
    shortDesc: 'Evidence-based rehabilitation programs to restore movement, reduce pain, and improve quality of life.',
    features: ['Post-surgery rehab', 'Sports rehab', 'Neurological rehab', 'Pain management'],
    duration: '45–60 min',
    rating: 4.8,
    badge: null,
    color: '#FF7A45',
    bgLight: '#FFF3EE',
  },
  {
    id: 12,
    category: 'Diagnostic',
    icon: ScanIcon,
    title: 'Endoscopy',
    shortDesc: 'Minimally invasive internal examinations for accurate diagnosis of gastrointestinal conditions.',
    features: ['Colonoscopy', 'Gastroscopy', 'Bronchoscopy', 'ERCP procedures'],
    duration: '30–120 min',
    rating: 4.7,
    badge: null,
    color: '#1a6b63',
    bgLight: '#E8F5F3',
  },
];

const categories = ['All', 'General', 'Specialist', 'Diagnostic', 'Wellness'];

const stats = [
  { value: '50+', label: 'Specializations' },
  { value: '500+', label: 'Specialists' },
  { value: '98%', label: 'Patient Satisfaction' },
  { value: '24/7', label: 'Emergency Support' },
];

// SERVICE CARD 
const ServiceCard = ({ service }) => {
  const [hovered, setHovered] = useState(false);
  const Icon = service.icon;

  return (
    <div
      className={`srv-card ${hovered ? 'srv-card--hovered' : ''}`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{ '--accent': service.color, '--bg-light': service.bgLight }}
    >
      {service.badge && (
        <span className="srv-badge">{service.badge}</span>
      )}

      <div className="srv-icon-wrap">
        <span className="srv-icon" style={{ color: service.color }}>
          <Icon size={30} />
        </span>
      </div>

      <div className="srv-category">{service.category}</div>
      <h3 className="srv-title">{service.title}</h3>
      <p className="srv-desc">{service.shortDesc}</p>

      <ul className="srv-features">
        {service.features.map((f, i) => (
          <li key={i} className="srv-feature-item">
            <span className="srv-check" style={{ color: service.color }}>
              <CheckCircleIcon size={16} />
            </span>
            {f}
          </li>
        ))}
      </ul>

      <div className="srv-meta">
        <span className="srv-duration">
          <ClockIcon size={15} />
          {service.duration}
        </span>
        <span className="srv-rating">
          <span style={{ color: '#F4A524' }}><StarIcon size={14} /></span>
          {service.rating}
        </span>
      </div>

      <button className="srv-btn" style={{ background: `linear-gradient(135deg, ${service.color}, ${service.color}cc)` }}>
        Book Appointment
        <ArrowRightIcon size={15} />
      </button>
    </div>
  );
};

// MAIN COMPONENT 
const Services = () => {
  const [activeCategory, setActiveCategory] = useState('All');

  const filtered = activeCategory === 'All'
    ? allServices
    : allServices.filter(s => s.category === activeCategory);

  const styles = `
    @import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display&family=DM+Sans:wght@400;500;600;700;800&display=swap');

    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

    .srv-page {
      font-family: 'DM Sans', 'Segoe UI', sans-serif;
      background: #f8fbfa;
      min-height: 100vh;
    }

    /* ── Hero Banner ── */
    .srv-hero {
      background: linear-gradient(135deg, #0f4440 0%, #1a6b63 60%, #2a9d8f 100%);
      padding: 90px 40px 70px;
      text-align: center;
      position: relative;
      overflow: hidden;
    }

    .srv-hero::before {
      content: '';
      position: absolute;
      inset: 0;
      background: url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.04'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
    }

    .srv-hero-inner {
      position: relative;
      z-index: 1;
      max-width: 780px;
      margin: 0 auto;
    }

    .srv-hero-eyebrow {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      background: rgba(255,255,255,0.12);
      border: 1px solid rgba(255,255,255,0.2);
      color: #FF7A45;
      font-size: 0.8rem;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 1.5px;
      padding: 6px 16px;
      border-radius: 99px;
      margin-bottom: 22px;
    }

    .srv-hero-eyebrow-dot {
      width: 7px;
      height: 7px;
      background: #FF7A45;
      border-radius: 50%;
      animation: pulse-dot 1.8s ease-in-out infinite;
    }

    @keyframes pulse-dot {
      0%, 100% { transform: scale(1); opacity: 1; }
      50% { transform: scale(1.4); opacity: 0.7; }
    }

    .srv-hero h1 {
      font-family: 'DM Serif Display', Georgia, serif;
      font-size: 3.2rem;
      color: #ffffff;
      font-weight: 400;
      line-height: 1.2;
      margin-bottom: 18px;
    }

    .srv-hero h1 span {
      color: #FF7A45;
    }

    .srv-hero p {
      font-size: 1.08rem;
      color: rgba(255,255,255,0.8);
      line-height: 1.75;
      margin-bottom: 36px;
    }

    .srv-hero-actions {
      display: flex;
      gap: 14px;
      justify-content: center;
      flex-wrap: wrap;
    }

    .srv-hero-btn-primary {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      padding: 13px 30px;
      background: #FF7A45;
      color: white;
      border: none;
      border-radius: 8px;
      font-weight: 700;
      font-size: 0.95rem;
      cursor: pointer;
      transition: all 0.3s;
      text-decoration: none;
    }
    .srv-hero-btn-primary:hover { background: #e86a38; transform: translateY(-2px); box-shadow: 0 8px 24px rgba(255,122,69,0.4); }

    .srv-hero-btn-secondary {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      padding: 13px 30px;
      background: rgba(255,255,255,0.1);
      color: white;
      border: 1.5px solid rgba(255,255,255,0.35);
      border-radius: 8px;
      font-weight: 700;
      font-size: 0.95rem;
      cursor: pointer;
      transition: all 0.3s;
      text-decoration: none;
      backdrop-filter: blur(4px);
    }
    .srv-hero-btn-secondary:hover { background: rgba(255,255,255,0.18); transform: translateY(-2px); }

    /* ── Stats Bar ── */
    .srv-stats-bar {
      background: #ffffff;
      border-bottom: 1px solid #e8f0ee;
      padding: 0;
      box-shadow: 0 2px 12px rgba(0,0,0,0.06);
    }

    .srv-stats-inner {
      max-width: 1300px;
      margin: 0 auto;
      padding: 0 40px;
      display: grid;
      grid-template-columns: repeat(4, 1fr);
    }

    .srv-stat-item {
      text-align: center;
      padding: 26px 20px;
      border-right: 1px solid #e8f0ee;
      transition: background 0.2s;
    }

    .srv-stat-item:last-child { border-right: none; }
    .srv-stat-item:hover { background: #f0faf8; }

    .srv-stat-value {
      font-size: 2rem;
      font-weight: 800;
      color: #1a6b63;
      line-height: 1;
      margin-bottom: 5px;
    }

    .srv-stat-label {
      font-size: 0.82rem;
      color: #888;
      font-weight: 600;
      text-transform: uppercase;
      letter-spacing: 0.8px;
    }

    /* ── Main Content ── */
    .srv-main {
      max-width: 1300px;
      margin: 0 auto;
      padding: 60px 40px 80px;
    }

    .srv-section-header {
      text-align: center;
      margin-bottom: 40px;
    }

    .srv-section-header h2 {
      font-family: 'DM Serif Display', Georgia, serif;
      font-size: 2.2rem;
      color: #1a2e2c;
      font-weight: 400;
      margin-bottom: 10px;
    }

    .srv-section-header h2 span { color: #1a6b63; }

    .srv-section-header p {
      font-size: 1rem;
      color: #777;
      line-height: 1.7;
      max-width: 580px;
      margin: 0 auto;
    }

    /* ── Filter Tabs ── */
    .srv-filters {
      display: flex;
      align-items: center;
      gap: 10px;
      justify-content: center;
      flex-wrap: wrap;
      margin-bottom: 44px;
    }

    .srv-filter-label {
      display: flex;
      align-items: center;
      gap: 6px;
      font-size: 0.82rem;
      font-weight: 700;
      color: #aaa;
      text-transform: uppercase;
      letter-spacing: 0.8px;
      margin-right: 4px;
    }

    .srv-filter-btn {
      padding: 9px 22px;
      border-radius: 99px;
      border: 1.5px solid #d8e8e5;
      background: white;
      color: #667;
      font-size: 0.9rem;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.25s;
      font-family: inherit;
    }

    .srv-filter-btn:hover { border-color: #1a6b63; color: #1a6b63; background: #f0faf8; }

    .srv-filter-btn.active {
      background: linear-gradient(135deg, #1a6b63, #0f4440);
      color: white;
      border-color: transparent;
      box-shadow: 0 4px 14px rgba(26,107,99,0.3);
    }

    /* ── Grid ── */
    .srv-grid {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 24px;
    }

    /* ── Card ── */
    .srv-card {
      background: white;
      border-radius: 16px;
      padding: 30px 26px;
      border: 1.5px solid #eef3f2;
      position: relative;
      transition: all 0.35s cubic-bezier(0.4, 0, 0.2, 1);
      overflow: hidden;
      display: flex;
      flex-direction: column;
      gap: 0;
    }

    .srv-card::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      height: 3px;
      background: linear-gradient(90deg, var(--accent), transparent);
      opacity: 0;
      transition: opacity 0.35s;
    }

    .srv-card--hovered {
      transform: translateY(-6px);
      box-shadow: 0 20px 48px rgba(0,0,0,0.1);
      border-color: var(--accent);
    }

    .srv-card--hovered::before { opacity: 1; }

    .srv-badge {
      position: absolute;
      top: 16px;
      right: 16px;
      background: linear-gradient(135deg, #FF7A45, #FF6B35);
      color: white;
      font-size: 0.68rem;
      font-weight: 800;
      text-transform: uppercase;
      letter-spacing: 0.6px;
      padding: 4px 10px;
      border-radius: 99px;
    }

    .srv-icon-wrap {
      width: 58px;
      height: 58px;
      border-radius: 14px;
      background: var(--bg-light);
      display: flex;
      align-items: center;
      justify-content: center;
      margin-bottom: 16px;
      transition: transform 0.3s;
    }

    .srv-card--hovered .srv-icon-wrap { transform: scale(1.08); }

    .srv-category {
      font-size: 0.72rem;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 1px;
      color: var(--accent);
      margin-bottom: 6px;
    }

    .srv-title {
      font-size: 1.2rem;
      font-weight: 800;
      color: #1a2e2c;
      margin-bottom: 10px;
      line-height: 1.3;
    }

    .srv-desc {
      font-size: 0.88rem;
      color: #777;
      line-height: 1.65;
      margin-bottom: 18px;
    }

    .srv-features {
      list-style: none;
      display: flex;
      flex-direction: column;
      gap: 7px;
      margin-bottom: 20px;
      flex: 1;
    }

    .srv-feature-item {
      display: flex;
      align-items: center;
      gap: 8px;
      font-size: 0.84rem;
      color: #555;
      font-weight: 500;
    }

    .srv-check { flex-shrink: 0; }

    .srv-meta {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 18px;
      padding: 10px 14px;
      background: #f7faf9;
      border-radius: 8px;
    }

    .srv-duration {
      display: flex;
      align-items: center;
      gap: 5px;
      font-size: 0.8rem;
      font-weight: 600;
      color: #888;
    }

    .srv-rating {
      display: flex;
      align-items: center;
      gap: 4px;
      font-size: 0.85rem;
      font-weight: 700;
      color: #444;
    }

    .srv-btn {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 8px;
      width: 100%;
      padding: 12px;
      color: white;
      border: none;
      border-radius: 10px;
      font-weight: 700;
      font-size: 0.88rem;
      cursor: pointer;
      transition: all 0.25s;
      font-family: inherit;
    }

    .srv-btn:hover { filter: brightness(1.08); transform: translateY(-1px); box-shadow: 0 6px 18px rgba(0,0,0,0.18); }

    /* ── Why Choose Us ── */
    .srv-why {
      background: linear-gradient(135deg, #0f4440 0%, #1a6b63 100%);
      padding: 80px 40px;
      margin-top: 0;
    }

    .srv-why-inner {
      max-width: 1300px;
      margin: 0 auto;
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 60px;
      align-items: center;
    }

    .srv-why-content h2 {
      font-family: 'DM Serif Display', Georgia, serif;
      font-size: 2.4rem;
      color: white;
      font-weight: 400;
      line-height: 1.25;
      margin-bottom: 14px;
    }

    .srv-why-content h2 span { color: #FF7A45; }

    .srv-why-content p {
      color: rgba(255,255,255,0.75);
      font-size: 1rem;
      line-height: 1.75;
      margin-bottom: 32px;
    }

    .srv-why-list {
      display: flex;
      flex-direction: column;
      gap: 16px;
    }

    .srv-why-item {
      display: flex;
      align-items: flex-start;
      gap: 14px;
      padding: 16px 18px;
      background: rgba(255,255,255,0.08);
      border-radius: 12px;
      border: 1px solid rgba(255,255,255,0.1);
      transition: background 0.25s;
    }

    .srv-why-item:hover { background: rgba(255,255,255,0.14); }

    .srv-why-icon {
      width: 42px;
      height: 42px;
      min-width: 42px;
      background: rgba(255,122,69,0.2);
      border-radius: 10px;
      display: flex;
      align-items: center;
      justify-content: center;
      color: #FF7A45;
    }

    .srv-why-item h4 {
      font-size: 0.95rem;
      font-weight: 700;
      color: white;
      margin-bottom: 4px;
    }

    .srv-why-item p {
      font-size: 0.84rem;
      color: rgba(255,255,255,0.65);
      line-height: 1.5;
      margin: 0;
    }

    .srv-why-cta {
      display: flex;
      gap: 14px;
      flex-wrap: wrap;
      margin-top: 8px;
    }

    .srv-why-btn-primary {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      padding: 13px 28px;
      background: #FF7A45;
      color: white;
      border: none;
      border-radius: 8px;
      font-weight: 700;
      font-size: 0.92rem;
      cursor: pointer;
      transition: all 0.3s;
      font-family: inherit;
    }
    .srv-why-btn-primary:hover { background: #e86a38; transform: translateY(-2px); }

    .srv-why-btn-outline {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      padding: 13px 28px;
      background: transparent;
      color: white;
      border: 1.5px solid rgba(255,255,255,0.4);
      border-radius: 8px;
      font-weight: 700;
      font-size: 0.92rem;
      cursor: pointer;
      transition: all 0.3s;
      font-family: inherit;
    }
    .srv-why-btn-outline:hover { background: rgba(255,255,255,0.1); transform: translateY(-2px); }

    .srv-why-visual {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 16px;
    }

    .srv-why-visual-card {
      background: rgba(255,255,255,0.1);
      border: 1px solid rgba(255,255,255,0.15);
      border-radius: 14px;
      padding: 24px 20px;
      text-align: center;
      transition: all 0.3s;
      backdrop-filter: blur(4px);
    }

    .srv-why-visual-card:hover { background: rgba(255,255,255,0.18); transform: translateY(-4px); }

    .srv-why-visual-card:first-child { grid-column: span 2; }

    .srv-why-visual-icon {
      width: 52px;
      height: 52px;
      background: rgba(255,122,69,0.15);
      border-radius: 14px;
      display: flex;
      align-items: center;
      justify-content: center;
      margin: 0 auto 14px;
      color: #FF7A45;
    }

    .srv-why-visual-card h3 {
      font-size: 1.6rem;
      font-weight: 800;
      color: white;
      margin-bottom: 4px;
    }

    .srv-why-visual-card p {
      font-size: 0.82rem;
      color: rgba(255,255,255,0.65);
      margin: 0;
    }

    /* ── CTA ── */
    .srv-cta {
      background: #ffffff;
      padding: 80px 40px;
      text-align: center;
    }

    .srv-cta-inner {
      max-width: 680px;
      margin: 0 auto;
    }

    .srv-cta h2 {
      font-family: 'DM Serif Display', Georgia, serif;
      font-size: 2.4rem;
      color: #1a2e2c;
      font-weight: 400;
      margin-bottom: 14px;
      line-height: 1.25;
    }

    .srv-cta h2 span { color: #1a6b63; }

    .srv-cta p {
      font-size: 1rem;
      color: #777;
      line-height: 1.7;
      margin-bottom: 36px;
    }

    .srv-cta-actions {
      display: flex;
      gap: 14px;
      justify-content: center;
      flex-wrap: wrap;
    }

    .srv-cta-btn-primary {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      padding: 14px 32px;
      background: linear-gradient(135deg, #FF7A45, #FF6B35);
      color: white;
      border: none;
      border-radius: 8px;
      font-weight: 700;
      font-size: 0.95rem;
      cursor: pointer;
      transition: all 0.3s;
      font-family: inherit;
    }
    .srv-cta-btn-primary:hover { transform: translateY(-2px); box-shadow: 0 8px 24px rgba(255,122,69,0.4); }

    .srv-cta-btn-secondary {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      padding: 14px 32px;
      background: transparent;
      color: #1a6b63;
      border: 1.5px solid #1a6b63;
      border-radius: 8px;
      font-weight: 700;
      font-size: 0.95rem;
      cursor: pointer;
      transition: all 0.3s;
      font-family: inherit;
    }
    .srv-cta-btn-secondary:hover { background: #1a6b63; color: white; transform: translateY(-2px); }

    .srv-cta-note {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 6px;
      margin-top: 18px;
      font-size: 0.82rem;
      color: #aaa;
      font-weight: 500;
    }

    /* ── Responsive ── */
    @media (max-width: 1024px) {
      .srv-grid { grid-template-columns: repeat(2, 1fr); }
      .srv-why-inner { grid-template-columns: 1fr; gap: 40px; }
      .srv-why-visual { grid-template-columns: repeat(2, 1fr); }
      .srv-why-visual-card:first-child { grid-column: span 1; }
      .srv-stats-inner { grid-template-columns: repeat(2, 1fr); }
      .srv-stat-item:nth-child(2) { border-right: none; }
    }

    @media (max-width: 640px) {
      .srv-hero h1 { font-size: 2.2rem; }
      .srv-grid { grid-template-columns: 1fr; }
      .srv-main { padding: 40px 20px 60px; }
      .srv-hero { padding: 60px 20px 50px; }
      .srv-why { padding: 60px 20px; }
      .srv-cta { padding: 60px 20px; }
      .srv-stats-inner { padding: 0 20px; }
      .srv-why-visual { grid-template-columns: 1fr; }
    }
  `;

  return (
    <div className="srv-page">
      <style>{styles}</style>

      <Header />

      {/* Hero */}
      <section className="srv-hero">
        <div className="srv-hero-inner">
          <div className="srv-hero-eyebrow">
            <span className="srv-hero-eyebrow-dot" />
            World-Class Healthcare Services
          </div>
          <h1>Our Medical <span>Specialities</span></h1>
          <p>
            We provide specialized treatments across various medical disciplines using
            cutting-edge technology and compassionate expertise — all under one roof.
          </p>
          <div className="srv-hero-actions">
            <button className="srv-hero-btn-primary">
              <CalendarIcon size={17} />
              Book Appointment
            </button>
            <button className="srv-hero-btn-secondary">
              <HeartPulseIcon size={17} />
              Emergency Contact
            </button>
          </div>
        </div>
      </section>

      {/* Stats Bar */}
      <div className="srv-stats-bar">
        <div className="srv-stats-inner">
          {stats.map((s, i) => (
            <div key={i} className="srv-stat-item">
              <div className="srv-stat-value">{s.value}</div>
              <div className="srv-stat-label">{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Services Grid  */}
      <main className="srv-main">
        <div className="srv-section-header">
          <h2>All <span>Services</span></h2>
          <p>
            Browse our full range of specialized medical services, each delivered by
            expert clinicians with state-of-the-art facilities.
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="srv-filters">
          <span className="srv-filter-label">
            <FilterIcon size={14} />
            Filter:
          </span>
          {categories.map(cat => (
            <button
              key={cat}
              className={`srv-filter-btn ${activeCategory === cat ? 'active' : ''}`}
              onClick={() => setActiveCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Cards */}
        <div className="srv-grid">
          {filtered.map(service => (
            <ServiceCard key={service.id} service={service} />
          ))}
        </div>
      </main>

      {/* Why Choose Us  */}
      <section className="srv-why">
        <div className="srv-why-inner">
          <div className="srv-why-content">
            <h2>Why Families <span>Trust HealNow</span></h2>
            <p>
              From emergency care to elective procedures, HealNow delivers consistent,
              compassionate, and clinically excellent healthcare every single day.
            </p>

            <div className="srv-why-list">
              {[
                {
                  icon: <ClockIcon size={20} />,
                  title: '24/7 Emergency Support',
                  desc: 'Our trauma center and emergency team are on standby 365 days a year to provide critical life-saving care.',
                },
                {
                  icon: <CalendarIcon size={20} />,
                  title: 'Seamless Online Appointments',
                  desc: 'Book, reschedule, or cancel appointments in seconds via our secure patient portal with instant confirmations.',
                },
                {
                  icon: <ShieldIcon size={20} />,
                  title: 'Award-Winning Quality',
                  desc: 'Consistently ranked among top healthcare providers for patient safety, clinical outcomes, and nursing excellence.',
                },
              ].map((item, i) => (
                <div key={i} className="srv-why-item">
                  <div className="srv-why-icon">{item.icon}</div>
                  <div>
                    <h4>{item.title}</h4>
                    <p>{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="srv-why-cta" style={{ marginTop: '28px' }}>
              <button className="srv-why-btn-primary">
                View All Departments
                <ArrowRightIcon size={15} />
              </button>
              <button className="srv-why-btn-outline">
                <CalendarIcon size={16} />
                Book a Consultation
              </button>
            </div>
          </div>

          {/* Visual Grid */}
          <div className="srv-why-visual">
            {[
              { icon: <HeartPulseIcon size={26} />, value: '500+', label: 'World-renowned specialists' },
              { icon: <StethoscopeIcon size={26} />, value: '98%', label: 'Patient satisfaction rate' },
              { icon: <ScanIcon size={26} />, value: '50+', label: 'Medical specialities' },
              { icon: <ShieldIcon size={26} />, value: '24/7', label: 'Round-the-clock support' },
            ].map((item, i) => (
              <div key={i} className="srv-why-visual-card">
                <div className="srv-why-visual-icon">{item.icon}</div>
                <h3>{item.value}</h3>
                <p>{item.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/*  CTA Section  */}
      <section className="srv-cta">
        <div className="srv-cta-inner">
          <h2>Ready to Prioritize <span>Your Health?</span></h2>
          <p>
            Don't wait for symptoms. Schedule a consultation with our world-class
            specialists today and take the first step towards a healthier you.
          </p>
          <div className="srv-cta-actions">
            <button className="srv-cta-btn-primary">
              <CalendarIcon size={17} />
              Book Consultation Now
            </button>
            <button className="srv-cta-btn-secondary">
              Call Support Center
            </button>
          </div>
          <div className="srv-cta-note">
            <ShieldIcon size={15} />
            100% HIPAA Compliant and Secure Data Management
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Services;