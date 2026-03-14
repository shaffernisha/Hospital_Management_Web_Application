const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
// Get JWT token from localStorage
const getToken = () => localStorage.getItem('token');

//Create headers dynamically 
const getHeaders = () => ({
  'Content-Type': 'application/json',
  'Authorization': `Bearer ${getToken()}`
});
// Authentication - Register, Login, Get Current User
export const authAPI = {
  register: async (data) => {
    const response = await fetch(`${API_URL}/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    return response.json();
  },

  login: async (email, password) => {
    const response = await fetch(`${API_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });
    return response.json();
  },

  getCurrentUser: async () => {
    const response = await fetch(`${API_URL}/auth/me`, {
      headers: getHeaders()
    });
    return response.json();
  }
};
// DOCTOR API
export const doctorAPI = {
  getAll: async () => {
    const response = await fetch(`${API_URL}/doctors`, {
      headers: getHeaders()
    });
    return response.json();
  },

  getById: async (id) => {
    const response = await fetch(`${API_URL}/doctors/${id}`, {
      headers: getHeaders()
    });
    return response.json();
  },

  list: async () => {
    const response = await fetch(`${API_URL}/doctors/list/all`, {
      headers: getHeaders()
    });
    return response.json();
  }
};
// Appointments - Create, Get all, Get my appointments, Update, Update status
export const appointmentAPI = {
  create: async (data) => {
    const response = await fetch(`${API_URL}/appointments`, {
      method: 'POST',
      headers: getHeaders(),
      body: JSON.stringify(data)
    });
    return response.json();
  },

  getAll: async () => {
    const response = await fetch(`${API_URL}/appointments`, {
      headers: getHeaders()
    });
    return response.json();
  },

  getMyAppointments: async () => {
    const response = await fetch(`${API_URL}/appointments/user/my-appointments`, {
      headers: getHeaders()
    });
    return response.json();
  },

  update: async (id, data) => {
    const response = await fetch(`${API_URL}/appointments/${id}`, {
      method: 'PUT',
      headers: getHeaders(),
      body: JSON.stringify(data)
    });
    return response.json();
  },

  updateStatus: async (id, status) => {
    const response = await fetch(`${API_URL}/appointments/${id}`, {
      method: 'PUT',
      headers: getHeaders(),
      body: JSON.stringify({ status })
    });
    return response.json();
  }
};
// Prescriptions - Create, Get patient/doctor prescriptions, Download PDF, Share, Update, Delete
export const prescriptionAPI = {
  create: async (data) => {
    const response = await fetch(`${API_URL}/prescriptions/create`, {
      method: 'POST',
      headers: getHeaders(),
      body: JSON.stringify(data)
    });
    return response.json();
  },

  getPatient: async () => {
    const response = await fetch(`${API_URL}/prescriptions/patient`, {
      headers: getHeaders()
    });
    return response.json();
  },

  getDoctor: async () => {
    const response = await fetch(`${API_URL}/prescriptions/doctor`, {
      headers: getHeaders()
    });
    return response.json();
  },

  getById: async (id) => {
    const response = await fetch(`${API_URL}/prescriptions/${id}`, {
      headers: getHeaders()
    });
    return response.json();
  },

  downloadPDF: async (id) => {
    const response = await fetch(`${API_URL}/prescriptions/${id}/download`, {
      headers: getHeaders()
    });
    return response.blob();
  },

  share: async (id) => {
    const response = await fetch(`${API_URL}/prescriptions/${id}/share`, {
      method: 'POST',
      headers: getHeaders(),
      body: JSON.stringify({})
    });
    return response.json();
  },

  update: async (id, data) => {
    const response = await fetch(`${API_URL}/prescriptions/${id}`, {
      method: 'PUT',
      headers: getHeaders(),
      body: JSON.stringify(data)
    });
    return response.json();
  },

  delete: async (id) => {
    const response = await fetch(`${API_URL}/prescriptions/${id}`, {
      method: 'DELETE',
      headers: getHeaders()
    });
    return response.json();
  }
};

// Chatbot - Send message, Get chat history
export const chatbotAPI = {
  sendMessage: async (message) => {
    const response = await fetch(`${API_URL}/chatbot/send-message`, {
      method: 'POST',
      headers: getHeaders(),
      body: JSON.stringify({ message })
    });
    return response.json();
  },

  getHistory: async () => {
    const response = await fetch(`${API_URL}/chatbot/history`, {
      headers: getHeaders()
    });
    return response.json();
  }
};
// Email - Send appointment confirmation
export const emailAPI = {
  sendConfirmation: async (data) => {
    const response = await fetch(`${API_URL}/emails/send-confirmation`, {
      method: 'POST',
      headers: getHeaders(),
      body: JSON.stringify(data)
    });
    return response.json();
  }
};
// Admin operations
export const adminAPI = {
  getDashboard: async () => {
    const response = await fetch(`${API_URL}/admin/dashboard`, {
      headers: getHeaders()
    });
    return response.json();
  },

  getUsers: async () => {
    // All users list
    const response = await fetch(`${API_URL}/admin/users`, {
      headers: getHeaders()
    });
    return response.json();
  },

  getAppointments: async () => {
    // All appointments list
    const response = await fetch(`${API_URL}/admin/appointments/all`, {
      headers: getHeaders()
    });
    return response.json();
  }
};