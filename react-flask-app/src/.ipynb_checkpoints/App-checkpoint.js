import React, { useState } from 'react';
import './App.css';
import forestBackground from './forest-background.jpg';
import siteLogo from './site-logo.jpg';

function App() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    sizePreference: '',
    activityPreference: '',
    intensityLevel: ''
  });

  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const handleNext = () => {
    setStep(step + 1);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Here, you can send the form data to your backend or handle it as needed
    console.log(formData);
    // Reset form data and step after submission
    setFormData({
      sizePreference: '',
      activityPreference: '',
      intensityLevel: ''
    });
    setStep(1); // Reset to first step
  };

  const renderSurveyStep = () => {
    switch (step) {
      case 1:
        return (
          <>
            <h2>Clothing Size Preference</h2>
            <div className="button-group">
              <button className={formData.sizePreference === 'women' ? 'selected' : ''} type="button" name="sizePreference" value="women" onClick={handleChange}>Women</button>
              <button className={formData.sizePreference === 'men' ? 'selected' : ''} type="button" name="sizePreference" value="men" onClick={handleChange}>Men</button>
              <button className={formData.sizePreference === 'unisex' ? 'selected' : ''} type="button" name="sizePreference" value="unisex" onClick={handleChange}>Unisex</button>
            </div>
            <button type="button" onClick={handleNext}>Next</button>
          </>
        );
      case 2:
        return (
          <>
            <h2>Athletic Activity Preference</h2>
            <div className="button-group">
              <button className={formData.activityPreference === 'running' ? 'selected' : ''} type="button" name="activityPreference" value="running" onClick={handleChange}>Running</button>
              <button className={formData.activityPreference === 'hiking' ? 'selected' : ''} type="button" name="activityPreference" value="hiking" onClick={handleChange}>Hiking</button>
              <button className={formData.activityPreference === 'yoga' ? 'selected' : ''} type="button" name="activityPreference" value="yoga" onClick={handleChange}>Yoga</button>
              <button className={formData.activityPreference === 'cycling' ? 'selected' : ''} type="button" name="activityPreference" value="cycling" onClick={handleChange}>Cycling</button>
              <button className={formData.activityPreference === 'other' ? 'selected' : ''} type="button" name="activityPreference" value="other" onClick={handleChange}>Other</button>
            </div>
            <button type="button" onClick={handleNext}>Next</button>
          </>
        );
      case 3:
        return (
          <>
            <h2>Activity Intensity Level</h2>
            <div className="button-group">
              <button className={formData.intensityLevel === 'low' ? 'selected' : ''} type="button" name="intensityLevel" value="low" onClick={handleChange}>Low</button>
              <button className={formData.intensityLevel === 'moderate' ? 'selected' : ''} type="button" name="intensityLevel" value="moderate" onClick={handleChange}>Moderate</button>
              <button className={formData.intensityLevel === 'high' ? 'selected' : ''} type="button" name="intensityLevel" value="high" onClick={handleChange}>High</button>
            </div>
            <button type="submit">Submit</button>
          </>
        );
      default:
        return null;
    }
  };

  return (
    <div className="App" style={{ backgroundImage: `url(${forestBackground})` }}>
      <div className="overlay">
        <div className="survey-box">
          <img src={siteLogo} className="site-logo" alt="Site Logo" />
          <h1>Forest Buddy 🌳</h1>
          <form onSubmit={handleSubmit}>
            {renderSurveyStep()}
          </form>
          {step === 4 && <p>Thank you for using Forest Buddy!</p>}
        </div>
      </div>
    </div>
  );
}

export default App;
