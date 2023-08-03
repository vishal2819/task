const express = require('express');
const mongoose = require('mongoose');

// Connect to the MongoDB database
mongoose.connect('mongodb://localhost:27017/my_database', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const personalSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  email: { type: String, required: true },
  mobile: { type: Number, required: true },
});

const PersonalModel = mongoose.model('Personal', personalSchema);

const officialSchema = new mongoose.Schema({
  years: { type: Number, required: true },
  company: { type: String, required: true },
  city: { type: String, required: true },
  role: { type: String, required: true },
});

const OfficialModel = mongoose.model('Official', officialSchema);

const app = express();
app.use(express.json());

// POST endpoint to handle form input for personalSchema
app.post('/api/personal', async (req, res) => {
  try {
    // Extract data from the request body
    const { firstName, email, mobile } = req.body;

    // Validate the data against the schema
    const personalData = new PersonalModel({ firstName, email, mobile });
    const validationResult = personalData.validateSync();
    if (validationResult) {
      // If validation fails, respond with a 400 Bad Request status code and error messages
      return res.status(400).json({ error: validationResult.errors });
    }

    // Save the data to the database
    const savedData = await personalData.save();

    // Respond with the saved data
    res.status(201).json(savedData);
  } catch (error) {
    // If any other error occurs, respond with a 500 Internal Server Error status code
    res.status(500).json({ error: 'Something went wrong!' });
  }
});

// POST endpoint to handle form input for officialSchema
app.post('/api/official', async (req, res) => {
  try {
    // Extract data from the request body
    const { experiences } = req.body;

    // Validate the data against the schema
    if (!experiences || !Array.isArray(experiences) || experiences.length === 0) {
      return res.status(400).json({ error: 'Experiences must be an array with at least one experience.' });
    }

    const savedExperiences = [];

    for (const experience of experiences) {
      const { years, company, city, role } = experience;
      const officialData = new OfficialModel({ years, company, city, role });
      const validationResult = officialData.validateSync();

      if (validationResult) {
        return res.status(400).json({ error: validationResult.errors });
      }

      const savedData = await officialData.save();
      savedExperiences.push(savedData);
    }

    // Respond with the saved experiences
    res.status(201).json(savedExperiences);
  } catch (error) {
    // If any other error occurs, respond with a 500 Internal Server Error status code
    res.status(500).json({ error: 'Something went wrong!' });
  }
});

// Start the server
const port = 3000;
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
