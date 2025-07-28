const mongoose = require('mongoose');

const menuItemSchema = new mongoose.Schema({
  item_name: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true,
    enum: ['main', 'side', 'drink']
  },
  calories: {
    type: Number,
    required: true
  },
  taste_profile: {
    type: String,
    required: true,
    enum: ['spicy', 'sweet', 'savory']
  },
  popularity_score: {
    type: Number,
    required: true,
    min: 0,
    max: 1
  }
});

module.exports = mongoose.model('MenuItem', menuItemSchema);
