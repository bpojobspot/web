import axios from "axios";

const API_BASE_URL =
  import.meta.env.VITE_API_URL || "http://localhost:8080/api";

// Create axios instance
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("token");
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

// Auth API
export const authAPI = {
  login: (email, password) => api.post("/auth/login", { email, password }),
  register: (userData, userType) =>
    api.post(`/auth/register/${userType}`, userData),
  verifyToken: (token) =>
    api.get("/auth/verify", {
      headers: { Authorization: `Bearer ${token}` },
    }),
};

// Job API
export const jobAPI = {
  getAllJobs: (filters = {}) => api.get("/public/jobs", { params: filters }),
  searchJobs: (filters) => api.get("/public/jobs/search", { params: filters }),
  getJobById: (id) => api.get(`/public/jobs/${id}`),
  createJob: (jobData) => api.post("/employer/jobs", jobData),
  updateJob: (id, jobData) => api.put(`/employer/jobs/${id}`, jobData),
  deleteJob: (id) => api.delete(`/employer/jobs/${id}`),
  getEmployerJobs: () => api.get("/employer/jobs"),
};

// Application API
export const applicationAPI = {
  applyForJob: (applicationData) =>
    api.post("/candidate/applications", applicationData),
  getCandidateApplications: () => api.get("/candidate/applications"),
  withdrawApplication: (id) =>
    api.put(`/candidate/applications/${id}/withdraw`),
  getEmployerApplications: () => api.get("/employer/applications"),
  getApplicationsByJob: (jobId) =>
    api.get(`/employer/applications/job/${jobId}`),
  updateApplicationStatus: (id, status) =>
    api.put(`/employer/applications/${id}/status`, null, {
      params: { status },
    }),
};

// Admin API
export const adminAPI = {
  getDashboardStats: () => api.get("/admin/dashboard/stats"),
  getAllCandidates: () => api.get("/admin/candidates"),
  getAllEmployers: () => api.get("/admin/employers"),
  getAllJobs: () => api.get("/admin/jobs"),
  approveEmployer: (id) => api.put(`/admin/employers/${id}/approve`),
  blockEmployer: (id) => api.put(`/admin/employers/${id}/block`),
  deleteEmployer: (id) => api.delete(`/admin/employers/${id}`),
  blockCandidate: (id) => api.put(`/admin/candidates/${id}/block`),
  deleteCandidate: (id) => api.delete(`/admin/candidates/${id}`),
  approveJob: (id) => api.put(`/admin/jobs/${id}/approve`),
  rejectJob: (id) => api.put(`/admin/jobs/${id}/reject`),
  deleteJob: (id) => api.delete(`/admin/jobs/${id}`),
};

// Public API
export const publicAPI = {
  getStats: () => api.get("/public/stats"),
};

export default api;
