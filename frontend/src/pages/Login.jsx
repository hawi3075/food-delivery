
import React, { useState } from 'react';
import { Mail, Lock, Eye, EyeOff } from 'lucide-react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post('http://localhost:5000/api/auth/login', { email, password });
      localStorage.setItem('userInfo', JSON.stringify(data)); // Save token locally
      navigate('/'); // Redirect to Home
    } catch (err) {
      alert(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="min-h-screen bg-[#FDFDFD] flex flex-col items-center p-6 pt-20">
      {/* Burger Icon Header */}
      <div className="w-16 h-16 bg-red-50 rounded-2xl flex items-center justify-center mb-8">
        <span className="text-3xl">🍔</span>
      </div>

      <h1 className="text-3xl font-black text-gray-900 mb-2">Welcome Back!</h1>
      <p className="text-gray-500 mb-10 text-center">Login to satisfy your cravings.</p>

      <form onSubmit={handleLogin} className="w-full max-w-sm space-y-5">
        <div>
          <label className="text-sm font-bold text-gray-700 ml-1">Email</label>
          <div className="mt-1 relative flex items-center">
            <input 
              type="email" 
              placeholder="hello@example.com"
              className="w-full bg-gray-50 border border-gray-100 p-4 rounded-2xl outline-none focus:border-primary transition-all pr-12"
              onChange={(e) => setEmail(e.target.value)}
            />
            <Mail className="absolute right-4 text-gray-400" size={20} />
          </div>
        </div>

        <div>
          <label className="text-sm font-bold text-gray-700 ml-1">Password</label>
          <div className="mt-1 relative flex items-center">
            <input 
              type={showPassword ? "text" : "password"} 
              placeholder="••••••••"
              className="w-full bg-gray-50 border border-gray-100 p-4 rounded-2xl outline-none focus:border-primary transition-all pr-12"
              onChange={(e) => setPassword(e.target.value)}
            />
            <button 
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 text-gray-400"
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>
        </div>

        <div className="text-right">
          <button type="button" className="text-primary text-xs font-bold">Forgot Password?</button>
        </div>

        <button className="w-full bg-primary text-white font-bold py-4 rounded-2xl shadow-lg shadow-red-200 active:scale-95 transition-all">
          Log In
        </button>

        <div className="relative py-4">
            <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-gray-100"></div></div>
            <div className="relative flex justify-center text-xs uppercase"><span className="bg-white px-2 text-gray-400">Or continue with</span></div>
        </div>

        <div className="flex gap-4">
            <button type="button" className="flex-1 flex items-center justify-center gap-2 border border-gray-100 p-3 rounded-2xl font-bold text-sm"><img src="https://www.svgrepo.com/show/475656/google-color.svg" className="w-5" /> Google</button>
            <button type="button" className="flex-1 flex items-center justify-center gap-2 border border-gray-100 p-3 rounded-2xl font-bold text-sm"><img src="https://www.svgrepo.com/show/303106/apple-black-logo.svg" className="w-5" /> Apple</button>
        </div>
      </form>

      <p className="mt-10 text-sm text-gray-500">
        Don't have an account? <span className="text-primary font-bold cursor-pointer" onClick={() => navigate('/signup')}>Sign Up</span>
      </p>
    </div>
  );
};

export default Login;