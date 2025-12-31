import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ArrowLeft, Star, Clock, Plus, MapPin } from 'lucide-react';

const RestaurantDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [restaurant, setRestaurant] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        setLoading(true);
        // This hits the Route B we created in your server.js
        const res = await axios.get(`http://localhost:5000/api/restaurants/${id}`);
        setRestaurant(res.data);
      } catch (err) {
        console.error("Error fetching details", err);
      } finally {
        setLoading(false);
      }
    };
    fetchDetails();
  }, [id]);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-white">
        <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
        <p className="mt-4 text-gray-500 font-bold">Loading Menu...</p>
      </div>
    );
  }

  if (!restaurant) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <p className="text-gray-500 font-bold">Restaurant not found</p>
        <button 
          onClick={() => navigate('/')}
          className="mt-4 text-primary font-bold"
        >
          Go Back Home
        </button>
      </div>
    );
  }

  return (
    <div className="bg-[#FDFDFD] min-h-screen pb-20">
      {/* 1. Hero Image & Back Button */}
      <div className="relative h-72 w-full">
        <img 
          src={restaurant.image} 
          alt={restaurant.name} 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 to-transparent h-1/2"></div>
        
        <button 
          onClick={() => navigate(-1)}
          className="absolute top-12 left-4 bg-white/90 backdrop-blur-md p-3 rounded-2xl shadow-xl active:scale-90 transition-all"
        >
          <ArrowLeft size={20} className="text-gray-900" />
        </button>
      </div>

      {/* 2. Restaurant Info Card */}
      <div className="relative -mt-12 bg-[#FDFDFD] rounded-t-[3rem] px-6 pt-8 shadow-2xl shadow-black/5">
        <div className="flex justify-between items-start mb-2">
          <h1 className="text-3xl font-black text-gray-900 leading-tight">{restaurant.name}</h1>
          <div className="bg-yellow-400 px-3 py-1.5 rounded-xl flex items-center gap-1 shadow-lg shadow-yellow-100">
            <Star size={14} className="text-white fill-white" />
            <span className="font-bold text-white text-sm">{restaurant.rating}</span>
          </div>
        </div>

        <div className="flex items-center gap-2 text-gray-400 text-sm font-medium mb-6">
          <span className="bg-gray-100 px-2 py-0.5 rounded-md text-[10px] uppercase font-bold text-gray-500">
            {restaurant.category}
          </span>
          <span>•</span>
          <div className="flex items-center gap-1">
            <MapPin size={12} />
            <span>{restaurant.distance || '1.2 km'}</span>
          </div>
        </div>

        <div className="flex items-center gap-6 py-4 px-6 bg-white border border-gray-100 rounded-3xl shadow-sm">
          <div className="flex items-center gap-2">
            <Clock size={18} className="text-primary" />
            <span className="text-sm font-black text-gray-700">{restaurant.deliveryTime}</span>
          </div>
          <div className="h-4 w-[1px] bg-gray-200"></div>
          <div className="text-sm font-black text-green-600">FREE DELIVERY</div>
        </div>

        {/* 3. Menu Items Section */}
        <div className="mt-10">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-black text-gray-900">Popular Items</h2>
            <div className="h-1 w-12 bg-primary/20 rounded-full"></div>
          </div>

          <div className="grid grid-cols-1 gap-4">
            {restaurant.menu && restaurant.menu.length > 0 ? (
              restaurant.menu.map((item, index) => (
                <div 
                  key={index} 
                  className="flex gap-4 p-4 bg-white border border-gray-50 rounded-[2rem] items-center shadow-[0_10px_30px_rgba(0,0,0,0.02)] hover:shadow-[0_15px_35px_rgba(0,0,0,0.05)] transition-all duration-300 group"
                >
                  <div className="w-24 h-24 shrink-0 overflow-hidden rounded-2xl shadow-inner">
                    <img 
                      src={item.image} 
                      alt={item.name} 
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" 
                    />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-extrabold text-gray-900 text-base">{item.name}</h4>
                    <p className="text-[11px] text-gray-400 line-clamp-2 mt-1 font-medium leading-relaxed">
                      {item.description}
                    </p>
                    <p className="text-primary font-black mt-2 text-lg">
                      ${item.price.toFixed(2)}
                    </p>
                  </div>
                  <button 
                    onClick={() => alert(`Added ${item.name} to cart!`)}
                    className="bg-primary text-white p-3 rounded-2xl shadow-lg shadow-red-100 active:scale-95 hover:bg-red-600 transition-all"
                  >
                    <Plus size={22} strokeWidth={3} />
                  </button>
                </div>
              ))
            ) : (
              <div className="text-center py-12 bg-gray-50 rounded-[2rem] border border-dashed border-gray-200">
                <p className="text-gray-400 font-bold">No items available in the menu yet.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RestaurantDetails;