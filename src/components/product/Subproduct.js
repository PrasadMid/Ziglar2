import React, { useRef, useState, useEffect } from "react";
import { useParams, Link, useLocation } from "react-router-dom";
import Navbar from "../Navbar";
import Footer from "../Footer";
import placeholderImage from "../../assets/images/ammeter.png";
import {
  FaChevronRight,
  FaChevronLeft,
  FaArrowLeftLong,
} from "react-icons/fa6";
import ProductCarousel from "./ProductCarousel";

function Subproduct() {
  const { state } = useLocation();
  const [productDetails, setProductDetails] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [activeTab, setActiveTab] = useState("features");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isVisible, setIsVisible] = useState(false);
  const [currentPosition, setCurrentPosition] = useState(0);
  const [BASE_URL] = useState("https://midknighttestdomain.site");
  const containerRef = useRef(null);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const location = useLocation();
  const { productId, categoryType } = useParams();
  const finalProductId = productId;
  const [slideWidth, setSlideWidth] = useState(288); 

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    setIsVisible(true);
    fetchProductDetails();
  }, [finalProductId, categoryType]);

  const fetchProductDetails = async () => {
    try {
      let endpoint;
      switch (categoryType) {
        case "main":
          endpoint = `${BASE_URL}/api/v1/get-main-products-byId/${finalProductId}`;
          break;
        case "child":
          endpoint = `${BASE_URL}/api/v1/get-child-products-byId/${finalProductId}`;
          break;
        case "subchild":
          endpoint = `${BASE_URL}/api/v1/get-sub-child-products-byId/${finalProductId}`;
          break;
        default:
          throw new Error("Invalid product type");
      }

      const response = await fetch(endpoint);
      if (!response.ok) {
        throw new Error("Failed to fetch product details");
      }

      const data = await response.json();
      let productData = null;
      let relatedProductsData = [];

      if (categoryType === "main" && data.data.product) {
        productData = {
          ...data.data.product,
          name: data.data.product.product_name,
          info: data.data.product.product_info,

          images: data.data.product.images || [],
        };
        relatedProductsData = data.data.related_products;
      } else if (categoryType === "child" && data.data.childProduct) {
        productData = {
          ...data.data.childProduct,
          name: data.data.childProduct.name,
          images: data.data.childProduct.images || [],
        };
        relatedProductsData = data.data.related_products;
      } else if (categoryType === "subchild" && data.data.subChildProduct) {
        productData = {
          ...data.data.subChildProduct,
          name: data.data.subChildProduct.name,
          images: data.data.subChildProduct.images || [],
        };
        relatedProductsData = data.data.related_products;
      }

      if (!productData) {
        throw new Error("Product not found");
      }
      console.log("product info",productData)

      const transformedRelatedProducts = relatedProductsData.map((product) => ({
        id: product.id,
        name: product.name || product.product_name,
        info: product.info || product.product_info,

        images: product.images || [],
        type: product.type,
      }));

      setProductDetails(productData);
      setRelatedProducts(transformedRelatedProducts);
      setIsLoading(false);
    } catch (error) {
      setError(error.message);
      setIsLoading(false);
    }
  };

  const moveSlide = (direction) => {
    if (!containerRef.current) return;
    const visibleWidth = containerRef.current.offsetWidth;
    const slideWidth = isMobile ? window.innerWidth - 32 : 288;
    const numVisibleSlides = isMobile ? 1 : 3;
    const maxScroll = Math.max(
      0,
      (relatedProducts.length - numVisibleSlides) * slideWidth
    );
    const newPosition = Math.max(
      0,
      Math.min(currentPosition + direction * slideWidth, maxScroll)
    );
    setCurrentPosition(newPosition);
  };

  const renderDatasheetContent = () => {
    if (
      !productDetails?.datasheet ||
      !Array.isArray(productDetails.datasheet)
      
    ){
      return <p className="text-gray-600">No datasheets available</p>;
    }
    return (
      <div className="flex flex-wrap gap-4 justify-center">
        {productDetails.datasheet.map((pdfPath, index) => (
          <a
            key={index}
            href={`${BASE_URL}${pdfPath}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-300 shadow-md hover:shadow-lg"
          >
            <svg
              className="w-5 h-5 mr-2"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M7 3a1 1 0 000 2h6a1 1 0 100-2H7zM4 7a1 1 0 011-1h10a1 1 0 110 2H5a1 1 0 01-1-1zM2 11a2 2 0 012-2h12a2 2 0 012 2v4a2 2 0 01-2 2H4a2 2 0 01-2-2v-4z" />
            </svg>
            Datasheet {index + 1}
          </a>
        ))}
      </div>
    );
  };

  if (isLoading)
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );

  if (error)
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-red-500 text-xl">Error: {error}</div>
      </div>
    );

  return (
    <>
      <Navbar />
      <div className="bg-gray-50">
        <nav
          className={`relative flex items-center justify-between px-4 py-2 transition-opacity duration-700 ease-in-out ${
            isVisible ? "opacity-100" : "opacity-0"
          }`}
        >
          <Link to="/Product">
            <button className="absolute left-4 md:left-14 2xl:left-20 hover:opacity-75 transition-all duration-300 hover:scale-105">
              <FaArrowLeftLong className="h-5 w-5 2xl:h-7 2xl:w-7 text-gray-600" />
            </button>
          </Link>
          <div className="flex-1 text-center">
            <div className="flex items-center justify-center text-[14px] 2xl:text-xl text-gray-600">
              <span>Product</span>
              <span className="mx-2">/</span>
              <span className="font-medium text-gray-900">
                {productDetails?.name || "Product Details"}
              </span>
            </div>
          </div>
        </nav>

        <div className="max-w-6xl mx-auto px-4 py-8 2xl:max-w-7xl">
          <div
            className={`flex justify-center flex-col items-center mb-16 md:mb-8 transition-all duration-1000 ease-out transform ${
              isVisible
                ? "translate-y-0 opacity-100"
                : "translate-y-10 opacity-0"
            }`}
          >
            <h1 className="text-3xl md:text-[44px] 2xl:text-6xl font-poppins font-semibold mb-6 text-center">
              {productDetails?.name || "Product"}
              
            </h1>
            <p className="text-base md:text-[18px] 2xl:text-2xl font-poppins leading-tight text-[#17183B] w-full md:w-1/2 text-center px-4">
              {productDetails?.info || "Product info"}
            </p>
          </div>
          
          <div
            className={`h-auto w-full transition-all duration-1000 delay-300 ${
              isVisible ? "opacity-100" : "opacity-0"
            }`}
          >
            <ProductCarousel
              images={productDetails?.images || []}
              baseUrl={BASE_URL}
              productName={productDetails?.name}
            />
          </div>

          <nav
            className={`relative w-full mt-8 overflow-x-auto md:overflow-visible transition-all duration-700 transform ${
              isVisible
                ? "translate-y-0 opacity-100"
                : "translate-y-4 opacity-0"
            }`}
          >
            <div className="max-w-7xl mx-auto px-4">
              <div className="absolute bottom-0 w-full h-px bg-gray-200"></div>
              <div className="flex justify-start md:justify-center space-x-8 md:space-x-28 2xl:space-x-36 min-w-max px-4">
                {["Features", "DataSheet", "Manuals", "Credentials"].map(
                  (tab) => (
                    <div key={tab} className="relative">
                      <button
                        onClick={() => setActiveTab(tab.toLowerCase())}
                        className={`px-3 py-4 text-sm 2xl:text-xl font-medium cursor-pointer transition-all duration-300 hover:text-black ${
                          activeTab === tab.toLowerCase()
                            ? "text-black-600"
                            : "text-gray-700"
                        }`}
                      >
                        {tab}
                      </button>
                      {activeTab === tab.toLowerCase() && (
                        <div className="absolute bottom-0 left-0 w-full h-0.5 bg-black transition-all duration-300"></div>
                      )}
                    </div>
                  )
                )}
              </div>
            </div>
          </nav>

          <div
            className={`w-full flex justify-center mt-10 transition-all duration-500 ${
              isVisible ? "opacity-100" : "opacity-0"
            }`}
          >
            {activeTab === "datasheet" ? (
              renderDatasheetContent()
            ) : (
              <div className="w-full md:w-2/4  lg:w-[80%] px-4">
                {activeTab === "features" && (<div dangerouslySetInnerHTML={{ __html: productDetails?.features }} />)}
                {activeTab === "manuals" && productDetails?.manuals}
                {activeTab === "credentials" && (<div dangerouslySetInnerHTML={{ __html: productDetails?.credentials }} />)}


                

              </div>
            )}
          </div>

          {relatedProducts.length > 0 && (
            <>
              <div className="pt-4">
                <h2 className="text-2xl md:text-[36px] 2xl:text-5xl font-bold mb-2">
                  Related Products
                </h2>
                <p className="text-start w-full md:w-2/3 2xl:text-xl">
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                </p>
              </div>

              <div
                className={`pb-8 relative px-4 md:px-0 mt-16 transition-opacity duration-700 ${
                  isVisible ? "opacity-100" : "opacity-0"
                }`}
              >
                <div
                  className="overflow-x-auto md:overflow-hidden"
                  ref={containerRef}
                >
                  <div
                    className={`flex space-x-4 md:space-x-8 ${
                      isMobile ? "w-max" : ""
                    }`}
                    style={
                      !isMobile
                        ? {
                            transform: `translateX(-${currentPosition}px)`,
                            transition: "transform 500ms ease-in-out",
                          }
                        : {}
                    }
                  >
                    {relatedProducts.map((product) => (
                      <Link
                        to={`/subproduct/${product.id}?type=${product.type
                          .toLowerCase()
                          .replace(" product", "")}`}
                        key={product.id}
                        className={`flex-none transition-all duration-500 hover:scale-105 ${
                          isMobile ? "w-[80vw]" : "w-[288px]"
                        }`}
                      >
                        <div className="bg-gray-200 w-full aspect-square rounded-lg mb-4">
                          <img
                            src={
                              product.images && product.images.length > 0
                                ? `${BASE_URL}${product.images[0]}`
                                : placeholderImage
                            }
                            alt={product.name}
                            className="w-full h-full object-contain rounded-lg"
                          />
                        </div>
                        <h3 className="text-center text-gray-700 text-sm md:text-base font-medium">
                          {product.name}
                        </h3>
                      </Link>
                    ))}
                  </div>
                </div>

                {/* Navigation Arrows (Desktop Only) */}
                {!isMobile && relatedProducts.length > 3 && (
                  <>
                    <button
                      onClick={() => moveSlide(-1)}
                      className="absolute left-[-20px] top-1/2 transform -translate-y-1/2 p-2 bg-white rounded-full shadow-md transition-transform duration-300 hover:scale-110 disabled:opacity-50 disabled:cursor-not-allowed"
                      disabled={currentPosition === 0}
                    >
                      <FaChevronLeft className="w-6 h-6" />
                    </button>
                    <button
                      onClick={() => moveSlide(1)}
                      className="absolute right-[-20px] top-1/2 transform -translate-y-1/2 p-2 bg-white rounded-full shadow-md transition-transform duration-300 hover:scale-110 disabled:opacity-50 disabled:cursor-not-allowed"
                      disabled={
                        currentPosition >=
                        (relatedProducts.length - 3) * slideWidth
                      }
                    >
                      <FaChevronRight className="w-4 h-4 md:w-6 md:h-6 2xl:w-8 2xl:h-8" />
                    </button>
                  </>
                )}
              </div>
            </>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
}


export default Subproduct;
