import React from 'react';
import { Search, MapPin, Bell, SlidersHorizontal } from 'lucide-react';
import { restaurants } from '../data/restaurants';

const Home = () => {
  return (
    <div className="bg-gray-50 min-h-screen pb-20">
      {/* Header Section */}
      <div className="bg-white p-4 pt-12 shadow-sm">
        <div className="flex justify-between items-center mb-4">
          <div>
            <p className="text-primary text-xs font-bold uppercase tracking-wider">Delivering To</p>
            <div className="flex items-center gap-1 cursor-pointer">
              <MapPin size={18} className="text-primary" />
              <span className="font-bold text-gray-800">123 Main St, New York</span>
            </div>
          </div>
          <div className="bg-gray-100 p-2 rounded-full relative">
            <Bell size={20} />
            <span className="absolute top-1 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
          </div>
        </div>

        {/* Search Bar */}
        <div className="flex gap-2">
          <div className="flex-1 bg-gray-100 flex items-center px-4 py-3 rounded-xl border border-transparent focus-within:border-primary transition-all">
            <Search size={20} className="text-gray-400 mr-2" />
            <input 
              type="text" 
              placeholder="Search for restaurants, food..." 
              className="bg-transparent outline-none w-full text-sm"
            />
          </div>
          <button className="bg-gray-100 p-3 rounded-xl">
            <SlidersHorizontal size={20} />
          </button>
        </div>
      </div>

      {/* Category List */}
      <div className="flex gap-3 overflow-x-auto p-4 no-scrollbar">
        {['All', 'Fast Food', 'Healthy', 'Pizza', 'Asian'].map((cat, i) => (
          <button 
            key={cat} 
            className={`px-6 py-2 rounded-full whitespace-nowrap font-medium text-sm transition-all ${
              i === 0 ? 'bg-primary text-white shadow-lg shadow-red-200' : 'bg-white text-gray-500 border border-gray-200'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Restaurants List */}
      <div className="px-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-gray-800">All Restaurants</h2>
          <button className="text-primary text-sm font-semibold">Sort by</button>
        </div>

        <div className="space-y-4">
          {restaurants.map((res) => (
            <div key={res.id} className="bg-white p-3 rounded-2xl flex gap-4 shadow-sm hover:shadow-md transition-shadow cursor-pointer">
              <img 
                src={res.image} 
                alt={res.name} 
                className="w-24 h-24 rounded-xl object-cover"
              />
              <div className="flex-1">
                <div className="flex justify-between">
                  <h3 className="font-bold text-lg">{res.name}</h3>
                  <span className="text-gray-400 text-xs">{res.distance}</span>
                </div>
                <p className="text-gray-500 text-xs mb-2">{res.category}</p>
                <div className="flex items-center justify-between mt-1">
                  <div className="flex items-center gap-1">
                    <span className="text-yellow-500 text-sm">★</span>
                    <span className="text-sm font-bold">{res.rating}</span>
                    <span className="text-gray-300 mx-1">•</span>
                    <span className="text-gray-500 text-xs">{res.time}</span>
                  </div>
                  <button className="bg-red-50 text-primary px-3 py-1 rounded-lg text-xs font-bold">
                    View Menu
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;