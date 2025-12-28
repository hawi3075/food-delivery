const express = require('express');
const router = express.Router();
const Restaurant = require('../models/Restaurant');

// GET all restaurants
router.get('/', async (req, res) => {
    try {
        const restaurants = await Restaurant.find({});
        res.json(restaurants);
    } catch (error) {
        res.status(500).json({ message: "Server Error" });
    }
});

// GET single restaurant by ID (for the menu page)
router.get('/:id', async (req, res) => {
    try {
        const restaurant = await Restaurant.findById(req.params.id);
        if (restaurant) res.json(restaurant);
        else res.status(404).json({ message: "Restaurant not found" });
    } catch (error) {
        res.status(500).json({ message: "Server Error" });
    }
});

module.exports = router;