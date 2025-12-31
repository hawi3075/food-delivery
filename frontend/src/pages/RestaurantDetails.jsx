import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ArrowLeft, Star, Clock, Plus } from 'lucide-react';

const RestaurantDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [restaurant, setRestaurant] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDetails = async () => {
      try {
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

  if (loading) return <div className="p-10 text-center font-bold">Loading Menu...</div>;
  if (!restaurant) return <div className="p-10 text-center">Restaurant not found</div>;

  return (
    <div className="bg-white min-h-screen">
      {/* Banner Image */}
      <div className="relative h-64">
        <img src={restaurant.image} alt={restaurant.name} className="w-full h-full object-cover" />
        <button 
          onClick={() => navigate(-1)}
          className="absolute top-10 left-4 bg-white p-2 rounded-full shadow-lg"
        >
          <ArrowLeft size={20} />
        </button>
      </div>

      {/* Restaurant Info */}
      <div className="p-6 -mt-10 bg-white rounded-t-[3rem] relative z-10">
        <div className="flex justify-between items-start">
          <h1 className="text-3xl font-black text-gray-900">{restaurant.name}</h1>
          <div className="bg-yellow-50 px-3 py-1 rounded-xl flex items-center gap-1">
            <Star size={14} className="text-yellow-500 fill-yellow-500" />
            <span className="font-bold text-sm">{restaurant.rating}</span>
          </div>
        </div>
        <p className="text-gray-500 mt-2 font-medium">{restaurant.category} • {restaurant.distance}</p>
        
        <div className="flex items-center gap-4 mt-4 text-gray-600 bg-gray-50 p-4 rounded-2xl">
          <div className="flex items-center gap-2">
            <Clock size={16} className="text-primary" />
            <span className="text-sm font-bold">{restaurant.deliveryTime}</span>
          </div>
          <span>|</span>
          <span className="text-sm font-bold text-green-600">Free Delivery</span>
        </div>

        {/* Placeholder Menu Items */}
        <h2 className="text-xl font-black mt-8 mb-4">Popular Items</h2>
        <div className="space-y-4">
          {[1, 2, 3].map((item) => (
            <div key={item} className="flex gap-4 p-4 border border-gray-100 rounded-3xl items-center">
              <div className="w-20 h-20 bg-gray-100 rounded-2xl"></div>
              <div className="flex-1">
                <h4 className="font-bold text-gray-800">Signature Dish {item}</h4>
                <p className="text-xs text-gray-400">Delicious secret ingredients...</p>
                <p className="text-primary font-black mt-1">$12.99</p>
              </div>
              <button className="bg-primary text-white p-2 rounded-xl shadow-lg shadow-red-100">
                <Plus size={20} />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RestaurantDetails;