import React, { useState, useEffect } from "react";
import Navbar from "../Navbar";
import Footer from "../Footer";
import Categories from "./Categories";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";


const Product = () => {
  const location = useLocation();
  const [searchQuery, setSearchQuery] = useState(
    location.state?.searchQuery || ""
  );
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedChildCategory, setSelectedChildCategory] = useState(null);
  const [selectedSubChildCategory, setSelectedSubChildCategory] = useState(null);
  const [categories, setCategories] = useState(null);
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  // Listen for search updates from navbar
  useEffect(() => {
    const handleSearchUpdate = (event) => {
      setSearchQuery(event.detail);
    };
    window.addEventListener("updateProductSearch", handleSearchUpdate);
    return () => {
      window.removeEventListener("updateProductSearch", handleSearchUpdate);
    };
  }, []);


  useEffect(() => {
    const fetchProducts = async () => {
      setIsLoading(true);
      setError(null);
  
      try {
        let combinedData = [];
        let url;
  
        // ✅ Case 1: No filters → Fetch all three APIs sequentially
        if (!searchQuery && !selectedCategory && !selectedChildCategory && !selectedSubChildCategory) {
          console.log("Fetching all products from multiple APIs...");
  
      

  
          const response1 = await fetch(`https://midknighttestdomain.site/api/v1/get-total-products?page=${currentPage}`);
          if (!response1.ok) throw new Error(`API 1 failed: ${response1.status}`);
          const data1 = await response1.json();
          combinedData = [...data1.data];
        
          setProducts(combinedData)
          
  
        } else if (searchQuery) {
         
          url = `https://midknighttestdomain.site/api/v1/search?query=${searchQuery}`;
        } else if (selectedSubChildCategory) {
        
          url = `https://midknighttestdomain.site/api/v1/get-sub-child-products-child?main_category_id=${selectedCategory}&child_category_id=${selectedChildCategory}&sub_child_category_id=${selectedSubChildCategory}&page=${currentPage}`;
        } else if (selectedChildCategory) {
          
          url = `https://midknighttestdomain.site/api/v1/get-child-products-main?main_category_id=${selectedCategory}&child_category_id=${selectedChildCategory}&page=${currentPage}`;
        } else {
      
          url = `https://midknighttestdomain.site/api/v1/get-main-products-Id?main_category_id=${selectedCategory}&page=${currentPage}`;
        }
  
        if (url) {
          const response = await fetch(url);
          if (!response.ok) throw new Error(`Network response was not ok (Status: ${response.status})`);
          const data = await response.json();
          combinedData = data.data;
        }
  
        console.log("Final Merged Data:", combinedData);
  
        
        const mappedProducts = combinedData.map((product) => {
          let imagePath = "";
  
          // Helper function to extract image path
          const parseImages = (imgData) => {
            if (typeof imgData === "string") {
              try {
                const images = JSON.parse(imgData);
                return Array.isArray(images) ? images[0] : "";
              } catch {
                return imgData;
              }
            }
            return Array.isArray(imgData) ? imgData[0] : "";
          };
  
          imagePath = parseImages(product.product_images) || 
                      parseImages(product.child_product_images) || 
                      parseImages(product.sub_child_product_images) || "";
  
          imagePath = imagePath?.replace(/[\[\]\"]/g, ""); // Remove unwanted characters
  
          return {
            id: product.product_sequence_id || product.child_product_sequence_id || product.sub_child_product_sequence_id,
            name: product.product_name || product.child_product_name || product.sub_child_product_name || "Unnamed Product",
            image: imagePath,
            type: product.type,
          };
        });
  
        setProducts(mappedProducts);
        setTotalPages(1); // Assuming pagination is handled by first API
      } catch (error) {
        console.error("Fetch error:", error);
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };
  
    fetchProducts();
    
  }, [selectedCategory, selectedChildCategory, selectedSubChildCategory, currentPage, searchQuery]);
  

  const handleCategorySelect = (category, level) => {
    setSearchQuery(""); // Clear search when selecting category
    switch (level) {
      case "main":
        setSelectedCategory(category.main_category_id);
        setSelectedChildCategory(null);
        setSelectedSubChildCategory(null);
        break;
      case "child":
        setSelectedChildCategory(category.child_category_id);
        setSelectedSubChildCategory(null);
        break;
      case "subchild":
        setSelectedSubChildCategory(category.sub_child_category_id);
        break;
      default:
        break;
    }
    
    setCurrentPage(1);
  };

  // Filtered products based on search query
  const filteredProducts = products.filter(
    (product) =>
      product &&
      product.name &&
      product.name.toLowerCase().includes((searchQuery || "").toLowerCase())
      
  );
  console.log('here',filteredProducts)
  console.log("filtered" , filteredProducts)
  const itemsPerPage = 12; // Adjust based on your API response
  const totalItems = filteredProducts.length; // Total products
  const startIndex = (currentPage - 1) * itemsPerPage + 1;
  const endIndex = Math.min(startIndex + itemsPerPage - 1, totalItems);
     
  return (
    <>
      <Navbar />
      <div className="max-w-7xl mx-auto justify-items-normal px-4 py-8 2xl:max-w-[2000px] h-[100%] items-start overflow-auto ">
        <div className="  flex flex-col md:flex-row gap-8 2xl:gap-12   ">
          
          <Categories onCategorySelect={handleCategorySelect}  />
         
       
      
          {/* Main Content */}
          <div className="flex-1">
            <h1 className="text-2xl md:text-3xl 2xl:text-6xl font-bold font-Poppins mb-6 2xl:mb-10 animate-fade-in">
              Our Variety of Products
            </h1>

            {/* Search Bar */}
            <div className="relative mb-6 2xl:mb-10 transform transition-all duration-300 hover:scale-101">
              <input
                type="text"
                placeholder="Search a Product"
                className="w-full text-[16px] 2xl:text-2xl font-normal text-[#5F5F5F] p-3 2xl:p-6 border rounded-lg pr-12 2xl:pr-16 transition-all duration-300 focus:ring-2 focus:ring-[#099CD6] focus:border-transparent"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <button className="absolute right-3 2xl:right-5 top-1/2 -translate-y-1/2">
                <div className="p-1 2xl:p-3 bg-[#666666] rounded-full hover:bg-[#099CD6] transition-colors duration-300">
                  <svg
                    className="w-5 h-5 2xl:w-8 2xl:h-8 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="3"
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                  </svg>
                </div>
              </button>
            </div>
            <div className="mb-6 2xl:mb-10">
              <p className="text-[#414141] text-[16px] 2xl:text-2xl font-bold font-Poppins">
                {/* Showing 1-12 of 24 item(s) */}
                Showing {totalItems > 0 ? startIndex : 0}-{totalItems > 0 ? endIndex : 0} of {totalItems} item(s)
              </p>
              <p className="text-[#949494] text-[16px] 2xl:text-2xl font-normal mt-2 2xl:mt-4">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua
              </p>
            </div>
            {/* Loading and Error States */}
            {isLoading && (
              <div className="text-center">Loading products...</div>
            )}
            {error && (
              <div className="text-center text-red-500">Error: {error}</div>
            )}

            {/* Product Grid */}
            {!isLoading && !error && (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8 2xl:gap-16">
                {filteredProducts.map((product, index) => (
                  <Link
                    to={`/subproduct/${product.id}/${product.type}`}
                    key={product.id}
                  >
                    <div
                      className={`product-card bg-[#A6A6A6] rounded-lg p-4 2xl:p-8 
                        transform transition-all duration-500 hover:scale-105 hover:shadow-xl
                        cursor-pointer opacity-0
                        flex justify-center items-center flex-col`}
                      style={{ animationDelay: `${index * 100}ms` }}
                    >
                      <img
                        src={`https://midknighttestdomain.site${product.image}`}
                        alt={product.name}
                        className="h-[200px] md:h-[316px] 2xl:h-[600px] object-contain mb-4 2xl:mb-6 transition-transform duration-300 transform hover:scale-110"
                      />
                      <h3 className="text-center font-medium text-sm md:text-base 2xl:text-2xl transition-colors duration-300 hover:text-white">
                        {product.name}
                      </h3>
                    </div>
                  </Link>
                ))}
              </div>
            )}

         
            {totalPages > 0 && (
            <div className="flex justify-center mt-8">
              <button
                onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
                disabled={currentPage===1}
                
                className="mx-2 px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
              >
                Previous
              </button>
              
              <span className="mx-4">
              <progress 
                    value={currentPage} 
                    max={totalPages} 
                    className="w-full h-1 rounded-full overflow-hidden 
                   [&::-webkit-progress-bar]:bg-white 
                  [&::-webkit-progress-value]:bg-gray-500"
              >
                Hello
              </progress>
              Showing {totalItems > 0 ? startIndex : 0}-{totalItems > 0 ? endIndex : 0} of {totalItems} item(s)
              </span>
              <button
                onClick={() => setCurrentPage((prev) => Math.min(totalPages, prev + 1))}
                disabled={currentPage === totalPages}
                className="mx-2 px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
              >
                Next
              </button>
              </div>
          )}

          </div>
        </div>
      </div>

      {/* Global Styles for Animations */}
      <style jsx global>{`
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
        .animate-fade-in {
          animation: fadeIn 0.6s ease-out forwards;
        }
        .product-card {
          animation: fadeIn 0.6s ease-out forwards;
        }
      `}</style>

      <Footer />
    </>
  );
};

export default Product;
