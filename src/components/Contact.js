import React, { useState, useEffect } from "react";
import Footer from "./Footer";
import Navbar from "./Navbar";
import { FaLocationDot } from "react-icons/fa6";
import { BiSolidPhoneCall } from "react-icons/bi";
import { IoMailSharp } from "react-icons/io5";
import { Check } from "lucide-react";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Constant from "../utils/Constant";

const ContactUs = () => {
  const [contactData, setContactData] = useState(null);
  const [selected, setSelected] = useState("");
  const [formData, setFormData] = useState({
    contact_us_first_name: "",
    contact_us_last_name: "",
    contact_us_email: "",
    contact_us_phone_number: "",
    contact_us_subject: "",
    contact_us_message: ""
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

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
    } catch (error) {
      console.error("Error fetching contact data:", error);
      toast.error("Failed to load contact information");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear specific field error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: undefined
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    // Required field validation
    const requiredFields = [
      'contact_us_first_name', 
      'contact_us_last_name', 
      'contact_us_email', 
      'contact_us_phone_number', 
      'contact_us_message'
    ];

    requiredFields.forEach(field => {
      if (!formData[field] || formData[field].trim() === '') {
        newErrors[field] = `${field.replace('contact_us_', '').replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())} is required`;
      }
    });

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (formData.contact_us_email && !emailRegex.test(formData.contact_us_email)) {
      newErrors.contact_us_email = 'Invalid email format';
    }

    // Subject validation
    if (!selected) {
      newErrors.contact_us_subject = 'Please select a subject';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Prevent multiple submissions
    if (isSubmitting) return;

    // Validate form
    if (!validateForm()) {
      toast.error("Please fix the form errors");
      return;
    }

    setIsSubmitting(true);

    const submissionData = {
      ...formData,
      contact_us_subject: selected
    };

    try {
      const response = await fetch(
       `${Constant.BASE_URL}/contact-us`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(submissionData)
        }
      );

      const result = await response.json();

      if (result.status === false) {
        // Handle API-level validation errors
        if (result.errors) {
          const errorMessages = {};
          Object.keys(result.errors).forEach(key => {
            errorMessages[key] = result.errors[key][0];
          });
          setErrors(errorMessages);
          toast.error("Please fix the form errors");
        } else {
          toast.error(result.message || "Submission failed");
        }
      } else {
        toast.success("Message sent successfully!");
        
        // Reset form
        setFormData({
          contact_us_first_name: "",
          contact_us_last_name: "",
          contact_us_email: "",
          contact_us_phone_number: "",
          contact_us_message: ""
        });
        setSelected("");
        setErrors({});
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      toast.error("Network error. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const subjectOptions = [
    "General Inquiry", 
    "Get a Quote", 
    "Request for custom product", 
    "Want to Become a Partner or Reseller"
  ];

  return (
    <>
      <Navbar />
      <div className="w-full max-w-6xl 2xl:max-w-7xl mx-auto p-4 md:p-8 lg:p-0 my-4 md:my-8 lg:my-12">
        <h1 className="text-2xl md:text-[40px] 2xl:text-[50px] font-poppins font-bold text-center mb-2 3xl:mb-4">
          Contact Us
        </h1>
        <p className="text-center font-medium font-poppins text-base md:text-lg 2xl:text-2xl text-[#717171] mb-8">
          Any question or remarks? Just write us a message!
        </p>

        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="flex flex-col lg:flex-row">
            {/* Left Section - Contact Information */}
            <div
              className="lg:w-[40%] p-6 md:p-8 lg:p-10 text-white"
              style={{
                background: "linear-gradient(135deg, #7DCFB6 0%, #099CD6 100%)",
              }}
            >
              <div className="max-w-[360px] 2xl:max-w-[480px] mx-auto">
                <h2 className="text-xl md:text-2xl 2xl:text-3xl font-semibold mb-4">
                  Contact Information
                </h2>
                <p className="text-[#FAFAFA] opacity-80 text-base md:text-lg 2xl:text-xl mb-8">
                  Say something to start a live chat!
                </p>

                <div className="space-y-6 md:space-y-8 2xl:space-y-10">
                  <div className="flex items-center gap-4">
                    <BiSolidPhoneCall className="w-6 h-6 md:w-8 md:h-8 2xl:w-10 2xl:h-10" />
                    <p className="text-base md:text-lg 2xl:text-xl">
                      {contactData?.profile_mobile || 'N/A'}
                    </p>
                  </div>

                  <div className="flex items-center gap-4">
                    <IoMailSharp className="w-6 h-6 md:w-8 md:h-8 2xl:w-10 2xl:h-10" />
                    <p className="text-base md:text-lg 2xl:text-xl break-all">
                      {contactData?.profile_email || 'N/A'}
                    </p>
                  </div>

                  <div className="flex gap-4">
                    <FaLocationDot className="w-6 h-6 md:w-8 md:h-8 2xl:w-10 2xl:h-10 flex-shrink-0 mt-1" />
                    <div className="text-base md:text-lg 2xl:text-xl space-y-3">
                      {contactData?.profile_address_a && (
                        <div>{contactData?.profile_address_a}</div>
                      )}
                      {contactData?.profile_address_b && (
                        <div>{contactData?.profile_address_b}</div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Section - Contact Form */}
            <div className="lg:w-[60%] p-6 md:p-8 lg:p-10">
              <form onSubmit={handleSubmit} className="max-w-[600px] 2xl:max-w-[800px] mx-auto">
                <div className="grid md:grid-cols-2 gap-6 md:gap-8 mb-8">
                  <div>
                    <label className="block text-sm md:text-base 2xl:text-lg text-black mb-2">
                      First Name
                    </label>
                    <input
                      type="text"
                      name="contact_us_first_name"
                      value={formData.contact_us_first_name}
                      onChange={handleChange}
                      className={`w-full border-b border-gray-300 pb-2 focus:outline-none focus:border-blue-500 text-base md:text-lg 2xl:text-xl ${
                        errors.contact_us_first_name ? 'border-red-500' : ''
                      }`}
                      placeholder="John"
                    />
                    {errors.contact_us_first_name && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.contact_us_first_name}
                      </p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm md:text-base 2xl:text-lg text-black mb-2">
                      Last Name
                    </label>
                    <input
                      type="text"
                      name="contact_us_last_name"
                      value={formData.contact_us_last_name}
                      onChange={handleChange}
                      className={`w-full border-b border-gray-300 pb-2 focus:outline-none focus:border-blue-500 text-base md:text-lg 2xl:text-xl ${
                        errors.contact_us_last_name ? 'border-red-500' : ''
                      }`}
                      placeholder="Doe"
                    />
                    {errors.contact_us_last_name && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.contact_us_last_name}
                      </p>
                    )}
                  </div>
                </div>
                <div className="grid md:grid-cols-2 gap-6 md:gap-8 mb-8">
                  <div>
                    <label className="block text-sm md:text-base 2xl:text-lg text-black mb-2">
                      Email
                    </label>
                    <input
                      type="email"
                      name="contact_us_email"
                      value={formData.contact_us_email}
                      onChange={handleChange}
                      className={`w-full border-b border-gray-300 pb-2 focus:outline-none focus:border-blue-500 text-base md:text-lg 2xl:text-xl ${
                        errors.contact_us_email ? 'border-red-500' : ''
                      }`}
                      placeholder="example@email.com"
                    />
                    {errors.contact_us_email && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.contact_us_email}
                      </p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm md:text-base 2xl:text-lg text-black mb-2">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      name="contact_us_phone_number"
                      value={formData.contact_us_phone_number}
                      onChange={handleChange}
                      className={`w-full border-b border-gray-300 pb-2 focus:outline-none focus:border-blue-500 text-base md:text-lg 2xl:text-xl ${
                        errors.contact_us_phone_number ? 'border-red-500' : ''
                      }`}
                      placeholder="+1 012 3456 789"
                    />
                    {errors.contact_us_phone_number && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.contact_us_phone_number}
                      </p>
                    )}
                  </div>
                </div>

                <div className="mb-8">
                  <label className="block text-sm md:text-base 2xl:text-lg font-poppins text-black mb-4">
                    Select Subject?
                  </label>
                  <div className="flex flex-col md:flex-row justify-between gap-6 md:gap-4 lg:gap-6">
                    {subjectOptions.map((subject) => (
                      <label key={subject} className="flex items-start gap-2 cursor-pointer">
                        <div
                          className={`w-4 h-4 md:w-5 md:h-3.5 2xl:w-6 2xl:h-4 rounded-full flex items-center justify-center transition-colors mt-1 ${
                            selected === subject ? "bg-black" : "bg-gray-300"
                          }`}
                          onClick={() => setSelected(subject)}
                        >
                          {selected === subject && (
                            <Check className="w-3 h-3 md:w-4 md:h-3.5 2xl:w-5 2xl:h-5 text-white" />
                          )}
                        </div>
                        <span className="text-sm md:text-base 2xl:text-lg font-poppins text-black">
                          {subject}
                        </span>
                      </label>
                    ))}
                  </div>
                  {errors.contact_us_subject && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.contact_us_subject}
                    </p>
                  )}
                </div>

                <div className="mb-8">
                  <label className="block text-sm md:text-base 2xl:text-lg text-black mb-2">
                    Message
                  </label>
                  <textarea
                    name="contact_us_message"
                    value={formData.contact_us_message}
                    onChange={handleChange}
                    className={`w-full border-b border-gray-300 pb-2 focus:outline-none focus:border-blue-500 min-h-[100px] text-base md:text-lg 2xl:text-xl ${
                      errors.contact_us_message ? 'border-red-500' : ''
                    }`}
                    placeholder="Write your message..."
                  />
                  {errors.contact_us_message && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.contact_us_message}
                    </p>
                  )}
                </div>

                <div className="text-right">
                  <button
                    type="submit"
                    className="bg-[#099CD6] text-white px-6 md:px-8 py-2 md:py-3 rounded-lg text-base md:text-lg 2xl:text-xl hover:bg-blue-600 transition-colors"
                  >
                    Send Message
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
        <ToastContainer 
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
      </div>
      <Footer />
    </>
  );
};

export default ContactUs;