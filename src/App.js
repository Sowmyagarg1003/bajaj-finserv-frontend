import axios from 'axios';
import React, { useState } from 'react';

function App() {
  const [jsonInput, setJsonInput] = useState('');
  const [responseData, setResponseData] = useState(null);
  const [error, setError] = useState('');
  const [selectedOptions, setSelectedOptions] = useState([]);

  const handleSubmit = async () => {
    try {
      const parsedData = JSON.parse(jsonInput); // Validate JSON
      setError('');

      const response = await axios.post('http://127.0.0.1:5000/bfhl', parsedData);
      let targetDiv = document.querySelector('#target');
      targetDiv.innerHTML = `${JSON.stringify(response.data)}`;
      //  setResponseData(response.data);
      // renderResponse(response.data);
    } catch (err) {
      setError('Invalid JSON input');
    }
  };

  const handleSelectChange = (event) => {
    const options = Array.from(event.target.selectedOptions, option => option.value);
    setSelectedOptions(options);
  };

  const renderResponse = (responseData) => {
    if (!responseData) return null;
    const { numbers, alphabets, highest_alphabet } = responseData;
    console.log(numbers);
    // let dataToDisplay = [];

    // if (selectedOptions.includes('Numbers')) dataToDisplay = [...dataToDisplay, ...numbers];
    // if (selectedOptions.includes('Alphabets')) dataToDisplay = [...dataToDisplay, ...alphabets];
    // if (selectedOptions.includes('Highest Alphabet')) dataToDisplay = [...dataToDisplay, ...highest_alphabet];

    return (
      <div>
        <h2>Response:</h2>
        <pre>{JSON.stringify(responseData, null, 2)}</pre>
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
        rows={10}
        cols={30}
      />
      <button onClick={handleSubmit}>Submit</button>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <select multiple onChange={handleSelectChange}>
        <option value="Alphabets">Alphabets</option>
        <option value="Numbers">Numbers</option>
        <option value="Highest Alphabet">Highest Alphabet</option>
      </select>
      <p id='target'></p>
    </div>
  );
}

export default App;

