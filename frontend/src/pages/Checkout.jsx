import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { ArrowLeft, Trash2, Plus, Minus, CreditCard, MapPin } from 'lucide-react';

const Checkout = () => {
  const { cartItems, addToCart, removeFromCart, cartTotal, clearCart } = useCart();
  const navigate = useNavigate();

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-white text-center">
        <div className="w-24 h-24 bg-gray-50 rounded-full flex items-center justify-center mb-6">
          <Trash2 size={40} className="text-gray-300" />
        </div>
        <h2 className="text-2xl font-black text-gray-900">Your cart is empty</h2>
        <p className="text-gray-500 mt-2 mb-8">Looks like you haven't added <br/> anything to your cart yet.</p>
        <button 
          onClick={() => navigate('/')}
          className="bg-primary text-white px-10 py-4 rounded-[2rem] font-black shadow-lg shadow-red-100"
        >
          Go Order Something
        </button>
      </div>
    );
  }

  return (
    <div className="bg-[#FDFDFD] min-h-screen pb-40">
      {/* Header */}
      <div className="p-6 pt-12 flex items-center gap-4 sticky top-0 bg-[#FDFDFD]/80 backdrop-blur-md z-50">
        <button onClick={() => navigate(-1)} className="p-3 bg-white rounded-2xl shadow-sm border border-gray-100">
          <ArrowLeft size={20} />
        </button>
        <h1 className="text-2xl font-black text-gray-900">My Orders</h1>
      </div>

      <div className="px-6 space-y-4">
        {/* Delivery Address Card */}
        <div className="bg-white p-5 rounded-[2rem] border border-gray-100 flex items-center gap-4">
          <div className="bg-red-50 p-3 rounded-2xl">
            <MapPin size={20} className="text-primary" />
          </div>
          <div className="flex-1">
            <p className="text-[10px] font-bold text-gray-400 uppercase">Deliver to</p>
            <p className="text-sm font-bold text-gray-900">123 Main St, New York City</p>
          </div>
          <button className="text-primary font-bold text-xs">Edit</button>
        </div>

        {/* Cart Items List */}
        <div className="space-y-4 mt-8">
          <p className="text-sm font-black text-gray-900 ml-2">Order Summary</p>
          {cartItems.map((item) => (
            <div key={item.name} className="bg-white p-4 rounded-[2rem] border border-gray-50 flex items-center gap-4 shadow-sm">
              <img src={item.image} className="w-20 h-20 rounded-2xl object-cover" alt={item.name} />
              <div className="flex-1">
                <h3 className="font-bold text-gray-900">{item.name}</h3>
                <p className="text-primary font-black mt-1">${item.price.toFixed(2)}</p>
              </div>
              <div className="flex items-center gap-3 bg-gray-50 p-2 rounded-2xl border border-gray-100">
                <button onClick={() => removeFromCart(item._id || '')} className="p-1 text-gray-400 hover:text-primary transition-colors">
                  <Minus size={16} strokeWidth={3}/>
                </button>
                <span className="font-black text-gray-900 text-sm">{item.quantity}</span>
                <button onClick={() => addToCart(item)} className="p-1 text-primary">
                  <Plus size={16} strokeWidth={3}/>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Payment Summary Footer */}
      <div className="fixed bottom-0 left-0 right-0 bg-white p-8 rounded-t-[3.5rem] shadow-[0_-20px_50px_rgba(0,0,0,0.06)] border-t border-gray-50">
        <div className="space-y-3 mb-6">
          <div className="flex justify-between text-sm">
            <span className="text-gray-400 font-medium">Subtotal</span>
            <span className="text-gray-900 font-bold">${cartTotal.toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-400 font-medium">Delivery Fee</span>
            <span className="text-green-500 font-bold">FREE</span>
          </div>
          <div className="h-[1px] bg-gray-50 my-2"></div>
          <div className="flex justify-between items-center">
            <span className="text-gray-900 font-black text-lg">Total Amount</span>
            <span className="text-2xl font-black text-primary">${cartTotal.toFixed(2)}</span>
          </div>
        </div>

        <button 
          onClick={() => {
            alert("🚀 Order placed successfully!");
            clearCart();
            navigate('/');
          }}
          className="w-full bg-primary text-white py-5 rounded-[2rem] font-black text-lg shadow-xl shadow-red-200 active:scale-95 transition-all flex items-center justify-center gap-3"
        >
          <CreditCard size={20} />
          Place Order
        </button>
      </div>
    </div>
  );
};

export default Checkout;