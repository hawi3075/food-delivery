import React from 'react';
import { LayoutDashboard, ShoppingCart, Users, DollarSign, Package, TrendingUp } from 'lucide-react';

const AdminDashboard = () => {
  // Mock Stats for the Dashboard
  const stats = [
    { title: 'Total Revenue', value: '$12,845', icon: <DollarSign size={24}/>, color: 'bg-green-50 text-green-600' },
    { title: 'Total Orders', value: '456', icon: <Package size={24}/>, color: 'bg-blue-50 text-blue-600' },
    { title: 'Active Users', value: '2,103', icon: <Users size={24}/>, color: 'bg-purple-50 text-purple-600' },
    { title: 'New Sales', value: '+12%', icon: <TrendingUp size={24}/>, color: 'bg-red-50 text-primary' },
  ];

  const recentOrders = [
    { id: '#8821', customer: 'John Doe', item: 'Bacon King Burger', total: '$18.50', status: 'Delivered' },
    { id: '#8822', customer: 'Sarah Smith', item: 'Vegan Bowl', total: '$12.00', status: 'Pending' },
    { id: '#8823', customer: 'Mike Ross', item: 'Double Cheese', total: '$24.40', status: 'On the way' },
  ];

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar - Hidden on mobile, visible on desktop */}
      <aside className="w-64 bg-white border-r border-gray-100 p-6 hidden lg:block">
        <div className="flex items-center gap-2 mb-10">
          <div className="bg-primary p-2 rounded-xl text-white font-black text-xl">FE</div>
          <span className="font-black text-xl tracking-tight">FoodExpress</span>
        </div>
        <nav className="space-y-2">
          <button className="w-full flex items-center gap-3 bg-red-50 text-primary p-3 rounded-xl font-bold">
            <LayoutDashboard size={20} /> Dashboard
          </button>
          <button className="w-full flex items-center gap-3 text-gray-400 p-3 hover:bg-gray-50 rounded-xl font-bold transition-all">
            <ShoppingCart size={20} /> Orders
          </button>
          <button className="w-full flex items-center gap-3 text-gray-400 p-3 hover:bg-gray-50 rounded-xl font-bold transition-all">
            <Package size={20} /> Menu Items
          </button>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 lg:p-10">
        <header className="flex justify-between items-center mb-10">
          <h1 className="text-2xl font-black text-gray-800">Dashboard Overview</h1>
          <div className="flex items-center gap-4">
            <div className="text-right hidden sm:block">
              <p className="text-sm font-bold">Admin User</p>
              <p className="text-xs text-gray-400">Main Manager</p>
            </div>
            <div className="w-12 h-12 bg-gray-200 rounded-2xl overflow-hidden border-2 border-white shadow-sm">
              <img src="https://ui-avatars.com/api/?name=Admin" alt="Admin" />
            </div>
          </div>
        </header>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          {stats.map((stat, i) => (
            <div key={i} className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100">
              <div className={`${stat.color} w-12 h-12 rounded-2xl flex items-center justify-center mb-4`}>
                {stat.icon}
              </div>
              <p className="text-gray-400 text-xs font-bold uppercase tracking-wider">{stat.title}</p>
              <p className="text-2xl font-black text-gray-800 mt-1">{stat.value}</p>
            </div>
          ))}
        </div>

        {/* Recent Orders Table */}
        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="p-6 border-b border-gray-50">
            <h2 className="text-lg font-black">Recent Orders</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-gray-50 text-gray-400 text-[10px] uppercase font-black tracking-widest">
                <tr>
                  <th className="px-6 py-4">Order ID</th>
                  <th className="px-6 py-4">Customer</th>
                  <th className="px-6 py-4">Item</th>
                  <th className="px-6 py-4">Total</th>
                  <th className="px-6 py-4">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {recentOrders.map((order, i) => (
                  <tr key={i} className="hover:bg-gray-50 transition-colors cursor-default">
                    <td className="px-6 py-4 font-bold text-sm text-gray-800">{order.id}</td>
                    <td className="px-6 py-4 font-medium text-sm text-gray-600">{order.customer}</td>
                    <td className="px-6 py-4 text-sm text-gray-500">{order.item}</td>
                    <td className="px-6 py-4 font-black text-sm text-gray-800">{order.total}</td>
                    <td className="px-6 py-4">
                      <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase ${
                        order.status === 'Delivered' ? 'bg-green-100 text-green-600' : 
                        order.status === 'Pending' ? 'bg-yellow-100 text-yellow-600' : 'bg-blue-100 text-blue-600'
                      }`}>
                        {order.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;