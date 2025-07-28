<!-- Use this file to provide workspace-specific custom instructions to Copilot. For more details, visit https://code.visualstudio.com/docs/copilot/copilot-customization#_use-a-githubcopilotinstructionsmd-file -->

# Combo Meal Recommendation Engine - Copilot Instructions

This is a MERN stack application for generating daily combo meal recommendations for a restaurant.

## Project Structure
- `backend/` - Node.js Express server with MongoDB
- `frontend/` - React application
- Root contains shared package.json for running both services

## Key Features to Remember
1. **Combo Generation Logic**: Each combo must have 1 main + 1 side + 1 drink
2. **Constraints**: 
   - Calories: 550-800 per combo
   - All dishes unique per day (9 total items across 3 combos)
   - Similar popularity scores across combos
   - Random selection from pools (5 main, 4 side, 4 drink)
3. **Day-based Taste Profiles**: Each day has preferred taste (Monday=savory, Tuesday=spicy, etc.)
4. **No Persistence**: All combos generated fresh each time (no static storage)

## Technologies
- Backend: Node.js, Express.js, MongoDB with Mongoose
- Frontend: React with modern hooks, Axios for API calls
- Styling: CSS with modern grid/flexbox layouts

## API Endpoints
- GET /api/combos - Generate combos for today
- GET /api/combos/day/:dayName - Generate combos for specific day
- POST /api/menu/seed - Seed database with menu items
- GET /api/menu - Get all menu items

When making changes, ensure the combo generation algorithm maintains all constraints and the UI remains responsive and user-friendly.
