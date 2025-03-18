import React, { useRef, useState, useEffect } from "react";
import Constant from "../../utils/Constant";

export default function Satisfiedcustomer() {
  const scrollRef = useRef(null);
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

  useEffect(() => {
    if (scrollRef.current && aboutData?.satisfied_customers_images?.length > 0) {
      const scrollContainer = scrollRef.current;
      const existingClones = scrollContainer.querySelectorAll('.cloned');
      existingClones.forEach(clone => clone.remove());
      
      setTimeout(() => {
        const items = scrollContainer.querySelectorAll(".logo-item");
        const clonedItems = Array.from(items).map((item) => {
          const clone = item.cloneNode(true);
          clone.classList.add("cloned");
          return clone;
        });
        clonedItems.forEach((item) => {
          scrollContainer.appendChild(item);
        });
      }, 500);
    }
  }, [aboutData]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500" />
      </div>
    );
  }

  return (
    <div>
      <div className="mt-16 text-center w-full">
        <p className="text-gray-900 mb-8 text-[15px] 2xl:text-[40px] animate-fade-in">
          We have <span className="text-blue-500 font-bold animate-pulse">{aboutData?.total_satisfied_customers}</span> Satisfied Customers
        </p>

        <div className="overflow-hidden w-full">
          <div ref={scrollRef} className="flex space-x-24 animate-slow-scroll">
            {aboutData?.satisfied_customers_images?.map((imagePath, index) => (
              <div key={`${index}-${imagePath}`} className="logo-item flex-shrink-0">
                <img
                  src={`https://midknighttestdomain.site${imagePath}`}
                  alt={`Customer Logo ${index + 1}`}
                  className="xl:h-[42px] xl:w-[84px] xsm:h-[30px] xsm:w-[60px] 2xl:w-[150px] 2xl:h-[75px] object-contain"
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes slowScroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }

        .animate-slow-scroll {
          animation: slowScroll 30s linear infinite;
          display: flex;
          align-items: center;
        }

        .animate-slow-scroll:hover { animation-play-state: paused; }

        .logo-item {
          transition: all 0.3s ease;
          display: flex;
          align-items: center;
        }

        .logo-item:hover {
          transform: scale(1.1);
          opacity: 0.8;
        }

        @keyframes fadeIn {
          0% { opacity: 0; }
          100% { opacity: 1; }
        }

        .animate-fade-in {
          animation: fadeIn 1s ease-out forwards;
        }
      `}</style>
    </div>
  );
}