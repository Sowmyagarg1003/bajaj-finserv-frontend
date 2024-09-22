import axios from 'axios';
import React, { useState, useEffect } from 'react';

function App() {
  const [jsonInput, setJsonInput] = useState('');
  const [responseData, setResponseData] = useState(null);
  const [error, setError] = useState('');
  const [selectedOptions, setSelectedOptions] = useState([]);

  // Set the document title as the roll number
  useEffect(() => {
    document.title = 'RA2111003030017';
  }, []);

  // Function to handle form submission and API call
  const handleSubmit = async () => {
    try {
      const parsedData = JSON.parse(jsonInput); // Validate JSON input
      setError('');

      // Call the backend REST API
      const response = await axios.post('http://bajaj-finserv-swart.vercel.app/bfhl', parsedData);
      setResponseData(response.data); // Store response data
    } catch (err) {
      setError('Invalid JSON input');
      setResponseData(null);
    }
  };

  // Handle the dropdown selection change
  const handleSelectChange = (event) => {
    const options = Array.from(event.target.selectedOptions, option => option.value);
    setSelectedOptions(options);
  };

  // Render the filtered response based on selected options
  const renderFilteredResponse = () => {
    if (!responseData || selectedOptions.length === 0) return null;

    const { numbers, alphabets, highest_alphabet } = responseData;
    let filteredResponse = [];

    if (selectedOptions.includes('Numbers')) filteredResponse = [...filteredResponse, `Numbers: ${numbers.join(', ')}`];
    if (selectedOptions.includes('Alphabets')) filteredResponse = [...filteredResponse, `Alphabets: ${alphabets.join(', ')}`];
    if (selectedOptions.includes('Highest Alphabet')) filteredResponse = [...filteredResponse, `Highest Alphabet: ${highest_alphabet}`];

    return (
      <div>
        <h3>Filtered Response:</h3>
        {filteredResponse.map((item, index) => (
          <p key={index}>{item}</p>
        ))}
      </div>
    );
  };

  return (
    <div>
      <h1>Your Roll Number: RA2111003030017</h1>
      <textarea
        value={jsonInput}
        onChange={(e) => setJsonInput(e.target.value)}
        placeholder='Enter JSON here...'
        rows={5}
        cols={40}
      />
      <br />
      <button onClick={handleSubmit}>Submit</button>
      {error && <p style={{ color: 'red' }}>{error}</p>}

      {/* Multi-Select Dropdown */}
      {responseData && (
        <div>
          <label>Multi Filter:</label>
          <select multiple onChange={handleSelectChange}>
            <option value="Numbers">Numbers</option>
            <option value="Alphabets">Alphabets</option>
            <option value="Highest Alphabet">Highest Alphabet</option>
          </select>
        </div>
      )}

      {/* Render the filtered response */}
      {renderFilteredResponse()}
    </div>
  );
}

export default App;
