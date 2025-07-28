# 🍽️ Combo Meal Recommendation Engine

A sophisticated MERN stack web application that generates daily combo meal recommendations for restaurants following strict nutritional and popularity constraints.

## 🌟 Features

- **Daily Combo Generation**: Creates 3 unique combos per day (main + side + drink)
- **Smart Constraints**: 
  - Calorie limits (550-800 per combo)
  - Balanced popularity scores across combos
  - Day-specific taste preferences
  - Complete dish uniqueness per day
- **Random Selection**: Fresh recommendations every time with no static storage
- **Responsive UI**: Modern React interface with beautiful card-based design
- **RESTful API**: Clean Express.js backend with MongoDB integration

## 🏗️ Architecture

### Backend (`/backend`)
- **Express.js** server with MongoDB integration
- **Mongoose** ODM for data modeling
- **Smart Combo Algorithm** with constraint satisfaction
- **RESTful API** endpoints for combo generation and menu management

### Frontend (`/frontend`)
- **React** with modern hooks and functional components
- **Responsive design** with CSS Grid and Flexbox
- **Axios** for API communication
- **Real-time updates** with day selection

## 🚀 Quick Start

### Prerequisites
- Node.js (v14+ recommended)
- MongoDB (local installation or MongoDB Atlas)
- npm or yarn

### Installation

1. **Clone and setup the project:**
   ```bash
   git clone <repository-url>
   cd Menu
   ```

2. **Install all dependencies:**
   ```bash
   npm run install-all
   ```

3. **Set up environment variables:**
   
   Create `/backend/.env`:
   ```env
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/combo-menu
   NODE_ENV=development
   ```

4. **Start MongoDB** (if running locally):
   ```bash
   mongod
   ```

5. **Run the application:**
   ```bash
   # Run both frontend and backend simultaneously
   npm run dev
   
   # Or run separately:
   npm run backend  # Starts backend on port 5000
   npm run frontend # Starts frontend on port 3000
   ```

6. **Seed the database:**
   - Open http://localhost:3000
   - Click "Seed Database" button to populate with sample menu items

## 📋 API Endpoints

### Combos
- `GET /api/combos` - Generate combos for today
- `GET /api/combos/day/:dayName` - Generate combos for specific day (Monday-Sunday)

### Menu Management
- `GET /api/menu` - Get all menu items
- `POST /api/menu/seed` - Seed database with default menu items
- `POST /api/menu` - Add new menu item
- `DELETE /api/menu/:id` - Delete menu item

## 🎯 Combo Generation Logic

### Day-based Taste Preferences
- **Monday**: Savory
- **Tuesday**: Spicy  
- **Wednesday**: Sweet
- **Thursday**: Mixed
- **Friday**: Spicy
- **Saturday**: Mixed
- **Sunday**: Savory

### Constraints System
1. **Caloric Range**: Each combo must have 550-800 total calories
2. **Popularity Balance**: All 3 combos should have similar popularity scores
3. **Dish Uniqueness**: All 9 dishes (3 combos × 3 items) must be unique per day
4. **Random Selection**: Daily pools of 5 main courses, 4 sides, 4 drinks
5. **Taste Profile Assignment**: Based on day preference and item profiles

### Sample Output Format
```json
{
  "day": "Monday",
  "day_taste_preference": "savory",
  "combos": [
    {
      "combo_id": 1,
      "main": "Chicken Biryani",
      "side": "Garlic Naan", 
      "drink": "Masala Chaas",
      "total_calories": 750,
      "popularity_score": 2.4,
      "taste_profile": "spicy",
      "reasoning": "Spicy profile selected for Monday, balanced nutrition and popularity"
    }
  ],
  "total_combos": 3
}
```

## 🛠️ Development

### Project Structure
```
Menu/
├── backend/
│   ├── models/          # Mongoose schemas
│   ├── routes/          # Express route handlers
│   ├── utils/           # Combo generation algorithm
│   ├── server.js        # Main server file
│   └── .env            # Environment variables
├── frontend/
│   ├── public/          # Static assets
│   ├── src/
│   │   ├── App.js       # Main React component
│   │   ├── index.js     # React entry point
│   │   └── index.css    # Styling
│   └── package.json
├── .github/
│   └── copilot-instructions.md
└── package.json         # Root package.json
```

### Available Scripts
- `npm run dev` - Run both frontend and backend
- `npm run backend` - Run backend only
- `npm run frontend` - Run frontend only  
- `npm run build` - Build frontend for production
- `npm run install-all` - Install all dependencies

## 🎨 UI Features

- **Day Selection**: Choose any day of the week
- **Real-time Generation**: Fresh combos on each request
- **Visual Indicators**: Color-coded taste profiles and categories
- **Responsive Design**: Works on desktop, tablet, and mobile
- **Loading States**: Smooth user experience with loading indicators
- **Error Handling**: Helpful error messages and recovery options

## 🧪 Sample Menu Items

The application comes with 19 pre-configured Indian cuisine items:

**Main Courses**: Paneer Butter Masala, Chicken Biryani, Vegetable Pulao, Rajma Chawal, Chole Bhature, Masala Dosa, Grilled Sandwich

**Side Dishes**: Garlic Naan, Mixed Veg Salad, French Fries, Curd Rice, Papad, Paneer Tikka

**Drinks**: Masala Chaas, Sweet Lassi, Lemon Soda, Cold Coffee, Coconut Water, Iced Tea


