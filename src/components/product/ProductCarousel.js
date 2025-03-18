import React, { useState } from 'react';
import { FaChevronLeft, FaChevronRight } from "react-icons/fa6";

export default function ProductCarousel({ images, baseUrl }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const goToImage = (index) => {
    setCurrentIndex(index);
  };

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  if (!images || images.length === 0) {
    return null;
  }

  return (
    <div className="w-full pt-0 max-w-3xl mx-auto">
      
      <div className="relative">
        {/* Main Image */}
        <div className="relative w-full h-96 bg-gradient-to-r from-[#E0F0EB] to-[#E1EDF2] rounded-lg mb-4">
          <img
            src={`${baseUrl}${images[currentIndex]}`}
            alt={`Product ${currentIndex + 1}`}
            className="w-full h-full object-contain p-4"
          />
          
          {/* Navigation Arrows */}
          <button
            onClick={goToPrevious}
            className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white p-2 rounded-full shadow-md hover:bg-gray-100"
          >
            <FaChevronLeft className="w-6 h-6" />
          </button>
          
          <button
            onClick={goToNext}
            className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white p-2 rounded-full shadow-md hover:bg-gray-100"
          >
            <FaChevronRight className="w-6 h-6" />
          </button>
        </div>

        {/* Thumbnail Navigation */}
        <div className="flex justify-center space-x-4 mt-4">
          {images.map((image, index) => (
            <button
              key={index}
              onClick={() => goToImage(index)}
              className={`w-24 h-24 border-2 rounded-lg overflow-hidden transition-all duration-200 ${
                currentIndex === index ? 'border-blue-500' : 'border-gray-200'
              }`}
            >
              <img
                src={`${baseUrl}${image}`}
                alt={`Thumbnail ${index + 1}`}
                className="w-full h-full object-contain"
              />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}