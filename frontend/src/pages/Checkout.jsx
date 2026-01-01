import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { ArrowLeft, Trash2, Plus, Minus } from 'lucide-react';

const Checkout = () => {
  const { cartItems, addToCart, removeFromCart, cartTotal, clearCart } = useCart();
  const navigate = useNavigate();

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-white">
        <h2 className="text-2xl font-bold text-gray-800">Your cart is empty</h2>
        <button 
          onClick={() => navigate('/')}
          className="mt-4 bg-primary text-white px-8 py-3 rounded-2xl font-bold"
        >
          Go Order Something!
        </button>
      </div>
    );
  }

  return (
    <div className="bg-[#FDFDFD] min-h-screen pb-24">
      <div className="p-6 pt-12 flex items-center gap-4">
        <button onClick={() => navigate(-1)} className="p-2 bg-white rounded-xl shadow-sm">
          <ArrowLeft size={20} />
        </button>
        <h1 className="text-2xl font-black text-gray-900">Your Order</h1>
      </div>

      <div className="px-6 space-y-4">
        {cartItems.map((item) => (
          <div key={item.name} className="bg-white p-4 rounded-3xl border border-gray-50 flex items-center gap-4 shadow-sm">
            <img src={item.image} className="w-20 h-20 rounded-2xl object-cover" />
            <div className="flex-1">
              <h3 className="font-bold text-gray-900">{item.name}</h3>
              <p className="text-primary font-black">${item.price.toFixed(2)}</p>
            </div>
            <div className="flex items-center gap-3 bg-gray-50 p-2 rounded-2xl">
              <button onClick={() => removeFromCart(item._id || '')} className="text-gray-500"><Minus size={16}/></button>
              <span className="font-bold text-gray-900">{item.quantity}</span>
              <button onClick={() => addToCart(item)} className="text-primary"><Plus size={16}/></button>
            </div>
          </div>
        ))}
      </div>

      <div className="fixed bottom-0 left-0 right-0 bg-white p-6 rounded-t-[3rem] shadow-[0_-20px_50px_rgba(0,0,0,0.05)]">
        <div className="flex justify-between mb-4">
          <span className="text-gray-500 font-bold">Total Amount</span>
          <span className="text-2xl font-black text-gray-900">${cartTotal.toFixed(2)}</span>
        </div>
        <button 
          onClick={() => {
            alert("Order Placed Successfully!");
            clearCart();
            navigate('/');
          }}
          className="w-full bg-primary text-white py-4 rounded-[2rem] font-black text-lg shadow-lg shadow-red-200 active:scale-95 transition-all"
        >
          Place Order
        </button>
      </div>
    </div>
  );
};

export default Checkout;