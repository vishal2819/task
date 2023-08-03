import { useState } from 'react';
import axios from 'axios';
import './Form.css'

const Form = () => {
  const [formData, setFormData] = useState({ firstName: '', email: '', mobile: '' });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Make a POST request to the backend API
      const response = await axios.post('http://localhost:3000/api/personal', formData);

      // Handle the response (e.g., display a success message)
      console.log('Data saved successfully:', response.data);
    } catch (error) {
      // Handle errors (e.g., display an error message)
      console.error('Error saving data:', error);
    }
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '20px' }}>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="firstName"
          placeholder="First Name"
          onChange={handleChange}
          style={{ marginBottom: '10px', padding: '5px' }}
        />
        <br />
        <input
          type="email"
          name="email"
          placeholder="Email"
          onChange={handleChange}
          style={{ marginBottom: '10px', padding: '5px' }}
        />
        <br />
        <input
          type="number"
          name="mobile"
          placeholder="Mobile"
          onChange={handleChange}
          style={{ marginBottom: '10px', padding: '5px' }}
        />
        <br />
        <button type="submit" style={{ background: 'blue', color: 'white', padding: '8px', borderRadius: '4px', cursor: 'pointer' }}>
          Submit
        </button>
      </form>
    </div>
  );
};

export default Form;
