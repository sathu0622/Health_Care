import React, { useState } from "react";
import { Link } from "react-router-dom";
import logo from "../assets/health.png";
import image from "../assets/health.webp";
import Image2 from "../assets/image2.jpg";
import RoleSelection from "./RoleSelection";  // Import the RoleSelection popup

const HomePage = () => {
  const [isLoginPopupOpen, setLoginPopupOpen] = useState(false);

  const openLoginPopup = () => {
    setLoginPopupOpen(true);
  };

  const closeLoginPopup = () => {
    setLoginPopupOpen(false);
  };

  return (
    <div>
      <header className="bg-blue-900 text-white py-4">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex-row">
            <Link
              to="/"
              className="block py-2 px-3 text-green-600 hover:bg-green-200 rounded md:bg-transparent md:text-green-700 dark:text-green-300 dark:hover:bg-green-600"
            >
              <img src={logo} className="w-10 h-10" alt="Logo" />
              <span className=" text-2xl font-semibold text-green-700 dark:text-green-100">
                HealthCare
              </span>
            </Link>
          </div>
          <nav className="flex space-x-6">
            <Link to="/" className="hover:text-gray-300">
              Home
            </Link>
            <Link to="/services" className="hover:text-gray-300">
              Services
            </Link>
            <Link to="/about" className="hover:text-gray-300">
              About
            </Link>
            <Link to="/contact" className="hover:text-gray-300">
              Contact
            </Link>
          </nav>
          <div className="space-x-4">
            {/* Trigger popup on click */}
            <button
              onClick={openLoginPopup} // Open popup on login click
              className="bg-white text-blue-900 px-4 py-2 rounded-md"
            >
              Login
            </button>
            <Link to="/register">
              <button className="bg-green-600 px-4 py-2 rounded-md">
                Register
              </button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section
        className="bg-cover bg-center h-96 relative"
        style={{ backgroundImage: `url(${image})` }}
      >
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <div className="relative container mx-auto h-full flex flex-col justify-center text-white text-center">
          <h1 className="text-4xl font-bold">
            The Complete Enterprise Scheduling Platform for Healthcare
          </h1>
          <p className="mt-4">Patient Engagement made easy</p>
          <div className="mt-6">
            <button className="bg-green-600 px-6 py-3 rounded-md mr-4">
              Contact us/Visit our Help Centre
            </button>
            <button className="bg-yellow-500 px-6 py-3 rounded-md">
              Learn More
            </button>
          </div>
        </div>
      </section>

      {/* Popup Component */}
      <RoleSelection isOpen={isLoginPopupOpen} onClose={closeLoginPopup} />

      {/* Services Section */}
      <section id="services" className="py-12">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold mb-8">
            Reduce Clinic Waiting Times from Day One
          </h2>
          <button className="bg-blue-600 text-white px-6 py-3 rounded-md">
            Contact us/Visit our Help Centre
          </button>

          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white shadow-md p-6 rounded-md">
              <h3 className="text-xl font-semibold mb-4">
                Online Appointments
              </h3>
              <p>
                Provide 24/7 visibility of available appointments, allowing
                patients to book their next visit in real time for all ages and
                technical ranges.
              </p>
            </div>
            <div className="bg-white shadow-md p-6 rounded-md">
              <h3 className="text-xl font-semibold mb-4">
                Seamless Integration
              </h3>
              <p>
                Integrates with PAS systems, providing a full end-to-end
                solution.
              </p>
            </div>
            <div className="bg-white shadow-md p-6 rounded-md">
              <h3 className="text-xl font-semibold mb-4">
                Clinic Administration
              </h3>
              <p>Efficient solutions to manage clinic workflows and KPIs.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Information Section */}
      <section className="py-12 bg-gray-100">
        <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 gap-12">
          <div className="flex justify-center">
            <img
              src={Image2}
              alt="Healthcare Graphic"
              className="rounded-md shadow-md"
            />
          </div>
          <div className="text-center md:text-left m-28">
            <h2 className="text-3xl font-bold mb-6">
              Co-ordinated Healthcare... Empowered
            </h2>
            <p>
              Growing demand, higher expectations... more patient interactions.
              This is the reality of healthcare today. Our system delivers an
              enterprise platform to meet these needs, empowering everyone
              involved.
            </p>
            <button className="mt-6 bg-blue-600 text-white px-6 py-3 rounded-md">
              Contact us/Visit our Help Centre
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-blue-900 text-white py-8">
        <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-lg font-semibold">Contact Us</h3>
            <p>Healthcare</p>
            <p>Fossels Lane, Colombo, Sri Lanka</p>
            <p>+94 123 456 789</p>
          </div>
          <div className="text-center md:text-right">
            <h3 className="text-lg font-semibold">Quick Links</h3>
            <Link to="/" className="block mt-2 hover:underline">
              Home
            </Link>
            <Link to="/services" className="block mt-2 hover:underline">
              Services
            </Link>
            <Link href="/about" className="block mt-2 hover:underline">
              About
            </Link>
            <Link href="/contact" className="block mt-2 hover:underline">
              Contact
            </Link>
          </div>
        </div>
        <div className="mt-8 text-center">
          &copy; 2024 Sri Lanka Healthcare | Privacy Policy | Cookie Policy
        </div>
      </footer>
    </div>
  );
};

export default HomePage;
