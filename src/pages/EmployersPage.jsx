import { Link } from "react-router-dom";
import {
  CheckCircle,
  Users,
  Clock,
  Shield,
  ArrowRight,
  Star,
} from "lucide-react";

const EmployersPage = () => {
  const benefits = [
    {
      icon: <Users className="w-8 h-8 text-primary-600" />,
      title: "Pre-Screened Candidates",
      description:
        "All candidates go through our rigorous screening process, saving you time and effort in the hiring process.",
    },
    {
      icon: <Clock className="w-8 h-8 text-primary-600" />,
      title: "Faster Hiring",
      description:
        "Reduce your hiring time from weeks to days with our streamlined process and qualified candidate pool.",
    },
    {
      icon: <Shield className="w-8 h-8 text-primary-600" />,
      title: "7-Day Replacement Guarantee",
      description:
        "Not satisfied with your hire? Get a free replacement within 7 days, no questions asked.",
    },
  ];

  const features = [
    "Access to 2,500+ pre-screened candidates",
    "Advanced filtering and search capabilities",
    "Direct communication with candidates",
    "Application tracking and management",
    "Free job posting credits",
    "24/7 customer support",
  ];

  const testimonials = [
    {
      name: "Priya Sharma",
      company: "TechCorp Solutions",
      content:
        "BPO JobSpot helped us find 15 qualified candidates in just 3 days. The pre-screening process saved us hours of interview time.",
      rating: 5,
    },
    {
      name: "Rajesh Kumar",
      company: "CallCenter Pro",
      content:
        "The 7-day replacement guarantee gives us confidence. We've never had to use it because the candidates are always top-quality.",
      rating: 5,
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary-600 to-primary-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Hire the Best BPO Talent
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-primary-100 max-w-3xl mx-auto">
              Connect with pre-screened candidates and build your dream team.
              Join 150+ companies that trust BPO JobSpot for their hiring needs.
            </p>
            <Link
              to="/register"
              className="btn-primary bg-white text-primary-600 hover:bg-gray-100 text-lg px-8 py-3"
            >
              Post a Job
              <ArrowRight className="w-5 h-5 ml-2" />
            </Link>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Why Choose BPO JobSpot?
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              We're revolutionizing the BPO hiring process with innovative
              solutions and unmatched service quality.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => (
              <div
                key={index}
                className="text-center p-6 bg-white rounded-lg shadow-md"
              >
                <div className="flex justify-center mb-4">{benefit.icon}</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  {benefit.title}
                </h3>
                <p className="text-gray-600">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Everything You Need to Hire
              </h2>
              <p className="text-xl text-gray-600 mb-8">
                Our platform provides all the tools and features you need to
                find, evaluate, and hire the best BPO talent.
              </p>
              <ul className="space-y-4">
                {features.map((feature, index) => (
                  <li key={index} className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" />
                    <span className="text-gray-700">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-primary-50 p-8 rounded-lg">
              <div className="text-center">
                <div className="w-24 h-24 bg-primary-600 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Users className="w-12 h-12 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  Ready to Get Started?
                </h3>
                <p className="text-gray-600 mb-6">
                  Join hundreds of companies already using BPO JobSpot to find
                  their next great hire.
                </p>
                <Link to="/register" className="btn-primary">
                  Start Hiring Today
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              What Employers Say
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Don't just take our word for it. Here's what employers have to say
              about BPO JobSpot.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-md">
                <div className="flex mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-5 h-5 text-yellow-400 fill-current"
                    />
                  ))}
                </div>
                <p className="text-gray-600 mb-4 italic">
                  "{testimonial.content}"
                </p>
                <div>
                  <div className="font-semibold text-gray-900">
                    {testimonial.name}
                  </div>
                  <div className="text-sm text-gray-500">
                    {testimonial.company}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to Find Your Next Great Hire?
          </h2>
          <p className="text-xl text-primary-100 mb-8 max-w-2xl mx-auto">
            Join BPO JobSpot today and start connecting with pre-screened
            candidates in minutes.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/register"
              className="btn-primary bg-white text-primary-600 hover:bg-gray-100 text-lg px-8 py-3"
            >
              Post Your First Job
              <ArrowRight className="w-5 h-5 ml-2" />
            </Link>
            <Link
              to="/contact"
              className="btn-outline border-white text-white hover:bg-white hover:text-primary-600 text-lg px-8 py-3"
            >
              Contact Sales
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default EmployersPage;
