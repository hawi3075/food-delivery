const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();

// 1. MIDDLEWARE
// CORS is essential to allow your Vite frontend (port 5175) to talk to this backend
app.use(cors()); 
app.use(express.json());

// 2. MONGODB CONNECTION
// Replace 'your_mongodb_uri' with your actual connection string from MongoDB Atlas
const mongoURI = process.env.MONGO_URI || 'mongodb://localhost:27017/food_express';
mongoose.connect(mongoURI)
  .then(() => console.log('✅ MongoDB Connected Successfully'))
  .catch(err => console.error('❌ MongoDB Connection Error:', err));

// 3. RESTAURANT SCHEMA & MODEL
const restaurantSchema = new mongoose.Schema({
  name: String,
  category: String,
  image: String,
  rating: Number,
  deliveryTime: String,
  distance: String
});

const Restaurant = mongoose.model('Restaurant', restaurantSchema);

// 4. API ROUTES
// This matches the 'http://localhost:5000/api/restaurants' call in your frontend
app.get('/api/restaurants', async (req, res) => {
  try {
    const restaurants = await Restaurant.find();
    res.json(restaurants);
  } catch (error) {
    res.status(500).json({ message: "Error fetching restaurants" });
  }
});

// Helper route to seed data (run this once by visiting http://localhost:5000/api/seed)
app.get('/api/seed', async (req, res) => {
  const sampleData = [
    {
      name: "Burger King",
      category: "Fast Food",
      image: "https://images.unsplash.com/photo-1571091718767-18b5b1457add?w=500",
      rating: 4.5,
      deliveryTime: "25 min",
      distance: "1.2km"
    },
    {
      name: "Pizza Hut",
      category: "Pizza",
      image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=500",
      rating: 4.2,
      deliveryTime: "35 min",
      distance: "2.5km"
    }
  ];
  await Restaurant.deleteMany({});
  await Restaurant.insertMany(sampleData);
  res.send("Database Seeded with Sample Restaurants!");
});

// 5. START SERVER
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});