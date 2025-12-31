const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();

// 1. MIDDLEWARE
app.use(cors()); 
app.use(express.json());

// 2. MONGODB CONNECTION
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
  distance: String,
  menu: [
    {
      name: String,
      price: Number,
      description: String,
      image: String
    }
  ]
});

const Restaurant = mongoose.model('Restaurant', restaurantSchema);

// 4. API ROUTES

// Get ALL restaurants
app.get('/api/restaurants', async (req, res) => {
  try {
    const restaurants = await Restaurant.find();
    res.json(restaurants);
  } catch (error) {
    res.status(500).json({ message: "Error fetching restaurants" });
  }
});

// Get a SINGLE restaurant by ID
app.get('/api/restaurants/:id', async (req, res) => {
  try {
    const restaurant = await Restaurant.findById(req.params.id);
    if (!restaurant) return res.status(404).json({ message: "Restaurant not found" });
    res.json(restaurant);
  } catch (error) {
    res.status(500).json({ message: "Error fetching restaurant details" });
  }
});

// Seed Data (Now with Menu Items!)
app.get('/api/seed', async (req, res) => {
  const sampleData = [
    {
      name: "Burger King",
      category: "Fast Food",
      image: "https://images.unsplash.com/photo-1571091718767-18b5b1457add?w=500",
      rating: 4.5,
      deliveryTime: "25 min",
      distance: "1.2km",
      menu: [
        { 
          name: "Whopper Meal", 
          price: 12.99, 
          description: "Flame-grilled beef patty with fresh tomatoes and onions.",
          image: "https://images.unsplash.com/photo-1571091718767-18b5b1457add?w=200"
        },
        { 
          name: "Crispy Chicken", 
          price: 9.50, 
          description: "Breaded chicken breast with mayo and lettuce.",
          image: "https://images.unsplash.com/photo-1610614819513-58e34989848b?w=200"
        }
      ]
    },
    {
      name: "Pizza Hut",
      category: "Pizza",
      image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=500",
      rating: 4.2,
      deliveryTime: "35 min",
      distance: "2.5km",
      menu: [
        { 
          name: "Pepperoni Pizza", 
          price: 15.00, 
          description: "Classic pepperoni with mozzarella and tomato sauce.",
          image: "https://images.unsplash.com/photo-1628840042765-356cda07504e?w=200"
        },
        { 
          name: "Garlic Bread", 
          price: 5.50, 
          description: "Freshly baked bread with herbs and butter.",
          image: "https://images.unsplash.com/photo-1573140247632-f8fd74997d5c?w=200"
        }
      ]
    }
  ];
  try {
    await Restaurant.deleteMany({});
    await Restaurant.insertMany(sampleData);
    res.send("Database Seeded with Menu Items!");
  } catch (err) {
    res.status(500).send("Error seeding database");
  }
});

// 5. START SERVER
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});