import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useJobs } from "../contexts/JobContext";
import {
  Search,
  MapPin,
  Clock,
  DollarSign,
  Briefcase,
  Filter,
} from "lucide-react";

const JobsPage = () => {
  const { jobs, loading, searchJobs } = useJobs();
  const [searchFilters, setSearchFilters] = useState({
    title: "",
    city: "",
    jobType: "",
    shift: "",
    isVoice: "",
    minSalary: "",
    maxSalary: "",
  });
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    searchJobs(searchFilters);
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    searchJobs(searchFilters);
  };

  const handleFilterChange = (key, value) => {
    setSearchFilters((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const clearFilters = () => {
    const clearedFilters = {
      title: "",
      city: "",
      jobType: "",
      shift: "",
      isVoice: "",
      minSalary: "",
      maxSalary: "",
    };
    setSearchFilters(clearedFilters);
    searchJobs(clearedFilters);
  };

  const formatSalary = (salary) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(salary);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Find Your Dream Job
          </h1>
          <p className="text-gray-600">
            Discover opportunities in the BPO industry
          </p>
        </div>

        {/* Search and Filters */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <form onSubmit={handleSearch} className="space-y-4">
            {/* Search Bar */}
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="text"
                    placeholder="Search jobs by title, company, or keywords..."
                    value={searchFilters.title}
                    onChange={(e) =>
                      handleFilterChange("title", e.target.value)
                    }
                    className="input-field pl-10"
                  />
                </div>
              </div>
              <div className="md:w-64">
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="text"
                    placeholder="City"
                    value={searchFilters.city}
                    onChange={(e) => handleFilterChange("city", e.target.value)}
                    className="input-field pl-10"
                  />
                </div>
              </div>
              <button type="submit" className="btn-primary">
                Search
              </button>
            </div>

            {/* Advanced Filters Toggle */}
            <div className="flex justify-between items-center">
              <button
                type="button"
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center text-primary-600 hover:text-primary-700"
              >
                <Filter className="w-4 h-4 mr-2" />
                Advanced Filters
              </button>
              {Object.values(searchFilters).some((filter) => filter !== "") && (
                <button
                  type="button"
                  onClick={clearFilters}
                  className="text-gray-500 hover:text-gray-700"
                >
                  Clear Filters
                </button>
              )}
            </div>

            {/* Advanced Filters */}
            {showFilters && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 pt-4 border-t">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Job Type
                  </label>
                  <select
                    value={searchFilters.jobType}
                    onChange={(e) =>
                      handleFilterChange("jobType", e.target.value)
                    }
                    className="input-field"
                  >
                    <option value="">All Types</option>
                    <option value="FULL_TIME">Full Time</option>
                    <option value="PART_TIME">Part Time</option>
                    <option value="CONTRACT">Contract</option>
                    <option value="INTERNSHIP">Internship</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Shift
                  </label>
                  <select
                    value={searchFilters.shift}
                    onChange={(e) =>
                      handleFilterChange("shift", e.target.value)
                    }
                    className="input-field"
                  >
                    <option value="">All Shifts</option>
                    <option value="DAY">Day</option>
                    <option value="NIGHT">Night</option>
                    <option value="ROTATIONAL">Rotational</option>
                    <option value="FLEXIBLE">Flexible</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Voice/Non-Voice
                  </label>
                  <select
                    value={searchFilters.isVoice}
                    onChange={(e) =>
                      handleFilterChange("isVoice", e.target.value)
                    }
                    className="input-field"
                  >
                    <option value="">All</option>
                    <option value="true">Voice</option>
                    <option value="false">Non-Voice</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Min Salary
                  </label>
                  <input
                    type="number"
                    placeholder="Min Salary"
                    value={searchFilters.minSalary}
                    onChange={(e) =>
                      handleFilterChange("minSalary", e.target.value)
                    }
                    className="input-field"
                  />
                </div>
              </div>
            )}
          </form>
        </div>

        {/* Results */}
        <div className="mb-4">
          <p className="text-gray-600">
            {loading ? "Searching..." : `${jobs.length} jobs found`}
          </p>
        </div>

        {/* Job Listings */}
        {loading ? (
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
          </div>
        ) : jobs.length === 0 ? (
          <div className="text-center py-12">
            <Briefcase className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              No jobs found
            </h3>
            <p className="text-gray-600">Try adjusting your search criteria</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {jobs.map((job) => (
              <div
                key={job.id}
                className="card p-6 hover:shadow-lg transition-shadow"
              >
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-1">
                      {job.title}
                    </h3>
                    <p className="text-lg text-primary-600 font-medium">
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

                <p className="text-gray-600 mb-4 line-clamp-2">
                  {job.description}
                </p>

                <div className="flex flex-wrap gap-4 mb-4 text-sm text-gray-500">
                  <div className="flex items-center">
                    <MapPin className="w-4 h-4 mr-1" />
                    {job.city}
                  </div>
                  <div className="flex items-center">
                    <Clock className="w-4 h-4 mr-1" />
                    {job.shift}
                  </div>
                  <div className="flex items-center">
                    <DollarSign className="w-4 h-4 mr-1" />
                    {formatSalary(job.salary)}
                  </div>
                  {job.isVoice && (
                    <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs">
                      Voice
                    </span>
                  )}
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-500">
                    Posted {new Date(job.createdAt).toLocaleDateString()}
                  </span>
                  <Link to={`/jobs/${job.id}`} className="btn-primary">
                    View Details
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default JobsPage;
