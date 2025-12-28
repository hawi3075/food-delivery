import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Search, MapPin, Bell, SlidersHorizontal } from 'lucide-react';

const Home = () => {
  const [restaurants, setRestaurants] = useState([]);
  const [loading, setLoading] = useState(true);

  // 1. Fetch data from your Node.js backend
  useEffect(() => {
    const getRestaurants = async () => {
      try {
        setLoading(true);
        // Ensure your backend is running on port 5000
        const response = await axios.get('http://localhost:5000/api/restaurants');
        setRestaurants(response.data);
      } catch (error) {
        console.error("Error fetching restaurants:", error);
      } finally {
        setLoading(false);
      }
    };
    getRestaurants();
  }, []);

  return (
    <div className="bg-gray-50 min-h-screen pb-20">
      {/* Header Section */}
      <div className="bg-white p-4 pt-12 shadow-sm sticky top-0 z-50">
        <div className="flex justify-between items-center mb-4">
          <div>
            <p className="text-primary text-[10px] font-bold uppercase tracking-widest opacity-70">Delivering To</p>
            <div className="flex items-center gap-1 cursor-pointer">
              <MapPin size={16} className="text-primary" />
              <span className="font-bold text-gray-800 text-sm">123 Main St, New York</span>
            </div>
          </div>
          <div className="bg-gray-100 p-2 rounded-full relative active:scale-95 transition-transform">
            <Bell size={20} />
            <span className="absolute top-2 right-2.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
          </div>
        </div>

        {/* Search Bar */}
        <div className="flex gap-2">
          <div className="flex-1 bg-gray-100 flex items-center px-4 py-3 rounded-2xl border border-transparent focus-within:border-primary/30 focus-within:bg-white transition-all duration-300">
            <Search size={18} className="text-gray-400 mr-2" />
            <input 
              type="text" 
              placeholder="Search for restaurants, food..." 
              className="bg-transparent outline-none w-full text-sm font-medium"
            />
          </div>
          <button className="bg-gray-100 p-3 rounded-2xl hover:bg-gray-200 transition-colors">
            <SlidersHorizontal size={20} />
          </button>
        </div>
      </div>

      {/* Category List */}
      <div className="flex gap-3 overflow-x-auto p-4 no-scrollbar">
        {['All', 'Fast Food', 'Healthy', 'Pizza', 'Asian'].map((cat, i) => (
          <button 
            key={cat} 
            className={`px-6 py-2.5 rounded-full whitespace-nowrap font-bold text-xs transition-all duration-300 ${
              i === 0 
              ? 'bg-primary text-white shadow-lg shadow-red-200 scale-105' 
              : 'bg-white text-gray-500 border border-gray-100 hover:border-primary/20'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Restaurants List */}
      <div className="px-4 mt-2">
        <div className="flex justify-between items-center mb-5">
          <h2 className="text-lg font-black text-gray-800 tracking-tight">All Restaurants</h2>
          <button className="text-primary text-xs font-bold bg-red-50 px-3 py-1 rounded-full">Sort by</button>
        </div>

        <div className="space-y-4">
          {loading ? (
            // 2. Loading Skeleton State
            [1, 2, 3].map((n) => (
              <div key={n} className="bg-white p-3 rounded-3xl flex gap-4 animate-pulse">
                <div className="w-24 h-24 bg-gray-200 rounded-2xl"></div>
                <div className="flex-1 py-2">
                  <div className="h-4 bg-gray-200 rounded w-3/4 mb-3"></div>
                  <div className="h-3 bg-gray-200 rounded w-1/2 mb-4"></div>
                  <div className="h-4 bg-gray-200 rounded w-1/4"></div>
                </div>
              </div>
            ))
          ) : (
            // 3. Actual Data State
            restaurants.map((res) => (
              <div 
                key={res._id} 
                className="bg-white p-3 rounded-3xl flex gap-4 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] transition-all duration-300 cursor-pointer group active:scale-[0.98]"
              >
                <div className="overflow-hidden rounded-2xl w-24 h-24">
                  <img 
                    src={res.image} 
                    alt={res.name} 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                </div>
                <div className="flex-1 flex flex-col justify-center">
                  <div className="flex justify-between items-start">
                    <h3 className="font-bold text-base text-gray-800">{res.name}</h3>
                    <span className="text-gray-400 text-[10px] font-bold">{res.distance || '1.2km'}</span>
                  </div>
                  <p className="text-gray-400 text-[11px] font-medium mb-2">{res.category}</p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1.5">
                      <div className="flex items-center gap-0.5 bg-yellow-50 px-1.5 py-0.5 rounded-md">
                        <span className="text-yellow-500 text-[10px]">★</span>
                        <span className="text-[11px] font-bold text-yellow-700">{res.rating}</span>
                      </div>
                      <span className="text-gray-300 text-[10px]">•</span>
                      <span className="text-gray-400 text-[11px] font-semibold">{res.deliveryTime}</span>
                    </div>
                    <button className="text-primary text-[11px] font-black uppercase tracking-tighter hover:underline">
                      View Menu
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;