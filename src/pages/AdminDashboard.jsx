import { useState, useEffect } from "react";
import { useAuth } from "../contexts/AuthContext";
import { adminAPI } from "../services/api";
import {
  Users,
  Briefcase,
  FileText,
  TrendingUp,
  CheckCircle,
  XCircle,
  Clock,
} from "lucide-react";
import toast from "react-hot-toast";

const AdminDashboard = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const response = await adminAPI.getDashboardStats();
      setStats(response.data);
    } catch (error) {
      toast.error("Failed to fetch dashboard stats");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  const statCards = [
    {
      title: "Total Candidates",
      value: stats?.totalCandidates || 0,
      icon: <Users className="w-6 h-6 text-blue-600" />,
      color: "bg-blue-100",
      textColor: "text-blue-600",
    },
    {
      title: "Total Employers",
      value: stats?.totalEmployers || 0,
      icon: <Briefcase className="w-6 h-6 text-green-600" />,
      color: "bg-green-100",
      textColor: "text-green-600",
    },
    {
      title: "Total Jobs",
      value: stats?.totalJobs || 0,
      icon: <FileText className="w-6 h-6 text-purple-600" />,
      color: "bg-purple-100",
      textColor: "text-purple-600",
    },
    {
      title: "Total Applications",
      value: stats?.totalApplications || 0,
      icon: <TrendingUp className="w-6 h-6 text-orange-600" />,
      color: "bg-orange-100",
      textColor: "text-orange-600",
    },
  ];

  const applicationStats = [
    {
      title: "Applied",
      value: stats?.appliedApplications || 0,
      icon: <Clock className="w-5 h-5" />,
      color: "bg-blue-100 text-blue-800",
    },
    {
      title: "Shortlisted",
      value: stats?.shortlistedApplications || 0,
      icon: <CheckCircle className="w-5 h-5" />,
      color: "bg-yellow-100 text-yellow-800",
    },
    {
      title: "Hired",
      value: stats?.hiredApplications || 0,
      icon: <CheckCircle className="w-5 h-5" />,
      color: "bg-green-100 text-green-800",
    },
    {
      title: "Rejected",
      value: stats?.rejectedApplications || 0,
      icon: <XCircle className="w-5 h-5" />,
      color: "bg-red-100 text-red-800",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Admin Dashboard
          </h1>
          <p className="text-gray-600">Welcome back, {user?.name}!</p>
        </div>

        {/* Main Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {statCards.map((stat, index) => (
            <div key={index} className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex items-center">
                <div className={`p-2 ${stat.color} rounded-lg`}>
                  <div className={stat.textColor}>{stat.icon}</div>
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">
                    {stat.title}
                  </p>
                  <p className="text-2xl font-bold text-gray-900">
                    {stat.value}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Application Status Stats */}
        <div className="bg-white rounded-lg shadow-md mb-8">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">
              Application Status Overview
            </h2>
          </div>
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              {applicationStats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div
                    className={`inline-flex items-center justify-center w-12 h-12 rounded-full ${stat.color} mb-3`}
                  >
                    {stat.icon}
                  </div>
                  <p className="text-2xl font-bold text-gray-900 mb-1">
                    {stat.value}
                  </p>
                  <p className="text-sm text-gray-600">{stat.title}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="bg-white rounded-lg shadow-md">
            <div className="px-6 py-4 border-b border-gray-200">
              <h2 className="text-lg font-semibold text-gray-900">
                Manage Candidates
              </h2>
            </div>
            <div className="p-6">
              <p className="text-gray-600 mb-4">
                View and manage candidate profiles, applications, and account
                status.
              </p>
              <div className="space-y-2">
                <button className="w-full btn-secondary text-left">
                  View All Candidates
                </button>
                <button className="w-full btn-secondary text-left">
                  Blocked Candidates
                </button>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md">
            <div className="px-6 py-4 border-b border-gray-200">
              <h2 className="text-lg font-semibold text-gray-900">
                Manage Employers
              </h2>
            </div>
            <div className="p-6">
              <p className="text-gray-600 mb-4">
                Approve, block, or manage employer accounts and their job
                postings.
              </p>
              <div className="space-y-2">
                <button className="w-full btn-secondary text-left">
                  View All Employers
                </button>
                <button className="w-full btn-secondary text-left">
                  Pending Approvals
                </button>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md">
            <div className="px-6 py-4 border-b border-gray-200">
              <h2 className="text-lg font-semibold text-gray-900">
                Manage Jobs
              </h2>
            </div>
            <div className="p-6">
              <p className="text-gray-600 mb-4">
                Review, approve, or remove job postings from the platform.
              </p>
              <div className="space-y-2">
                <button className="w-full btn-secondary text-left">
                  View All Jobs
                </button>
                <button className="w-full btn-secondary text-left">
                  Pending Reviews
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
