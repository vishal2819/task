import PersonalForm from './components/Form';
import ExperienceForm from './components/ExperienceForm';
import './App.css'

const App = () => {
  return (
    <div>
      <h1>Personal Information</h1>
      <PersonalForm />

      <hr />

      <h1>Experience Information</h1>
      <ExperienceForm />
    </div>
  );
};

export default App;
