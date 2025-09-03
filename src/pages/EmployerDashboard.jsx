import { useState, useEffect } from "react";
import { useAuth } from "../contexts/AuthContext";
import { jobAPI, applicationAPI } from "../services/api";
import { Briefcase, Users, Clock, CheckCircle, Plus } from "lucide-react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";

const EmployerDashboard = () => {
  const { user } = useAuth();
  const [jobs, setJobs] = useState([]);
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [jobsResponse, applicationsResponse] = await Promise.all([
        jobAPI.getEmployerJobs(),
        applicationAPI.getEmployerApplications(),
      ]);
      setJobs(jobsResponse.data);
      setApplications(applicationsResponse.data);
    } catch (error) {
      toast.error("Failed to fetch dashboard data");
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "APPLIED":
        return "bg-blue-100 text-blue-800";
      case "SHORTLISTED":
        return "bg-yellow-100 text-yellow-800";
      case "INTERVIEWED":
        return "bg-purple-100 text-purple-800";
      case "HIRED":
        return "bg-green-100 text-green-800";
      case "REJECTED":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Dashboard</h1>
          <p className="text-gray-600">Welcome back, {user?.name}!</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex items-center">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Briefcase className="w-6 h-6 text-blue-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Active Jobs</p>
                <p className="text-2xl font-bold text-gray-900">
                  {jobs.length}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex items-center">
              <div className="p-2 bg-green-100 rounded-lg">
                <Users className="w-6 h-6 text-green-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">
                  Total Applications
                </p>
                <p className="text-2xl font-bold text-gray-900">
                  {applications.length}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex items-center">
              <div className="p-2 bg-yellow-100 rounded-lg">
                <Clock className="w-6 h-6 text-yellow-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">
                  Pending Review
                </p>
                <p className="text-2xl font-bold text-gray-900">
                  {
                    applications.filter((app) => app.status === "APPLIED")
                      .length
                  }
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex items-center">
              <div className="p-2 bg-purple-100 rounded-lg">
                <CheckCircle className="w-6 h-6 text-purple-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Hired</p>
                <p className="text-2xl font-bold text-gray-900">
                  {applications.filter((app) => app.status === "HIRED").length}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mb-8">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">
              Quick Actions
            </h2>
            <div className="flex flex-wrap gap-4">
              <button className="btn-primary flex items-center">
                <Plus className="w-4 h-4 mr-2" />
                Post New Job
              </button>
              <Link to="/jobs" className="btn-secondary">
                Browse Candidates
              </Link>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Recent Jobs */}
          <div className="bg-white rounded-lg shadow-md">
            <div className="px-6 py-4 border-b border-gray-200">
              <h2 className="text-lg font-semibold text-gray-900">
                Recent Jobs
              </h2>
            </div>

            {jobs.length === 0 ? (
              <div className="p-6 text-center">
                <Briefcase className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  No jobs posted yet
                </h3>
                <p className="text-gray-600 mb-4">
                  Start posting jobs to attract candidates.
                </p>
                <button className="btn-primary">Post Your First Job</button>
              </div>
            ) : (
              <div className="divide-y divide-gray-200">
                {jobs.slice(0, 5).map((job) => (
                  <div key={job.id} className="p-6">
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold text-gray-900 mb-1">
                          {job.title}
                        </h3>
                        <p className="text-gray-600 text-sm mb-2">
                          {job.city} • {job.shift} • ₹
                          {job.salary.toLocaleString()}
                        </p>
                        <p className="text-gray-600 text-sm">
                          Posted {new Date(job.createdAt).toLocaleDateString()}
                        </p>
                      </div>
                      <div className="ml-4">
                        <span
                          className={`px-2 py-1 rounded-full text-xs font-medium ${
                            job.status === "ACTIVE"
                              ? "bg-green-100 text-green-800"
                              : "bg-gray-100 text-gray-800"
                          }`}
                        >
                          {job.status}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Recent Applications */}
          <div className="bg-white rounded-lg shadow-md">
            <div className="px-6 py-4 border-b border-gray-200">
              <h2 className="text-lg font-semibold text-gray-900">
                Recent Applications
              </h2>
            </div>

            {applications.length === 0 ? (
              <div className="p-6 text-center">
                <Users className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  No applications yet
                </h3>
                <p className="text-gray-600">
                  Applications will appear here once candidates start applying.
                </p>
              </div>
            ) : (
              <div className="divide-y divide-gray-200">
                {applications.slice(0, 5).map((application) => (
                  <div key={application.id} className="p-6">
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold text-gray-900 mb-1">
                          {application.candidate.name}
                        </h3>
                        <p className="text-primary-600 font-medium mb-1">
                          {application.job.title}
                        </p>
                        <p className="text-gray-600 text-sm">
                          Applied{" "}
                          {new Date(application.createdAt).toLocaleDateString()}
                        </p>
                      </div>
                      <div className="ml-4">
                        <span
                          className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(
                            application.status
                          )}`}
                        >
                          {application.status}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployerDashboard;
