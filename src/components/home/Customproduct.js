import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Constant from "../../utils/Constant";
import { motion } from "framer-motion";

function Customproduct() {
  const [customData, setCustomData] = useState(null);
  useEffect(() => {
    fetchCustomData();
  }, []);

  const fetchCustomData = async () => {
    try {
      const response = await fetch(
        `${Constant.BASE_URL}/custom-products-craft`
      );
      const result = await response.json();
      if (result.status && result.data?.length > 0) {
        setCustomData(result.data[0]);
      }
    } catch (error) {
      console.error("Error fetching custom products data:", error);
    }
  };

  return (
    <div className="relative w-full flex flex-col items-center">
      <div
        className="lg:w-full xsm:w-full lg:py-12 xsm:py-8"
        style={{
          background:
            "linear-gradient(to right, rgba(125, 207, 182, 1), rgba(9, 156, 214, 1))",
        }}
      >
        <div className="xl:max-w-6xl xl:mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-2 xsm:grid-cols-1 xl:gap-12 2xl:gap-20">
          <div className="space-y-6 animate-fade-in">
          <div className="bg-white p-8 rounded-2xl shadow-lg w-fit">
    {customData?.custom_products_craft_image ? (
      <img
        src={customData.custom_products_craft_image}
        alt={customData.custom_products_craft_name || "Custom Products"}
        className="xl:w-[400px] xl:h-[256px] 2xl:w-[800px] 2xl:h-[450px] transform transition-transform duration-700 hover:scale-105 animate-slideInFromLeft"
        loading="lazy"
        role="img"
        aria-label={`Image of ${customData.custom_products_craft_name || "Custom Product"}`}
      />
    ) : (
      <p className="text-gray-500">Image not available</p>
    )}
  </div>

            <div className="text-white xl:leading-[40px] xsm:leading-[27px] 2xl:leading-[50px] animate-slide-up">
              <h2 className="xl:text-[32px] xsm:text-[22px] 2xl:text-[45px] font-sans font-bold xl:mb-2 animate-text-focus">
                {customData?.custom_products_craft_title}
              </h2>
              <p className="xl:text-[16px] xsm:text-[12px] 2xl:text-[25px] font-sans animate-fade-in-delayed">
                {customData?.custom_products_craft_title_details}
              </p>
            </div>
          </div>

          <div className="xl:w-full lg:w-1/2 xl:pt-[40px] xsm:pt-[30px] xsm:flex xsm:flex-col">
            <div className="space-y-8">
              <div className="flex xl:flex-row xsm:flex-col xl:gap-[120px] xl:w-[720px]">
                {/* Step 01 */}
                <div
                  className="flex items-start flex-col animate-slide-in"
                  style={{ animationDelay: "0.2s" }}
                >
                  <div className="xl:text-[39px] xsm:text-[28px] 2xl:text-[58px] text-white font-poppins font-semibold mr-4 xl:leading-[45px] xsm:leading-[35px] animate-number">
                    01
                  </div>
                  <h3 className="xl:text-[32px] xsm:text-[20px] 2xl:text-[50px] text-white font-sans font-bold hover-bright">
                    {customData?.custom_products_craft_heading_1}
                  </h3>
                  <p className="text-[16px] 2xl:text-[25px] text-white font-sans font-medium">
                    {customData?.custom_products_craft_details_1}
                  </p>
                </div>
                {/* Step 02 */}
                <div
                  className="flex items-start flex-col xsm:mt-8 xl:mt-0 animate-slide-in"
                  style={{ animationDelay: "0.4s" }}
                >
                  <div className="xl:text-[39px] xsm:text-[28px] 2xl:text-[58px] text-white font-poppins font-semibold mr-4 xl:leading-[45px] xsm:leading-[35px] animate-number">
                    02
                  </div>
                  <h3 className="xl:text-[32px] xsm:text-[20px] 2xl:text-[50px] text-white font-sans font-bold hover-bright">
                    {customData?.custom_products_craft_heading_2}
                  </h3>
                  <p className="text-[16px] 2xl:text-[25px] text-white font-sans font-medium">
                    {customData?.custom_products_craft_details_2}
                  </p>
                </div>
              </div>

              <div className="flex xl:flex-row xsm:flex-col xl:gap-[120px] xl:w-[720px]">
                {/* Step 03 */}
                <div
                  className="flex items-start flex-col animate-slide-in"
                  style={{ animationDelay: "0.6s" }}
                >
                  <div className="xl:text-[39px] xsm:text-[28px] 2xl:text-[58px] text-white font-poppins font-semibold mr-4 xl:leading-[45px] xsm:leading-[35px] animate-number">
                    03
                  </div>
                  <h3 className="xl:text-[32px] xsm:text-[20px] 2xl:text-[50px] text-white font-sans font-bold hover-bright">
                    {customData?.custom_products_craft_heading_3}
                  </h3>
                  <p className="text-[16px] 2xl:text-[25px] text-white font-sans font-medium">
                    {customData?.custom_products_craft_details_3}
                  </p>
                </div>
                <Link to="/contactus">
                  <div className="xl:pt-[50px] xsm:pt-[30px] animate-bounce-in">
                    <button className="w-[100px] h-[36px] 2xl:w-[300px] 2xl:h-[65px] bg-white text-[12px] 2xl:text-[35px] font-bold font-sans text-[#0B63E5] rounded-md 2xl:rounded-xl transform transition-all duration-300 hover:bg-blue-100 hover:scale-105 hover:shadow-xl animate-pulse">
                      Contact Us
                    </button>
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      <style jsx>{`
        /* Your existing styles remain unchanged */
        
      `
      }
    
      </style>
    </div>
  );
}

export default Customproduct;
