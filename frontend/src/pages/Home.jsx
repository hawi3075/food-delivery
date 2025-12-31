import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom'; // Added for navigation
import { Search, MapPin, Bell, SlidersHorizontal, Star, Clock } from 'lucide-react';

const Home = () => {
  const [restaurants, setRestaurants] = useState([]);
  const [filteredRestaurants, setFilteredRestaurants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchTerm, setSearchTerm] = useState(''); // Added search state

  useEffect(() => {
    const getRestaurants = async () => {
      try {
        setLoading(true);
        const response = await axios.get('http://localhost:5000/api/restaurants');
        setRestaurants(response.data);
        setFilteredRestaurants(response.data);
      } catch (error) {
        console.error("Error fetching restaurants:", error);
      } finally {
        setLoading(false);
      }
    };
    getRestaurants();
  }, []);

  // Filter & Search Logic combined
  useEffect(() => {
    let result = restaurants;

    // Filter by Category
    if (activeCategory !== 'All') {
      result = result.filter(res => res.category === activeCategory);
    }

    // Filter by Search Term
    if (searchTerm) {
      result = result.filter(res => 
        res.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        res.category.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredRestaurants(result);
  }, [activeCategory, searchTerm, restaurants]);

  return (
    <div className="bg-[#FDFDFD] min-h-screen pb-24">
      {/* Header Section */}
      <div className="bg-white p-4 pt-12 sticky top-0 z-50">
        <div className="flex justify-between items-center mb-6">
          <div>
            <p className="text-primary text-[10px] font-black uppercase tracking-[0.2em]">Delivering To</p>
            <div className="flex items-center gap-1 mt-1">
              <MapPin size={14} className="text-primary" />
              <span className="font-bold text-gray-900 text-sm">123 Main St, New York</span>
            </div>
          </div>
          <div className="bg-gray-50 p-2.5 rounded-2xl relative border border-gray-100 shadow-sm active:scale-90 transition-all cursor-pointer">
            <Bell size={20} className="text-gray-700" />
            <span className="absolute top-2 right-2.5 w-2.5 h-2.5 bg-primary rounded-full border-2 border-white"></span>
          </div>
        </div>

        {/* Search Bar */}
        <div className="flex gap-3">
          <div className="flex-1 bg-gray-50 flex items-center px-4 py-3.5 rounded-2xl border border-gray-100 focus-within:border-primary/20 focus-within:bg-white focus-within:shadow-xl focus-within:shadow-red-500/5 transition-all duration-500">
            <Search size={18} className="text-gray-400 mr-3" />
            <input 
              type="text" 
              placeholder="Search for restaurants, food..." 
              className="bg-transparent outline-none w-full text-sm font-semibold placeholder:text-gray-400"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)} // Update search term
            />
          </div>
          <button className="bg-gray-50 p-3.5 rounded-2xl border border-gray-100 hover:bg-white hover:shadow-lg transition-all active:scale-95">
            <SlidersHorizontal size={20} className="text-gray-700" />
          </button>
        </div>
      </div>

      {/* Improved Category List */}
      <div className="flex gap-3 overflow-x-auto px-4 py-2 no-scrollbar">
        {['All', 'Fast Food', 'Healthy', 'Pizza', 'Asian'].map((cat) => (
          <button 
            key={cat} 
            onClick={() => setActiveCategory(cat)}
            className={`px-6 py-3 rounded-2xl whitespace-nowrap font-bold text-xs transition-all duration-300 ${
              activeCategory === cat 
              ? 'bg-primary text-white shadow-xl shadow-red-200 -translate-y-1' 
              : 'bg-white text-gray-500 border border-gray-100 hover:border-primary/30'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Restaurants List */}
      <div className="px-4 mt-6">
        <div className="flex justify-between items-end mb-6">
          <h2 className="text-2xl font-black text-gray-900">Popular Near You</h2>
          <button className="text-primary text-[11px] font-bold uppercase tracking-widest hover:underline decoration-2 underline-offset-4">See All</button>
        </div>

        <div className="grid grid-cols-1 gap-6">
          {loading ? (
            /* Enhanced Loading Skeleton */
            [1, 2, 3].map((n) => (
              <div key={n} className="bg-white p-4 rounded-[2rem] border border-gray-50 flex gap-5 animate-pulse">
                <div className="w-28 h-28 bg-gray-100 rounded-[1.5rem]"></div>
                <div className="flex-1 py-1">
                  <div className="h-5 bg-gray-100 rounded-full w-3/4 mb-4"></div>
                  <div className="h-3 bg-gray-100 rounded-full w-1/2 mb-6"></div>
                  <div className="h-4 bg-gray-100 rounded-full w-1/3"></div>
                </div>
              </div>
            ))
          ) : filteredRestaurants.length > 0 ? (
            filteredRestaurants.map((res) => (
              /* Wrap card in Link to enable navigation */
              <Link 
                to={`/restaurant/${res._id}`} 
                key={res._id}
                className="block"
              >
                <div className="bg-white p-4 rounded-[2rem] flex gap-5 shadow-[0_20px_50px_rgba(0,0,0,0.02)] border border-gray-50 hover:shadow-[0_30px_60px_rgba(0,0,0,0.06)] hover:-translate-y-1 transition-all duration-500 cursor-pointer active:scale-95 group">
                  <div className="relative shrink-0 overflow-hidden rounded-[1.5rem] w-28 h-28 shadow-inner">
                    <img 
                      src={res.image} 
                      alt={res.name} 
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute top-2 left-2 bg-white/90 backdrop-blur-md px-2 py-1 rounded-lg flex items-center gap-1 shadow-sm">
                      <Star size={10} className="text-yellow-500 fill-yellow-500" />
                      <span className="text-[10px] font-black text-gray-900">{res.rating}</span>
                    </div>
                  </div>

                  <div className="flex-1 flex flex-col justify-center py-1">
                    <h3 className="font-extrabold text-lg text-gray-900 mb-1 group-hover:text-primary transition-colors">{res.name}</h3>
                    <p className="text-gray-400 text-xs font-medium mb-3">{res.category} • {res.distance || '1.2km'}</p>
                    
                    <div className="flex items-center justify-between mt-auto">
                      <div className="flex items-center gap-2 bg-gray-50 px-3 py-1.5 rounded-xl">
                        <Clock size={12} className="text-primary" />
                        <span className="text-[11px] font-bold text-gray-700">{res.deliveryTime}</span>
                      </div>
                      <div className="h-8 w-8 bg-primary rounded-xl flex items-center justify-center text-white shadow-lg shadow-red-100 group-hover:rotate-12 transition-transform">
                        <span className="text-lg font-bold">+</span>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            ))
          ) : (
            <div className="text-center py-10">
              <p className="text-gray-500 font-bold">No restaurants found matching your search.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;