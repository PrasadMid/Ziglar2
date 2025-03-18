import React, { useRef, useState, useEffect } from "react";
import Satisfiedcustomer from "./Satisfiedcustomer";
import Constant from "../../utils/Constant";
export default function Servingdiverse() {
  const [industriesData, setIndustriesData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const scrollRef = useRef(null);

  // Fetch industries data
  useEffect(() => {
    const fetchIndustries = async () => {
      try {
        const response = await fetch(
         `${Constant.BASE_URL}/home-serving-diverse-industry`
        );
        const result = await response.json();

        if (result.status && result.data) {
          setIndustriesData(result.data[0]);
        } else {
          throw new Error("Failed to fetch industries data");
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchIndustries();
  }, []);

  // Logo scroll effect
  useEffect(() => {
    if (scrollRef.current) {
      const scrollContainer = scrollRef.current;
      const items = scrollContainer.querySelectorAll(".logo-item");
      const clonedItems = Array.from(items).map((item) => item.cloneNode(true));
      clonedItems.forEach((item) => {
        item.classList.add("cloned");
        scrollContainer.appendChild(item);
      });
    }
  }, []);

  if (loading) {
    return (
      <div className="w-full h-screen flex items-center justify-center">
        Loading...
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full h-screen flex items-center justify-center text-red-500">
        Error: {error}
      </div>
    );
  }

  return (
    <div className="w-full flex flex-col items-center">
      <div className="flex flex-col items-center py-2 lg:pt-16 bg-white 2xl:w-[2000px]">
        <div className="container mx-auto xl:px-[200px] xsm:px-4 gap-[100px] lg:flex lg:items-start lg:justify-">
          <div className="lg:w-1/2">
            <h2 className="text-[#061C3D] font-sans font-bold xl:leading-[45px] xl:text-[42px] 2xl:text-[72px] xsm:text-[30px] xsm:leading-[34px] 2xl:leading-[75px] 2xl:mt-8 mb-4 animate-slide-right">
              Serving Diverse <br />
              Industries
            </h2>
            <p className="text-[#42526B] font-sans text-[12px] 2xl:text-[30px] mb-8 animate-fade-in">
              {industriesData.serving_diverse_industries_info}
            </p>
            <div className="space-y-6 bg-[#E0F2FF] rounded-lg shadow-lg animate-slide-up">
              <div className="flex items-start xl:pl-[40px] xsm:pl-[10px] pt-[20px] animate-card hover:bg-blue-50 transition-all duration-300 p-4">
                <img
                   src={
                    industriesData.serving_diverse_industries_service_first_logo
                  }
                  className="mr-4 2xl:w-16 2xl:h-16 animate-float"
                  alt="Electric icon"
                />
                <div>
                  <h4 className="text-[15px] 2xl:text-[40px] 2xl:leading-[45px] font-sans font-medium text-[#061C3D] animate-text-focus">
                    {
                      industriesData.serving_diverse_industries_service_first_title
                    }
                  </h4>
                  <p className="text-[#42526B] text-[12px] 2xl:text-[27px] font-sans animate-fade-in-delayed">
                    {
                      industriesData.serving_diverse_industries_service_first_content
                    }
                  </p>
                </div>
              </div>
              <hr className="animate-grow" />
              <div className="flex items-start xl:pl-[40px] xsm:pl-[10px] animate-card hover:bg-blue-50 transition-all duration-300 p-4">
                <img
                   src={
                    industriesData.serving_diverse_industries_service_second_logo
                  }
                  className="mr-4 2xl:w-16 2xl:h-16 animate-float"
                  alt="Histogram icon"
                />
                <div>
                  <h4 className="text-[15px] 2xl:text-[40px] font-sans font-medium text-[#061C3D] animate-text-focus">
                    {
                      industriesData.serving_diverse_industries_service_second_title
                    }
                  </h4>
                  <p className="text-[#42526B] text-[12px] 2xl:text-[27px] font-sans animate-fade-in-delayed">
                    {
                      industriesData.serving_diverse_industries_service_second_content
                    }
                  </p>
                </div>
              </div>
              <hr className="animate-grow" />
              <div className="flex items-start xl:pl-[40px] xsm:pl-[10px] pb-[20px] animate-card hover:bg-blue-50 transition-all duration-300 p-4">
                <img
                  src={
                    industriesData.serving_diverse_industries_service_third_logo
                  }
                  className="mr-4 2xl:w-16 2xl:h-16 animate-float "
                  alt="Opportunity icon"
                />
                <div>
                  <h4 className="text-[15px] 2xl:text-[40px] 2xl:leading-[45px] font-sans font-medium text-[#061C3D] animate-text-focus">
                    {
                      industriesData.serving_diverse_industries_service_third_title
                    }
                  </h4>
                  <p className="text-[#42526B] text-[12px] 2xl:text-[27px] font-sans animate-fade-in-delayed">
                    {
                      industriesData.serving_diverse_industries_service_third_content
                    }
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:w-[486px] 2xl:w-[800px] mt-[70px] 2xl:mt-[200px] relative animate-scale-in">
            <img
              src={industriesData.serving_diverse_industries_image}
              alt="Man at desk"
              className="w-full h-auto 2xl:w-[1400px] 2xl:h-[800px] object-cover shadow-2xl hover:transform hover:scale-105 transition-all duration-500"
            />
          </div>
        </div>

        {/* Rest of the component remains the same */}
        {/* <Satisfiedcustomer /> */}
      </div>
      {/* Styles remain the same */}
      <style jsx>{`
        @keyframes slowScroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }

        @keyframes slideRight {
          0% {
            transform: translateX(-100px);
            opacity: 0;
          }
          100% {
            transform: translateX(0);
            opacity: 1;
          }
        }

        @keyframes slideUp {
          0% {
            transform: translateY(50px);
            opacity: 0;
          }
          100% {
            transform: translateY(0);
            opacity: 1;
          }
        }

        @keyframes fadeIn {
          0% {
            opacity: 0;
          }
          100% {
            opacity: 1;
          }
        }

        @keyframes scaleIn {
          0% {
            transform: scale(0.9);
            opacity: 0;
          }
          100% {
            transform: scale(1);
            opacity: 1;
          }
        }

        @keyframes float {
          0% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-10px);
          }
          100% {
            transform: translateY(0px);
          }
        }

        @keyframes textFocus {
          0% {
            filter: blur(4px);
            opacity: 0;
          }
          100% {
            filter: blur(0);
            opacity: 1;
          }
        }

        @keyframes grow {
          0% {
            width: 0;
          }
          100% {
            width: 100%;
          }
        }

        .animate-slow-scroll {
          animation: slowScroll 30s linear infinite;
        }

        .animate-slide-right {
          animation: slideRight 1s ease-out forwards;
        }

        .animate-slide-up {
          animation: slideUp 1s ease-out forwards;
        }

        .animate-fade-in {
          animation: fadeIn 1s ease-out forwards;
        }

        .animate-fade-in-delayed {
          animation: fadeIn 1s ease-out 0.3s forwards;
          opacity: 0;
        }

        .animate-scale-in {
          animation: scaleIn 1.2s ease-out forwards;
        }

        .animate-float {
          animation: float 3s ease-in-out infinite;
        }

        .animate-text-focus {
          animation: textFocus 0.8s ease-out forwards;
        }

        .animate-grow {
          animation: grow 1s ease-out forwards;
        }

        .animate-card {
          opacity: 0;
          animation: fadeIn 0.8s ease-out forwards;
        }

        .animate-card:nth-child(1) {
          animation-delay: 0.2s;
        }
        .animate-card:nth-child(2) {
          animation-delay: 0.4s;
        }
        .animate-card:nth-child(3) {
          animation-delay: 0.6s;
        }

        .animate-slow-scroll:hover {
          animation-play-state: paused;
        }

        .logo-item {
          transition: all 0.3s ease;
        }

        .logo-item:hover {
          transform: scale(1.1);
          opacity: 0.8;
        }
        @keyframes gradientText {
          0% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
          100% {
            background-position: 0% 50%;
          }
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes cardPopUp {
          0% {
            opacity: 0;
            transform: scale(0.9);
          }
          100% {
            opacity: 1;
            transform: scale(1);
          }
        }

        @keyframes gradientShine {
          0% {
            background-position: 200% 50%;
          }
          100% {
            background-position: -200% 50%;
          }
        }

        @keyframes pulseButton {
          0% {
            transform: scale(1);
          }
          50% {
            transform: scale(1.02);
          }
          100% {
            transform: scale(1);
          }
        }

        @keyframes bounceButton {
          0%,
          100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-3px);
          }
        }

        .animate-gradient-text {
          background-size: 200% auto;
          animation: gradientText 3s linear infinite;
        }

        .animate-fade-in {
          animation: fadeIn 1s ease-out forwards;
        }

        .animate-card-pop-up {
          opacity: 0;
          animation: cardPopUp 0.6s ease-out forwards;
        }

        .animate-gradient-shine {
          background-size: 200% auto;
          animation: gradientShine 3s linear infinite;
        }

        .animate-pulse-soft {
          animation: pulseButton 2s infinite;
        }

        .animate-bounce-button {
          animation: bounceButton 2s infinite;
        }

        .animate-image-hover {
          transform-origin: center;
        }
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
            transform: translateY(30px);
            opacity: 0;
          }
          to {
            transform: translateY(0);
            opacity: 1;
          }
        }

        @keyframes slideIn {
          from {
            transform: translateX(-30px);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }

        @keyframes scaleIn {
          from {
            transform: scale(0.9);
            opacity: 0;
          }
          to {
            transform: scale(1);
            opacity: 1;
          }
        }

        @keyframes bounceIn {
          0% {
            transform: scale(0.3);
            opacity: 0;
          }
          50% {
            transform: scale(1.05);
          }
          70% {
            transform: scale(0.9);
          }
          100% {
            transform: scale(1);
            opacity: 1;
          }
        }

        @keyframes numberPulse {
          0% {
            transform: scale(1);
          }
          50% {
            transform: scale(1.1);
          }
          100% {
            transform: scale(1);
          }
        }

        .animate-fade-in {
          animation: fadeIn 1s ease-out forwards;
        }

        .animate-slide-up {
          animation: slideUp 1s ease-out forwards;
        }

        .animate-slide-in {
          opacity: 0;
          animation: slideIn 0.8s ease-out forwards;
        }

        .animate-scale-in {
          animation: scaleIn 1s ease-out forwards;
        }

        .animate-bounce-in {
          animation: bounceIn 1s cubic-bezier(0.36, 0, 0.66, -0.56) forwards;
        }

        .animate-number {
          animation: numberPulse 2s ease-in-out infinite;
        }

        .hover-float:hover {
          transform: translateY(-10px);
          transition: transform 0.3s ease;
        }

        .hover-bright {
          transition: all 0.3s ease;
        }

        .hover-bright:hover {
          text-shadow: 0 0 10px rgba(255, 255, 255, 0.8);
          transform: scale(1.05);
        }

        .animate-fade-in-delayed {
          opacity: 0;
          animation: fadeIn 1s ease-out 0.3s forwards;
        }
        @keyframes slowScroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }

        @keyframes slideRight {
          0% {
            transform: translateX(-100px);
            opacity: 0;
          }
          100% {
            transform: translateX(0);
            opacity: 1;
          }
        }

        @keyframes slideUp {
          0% {
            transform: translateY(20px);
            opacity: 0;
          }
          100% {
            transform: translateY(0);
            opacity: 1;
          }
        }

        @keyframes fadeIn {
          0% {
            opacity: 0;
          }
          100% {
            opacity: 1;
          }
        }

        @keyframes scaleIn {
          0% {
            transform: scale(0.95);
            opacity: 0;
          }
          100% {
            transform: scale(1);
            opacity: 1;
          }
        }

        @keyframes bounceSlow {
          0%,
          100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-10px);
          }
        }

        @keyframes textFocus {
          0% {
            filter: blur(4px);
            opacity: 0;
          }
          100% {
            filter: blur(0);
            opacity: 1;
          }
        }

        .animate-slow-scroll {
          animation: slowScroll 30s linear infinite;
        }

        .animate-slide-right {
          animation: slideRight 1s ease-out forwards;
        }

        .animate-slide-up {
          animation: slideUp 1s ease-out forwards;
          opacity: 0;
        }

        .animate-fade-in {
          animation: fadeIn 1s ease-out forwards;
        }

        .animate-fade-in-delayed {
          animation: fadeIn 1s ease-out 0.3s forwards;
          opacity: 0;
        }

        .animate-scale-in {
          animation: scaleIn 1.2s ease-out forwards;
        }

        .animate-bounce-slow {
          animation: bounceSlow 3s ease-in-out infinite;
        }

        .animate-text-focus {
          animation: textFocus 0.8s ease-out forwards;
        }

        .animate-slow-scroll:hover {
          animation-play-state: paused;
        }

        .logo-item {
          transition: all 0.3s ease;
        }

        .logo-item:hover {
          transform: scale(1.1);
          opacity: 0.8;
        }
      `}</style>
    </div>
  );
}
