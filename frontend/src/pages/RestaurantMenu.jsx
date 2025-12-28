import React from 'react';
import { ArrowLeft, Star, Clock, Bike, Plus, ShoppingBag } from 'lucide-react';
import { useCart } from '../store/useCart';

const RestaurantMenu = () => {
  const { items, addItem } = useCart();
  const totalPrice = items.reduce((acc, item) => acc + item.price, 0);

  const menuItems = [
    { id: 101, name: 'Bacon King', price: 14.50, desc: 'Double flame-grilled beef, thick-cut smoked bacon...', image: 'https://images.unsplash.com/photo-1553979459-d2229ba7433b?w=400' },
    { id: 102, name: 'Classic Smash', price: 8.50, desc: 'Smashed beef patty, american cheese, pickles...', image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400' },
  ];

  return (
    <div className="bg-gray-50 min-h-screen pb-32">
      {/* Hero Image Header */}
      <div className="relative h-72">
        <img src="https://images.unsplash.com/photo-1571091718767-18b5b1457add?w=800" className="w-full h-full object-cover" alt="Hero" />
        <button className="absolute top-12 left-4 bg-white p-2 rounded-full shadow-lg"><ArrowLeft size={20} /></button>
        <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 to-transparent text-white">
          <h1 className="text-3xl font-black">The Burger Joint</h1>
          <div className="flex gap-4 mt-2 text-sm font-medium">
            <span className="flex items-center gap-1"><Clock size={16}/> 20-30 min</span>
            <span className="flex items-center gap-1"><Bike size={16}/> Free Delivery</span>
          </div>
        </div>
      </div>

      {/* Stats & Rating */}
      <div className="p-4 bg-white flex justify-between items-center border-b border-gray-100">
        <div className="flex items-center gap-2">
          <span className="text-2xl font-black">4.8</span>
          <div className="flex text-primary"><Star size={16} fill="currentColor"/><Star size={16} fill="currentColor"/><Star size={16} fill="currentColor"/><Star size={16} fill="currentColor"/></div>
          <span className="text-gray-400 text-xs">(200+ ratings)</span>
        </div>
        <button className="text-primary text-xs font-bold">See Reviews &gt;</button>
      </div>

      {/* Categories */}
      <div className="flex gap-2 p-4 overflow-x-auto bg-white sticky top-0 z-10">
        {['Featured', 'Burgers', 'Sides', 'Drinks'].map((cat, i) => (
          <button key={cat} className={`px-5 py-2 rounded-xl text-sm font-bold transition-all ${i===0 ? 'bg-primary text-white' : 'bg-gray-50 text-gray-500 border border-gray-100'}`}>{cat}</button>
        ))}
      </div>

      {/* Menu Sections */}
      <div className="p-4 space-y-8">
        <section>
          <h2 className="text-xl font-black mb-4">Featured Items</h2>
          <div className="flex gap-4 overflow-x-auto no-scrollbar">
            {menuItems.map(item => (
              <div key={item.id} className="min-w-[280px] bg-white rounded-3xl overflow-hidden shadow-sm border border-gray-100">
                <img src={item.image} className="h-40 w-full object-cover" />
                <div className="p-4">
                  <div className="flex justify-between items-center mb-1">
                    <h3 className="font-bold">{item.name}</h3>
                    <span className="text-primary font-bold">${item.price.toFixed(2)}</span>
                  </div>
                  <p className="text-gray-400 text-xs line-clamp-2 mb-4">{item.desc}</p>
                  <button onClick={() => addItem(item)} className="w-full bg-primary text-white py-3 rounded-xl font-bold active:scale-95 transition-all">Add to Cart</button>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section>
          <h2 className="text-xl font-black mb-4">Burgers</h2>
          {menuItems.map(item => (
            <div key={item.id} className="flex gap-4 bg-white p-3 rounded-2xl mb-3 border border-gray-50 shadow-sm">
              <img src={item.image} className="w-20 h-20 rounded-xl object-cover" />
              <div className="flex-1">
                <h4 className="font-bold text-sm">{item.name}</h4>
                <p className="text-gray-400 text-[10px] my-1 leading-tight">{item.desc}</p>
                <div className="flex justify-between items-center mt-2">
                  <span className="font-black text-sm">${item.price.toFixed(2)}</span>
                  <button onClick={() => addItem(item)} className="bg-primary text-white p-1 rounded-lg"><Plus size={18} /></button>
                </div>
              </div>
            </div>
          ))}
        </section>
      </div>

      {/* Floating View Cart Bar */}
      {items.length > 0 && (
        <div className="fixed bottom-6 left-4 right-4 bg-primary p-4 rounded-2xl shadow-2xl flex justify-between items-center animate-bounce-subtle z-50">
          <div className="flex items-center gap-3">
            <div className="bg-white/20 p-2 rounded-lg text-white font-bold">{items.length}</div>
            <span className="text-white font-bold">View Cart</span>
          </div>
          <span className="text-white font-black text-lg">${totalPrice.toFixed(2)}</span>
        </div>
      )}
    </div>
  );
};

export default RestaurantMenu;