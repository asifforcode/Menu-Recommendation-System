const express = require('express');
const router = express.Router();
const MenuItem = require('../models/MenuItem');

// GET /api/menu - Get all menu items
router.get('/', async (req, res) => {
  try {
    const menuItems = await MenuItem.find();
    res.json(menuItems);
  } catch (error) {
    console.error('Error fetching menu items:', error);
    res.status(500).json({ message: 'Error fetching menu items', error: error.message });
  }
});

// POST /api/menu/seed - Seed database with menu items
router.post('/seed', async (req, res) => {
  try {
    // Clear existing items
    await MenuItem.deleteMany({});
    
    // Default menu items based on the CSV data provided
    const defaultMenuItems = [
      { item_name: "Paneer Butter Masala", category: "main", calories: 450, taste_profile: "spicy", popularity_score: 0.9 },
      { item_name: "Chicken Biryani", category: "main", calories: 600, taste_profile: "spicy", popularity_score: 0.95 },
      { item_name: "Vegetable Pulao", category: "main", calories: 400, taste_profile: "savory", popularity_score: 0.7 },
      { item_name: "Rajma Chawal", category: "main", calories: 500, taste_profile: "savory", popularity_score: 0.8 },
      { item_name: "Chole Bhature", category: "main", calories: 650, taste_profile: "spicy", popularity_score: 0.85 },
      { item_name: "Masala Dosa", category: "main", calories: 480, taste_profile: "savory", popularity_score: 0.88 },
      { item_name: "Grilled Sandwich", category: "main", calories: 370, taste_profile: "savory", popularity_score: 0.6 },
      { item_name: "Garlic Naan", category: "side", calories: 200, taste_profile: "savory", popularity_score: 0.9 },
      { item_name: "Mixed Veg Salad", category: "side", calories: 150, taste_profile: "sweet", popularity_score: 0.75 },
      { item_name: "French Fries", category: "side", calories: 350, taste_profile: "savory", popularity_score: 0.8 },
      { item_name: "Curd Rice", category: "side", calories: 250, taste_profile: "savory", popularity_score: 0.7 },
      { item_name: "Papad", category: "side", calories: 100, taste_profile: "savory", popularity_score: 0.65 },
      { item_name: "Paneer Tikka", category: "side", calories: 300, taste_profile: "spicy", popularity_score: 0.85 },
      { item_name: "Masala Chaas", category: "drink", calories: 100, taste_profile: "spicy", popularity_score: 0.8 },
      { item_name: "Sweet Lassi", category: "drink", calories: 220, taste_profile: "sweet", popularity_score: 0.9 },
      { item_name: "Lemon Soda", category: "drink", calories: 90, taste_profile: "savory", popularity_score: 0.7 },
      { item_name: "Cold Coffee", category: "drink", calories: 180, taste_profile: "sweet", popularity_score: 0.75 },
      { item_name: "Coconut Water", category: "drink", calories: 60, taste_profile: "sweet", popularity_score: 0.6 },
      { item_name: "Iced Tea", category: "drink", calories: 120, taste_profile: "sweet", popularity_score: 0.78 }
    ];
    
    const insertedItems = await MenuItem.insertMany(defaultMenuItems);
    res.json({ 
      message: 'Database seeded successfully', 
      itemsCount: insertedItems.length,
      items: insertedItems 
    });
  } catch (error) {
    console.error('Error seeding database:', error);
    res.status(500).json({ message: 'Error seeding database', error: error.message });
  }
});

// POST /api/menu - Add new menu item
router.post('/', async (req, res) => {
  try {
    const newItem = new MenuItem(req.body);
    const savedItem = await newItem.save();
    res.status(201).json(savedItem);
  } catch (error) {
    console.error('Error adding menu item:', error);
    res.status(400).json({ message: 'Error adding menu item', error: error.message });
  }
});

// DELETE /api/menu/:id - Delete menu item
router.delete('/:id', async (req, res) => {
  try {
    const deletedItem = await MenuItem.findByIdAndDelete(req.params.id);
    if (!deletedItem) {
      return res.status(404).json({ message: 'Menu item not found' });
    }
    res.json({ message: 'Menu item deleted successfully' });
  } catch (error) {
    console.error('Error deleting menu item:', error);
    res.status(500).json({ message: 'Error deleting menu item', error: error.message });
  }
});

module.exports = router;
