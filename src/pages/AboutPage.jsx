import { Users, Target, Award, Heart } from "lucide-react";

const AboutPage = () => {
  const values = [
    {
      icon: <Users className="w-8 h-8 text-primary-600" />,
      title: "People First",
      description:
        "We believe that every person deserves the right opportunity to grow and succeed in their career.",
    },
    {
      icon: <Target className="w-8 h-8 text-primary-600" />,
      title: "Excellence",
      description:
        "We strive for excellence in everything we do, from candidate screening to employer matching.",
    },
    {
      icon: <Award className="w-8 h-8 text-primary-600" />,
      title: "Innovation",
      description:
        "We continuously innovate to make the hiring process faster, more efficient, and more effective.",
    },
    {
      icon: <Heart className="w-8 h-8 text-primary-600" />,
      title: "Integrity",
      description:
        "We operate with the highest standards of integrity and transparency in all our interactions.",
    },
  ];

  const stats = [
    { number: "2,500+", label: "Active Candidates" },
    { number: "150+", label: "Partner Companies" },
    { number: "500+", label: "Jobs Posted" },
    { number: "95%", label: "Success Rate" },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary-600 to-primary-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              About BPO JobSpot
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-primary-100 max-w-3xl mx-auto">
              We're on a mission to revolutionize the BPO hiring process and
              create meaningful connections between talent and opportunity.
            </p>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Our Mission
              </h2>
              <p className="text-xl text-gray-600 mb-6">
                To reduce hiring pain in the BPO industry by connecting
                pre-screened candidates with the right opportunities, making the
                hiring process faster, more efficient, and more successful for
                everyone involved.
              </p>
              <p className="text-lg text-gray-600">
                We believe that finding the right job or the right candidate
                shouldn't be a struggle. That's why we've built a platform that
                streamlines the entire process, from initial screening to final
                placement, ensuring both candidates and employers find exactly
                what they're looking for.
              </p>
            </div>
            <div className="bg-primary-50 p-8 rounded-lg">
              <div className="text-center">
                <div className="w-24 h-24 bg-primary-600 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Target className="w-12 h-12 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  Our Vision
                </h3>
                <p className="text-gray-600">
                  To become the leading platform for BPO hiring, recognized for
                  our innovation, quality, and commitment to creating successful
                  career matches.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Our Values
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              These core values guide everything we do and shape how we serve
              our community.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <div
                key={index}
                className="text-center p-6 bg-white rounded-lg shadow-md"
              >
                <div className="flex justify-center mb-4">{value.icon}</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  {value.title}
                </h3>
                <p className="text-gray-600">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-primary-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Impact</h2>
            <p className="text-xl text-primary-100 max-w-2xl mx-auto">
              Numbers that reflect our commitment to connecting talent with
              opportunity.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
            {stats.map((stat, index) => (
              <div key={index}>
                <div className="text-4xl font-bold mb-2">{stat.number}</div>
                <div className="text-primary-100">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Our Story
            </h2>
            <div className="prose prose-lg max-w-none text-gray-600">
              <p className="mb-6">
                BPO JobSpot was born out of a simple observation: the BPO
                industry was struggling with inefficient hiring processes that
                left both candidates and employers frustrated. Traditional job
                boards were cluttered and time-consuming, while recruitment
                agencies were expensive and slow.
              </p>
              <p className="mb-6">
                We set out to change that by creating a platform that combines
                the best of both worlds: the accessibility of online job boards
                with the quality and speed of professional recruitment. Our
                pre-screening process ensures that only qualified candidates
                reach employers, while our 7-day replacement guarantee provides
                peace of mind.
              </p>
              <p>
                Today, we're proud to serve thousands of candidates and hundreds
                of companies, helping them find the perfect match in record
                time. But we're just getting started. Our vision is to continue
                innovating and improving the hiring experience for everyone in
                the BPO industry.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Join Our Community
          </h2>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Whether you're looking for your next opportunity or your next great
            hire, we're here to help you succeed.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/jobs"
              className="btn-primary bg-primary-600 hover:bg-primary-700 text-lg px-8 py-3"
            >
              Find Jobs
            </a>
            <a
              href="/employers"
              className="btn-outline border-white text-white hover:bg-white hover:text-gray-900 text-lg px-8 py-3"
            >
              Hire Talent
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;
