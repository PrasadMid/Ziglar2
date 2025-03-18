import React, { useRef, useState, useEffect } from "react";
import Navbar from "../Navbar";
import Footer from "../Footer";
import left from "../../assets/images/chevron-left.png";
import right from "../../assets/images/chevron-right.png";
import Servingdiverse from "./Servingdiverse";
import Popularproduct from "./Popularproduct";
import Customproduct from "./Customproduct";
import Reseller from "./Reseller";
import Constant from "../../utils/Constant";

const Home = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [sliderData, setSliderData] = useState([]);
  const [error, setError] = useState(null);

  // Fetch slider data from API
  useEffect(() => {
    const fetchSliderData = async () => {
      try {
        const response = await fetch(`${Constant.BASE_URL}/home-slider`);
        const data = await response.json();
        
        if (data.status && data.data) {
          setSliderData(data.data);
        } else {
          throw new Error('Failed to fetch slider data');
        }
      } catch (err) {
        setError(err.message);
      } finally {
  
      }
    };

    fetchSliderData();
  }, []);

  // Auto-sliding functionality
  useEffect(() => {
    if (sliderData.length === 0) return;

    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev === sliderData.length - 1 ? 0 : prev + 1));
    }, 3000);

    return () => clearInterval(timer);
  }, [sliderData.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === sliderData.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? sliderData.length - 1 : prev - 1));
  };

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  const scrollRef = useRef(null);

  // Your existing useEffect for logo items...
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



  return (
    <>
      <Navbar />
      <div className="relative w-full flex flex-col items-center">
        <div className="relative w-full overflow-hidden">
          {/* Images Container */}
          <div
            className="w-full h-full transition-transform duration-500 ease-out flex"
            style={{
              transform: `translateX(-${currentSlide * 100}%)`,
              width: `${sliderData.length * 100}%`,
            }}
          >
            {sliderData.map((slide, index) => (
              <div key={index} className="relative w-full h-full flex-shrink-0">
                <a href={slide.slider_url} target="_blank" rel="noopener noreferrer">
                  <img
                    src={slide.slider_image}
                    alt={slide.slider_name}
                    className="w-screen lg:h-[522px] 3xl:h-[620px] xl:h-[700px] 2xl:h-[1200px] object-fit flex-shrink-0"
                  />
                </a>
              </div>
            ))}
          </div>

          {/* Navigation Buttons */}
          {sliderData.length > 1 && (
            <>
              <button
                onClick={prevSlide}
                className="absolute lg:left-14 xsm:left-4 top-1/2 -translate-y-1/2 p-2 z-10"
              >
                <img
                  src={left}
                  alt="Previous"
                  className="xl:w-[39px] xl:h-[40px] xsm:w-[22px] xsm:h-[22px] 2xl:w-[80px] 2xl:h-[80px]"
                />
              </button>
              <button
                onClick={nextSlide}
                className="absolute lg:right-14 xsm:right-4 top-1/2 -translate-y-1/2 p-2 z-10"
              >
                <img
                  src={right}
                  alt="Next"
                  className="xl:w-[39px] xl:h-[40px] xsm:w-[22px] xsm:h-[22px] 2xl:w-[80px] 2xl:h-[80px]"
                />
              </button>

              {/* Slide Indicators */}
              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2 z-10">
                {sliderData.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => goToSlide(index)}
                    className={`h-1 2xl:h-2 rounded-full transition-all duration-300 ${
                      currentSlide === index
                        ? "xl:w-8 xsm:w-6 2xl:w-20 bg-gray-800"
                        : "xl:w-4 xsm:w-4 2xl:w-14 bg-gray-300"
                    }`}
                    aria-label={`Go to slide ${index + 1}`}
                  />
                ))}
              </div>
            </>
          )}
        </div>
        <Servingdiverse />
        <Popularproduct />
        <Customproduct />
        <Reseller />
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
      <Footer />
    </>
  );
};

export default Home;