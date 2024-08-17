import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="bg-blue-600 shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          <div className="text-white text-2xl font-bold">
            <Link to="/">NavigateMe</Link>
          </div>
          <div className="hidden md:flex space-x-16 font-semibold">
            <Link to="/" className="text-white hover:text-gray-200 transition duration-300">
              Home
            </Link>
            <Link to="/about" className="text-white hover:text-gray-200 transition duration-300">
              About
            </Link>
            <Link to="/services" className="text-white hover:text-gray-200 transition duration-300">
              Services
            </Link>
            <Link to="/contact" className="text-white hover:text-gray-200 transition duration-300">
              Contact
            </Link>
          </div>
          <div className="hidden md:block ">
            <Link
              to="/signup"
              className="bg-white text-blue-600 px-4 py-2 rounded-full font-semibold hover:bg-gray-100 transition duration-300"
            >
              Sign Up
            </Link>
            
          </div>
          <div className="md:hidden flex items-center">
            <button className="text-white focus:outline-none focus:text-gray-200">
              <svg className="w-6 h-6" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                <path d="M4 6h16M4 12h16M4 18h16"></path>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
