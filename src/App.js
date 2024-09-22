import axios from 'axios';
import React, { useEffect, useState } from 'react';

function App() {
  const [jsonInput, setJsonInput] = useState('');
  const [responseData, setResponseData] = useState(null);
  const [error, setError] = useState('');
  const [selectedOptions, setSelectedOptions] = useState([]);

  useEffect(() => {
    document.title = 'RA2111003030017';
  }, []);

  const handleSubmit = async () => {
    if (!jsonInput.trim()) {
      setError('Input cannot be empty');
      return;
    }

    try {
      const parsedData = JSON.parse(jsonInput);
      setError('');

      const requestData = {
        data: parsedData.data || [],
        file_b64: parsedData.file_b64 || null
      };

      // Update this line to use the deployed backend URL
      const response = await axios.post('https://bajaj-finserv-swart.vercel.app/bfhl', requestData);
      setResponseData(response.data);
    } catch (err) {
      console.error("Input JSON:", jsonInput); // Log the input for debugging
      console.error(err); // Log error details
      setError('Invalid JSON input');
      setResponseData(null);
    }
  };


  const handleSelectChange = (event) => {
    const options = Array.from(event.target.selectedOptions, option => option.value);
    setSelectedOptions(options);
  };

  const renderFilteredResponse = () => {
    if (!responseData || selectedOptions.length === 0) return null;

    const { numbers = [], alphabets = [], highest_lowercase_alphabet = "No lowercase alphabet found" } = responseData;
    let filteredResponse = [];

    if (selectedOptions.includes('Alphabets')) {
      filteredResponse.push(`Alphabets: ${alphabets.length > 0 ? alphabets.join(', ') : 'No alphabets'}`);
    }

    if (selectedOptions.includes('Numbers')) {
      filteredResponse.push(`Numbers: ${numbers.length > 0 ? numbers.join(', ') : 'No numbers'}`);
    }

    if (selectedOptions.includes('Highest lowercase alphabet')) {
      filteredResponse.push(`Highest lowercase alphabet: ${highest_lowercase_alphabet}`);
    }

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
          <label>Multi-Select Filter:</label>
          <select multiple onChange={handleSelectChange}>
            <option value="Alphabets">Alphabets</option>
            <option value="Numbers">Numbers</option>
            <option value="Highest lowercase alphabet">Highest lowercase alphabet</option>
          </select>
        </div>
      )}

      {/* Render the filtered response */}
      {renderFilteredResponse()}
    </div>
  );
}

export default App;
