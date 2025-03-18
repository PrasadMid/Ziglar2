import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Constant from "../utils/Constant";

const Footer = () => {
  const [contactData, setContactData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [catalogLoading, setCatalogLoading] = useState(false);

  useEffect(() => {
    fetchContactData();
  }, []);

  const fetchContactData = async () => {
    try {
      const response = await fetch(
        `${Constant.BASE_URL}/profile`
      );
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

  const handleCatalogDownload = async (e) => {
    e.preventDefault();
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

  return (
    <footer className="z-0 border-t sticky border-gray-500 py-8 lg:pl-[50px] mb-4 ">
      <div className="container mx-auto px-4 lg:mt-12 xsm:mt-7">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="lg:leading-[45px] xsm:leading-[38px]">
            <h2 className="xl:text-[60px] xsm:text-[45px] 2xl:text-[90px] font-bold font-serif text-[#099CD6]">
              Ziegler
            </h2>
            <p className="font-bold text-[17px] xsm:text-[14px] 2xl:text-[25px] font-serif	text-[#099CD6]">
              Redefine Innovative Metering
            </p>
          </div>

          {/* Explore Section */}
          <div>
            <h3 className="text-[#099CD6] font-bold text-[20px] 2xl:text-[50px] mb-4">
              Explore
            </h3>
            <ul className="space-y-2 font- text-[14px] 2xl:text-[30px] text-[#004561]">
              <li>
                <Link to="/aboutus" className="hover:text-blue-500">
                  About us
                </Link>
              </li>
              <li>
                <Link to="/product" className="hover:text-blue-500">
                  Our Products
                </Link>
              </li>
              <li>
                <a className="hover:text-blue-500">
                  Services
                </a>
              </li>
              <li>
                <a className="hover:text-blue-500">
                  QIC
                </a>
              </li>
              <li>
                <Link to="/contactus" className="hover:text-blue-500">
                  Contact Us
                </Link>
              </li>
              <li>
                <a 
                  href="#" 
                  onClick={handleCatalogDownload}
                  className={`hover:text-blue-500 inline-flex items-center ${catalogLoading ? 'opacity-50 cursor-wait' : 'cursor-pointer'}`}
                >
                  {catalogLoading ? 'Loading...' : 'Download Catalog'}
                  {!catalogLoading && (
                    <svg
                      className="w-4 h-4 ml-1"
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
                  )}
                </a>
              </li>
            </ul>
          </div>

          {/* Contact US Section */}
          <div>
            <h3 className="text-[#099CD6] font-bold text-[20px] 2xl:text-[50px] mb-4">
              Contact US
            </h3>
            <div className="space-y-4">
              <div className="text-[#004561] text-[14px] 2xl:text-[30px] ">
                <p className="mb-3">Ziegler Instrumentation UK Ltd</p>
                {contactData?.profile_address_a}
              </div>
              <div className="text-[#004561] text-[14px] 2xl:text-[30px]">
                {contactData?.profile_address_b}
              </div>
            </div>
          </div>
        </div>

        {/* Contact Information */}
        <div className="flex mb-4 flex-col md:flex-row justify-center items-center space-y-2 md:space-y-0 md:space-x-4 mt-8 text-[#004561] text-[14px] 2xl:text-[30px]">
          <a href="tel:+441376335271"> {contactData?.profile_mobile}</a>
          <a href="mailto:info@ziegler-instrument.com">
            {contactData?.profile_email}
          </a>
        </div>
        <hr className="text-[#979797]" />
        <div className="text-center mt-8">
          <p className="text-[14px] 2xl:text-[30px] text-[#0A142F]">
            © 2024 Ziegler | All Rights Reserved
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;