import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Checkout from './pages/Checkout';
import RestaurantMenu from './pages/RestaurantMenu';
import AdminDashboard from './pages/AdminDashboard';

function App() {
  return (
    <Router>
      <Routes>
        {/* Main User Flow */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/menu/:id" element={<RestaurantMenu />} />
        <Route path="/checkout" element={<Checkout />} />
        
        {/* Admin Flow */}
        <Route path="/admin" element={<AdminDashboard />} />
      </Routes>
    </Router>
  );
}

export default App;