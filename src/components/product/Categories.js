import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const CategoryItem = ({ 
  category, 
  level = 0, 
  isMobileView, 
  onSelect, 
  openCategory, 
  setOpenCategory, 
  parentCategory = null
}) => {
  const isOpen = openCategory[level] === category.main_category_id;
  const paddingLeft = isMobileView ? "1rem" : `${level * 1.5}rem`;
  
  const handleClick = () => {
    // Prepare category data
    const categoryData = {
      main_category_id: parentCategory?.main_category_id || category.main_category_id,
      child_category_id: parentCategory?.child_category_id || category.child_category_id,
      sub_child_category_id: category.sub_child_category_id
    };
   
    // Determine category level 
    let levelType = 'main';
    if (parentCategory?.main_category_id && category.child_category_id) {
      levelType = 'child';
    }
    if (parentCategory?.child_category_id && category.sub_child_category_id) {
      levelType = 'subchild';
    }

    // Call onSelect with category data and level
    onSelect(categoryData, levelType);

    // Close previous category at the same level and open new one
    setOpenCategory((prev) => ({
      ...prev,
      [level]: isOpen ? null : category.main_category_id || category.child_category_id || category.sub_child_category_id
    }));
  };

  return (
    <div className="border-gray-200 p-1">
      <button
        onClick={handleClick}
        className="w-full flex items-center p-1 2xl:p-6 
                hover:bg-gray-50 transition-all duration-300 hover:text-[#099CD6] 
                text-left justify-start"
        style={{ paddingLeft }}
      >
        <span className="transition-colors duration-300 xsm:text-[14px]">
          {category.main_category_name || category.child_category_name || category.sub_child_category_name}
        </span>
        
        {((category.children?.length > 0) || (category.subchildren?.length > 0)) && (
          <svg
            className={`w-[18.67px] h-[18.83px] 2xl:w-8 2xl:h-8 text-gray-400 
                        transform transition-transform duration-300 ml-auto ${
                          isOpen ? "rotate-90" : "rotate-0"
                        }`}
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            viewBox="0 0 24 24"
            stroke="currentColor"
            aria-hidden="true"
          >
            <path d="M19 9l-7 7-7-7" />
          </svg>
        )}
      </button>

      {isOpen && (
        <div className="transform origin-top transition-all duration-300 xsm:text-[11px]">
          {category.children?.map((child, index) => (
            <CategoryItem
              key={index}
              category={child}
              level={level + 1}
              isMobileView={isMobileView}
              onSelect={onSelect}
              openCategory={openCategory}
              setOpenCategory={setOpenCategory}
              parentCategory={{
                main_category_id: category.main_category_id,
                main_category_name: category.main_category_name
              }}
            />
          ))}

          {category.subchildren?.map((subchild, index) => (
            <CategoryItem
              key={index}
              category={subchild}
              level={level + 2}
              isMobileView={isMobileView}
              onSelect={onSelect}
              openCategory={openCategory}
              setOpenCategory={setOpenCategory}
              parentCategory={{
                main_category_id: category.main_category_id,
                child_category_id: category.child_category_id,
                child_category_name: category.child_category_name
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
};

const Categories = ({ onCategorySelect }) => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [isMobileView, setIsMobileView] = useState(false);
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [openCategory, setOpenCategory] = useState({}); // Track open categories
  
  // Fetch categories from API
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch('https://midknighttestdomain.site/api/v1/getCategories');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setCategories(data);
        setIsLoading(false);
      } catch (error) {
        setError(error.message);
        setIsLoading(false);
      }
    };

    fetchCategories();
  }, []);

  // Handle window resize and set initial mobile view state
  useEffect(() => {
    const handleResize = () => {
      setIsMobileView(window.innerWidth < 768);
    };
    
    // Set initial state
    handleResize();
    
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  if (isLoading) return (
    <div className="text-center p-4 text-gray-500">
      Loading categories...
    </div>
  );

  if (error) return (
    <div className="text-center p-4 text-red-500">
      Error loading categories: {error}
    </div>
  );

  const handleClick2 = () => {
    window.location.reload();
  };

  return (
    <>
      <button
        className="md:hidden w-full mb-4 p-3 bg-gray-50 rounded-lg flex items-center justify-between transform transition-all duration-300 hover:shadow-md"
        onClick={() => setSidebarOpen(!isSidebarOpen)}
      >
        <span className="text-[#099CD6] font-Poppins 2xl:text-2xl">
          Categories
        </span>
        <svg
          className={`w-6 h-6 transform transition-transform duration-300 ${
            isSidebarOpen ? "rotate-180" : ""
          }`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>
     
      <div
        className={`w-full  md:w-64 2xl:w-96  flex-shrink-0 transition-all duration-300 ease-in-out
           ${isMobileView && !isSidebarOpen ? "hidden" : "block"}`}    
      >
        <div className="border sticky top-5 bottom-0 z-20 h-max rounded-lg shadow-lg transition-shadow hover:shadow-xl bg-white w-full md:max-w-[300px] ">
          <div className="bg-gray-50 p-4 2xl:p-6 border-b">
            <Link to="/product">
              <h2 className="text-22px font-Poppins font-normal text-[#099CD6] 2xl:text-4xl"> 
              Categories
                <button onClick={handleClick2}className={`px-4 ml-4 py-2 text-white font-semibold rounded-lg transition"`}
                style={{background: "radial-gradient(circle, rgba(11,47,231,0.9052871148459384) 0%, rgba(70,141,252,1) 100%)"}}
                >
                  All items
                </button>
              </h2>
            </Link>
          </div>
          <div className="divide-y ps-3 text-[16px] 2xl:text-2xl text-left font-normal font-Poppins text-[#414141] max-h-[calc(100vh-150px)] overflow-y-auto">
            {categories.map((category, index) => (
              <CategoryItem
                key={index}
                category={category}
                isMobileView={isMobileView}
                onSelect={onCategorySelect}
                openCategory={openCategory}
                setOpenCategory={setOpenCategory}
              />
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Categories;