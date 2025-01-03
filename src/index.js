import React, { useState } from 'react';
import ReactDOM from 'react-dom';

function App() {
  const [formData, setFormData] = useState({
    name: '',
    email: ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://3.27.218.115/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      });
      const data = await response.json();
      alert(data.message);
    } catch (error) {
      alert('Error submitting form');
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div>
      <h1>Data Collection Form</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name: </label>
          <input 
            type="text" 
            name="name"
            value={formData.name}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Email: </label>
          <input 
            type="email" 
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

ReactDOM.render(<App />, document.getElementById('root'));
