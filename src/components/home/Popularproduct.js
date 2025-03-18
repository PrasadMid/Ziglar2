import React, { useState, useEffect } from 'react';
import { Star } from 'lucide-react';
import Constant from '../../utils/Constant';
import { Link } from 'react-router-dom';

const PopularProduct = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [catalogLoading, setCatalogLoading] = useState(false);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await fetch(`${Constant.BASE_URL}/popular_products`);
      const data = await response.json();
      setProducts(data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching products:', error);
      setLoading(false);
    }
  };

  const handleCatalogDownload = async () => {
    try {
      setCatalogLoading(true);
      const response = await fetch(`${Constant.BASE_URL}/get-catalog`);
      const data = await response.json();
      
      if (data.status && data.data[0]?.catalog_pdf) {
        const pdfUrl = `https://midknighttestdomain.site${data.data[0].catalog_pdf}`;
        window.open(pdfUrl, '_blank');
      }
    } catch (error) {
      console.error('Error downloading catalog:', error);
    } finally {
      setCatalogLoading(false);
    }
  };

  const getImageUrl = (product) => {
    try {
      const images = JSON.parse(product.product_images);
      if (images && images.length > 0) {
        const imagePath = images[0];
        return `https://midknighttestdomain.site${imagePath}`;
      }
    } catch (error) {
      console.error('Error parsing product images:', error);
    }
    return '/api/placeholder/315/261';
  };

  const renderRatingStars = (rating) => {
    return [...Array(5)].map((_, index) => (
      <Star
        key={index}
        className={`w-4 h-4 ${
          index < Math.floor(rating) ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'
        }`}
      />
    ));
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div>
      <section className="xl:py-16 xsm:py-8 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="xl:text-5xl xsm:text-3xl font-bold bg-gradient-to-r from-teal-400 to-blue-500 bg-clip-text text-transparent animate-gradient-text">
              Our Most Popular Products
            </h2>
            <p className="text-gray-600 xl:text-xl xsm:text-base mt-2 animate-fade-in">
              Premium Industrial Solutions for Panel Building & Maintenance
            </p>
            <Link to="/product">
              <div className="flex justify-end">
                <button className="mt-6 bg-blue-500 text-white px-6 py-2 rounded-full hover:bg-blue-600 animate-bounce-button group">
                  Explore More
                  <span className="ml-2 group-hover:translate-x-1 inline-block transition-transform duration-200">
                    →
                  </span>
                </button>
              </div>
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.map((product, index) => (
              <div
                key={product.id}
                className="bg-white p-6 rounded-lg shadow-md flex flex-col items-center animate-card-pop-up hover:shadow-xl transition-shadow duration-300"
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                <div className="overflow-hidden rounded-lg mb-4">
                  <img
                    src={getImageUrl(product)}
                    alt={product.product_name}
                    className="w-full h-64 object-cover animate-image-hover hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="w-full">
                  <div className="bg-gradient-to-r from-teal-400 to-blue-500 text-white lg:text-lg xsm:text-sm font-medium text-center py-2 px-4 rounded-full animate-gradient-shine">
                    {product.product_name}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <button 
              className={`bg-blue-100 text-blue-600 px-8 py-3 rounded-full shadow hover:bg-blue-200 animate-pulse-soft group ${
                catalogLoading ? 'opacity-75 cursor-not-allowed' : ''
              }`}
              onClick={handleCatalogDownload}
              disabled={catalogLoading}
            >
              {catalogLoading ? 'Loading...' : 'Download Catalog'}
              <svg
                className={`w-5 h-5 ml-2 inline-block transition-transform duration-300 ${
                  catalogLoading ? '' : 'group-hover:-translate-y-1'
                }`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                />
              </svg>
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default PopularProduct;