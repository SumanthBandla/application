// App.js
import React, { useState } from 'react';
import axios from 'axios';

function App() {
  // State for user's input and grocery list
  const [input, setInput] = useState('');
  const [groceryList, setGroceryList] = useState([]);
  const [aiSuggestions, setAiSuggestions] = useState([]);

  /**
   * Fetches AI suggestions from backend
   * @param {string} userInput - User's description of what they need
   */
  const getAiSuggestions = async (userInput) => {
    try {
      const response = await axios.post('http://localhost:5000/ai-suggest', {
        prompt: userInput
      });
      // Update state with AI-generated suggestions
      setAiSuggestions(response.data.items);
    } catch (error) {
      console.error('Error fetching AI suggestions:', error);
    }
  };

  /**
   * Adds item to grocery list
   * @param {string} item - Item to add
   */
  const addItem = (item) => {
    setGroceryList([...groceryList, item]);
  };

  return (
    <div className="container">
      <h1>QuickCart 🛒</h1>
      
      {/* Input for meal description */}
      <input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Describe your meal (e.g. 'Italian dinner for 4')"
      />
      <button onClick={() => getAiSuggestions(input)}>
        Get Suggestions
      </button>

      {/* Display AI suggestions */}
      <div className="suggestions">
        <h3>AI Suggestions:</h3>
        {aiSuggestions.map((item, index) => (
          <div key={index}>
            {item} 
            <button onClick={() => addItem(item)}>+ Add</button>
          </div>
        ))}
      </div>

      {/* Current grocery list */}
      <div className="grocery-list">
        <h3>Your List:</h3>
        <ul>
          {groceryList.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;