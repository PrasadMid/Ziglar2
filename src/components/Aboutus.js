import React, { useState, useEffect } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import Group from "../assets/images/Group.png";
import Constant from "../utils/Constant";
const AboutUs = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [aboutData, setAboutData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAboutData();
  }, []);

  const fetchAboutData = async () => {
    try {
      const response = await fetch(
        `${Constant.BASE_URL}/about`
      );
      const result = await response.json();
      if (result.status && result.data?.length > 0) {
        setAboutData(result.data[0]);
      }
      setLoading(false);
    } catch (error) {
      console.error("Error fetching about data:", error);
      setLoading(false);
    }
  };

  // Function to handle image click
  const handleImageClick = (imageSrc) => {
    setSelectedImage(selectedImage === imageSrc ? null : imageSrc);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <div className="max-w-6xl 2xl:max-w-[1800px] mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
          <h1 className="text-3xl 2xl:text-7xl sm:text-4xl lg:text-5xl font-bold text-center mb-6 animate-fade-in">
            About US
          </h1>

          <div className="text-gray-600 text-base sm:text-lg lg:text-xl 2xl:text-3xl font-medium mb-12 text-center max-w-4xl 2xl:max-w-[1600px] mx-auto animate-slide-up">
            {aboutData?.about_overview}
          </div>
          <section className="mb-16">
            <h2 className="text-3xl sm:text-4xl 2xl:text-6xl font-bold text-center text-[#099CD6] mb-8 hover:scale-105 transition-transform duration-300">
              Who we are?
            </h2>
            <div className="flex flex-col lg:flex-row gap-8 items-center lg:items-start">
              <div className="w-full lg:w-1/2 transition-all duration-500 ease-in-out transform hover:scale-105">
                <img
                  src={aboutData?.about_who_we_are_img}
                  alt="Manufacturing facility"
                  className={`w-full h-auto rounded-lg object-cover cursor-pointer transition-all duration-500 ${
                    selectedImage === aboutData?.about_who_we_are_img
                      ? "scale-110 shadow-2xl"
                      : ""
                  }`}
                  onClick={() =>
                    handleImageClick(aboutData?.about_who_we_are_img)
                  }
                />
              </div>
              <div className="w-full lg:w-1/2 space-y-4 text-gray-600 text-base sm:text-lg 2xl:text-[35px] 2xl:leading-[45px] animate-slide-right">
                <p className="hover:translate-x-2 transition-transform duration-300">
                  {aboutData?.about_who_we_are_info}
                </p>
              </div>
            </div>
          </section>

          {/* Our Vision section */}
          <section className="mb-16">
            <div className="flex flex-col lg:flex-row gap-8 items-">
              <div className="w-full lg:w-1/2 transition-all duration-500 ease-in-out transform hover:scale-105">
                <img
                  src={aboutData?.about_our_vision_img}
                  alt="Industrial automation"
                  className={`w-full h-auto rounded-lg object-cover cursor-pointer transition-all duration-500 ${
                    selectedImage === aboutData?.about_our_vision_img
                      ? "scale-110 shadow-2xl"
                      : ""
                  }`}
                  onClick={() =>
                    handleImageClick(aboutData?.about_our_vision_img)
                  }
                />
              </div>
              <div className="w-full lg:w-1/2 lg:mt-[50px] xsm:mt-0 animate-slide-left">
                <h2 className="text-3xl sm:text-4xl 2xl:text-6xl font-bold text-[#099CD6] mb-6 text-center lg:text-left hover:scale-105 transition-transform duration-300">
                  Our Vision
                </h2>
                <p className="text-gray-600 text-base sm:text-lg 2xl:text-[35px] 2xl:leading-[45px] hover:translate-x-2 transition-transform duration-300">
                  {aboutData?.about_our_vision_info}
                  
                </p>
              </div>
            </div>
          </section>

          {/* Our Mission section */}
          <section className="mb-16">
            <div className="flex flex-col lg:flex-row gap-8 items-center">
              <div className="w-full lg:w-2/3 animate-slide-right">
                <h2 className="text-3xl sm:text-4xl 2xl:text-6xl font-bold text-[#099CD6] mb-6 text-center lg:text-left hover:scale-105 transition-transform duration-300">
                  Our Mission
                </h2>
                <ul className="text-gray-600 text-base sm:text-lg 2xl:text-[35px] 2xl:leading-[45px] space-y-4 hover:translate-x-2 transition-transform duration-300">
                  <li>• {aboutData?.about_our_mission_info.split(".")[0]}.</li>
                  <li>• {aboutData?.about_our_mission_info.split(".")[1]}.</li>
                  <li>• {aboutData?.about_our_mission_info.split(".")[2]}.</li>
                  <li>• {aboutData?.about_our_mission_info.split(".")[3]}.</li>
                </ul>
              </div>
              <div className="w-full lg:w-1/3 transition-all duration-500 ease-in-out transform hover:scale-105">
                <img
                  src={aboutData?.about_our_mission_img}
                  alt="Mission illustration"
                  className={`w-full h-auto rounded-lg object-cover cursor-pointer transition-all duration-500 ${
                    selectedImage === Group ? "scale-110 shadow-2xl" : ""
                  }`}
                  onClick={() => handleImageClick(Group)}
                />
              </div>
            </div>
          </section>
        </div>
      </main>

      {/* Add global styles for animations */}
      <style jsx global>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes slideUp {
          from {
            transform: translateY(20px);
            opacity: 0;
          }
          to {
            transform: translateY(0);
            opacity: 1;
          }
        }

        @keyframes slideRight {
          from {
            transform: translateX(-20px);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }

        @keyframes slideLeft {
          from {
            transform: translateX(20px);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }

        .animate-fade-in {
          animation: fadeIn 1s ease-out;
        }

        .animate-slide-up {
          animation: slideUp 1s ease-out;
        }

        .animate-slide-right {
          animation: slideRight 1s ease-out;
        }

        .animate-slide-left {
          animation: slideLeft 1s ease-out;
        }
      `}</style>

      <Footer />
    </div>
  );
};

export default AboutUs;
