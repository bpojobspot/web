import { createContext, useContext, useState } from "react";
import { jobAPI } from "../services/api";

const JobContext = createContext();

export const useJobs = () => {
  const context = useContext(JobContext);
  if (!context) {
    throw new Error("useJobs must be used within a JobProvider");
  }
  return context;
};

export const JobProvider = ({ children }) => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [filters, setFilters] = useState({
    title: "",
    city: "",
    jobType: "",
    shift: "",
    isVoice: null,
    minSalary: "",
    maxSalary: "",
  });

  const fetchJobs = async (searchFilters = {}) => {
    setLoading(true);
    try {
      const response = await jobAPI.getAllJobs(searchFilters);
      setJobs(response.data);
    } catch (error) {
      console.error("Failed to fetch jobs:", error);
    } finally {
      setLoading(false);
    }
  };

  const searchJobs = async (searchFilters) => {
    setLoading(true);
    try {
      const response = await jobAPI.searchJobs(searchFilters);
      setJobs(response.data);
      setFilters(searchFilters);
    } catch (error) {
      console.error("Failed to search jobs:", error);
    } finally {
      setLoading(false);
    }
  };

  const getJobById = async (id) => {
    try {
      const response = await jobAPI.getJobById(id);
      return response.data;
    } catch (error) {
      console.error("Failed to fetch job:", error);
      throw error;
    }
  };

  const value = {
    jobs,
    loading,
    filters,
    fetchJobs,
    searchJobs,
    getJobById,
    setFilters,
  };

  return <JobContext.Provider value={value}>{children}</JobContext.Provider>;
};
