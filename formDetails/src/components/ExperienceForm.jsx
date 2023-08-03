import { useState } from 'react';
import axios from 'axios';
import './Experience.css'

const ExperienceForm = () => {
  const [experiences, setExperiences] = useState([
    { years: '', company: '', city: '', role: '' },
  ]);

  const handleChange = (index, e) => {
    const { name, value } = e.target;
    const updatedExperiences = [...experiences];
    updatedExperiences[index] = { ...updatedExperiences[index], [name]: value };
    setExperiences(updatedExperiences);
  };

  const addExperience = () => {
    setExperiences([...experiences, { years: '', company: '', city: '', role: '' }]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Make a POST request to the backend API to save experiences
      const response = await axios.post('http://localhost:3000/api/official', { experiences });

      // Handle the response (e.g., display a success message)
      console.log('Experiences saved successfully:', response.data);
    } catch (error) {
      // Handle errors (e.g., display an error message)
      console.error('Error saving experiences:', error);
    }
  };

  return (
    <div className="experience-form-container">
      <h2>Add Experiences</h2>
      <form onSubmit={handleSubmit}>
        {experiences.map((experience, index) => (
          <div className="experience-item" key={index}>
            <input
              type="number"
              name="years"
              placeholder="Years"
              value={experience.years}
              onChange={(e) => handleChange(index, e)}
              required
            />
            <input
              type="text"
              name="company"
              placeholder="Company"
              value={experience.company}
              onChange={(e) => handleChange(index, e)}
              required
            />
            <input
              type="text"
              name="city"
              placeholder="City"
              value={experience.city}
              onChange={(e) => handleChange(index, e)}
              required
            />
            <input
              type="text"
              name="role"
              placeholder="Role"
              value={experience.role}
              onChange={(e) => handleChange(index, e)}
              required
            />
          </div>
        ))}
        <div className="buttons-container">
          <button type="button" className="add-experience-btn" onClick={addExperience}>
            Add Experience
          </button>
          <button type="submit" className="submit-btn">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default ExperienceForm;
