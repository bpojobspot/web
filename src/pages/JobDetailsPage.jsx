import { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { useJobs } from "../contexts/JobContext";
import { applicationAPI } from "../services/api";
import {
  MapPin,
  Clock,
  DollarSign,
  Briefcase,
  ArrowLeft,
  CheckCircle,
} from "lucide-react";
import toast from "react-hot-toast";

const JobDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user, isAuthenticated, isCandidate } = useAuth();
  const { getJobById } = useJobs();
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [applying, setApplying] = useState(false);
  const [coverLetter, setCoverLetter] = useState("");

  useEffect(() => {
    const fetchJob = async () => {
      try {
        const jobData = await getJobById(id);
        setJob(jobData);
      } catch (error) {
        console.error("Failed to fetch job:", error);
        toast.error("Failed to load job details");
      } finally {
        setLoading(false);
      }
    };

    fetchJob();
  }, [id, getJobById]);

  const handleApply = async () => {
    if (!isAuthenticated) {
      navigate("/login");
      return;
    }

    if (!isCandidate) {
      toast.error("Only candidates can apply for jobs");
      return;
    }

    setApplying(true);
    try {
      await applicationAPI.applyForJob({
        jobId: parseInt(id),
        coverLetter: coverLetter,
      });
      toast.success("Application submitted successfully!");
      navigate("/candidate/dashboard");
    } catch (error) {
      toast.error(error.response?.data?.error || "Failed to apply for job");
    } finally {
      setApplying(false);
    }
  };

  const formatSalary = (salary) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(salary);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  if (!job) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Job Not Found
          </h2>
          <p className="text-gray-600 mb-4">
            The job you're looking for doesn't exist or has been removed.
          </p>
          <Link to="/jobs" className="btn-primary">
            Browse Jobs
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back Button */}
        <Link
          to="/jobs"
          className="inline-flex items-center text-primary-600 hover:text-primary-700 mb-6"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Jobs
        </Link>

        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          {/* Header */}
          <div className="p-6 border-b">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">
                  {job.title}
                </h1>
                <p className="text-xl text-primary-600 font-medium">
                  {job.company}
                </p>
              </div>
              <span
                className={`px-3 py-1 rounded-full text-sm font-medium ${
                  job.jobType === "FULL_TIME"
                    ? "bg-green-100 text-green-800"
                    : job.jobType === "PART_TIME"
                    ? "bg-blue-100 text-blue-800"
                    : "bg-gray-100 text-gray-800"
                }`}
              >
                {job.jobType.replace("_", " ")}
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
              <div className="flex items-center text-gray-600">
                <MapPin className="w-4 h-4 mr-2" />
                {job.city}
              </div>
              <div className="flex items-center text-gray-600">
                <Clock className="w-4 h-4 mr-2" />
                {job.shift} Shift
              </div>
              <div className="flex items-center text-gray-600">
                <DollarSign className="w-4 h-4 mr-2" />
                {formatSalary(job.salary)}
              </div>
            </div>

            {job.isVoice && (
              <div className="mt-4">
                <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
                  <CheckCircle className="w-4 h-4 mr-1" />
                  Voice Process
                </span>
              </div>
            )}
          </div>

          {/* Content */}
          <div className="p-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Main Content */}
              <div className="lg:col-span-2 space-y-6">
                <div>
                  <h2 className="text-xl font-semibold text-gray-900 mb-3">
                    Job Description
                  </h2>
                  <div className="prose max-w-none">
                    <p className="text-gray-700 whitespace-pre-wrap">
                      {job.description}
                    </p>
                  </div>
                </div>

                {job.requirements && (
                  <div>
                    <h2 className="text-xl font-semibold text-gray-900 mb-3">
                      Requirements
                    </h2>
                    <div className="prose max-w-none">
                      <p className="text-gray-700 whitespace-pre-wrap">
                        {job.requirements}
                      </p>
                    </div>
                  </div>
                )}

                {job.benefits && (
                  <div>
                    <h2 className="text-xl font-semibold text-gray-900 mb-3">
                      Benefits
                    </h2>
                    <div className="prose max-w-none">
                      <p className="text-gray-700 whitespace-pre-wrap">
                        {job.benefits}
                      </p>
                    </div>
                  </div>
                )}
              </div>

              {/* Sidebar */}
              <div className="space-y-6">
                {/* Apply Section */}
                <div className="bg-gray-50 p-6 rounded-lg">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">
                    Apply for this Job
                  </h3>

                  {isAuthenticated && isCandidate ? (
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Cover Letter (Optional)
                        </label>
                        <textarea
                          value={coverLetter}
                          onChange={(e) => setCoverLetter(e.target.value)}
                          rows={4}
                          className="input-field"
                          placeholder="Tell us why you're interested in this position..."
                        />
                      </div>
                      <button
                        onClick={handleApply}
                        disabled={applying}
                        className="w-full btn-primary"
                      >
                        {applying ? "Applying..." : "Apply Now"}
                      </button>
                    </div>
                  ) : isAuthenticated ? (
                    <div className="text-center">
                      <p className="text-gray-600 mb-4">
                        Only candidates can apply for jobs.
                      </p>
                      <Link to="/candidate/dashboard" className="btn-primary">
                        Go to Dashboard
                      </Link>
                    </div>
                  ) : (
                    <div className="text-center">
                      <p className="text-gray-600 mb-4">
                        Please login to apply for this job.
                      </p>
                      <Link to="/login" className="btn-primary">
                        Login
                      </Link>
                    </div>
                  )}
                </div>

                {/* Job Details */}
                <div className="bg-white border rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">
                    Job Details
                  </h3>
                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">
                        Experience Required:
                      </span>
                      <span className="font-medium">
                        {job.experienceRequired
                          ? `${job.experienceRequired} years`
                          : "Not specified"}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Posted:</span>
                      <span className="font-medium">
                        {new Date(job.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Job ID:</span>
                      <span className="font-medium">#{job.id}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobDetailsPage;
