import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Menu, X, Phone, Mail, Search } from "lucide-react";
import SearchBar from "./product/SearchBar";
import Constant from "../utils/Constant";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showTagline, setShowTagline] = useState(false);
  const [contactData, setContactData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [catalogLoading, setCatalogLoading] = useState(false);

  useEffect(() => {
    setShowTagline(true);
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  useEffect(() => {
    fetchContactData();
  }, []);

  const fetchContactData = async () => {
    try {
      const response = await fetch(`${Constant.BASE_URL}/profile`);
      const result = await response.json();
      if (result.status && result.data?.length > 0) {
        setContactData(result.data[0]);
      }
      setLoading(false);
    } catch (error) {
      console.error("Error fetching custom products data:", error);
      setLoading(false);
    }
  };

  const handleCatalogDownload = async () => {
    try {
      setCatalogLoading(true);
      const response = await fetch(`${Constant.BASE_URL}/get-catalog`);
      const data = await response.json();
      
      if (data.status && data.data[0]?.catalog_pdf) {
        const pdfUrl = `https://midknighttestdomain.site${data.data[0].catalog_pdf}`;
        window.open(pdfUrl, '_blank');
      }
    } catch (error) {
      console.error('Error downloading catalog:', error);
    } finally {
      setCatalogLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading...
      </div>
    );
  }

  const renderContactInfo = () => {
    return (
      <div className="flex flex-col sm:flex-row justify-end space-y-1 sm:space-y-0 sm:space-x-4 2xl:space-y-0 text-xs sm:text-sm 2xl:text-3xl">
        {contactData?.profile_mobile_status === "active" && (
          <a
            href={`tel:+44${contactData?.profile_mobile}`}
            className="hover:text-gray-200 flex items-center justify-center sm:justify-start"
          >
            <Phone className="h-4 w-4 2xl:h-8 2xl:w-8 mr-1 2xl:mr-3" />
            {contactData?.profile_mobile}
          </a>
        )}
        {contactData?.profile_email_status === "active" && (
          <a
            href={`mailto:${contactData?.profile_email}`}
            className="hover:text-gray-200 flex items-center justify-center sm:justify-start"
          >
            <Mail className="h-4 w-4 2xl:h-8 2xl:w-8 mr-1 2xl:mr-3" />
            {contactData?.profile_email}
          </a>
        )}
      </div>
    );
  };

  return (
    <div className="w-full">
      <div
        className="w-full text-white py-2 2xl:py-6 2xl:p-2"
        style={{
          background: "linear-gradient(to right, rgba(125, 207, 182, 1), rgba(9, 156, 214, 1))",
        }}
      >
        <div className="container mx-auto px-4">
          {renderContactInfo()}
        </div>
      </div>
      <div className="container mx-auto px-4 py-2">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
          <div className="flex justify-between items-center lg:w-1/4">
            <Link to="/">
              <div className="flex flex-col font-serif lg:pl-[50px]">
                <h1 className="sm:text-3xl lg:text-3xl 2xl:text-7xl xsm:text-2xl font-bold text-[#099CD6]">
                  Ziegler
                </h1>
                <div className="overflow-hidden">
                  <p
                    className={`lg:text-sm sm:text-base xsm:text-sm 2xl:text-3xl text-[#099CD6] font-bold transform transition-transform duration-1000 ${
                      showTagline ? "translate-x-0" : "-translate-x-full"
                    }`}
                  >
                    Redefine Innovative Metering
                  </p>
                </div>
              </div>
            </Link>
            <button
              className="lg:hidden text-gray-600 hover:text-gray-900"
              onClick={toggleMenu}
            >
              {isMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
          <div
            className={`lg:flex lg:flex-1 lg:justify-between lg:items-center ${
              isMenuOpen ? "block" : "hidden"
            }`}
          >
            <div className="lg:flex lg:items-center lg:space-x-4 lg:pl-[100px]">
              <nav className="flex flex-col lg:flex-row space-y-4 lg:space-y-0 lg:space-x-8 2xl:space-x-14 mt-4 lg:mt-0 lg:text-md 2xl:text-4xl font-semibold">
                <Link
                  to="/aboutus"
                  className="text-gray-600 text-center lg:text-left transition-all duration-300 hover:bg-gradient-to-r hover:from-[rgba(125,207,182,1)] hover:to-[rgba(9,156,214,1)] hover:text-transparent hover:bg-clip-text"
                >
                  About Us
                </Link>
                <Link
                  to="/product"
                  className="text-gray-600 text-center lg:text-left transition-all duration-300 hover:bg-gradient-to-r hover:from-[rgba(125,207,182,1)] hover:to-[rgba(9,156,214,1)] hover:text-transparent hover:bg-clip-text"
                >
                  Products
                </Link>
                <a className="text-gray-600 text-center lg:text-left cursor-pointer transition-all duration-300 hover:bg-gradient-to-r hover:from-[rgba(125,207,182,1)] hover:to-[rgba(9,156,214,1)] hover:text-transparent hover:bg-clip-text" 
                href="https://midknighttestdomain.site/api/v1/get-qlc-info"
                aria-label="QIC Info">
                  QIC
                </a>
                <Link
                  to="/contactus"
                  className="text-gray-600 text-center lg:text-left transition-all duration-300 hover:bg-gradient-to-r hover:from-[rgba(125,207,182,1)] hover:to-[rgba(9,156,214,1)] hover:text-transparent hover:bg-clip-text"
                >
                  Contact Us
                </Link>
              </nav>
              
              <button 
                className={`hidden lg:flex items-center text-sm 2xl:text-2xl px-4 py-2 rounded-full bg-gradient-to-r from-[rgba(125,207,182,1)] to-[rgba(9,156,214,1)] text-white hover:shadow-lg transition-all duration-300 ${
                  catalogLoading ? 'opacity-75 cursor-not-allowed' : ''
                }`}
                onClick={handleCatalogDownload}
                disabled={catalogLoading}
              >
                {catalogLoading ? 'Loading...' : 'Download Catalog'}
                <svg
                  className={`w-4 h-4 2xl:w-6 2xl:h-6 ml-2 transition-transform duration-300 ${
                    catalogLoading ? '' : 'group-hover:-translate-y-1'
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                  />
                </svg>
              </button>
            </div>

            <div className="relative mt-4 lg:mt-0 w-full lg:w-64 2xl:w-[500px]">
              <SearchBar />
            </div>
            
            {/* Mobile catalog button */}
            <button 
              className={`lg:hidden mt-4 w-full flex items-center justify-center text-sm px-4 py-2 rounded-full bg-gradient-to-r from-[rgba(125,207,182,1)] to-[rgba(9,156,214,1)] text-white hover:shadow-lg transition-all duration-300 ${
                catalogLoading ? 'opacity-75 cursor-not-allowed' : ''
              }`}
              onClick={handleCatalogDownload}
              disabled={catalogLoading}
            >
              {catalogLoading ? 'Loading...' : 'Download Catalog'}
              <svg
                className={`w-4 h-4 ml-2 transition-transform duration-300 ${
                  catalogLoading ? '' : 'group-hover:-translate-y-1'
                }`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;