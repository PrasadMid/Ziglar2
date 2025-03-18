import React, { useState, useEffect } from 'react';
import { Search } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';

const SearchSuggestions = ({ suggestions, onSelect }) => (
  <div className="absolute top-full left-0 right-0 bg-white shadow-lg border border-t-0 border-gray-200 rounded-b-lg mt-0 z-50 max-h-96 overflow-y-auto">
    {suggestions.map((suggestion, index) => (
      <div
        key={index}
        className="flex items-center px-4 py-3 hover:bg-gray-50 cursor-pointer border-b border-gray-100 last:border-none"
        onClick={() => onSelect(suggestion)}
      >
        <Search className="w-4 h-4 text-gray-400 mr-3" />
        <span className="text-sm text-gray-700">{suggestion.product_name}</span>
      </div>
    ))}
  </div>
);

const SearchBar = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [suggestions, setSuggestions] = useState([]);
  const navigate = useNavigate();
  const location = useLocation();

  const fetchSuggestions = async (query) => {
    if (!query) {
      setSuggestions([]);
      return;
    }
    try {
      const response = await fetch(
        `https://midknighttestdomain.site/api/v1/search/${encodeURIComponent(query)}`
      );
      const result = await response.json();
      if (result.data) {
        setSuggestions(result.data);
      } else {
        setSuggestions([]);
      }
    } catch (error) {
      console.error("Error fetching suggestions:", error);
      setSuggestions([]);
    }
  };

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      fetchSuggestions(searchQuery);
    }, 300);
    return () => clearTimeout(delayDebounceFn);
  }, [searchQuery]);

  const handleSearchSelect = (selectedSuggestion) => {
    setSearchQuery(selectedSuggestion.product_name);
    setShowSuggestions(false);
    
    // If on product page, update the search state
    if (location.pathname === '/product') {
      window.dispatchEvent(new CustomEvent('updateProductSearch', {
        detail: selectedSuggestion.product_name
      }));
    } else {
      // Navigate to product page with search query
      navigate('/product', { 
        state: { searchQuery: selectedSuggestion.product_name }
      });
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      if (location.pathname === '/product') {
        window.dispatchEvent(new CustomEvent('updateProductSearch', {
          detail: searchQuery
        }));
      } else {
        navigate('/product', { 
          state: { searchQuery: searchQuery }
        });
      }
      setShowSuggestions(false);
    }
  };

  return (
    <div className="relative w-full">
      <div className="flex items-center border border-gray-300 rounded-md bg-white">
        <Search className="w-5 h-5 text-gray-400 ml-3" />
        <input
          type="search"
          placeholder="Search products..."
          className="w-full px-3 py-2 text-sm focus:outline-none rounded-md"
          value={searchQuery}
          onChange={(e) => {
            setSearchQuery(e.target.value);
            setShowSuggestions(true);
          }}
          onKeyPress={handleKeyPress}
          onFocus={() => setShowSuggestions(true)}
          onBlur={() => {
            setTimeout(() => setShowSuggestions(false), 200);
          }}
        />
      </div>
      {showSuggestions && suggestions.length > 0 && (
        <SearchSuggestions
          suggestions={suggestions}
          onSelect={handleSearchSelect}
        />
      )}
    </div>
  );
};

export default SearchBar;