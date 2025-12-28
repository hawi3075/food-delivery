import React from 'react';
import { ArrowLeft, Ticket, MapPin, ChevronRight, Clock } from 'lucide-react';
import { useCart } from '../store/useCart';
import { useNavigate } from 'react-router-dom';

const Checkout = () => {
  const { items } = useCart();
  const navigate = useNavigate();

  // Price Calculations
  const subtotal = items.reduce((acc, item) => acc + item.price, 0);
  const deliveryFee = subtotal > 0 ? 2.50 : 0;
  const tax = subtotal * 0.1; // 10% Tax
  const discount = subtotal > 20 ? 5.00 : 0; // "Save $5" offer
  const total = subtotal + deliveryFee + tax - discount;

  return (
    <div className="bg-[#F8F9FA] min-h-screen pb-24">
      {/* Header */}
      <div className="bg-white p-4 pt-12 flex items-center gap-4">
        <button onClick={() => navigate(-1)} className="p-2 bg-gray-50 rounded-full">
          <ArrowLeft size={20} />
        </button>
        <h1 className="text-xl font-black">My Order</h1>
      </div>

      {/* Delivery Address Card */}
      <div className="p-4">
        <div className="bg-white p-4 rounded-3xl flex items-center justify-between shadow-sm border border-gray-50">
          <div className="flex items-center gap-3">
            <div className="bg-red-50 p-3 rounded-2xl text-primary">
              <MapPin size={24} />
            </div>
            <div>
              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Deliver to</p>
              <p className="text-sm font-bold text-gray-800">Home • 123 Main St...</p>
            </div>
          </div>
          <ChevronRight size={20} className="text-gray-300" />
        </div>
      </div>

      {/* Order Items */}
      <div className="px-4 space-y-3">
        <h2 className="text-sm font-black text-gray-800 ml-1 mb-2">Order Items</h2>
        {items.map((item, index) => (
          <div key={index} className="bg-white p-3 rounded-2xl flex items-center gap-3 shadow-sm">
            <img src={item.image} className="w-16 h-16 rounded-xl object-cover" alt="" />
            <div className="flex-1">
              <h3 className="font-bold text-sm">{item.name}</h3>
              <p className="text-primary font-black text-sm">${item.price.toFixed(2)}</p>
            </div>
            <div className="flex items-center gap-3 bg-gray-50 p-1 px-3 rounded-xl border border-gray-100">
              <span className="font-bold text-sm">1</span>
            </div>
          </div>
        ))}
      </div>

      {/* Coupon/Offers */}
      <div className="p-4">
        <div className="bg-white p-4 rounded-3xl border-2 border-dashed border-gray-100 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Ticket className="text-primary rotate-45" size={24} />
            <span className="font-bold text-sm">FOOD40 applied</span>
          </div>
          <span className="text-green-500 font-bold text-xs">-$5.00</span>
        </div>
      </div>

      {/* Bill Summary */}
      <div className="p-4 mx-4 bg-white rounded-3xl shadow-sm space-y-3">
        <div className="flex justify-between text-sm">
          <span className="text-gray-400 font-medium">Subtotal</span>
          <span className="font-bold text-gray-800">${subtotal.toFixed(2)}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-gray-400 font-medium">Delivery Fee</span>
          <span className="font-bold text-gray-800">${deliveryFee.toFixed(2)}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-gray-400 font-medium">Tax & Fees</span>
          <span className="font-bold text-gray-800">${tax.toFixed(2)}</span>
        </div>
        {discount > 0 && (
          <div className="flex justify-between text-sm">
            <span className="text-green-500 font-medium">Discount</span>
            <span className="font-bold text-green-500">-${discount.toFixed(2)}</span>
          </div>
        )}
        <div className="pt-3 border-t border-gray-50 flex justify-between items-center">
          <span className="font-black text-lg">Total</span>
          <span className="font-black text-2xl text-primary">${total.toFixed(2)}</span>
        </div>
      </div>

      {/* Final Action Button */}
      <div className="fixed bottom-0 left-0 right-0 p-6 bg-white border-t border-gray-50 shadow-[0_-10px_40px_rgba(0,0,0,0.03)]">
        <button className="w-full bg-primary text-white py-4 rounded-2xl font-black text-lg shadow-lg shadow-red-200 active:scale-95 transition-all flex items-center justify-center gap-3">
          Place Order <ChevronRight size={20} />
        </button>
      </div>
    </div>
  );
};

export default Checkout;