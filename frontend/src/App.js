import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './index.css';

const API_BASE_URL = 'http://localhost:5000/api';

function App() {
  const [combos, setCombos] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedDay, setSelectedDay] = useState('');

  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

  useEffect(() => {
    // Get current day
    const today = new Date().toLocaleDateString('en-US', { weekday: 'long' });
    setSelectedDay(today);
    fetchCombos(today);
  }, []);

  const fetchCombos = async (day = selectedDay) => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await axios.get(`${API_BASE_URL}/combos${day ? `/day/${day}` : ''}`);
      setCombos(response.data);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch combos. Make sure the backend is running.');
      setCombos(null);
    } finally {
      setLoading(false);
    }
  };

  const handleDayChange = (e) => {
    const day = e.target.value;
    setSelectedDay(day);
    if (day) {
      fetchCombos(day);
    }
  };

  const seedDatabase = async () => {
    try {
      setLoading(true);
      await axios.post(`${API_BASE_URL}/menu/seed`);
      // Refresh combos after seeding
      fetchCombos(selectedDay);
    } catch (err) {
      setError('Failed to seed database. Make sure the backend is running.');
    } finally {
      setLoading(false);
    }
  };

  const getTasteProfileClass = (profile) => {
    return `taste-profile taste-${profile.toLowerCase()}`;
  };

  return (
    <div className="container">
      <div className="header">
        <h1>🍽️ Combo Meal Recommendation Engine</h1>
        <p>Discover perfectly balanced meal combinations for every day</p>
      </div>

      <div className="day-selector">
        <select value={selectedDay} onChange={handleDayChange}>
          <option value="">Select a day</option>
          {days.map(day => (
            <option key={day} value={day}>{day}</option>
          ))}
        </select>
        <button 
          onClick={seedDatabase} 
          style={{
            marginLeft: '20px',
            padding: '12px 20px',
            background: '#4ecdc4',
            color: 'white',
            border: 'none',
            borderRadius: '25px',
            cursor: 'pointer',
            fontSize: '1rem'
          }}
        >
          Seed Database
        </button>
      </div>

      {loading && <div className="loading">🔄 Generating delicious combos...</div>}
      
      {error && (
        <div className="error">
          ❌ {error}
          {error.includes('No menu items found') && (
            <div style={{ marginTop: '10px' }}>
              <button onClick={seedDatabase} style={{
                background: 'rgba(255,255,255,0.2)',
                border: '1px solid white',
                color: 'white',
                padding: '10px 20px',
                borderRadius: '20px',
                cursor: 'pointer'
              }}>
                Click here to seed the database
              </button>
            </div>
          )}
        </div>
      )}

      {combos && (
        <div>
          <div className="day-info">
            <h2>📅 {combos.day} Recommendations</h2>
            <p>
              Today's taste preference: <span className={getTasteProfileClass(combos.day_taste_preference)}>
                {combos.day_taste_preference}
              </span>
            </p>
            <p>Generated {combos.total_combos} unique combo{combos.total_combos !== 1 ? 's' : ''}</p>
          </div>

          {combos.combos && combos.combos.length > 0 ? (
            <div className="combos-grid">
              {combos.combos.map((combo, index) => (
                <div key={index} className="combo-card">
                  <div className="combo-header">
                    <div className="combo-id">#{combo.combo_id}</div>
                    <div className={getTasteProfileClass(combo.taste_profile)}>
                      {combo.taste_profile}
                    </div>
                  </div>

                  <div className="combo-items">
                    <div className="combo-item">
                      <span className="item-category">Main</span>
                      <span className="item-name">{combo.main}</span>
                      <span className="item-calories">🔥</span>
                    </div>
                    <div className="combo-item">
                      <span className="item-category">Side</span>
                      <span className="item-name">{combo.side}</span>
                      <span className="item-calories">🥗</span>
                    </div>
                    <div className="combo-item">
                      <span className="item-category">Drink</span>
                      <span className="item-name">{combo.drink}</span>
                      <span className="item-calories">🥤</span>
                    </div>
                  </div>

                  <div className="combo-stats">
                    <div className="stat">
                      <span className="stat-value">{combo.total_calories}</span>
                      <span className="stat-label">Calories</span>
                    </div>
                    <div className="stat">
                      <span className="stat-value">{combo.popularity_score}</span>
                      <span className="stat-label">Popularity</span>
                    </div>
                  </div>

                  <div className="reasoning">
                    💡 {combo.reasoning}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="no-combos">
              😕 No valid combos could be generated for {combos.day}. 
              Try seeding the database with more menu items.
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default App;
