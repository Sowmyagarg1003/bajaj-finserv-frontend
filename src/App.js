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
    try {
      const parsedData = JSON.parse(jsonInput); 
      setError('');

      const response = await axios.post('http://127.0.0.1:5000/bfhl', parsedData);
      setResponseData(response.data); 
    } catch (err) {
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

    const { numbers, alphabets, highest_lowercase_alphabet } = responseData; 
    let filteredResponse = [];

    if (selectedOptions.includes('Numbers'))
      filteredResponse.push(`Numbers: ${numbers && numbers.length > 0 ? numbers.join(', ') : 'No numbers'}`);

    if (selectedOptions.includes('Alphabets'))
      filteredResponse.push(`Alphabets: ${alphabets && alphabets.length > 0 ? alphabets.join(', ') : 'No alphabets'}`);

    if (selectedOptions.includes('Highest Alphabet'))
      filteredResponse.push(`Highest Alphabet: ${highest_lowercase_alphabet !== null ? highest_lowercase_alphabet : 'No lowercase alphabet'}`); // <-- Updated key name

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
