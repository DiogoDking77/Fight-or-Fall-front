import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/logo.png'; // Path to the site logo
import backgroundImage from '../assets/landpage_img.jpg'; // Import the uploaded image

function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-black text-white">
      {/* Navbar */}
      <nav className="bg-[#0C0909] border-b-4 border-[#B22222]">
        <div className="container mx-auto px-4 py-2 flex items-center justify-between">
          <Link to="/" className="flex items-center">
            <img src={logo} alt="Site Logo" className="w-12 h-12 mr-2" />
            <span className="text-xl font-bold text-white">Fight or Fall</span>
          </Link>
          <div>
            <Link to="/login" className="text-white font-semibold hover:text-gray-300 mr-4">Login</Link>
            <Link to="/register" className="bg-white font-semibold text-[#0C0909] px-4 py-2 rounded hover:bg-gray-200">Register</Link>
          </div>
        </div>
      </nav>

      {/* Hero Section with Background Image */}
      <section
        className="flex-1 flex flex-col items-center justify-center text-center bg-cover bg-center text-white"
        style={{
          backgroundImage: `url(${backgroundImage})`,
        }}
      >
        <div className="bg-black bg-opacity-50 w-full h-full flex flex-col items-center justify-center py-24 px-4">
          <h1 className="text-4xl font-bold mb-4">Create and Manage Your Tournaments with Ease</h1>
          <p className="text-xl mb-8">Organize competitions, track results, and more, all in one place.</p>
          <div>
            <Link to="/register" className="bg-white text-[#0C0909] px-8 py-3 rounded-full font-semibold hover:bg-gray-200 mr-4">Get Started</Link>
            <Link to="/login" className="bg-transparent border-2 border-white text-white px-8 py-3 rounded-full font-semibold hover:bg-white hover:text-[#0C0909]">Already Have an Account</Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-black">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-white">Key Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-[#0C0909] p-6 rounded-lg shadow-lg">
              <h3 className="text-2xl font-semibold mb-4">Tournament Creation</h3>
              <p className="text-gray-300">Set up your tournaments with custom rules, number of participants, and more.</p>
            </div>
            <div className="bg-[#0C0909] p-6 rounded-lg shadow-lg">
              <h3 className="text-2xl font-semibold mb-4">Result Management</h3>
              <p className="text-gray-300">Track results in real-time and keep all participants informed.</p>
            </div>
            <div className="bg-[#0C0909] p-6 rounded-lg shadow-lg">
              <h3 className="text-2xl font-semibold mb-4">Rankings and Statistics</h3>
              <p className="text-gray-300">View rankings, performance statistics, and detailed reports for your tournaments.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="bg-[#B22222] text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Get Started?</h2>
          <p className="text-xl mb-8">Create your account now and start organizing tournaments like a pro.</p>
          <Link to="/register" className="bg-white text-[#B22222] px-8 py-3 rounded-full font-semibold hover:bg-gray-200">Sign Up for Free</Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#0C0909] text-white py-8">
        <div className="container mx-auto px-4 text-center">
          <p>&copy; 2024 Fight or Fall. All rights reserved.</p>
          <p>
            <Link to="/terms" className="hover:underline">Terms of Service</Link> | <Link to="/privacy" className="hover:underline">Privacy Policy</Link>
          </p>
        </div>
      </footer>
    </div>
  );
}

export default Home;
