const mongoose = require('mongoose');

const restaurantSchema = mongoose.Schema({
    name: { type: String, required: true },
    category: { type: String, required: true },
    rating: { type: Number, default: 0 },
    deliveryTime: { type: String, required: true },
    distance: { type: String },
    image: { type: String, required: true },
    menu: [{
        itemName: String,
        price: Number,
        description: String,
        image: String
    }]
}, { timestamps: true });

module.exports = mongoose.model('Restaurant', restaurantSchema);