const express = require('express');
const router = express.Router();
const MenuItem = require('../models/MenuItem');
const ComboGenerator = require('../utils/ComboGenerator');

const comboGenerator = new ComboGenerator();

// GET /api/combos - Generate combos for today or specified day
router.get('/', async (req, res) => {
  try {
    const { day } = req.query;
    
    // Get all menu items from database
    const menuItems = await MenuItem.find();
    
    if (menuItems.length === 0) {
      return res.status(404).json({ message: 'No menu items found. Please seed the database first.' });
    }

    // Generate combos for the specified day (or today)
    const result = comboGenerator.generateCombosForDay(menuItems, day);
    
    res.json(result);
  } catch (error) {
    console.error('Error generating combos:', error);
    res.status(500).json({ message: 'Error generating combos', error: error.message });
  }
});

// GET /api/combos/day/:dayName - Generate combos for specific day
router.get('/day/:dayName', async (req, res) => {
  try {
    const { dayName } = req.params;
    
    // Validate day name
    const validDays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
    if (!validDays.includes(dayName)) {
      return res.status(400).json({ message: 'Invalid day name. Use: Monday, Tuesday, Wednesday, Thursday, Friday, Saturday, Sunday' });
    }
    
    // Get all menu items from database
    const menuItems = await MenuItem.find();
    
    if (menuItems.length === 0) {
      return res.status(404).json({ message: 'No menu items found. Please seed the database first.' });
    }

    // Generate combos for the specified day
    const result = comboGenerator.generateCombosForDay(menuItems, dayName);
    
    res.json(result);
  } catch (error) {
    console.error('Error generating combos:', error);
    res.status(500).json({ message: 'Error generating combos', error: error.message });
  }
});

module.exports = router;
