import { Link } from "react-router-dom";
import {
  ArrowRight,
  CheckCircle,
  Users,
  Clock,
  Shield,
  Star,
} from "lucide-react";

const HomePage = () => {
  const testimonials = [
    {
      name: "Priya Sharma",
      role: "HR Manager, TechCorp",
      content:
        "BPO JobSpot helped us find 15 qualified candidates in just 3 days. The pre-screening process saved us hours of interview time.",
      rating: 5,
    },
    {
      name: "Rajesh Kumar",
      role: "Customer Service Representative",
      content:
        "I got my dream job within a week of registering. The platform is user-friendly and the support team is amazing.",
      rating: 5,
    },
    {
      name: "Sneha Patel",
      role: "Operations Manager, CallCenter Pro",
      content:
        "The 7-day replacement guarantee gives us confidence. We've never had to use it because the candidates are always top-quality.",
      rating: 5,
    },
  ];

  const features = [
    {
      icon: <Clock className="w-8 h-8 text-primary-600" />,
      title: "7-Day Free Replacement Guarantee",
      description:
        "Not satisfied with your hire? Get a free replacement within 7 days.",
    },
    {
      icon: <Shield className="w-8 h-8 text-primary-600" />,
      title: "Pre-Screened Candidates",
      description:
        "All candidates go through our rigorous screening process before being matched with employers.",
    },
    {
      icon: <Users className="w-8 h-8 text-primary-600" />,
      title: "Faster Hiring",
      description:
        "Reduce your hiring time from weeks to days with our streamlined process.",
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary-600 to-primary-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Hire Faster, Work Smarter
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-primary-100 max-w-3xl mx-auto">
              BPO JobSpot connects you with pre-screened candidates and top
              employers in the BPO industry. Find your next opportunity or hire
              the perfect candidate today.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/jobs"
                className="btn-primary bg-white text-primary-600 hover:bg-gray-100 text-lg px-8 py-3"
              >
                Find Jobs
                <ArrowRight className="w-5 h-5 ml-2" />
              </Link>
              <Link
                to="/employers"
                className="btn-outline border-white text-white hover:bg-white hover:text-primary-600 text-lg px-8 py-3"
              >
                Hire Talent
                <ArrowRight className="w-5 h-5 ml-2" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Why Us Section */}
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
            {features.map((feature, index) => (
              <div
                key={index}
                className="text-center p-6 bg-white rounded-lg shadow-md"
              >
                <div className="flex justify-center mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-primary-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold mb-2">500+</div>
              <div className="text-primary-100">Active Jobs</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">2,500+</div>
              <div className="text-primary-100">Candidates</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">150+</div>
              <div className="text-primary-100">Employers</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">95%</div>
              <div className="text-primary-100">Success Rate</div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              What Our Users Say
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Don't just take our word for it. Here's what employers and
              candidates have to say about BPO JobSpot.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
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
                    {testimonial.role}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to Get Started?
          </h2>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Join thousands of candidates and employers who have found success
            with BPO JobSpot.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/register"
              className="btn-primary bg-primary-600 hover:bg-primary-700 text-lg px-8 py-3"
            >
              Get Started Today
              <ArrowRight className="w-5 h-5 ml-2" />
            </Link>
            <Link
              to="/contact"
              className="btn-outline border-white text-white hover:bg-white hover:text-gray-900 text-lg px-8 py-3"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
