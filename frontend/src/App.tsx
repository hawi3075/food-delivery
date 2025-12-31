import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Checkout from './pages/Checkout';
import RestaurantDetails from './pages/RestaurantDetails'; // Updated name
import AdminDashboard from './pages/AdminDashboard';

// Global Styles
import './index.css';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Routes>
          {/* Main User Flow */}
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          
          {/* This matches the Link in your Home.jsx */}
          <Route path="/restaurant/:id" element={<RestaurantDetails />} />
          
          <Route path="/checkout" element={<Checkout />} />
          
          {/* Admin Flow */}
          <Route path="/admin" element={<AdminDashboard />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;