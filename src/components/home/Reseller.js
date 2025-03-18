import React, { useRef, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import google from "../../assets/images/google.png";
import microsoft from "../../assets/images/microsoft.png";
import check from "../../assets/images/CheckCircle.png";
import slac from "../../assets/images/slac.png";
import netflix from "../../assets/images/netflix.png";
import Constant from "../../utils/Constant";

function Reseller() {
  const [partnerData, setPartnerData] = useState(null);
  const scrollRef = useRef(null);

  useEffect(() => {
    fetchPartnerData();
  }, []);

  const fetchPartnerData = async () => {
    try {
      const response = await fetch(
        `${Constant.BASE_URL}/join-us-partner-or-reseller`
      );
      const result = await response.json();
      if (result.status && result.data?.length > 0) {
        setPartnerData(result.data[0]);
      }
    } catch (error) {
      console.error("Error fetching partner data:", error);
    }
  };

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

  const features = [
    {
      title: partnerData?.join_us_partner_or_reseller_feature_1,
      description: partnerData?.join_us_partner_or_reseller_details_1,
    },
    {
      title: partnerData?.join_us_partner_or_reseller_feature_2,
      description: partnerData?.join_us_partner_or_reseller_details_2,
    },
  
  ];

  return (
    <div>
      <div className="max-w-7xl 2xl:max-w-[2000px] mx-auto px-4 lg:py-16 xsm:py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <div className="animate-fade-in">
              <h2 className="xl:text-3xl xsm:text-[28px] 2xl:text-6xl xl:leading-[45px] xsm:leading-[35px] font-bold text-[#061C3D] mb-4 animate-slide-right">
                Join Us as a Partner
                <br />
                or Reseller!
              </h2>
              <p className="text-[#42526B] text-[13.5px] 2xl:text-[21px] leading-[19.5px] 2xl:leading-[35px] font-sans animate-fade-in-delayed">
                {partnerData?.join_us_partner_or_reseller_info}
              </p>
            </div>
            <div className="space-y-6">
              {features.map((feature, index) => (
                <div
                  key={index}
                  className="flex gap-3 animate-slide-up"
                  style={{ animationDelay: `${index * 0.2}s` }}
                >
                  <div className="flex-shrink-0">
                    <div className="w-[30px] h-[30px] 2xl:w-[60px] 2xl:h-[60px] flex items-center justify-center animate-bounce-slow">
                      <img
                        src={check}
                        alt="check"
                        className="w-[30px] h-[30px] 2xl:w-[60px] 2xl:h-[60px]"
                      />
                    </div>
                  </div>
                  <div>
                    <h3 className="font-semibold text-navy-900 mb-1 2xl:text-[40px] animate-text-focus">
                      {feature.title}
                    </h3>
                    <p className="text-[#6A778B] text-[12px] 2xl:text-[25px] font-sans animate-fade-in-delayed">
                      {feature.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
            <div
              className="flex gap-4 animate-slide-up"
              style={{ animationDelay: "0.6s" }}
            >
              <button
                className="xl:px-6 xl:py-2.5 text-[12px]  2xl:text-[25px] xsm:px-[6px] 2xl:px-[15px] 2xl:py-4 font-bold font-sans text-white rounded-lg flex items-center gap-2 hover:scale-105 transition-transform"
                style={{
                  background: "radial-gradient(circle, rgba(11,47,231,0.9052871148459384) 0%, rgba(70,141,252,1) 100%)",
                  width: "30%",
                  height: "50px",
                }}
              >
                Let's Work Together
              
              </button>
              <Link to="/aboutus">
                <button className="px-6 py-2.5 2xl:text-[30px] text-[#0B63E5] font-bold font-sans rounded-lg transition-all hover:bg-blue-50">
                  About US
                </button>
              </Link>
            </div>
            {/* <div className="animate-fade-in" style={{ animationDelay: "0.8s" }}>
              <p className="text-gray-600 text-sm 2xl:text-3xl mb-4">
                Trusted by hundreds of companies
              </p>
              <div className="overflow-hidden w-full">
                <div
                  ref={scrollRef}
                  className="flex space-x-8 animate-slow-scroll"
                >
                  <div className="logo-item flex-shrink-0">
                    <img
                      src={netflix}
                      alt="netflix"
                      className="w-[60px] h-[30px] 2xl:w-[140px] 2xl:h-[60px]"
                    />
                  </div>
                  <div className="logo-item flex-shrink-0">
                    <img
                      src={slac}
                      alt="slac"
                      className="w-[60px] h-[30px] 2xl:w-[140px] 2xl:h-[60px]"
                    />
                  </div>
                  <div className="logo-item flex-shrink-0">
                    <img
                      src={microsoft}
                      alt="microsoft"
                      className="w-[60px] h-[30px] 2xl:w-[140px] 2xl:h-[60px]"
                    />
                  </div>
                  <div className="logo-item flex-shrink-0">
                    <img
                      src={google}
                      alt="google"
                      className="w-[60px] h-[30px] 2xl:w-[140px] 2xl:h-[60px]"
                    />
                  </div>
                </div>
              </div>
            </div> */}
          </div>
          <div className="animate-scale-in">
            <img
              src={partnerData?.join_us_partner_or_reseller_image}
              alt="Team collaboration"
              className="xl:w-[500px] xl:h-[500px] 2xl:w-[1000px] 2xl:h-[1200px] rounded-lg shadow-lg hover:transform hover:scale-105 transition-all duration-500"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Reseller;
