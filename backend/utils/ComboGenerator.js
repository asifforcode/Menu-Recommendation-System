class ComboGenerator {
  constructor() {
    // Define taste profile preferences for each day
    this.dayTastePreferences = {
      'Monday': 'savory',
      'Tuesday': 'spicy',
      'Wednesday': 'sweet',
      'Thursday': 'mixed',
      'Friday': 'spicy',
      'Saturday': 'mixed',
      'Sunday': 'savory'
    };
  }

  // Get random items from an array
  getRandomItems(array, count) {
    const shuffled = [...array].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
  }

  // Calculate total calories for a combo
  calculateCalories(main, side, drink) {
    return main.calories + side.calories + drink.calories;
  }

  // Calculate total popularity score for a combo
  calculatePopularityScore(main, side, drink) {
    return main.popularity_score + side.popularity_score + drink.popularity_score;
  }

  // Check if combo meets calorie constraints (550-800)
  isValidCalories(calories) {
    return calories >= 550 && calories <= 800;
  }

  // Determine combo taste profile based on day preference and items
  determineComboTasteProfile(main, side, drink, dayPreference) {
    const profiles = [main.taste_profile, side.taste_profile, drink.taste_profile];
    const profileCounts = profiles.reduce((acc, profile) => {
      acc[profile] = (acc[profile] || 0) + 1;
      return acc;
    }, {});

    // If day preference is mixed, return 'mixed'
    if (dayPreference === 'mixed') {
      return 'mixed';
    }

    // If majority items match day preference, use day preference
    if (profileCounts[dayPreference] >= 2) {
      return dayPreference;
    }

    // Otherwise, return the most common profile or 'mixed' if tied
    const maxCount = Math.max(...Object.values(profileCounts));
    const dominantProfiles = Object.keys(profileCounts).filter(
      profile => profileCounts[profile] === maxCount
    );

    return dominantProfiles.length === 1 ? dominantProfiles[0] : 'mixed';
  }

  // Generate balanced combos with similar popularity scores
  generateBalancedCombos(availableItems, dayPreference) {
    const { main: mainItems, side: sideItems, drink: drinkItems } = availableItems;
    const combos = [];
    const maxAttempts = 1000; // Prevent infinite loops
    
    for (let attempt = 0; attempt < maxAttempts && combos.length < 3; attempt++) {
      // Try all combinations to find valid ones
      for (let i = 0; i < mainItems.length && combos.length < 3; i++) {
        for (let j = 0; j < sideItems.length && combos.length < 3; j++) {
          for (let k = 0; k < drinkItems.length && combos.length < 3; k++) {
            const main = mainItems[i];
            const side = sideItems[j];
            const drink = drinkItems[k];
            
            // Check if items are already used
            const usedItems = combos.flatMap(combo => [
              combo.main_item,
              combo.side_item,
              combo.drink_item
            ]);
            
            if (usedItems.includes(main.item_name) || 
                usedItems.includes(side.item_name) || 
                usedItems.includes(drink.item_name)) {
              continue;
            }

            const calories = this.calculateCalories(main, side, drink);
            
            if (this.isValidCalories(calories)) {
              const popularityScore = this.calculatePopularityScore(main, side, drink);
              const tasteProfile = this.determineComboTasteProfile(main, side, drink, dayPreference);
              
              combos.push({
                combo_id: combos.length + 1,
                main: main.item_name,
                main_item: main.item_name, // For uniqueness check
                side: side.item_name,
                side_item: side.item_name, // For uniqueness check
                drink: drink.item_name,
                drink_item: drink.item_name, // For uniqueness check
                total_calories: calories,
                popularity_score: Math.round(popularityScore * 100) / 100,
                taste_profile: tasteProfile,
                reasoning: `${tasteProfile.charAt(0).toUpperCase() + tasteProfile.slice(1)} profile selected for ${this.getDayName(new Date())}, balanced nutrition and popularity`
              });
            }
          }
        }
      }
      
      // Shuffle arrays for next attempt
      mainItems.sort(() => 0.5 - Math.random());
      sideItems.sort(() => 0.5 - Math.random());
      drinkItems.sort(() => 0.5 - Math.random());
    }

    // Clean up temporary properties
    combos.forEach(combo => {
      delete combo.main_item;
      delete combo.side_item;
      delete combo.drink_item;
    });

    return combos.slice(0, 3); // Ensure only 3 combos
  }

  // Get day name from date
  getDayName(date) {
    return date.toLocaleDateString('en-US', { weekday: 'long' });
  }

  // Main method to generate combos for a given day
  generateCombosForDay(allMenuItems, day) {
    const dayName = day || this.getDayName(new Date());
    const dayPreference = this.dayTastePreferences[dayName];

    // Separate items by category
    const mainCourses = allMenuItems.filter(item => item.category === 'main');
    const sideDishes = allMenuItems.filter(item => item.category === 'side');
    const drinks = allMenuItems.filter(item => item.category === 'drink');

    // Randomly select items for the day (5 main, 4 side, 4 drink)
    const selectedItems = {
      main: this.getRandomItems(mainCourses, Math.min(5, mainCourses.length)),
      side: this.getRandomItems(sideDishes, Math.min(4, sideDishes.length)),
      drink: this.getRandomItems(drinks, Math.min(4, drinks.length))
    };

    // Generate balanced combos
    const combos = this.generateBalancedCombos(selectedItems, dayPreference);

    return {
      day: dayName,
      day_taste_preference: dayPreference,
      combos: combos,
      total_combos: combos.length
    };
  }
}

module.exports = ComboGenerator;
