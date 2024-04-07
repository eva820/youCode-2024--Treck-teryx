import React, {useState} from 'react';
import './App.css';

function Header() {
  return (
    <header className="App-header">
      <p>Project Name</p>
    </header>
  )
}

const questions = [
  { text: 'Question 1', options: ['Option 1', 'Option 2', 'Option 3'] },
  { text: 'Question 2', options: ['Option A', 'Option B', 'Option C'] },
  { text: 'Question 3', options: ['Option i', 'Option ii', 'Option iii'] },
  // Add more questions as needed
];

const ChecklistSurvey = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedOptions, setSelectedOptions] = useState([]);

  const handleOptionSelect = (option) => {
    if (selectedOptions.includes(option)) {
      setSelectedOptions(selectedOptions.filter(item => item !== option));
    } else {
      setSelectedOptions([...selectedOptions, option]);
    }
  };

  const handleNextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      // Handle survey completion logic (e.g., submit the survey)
      console.log('Survey completed:', selectedOptions);
    }
  };

  return (
    <div className="survey">
      <h2 className="survey-title">{questions[currentQuestion].text}</h2>
      <form>
        {questions[currentQuestion].options.map((option, index) => (
          <div className="options" key={index}>
            <label>
              <input
                type="checkbox"
                checked={selectedOptions.includes(option)}
                onChange={() => handleOptionSelect(option)}
              />
              {option}
            </label>
          </div>
        ))}
        <button className="button" type="button" onClick={handleNextQuestion}>
          {currentQuestion === questions.length - 1 ? 'Finish' : 'Next'}
        </button>
      </form>
    </div>
  );
};

const Landing = () => {
  // State to control whether to display the Landing component or ChecklistSurvey component
  const [showLanding, setShowLanding] = useState(true); // shows landing by defeault

  // Function to toggle the display of the Landing component vs ChecklistSurvey component
  const toggleLanding = () => {
      setShowLanding(!showLanding); // toggles between true and false
  };

  return (
      <div>
          {/* Conditional rendering based on the showLanding state */}
          {showLanding ? (
              <div className="landing">
                  {/* Landing component */}
                  <h1>Welcome to 🦄🦄🦄!</h1>
                  <p>Click the button below to start.</p>
                  <button className="button" type="button" onClick={toggleLanding}>OPEN SURVEY</button>
                  {/* Add any other content of Landing component here */}
              </div>
          ) : ( // either show the ChecklistSurvey {v} or the landing page {^} based on showLanding boolean value
              <ChecklistSurvey />
          )}
      </div>
  );
};

function App() {
  return (
    <div className="element">
      <div className="App">
        <Header />
        <Landing />
      </div>
    </div>
  )
}

export default App;