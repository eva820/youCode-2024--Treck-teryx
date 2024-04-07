import React, {useState, useRef} from 'react';
import './App.css';
import Stores from './Stores';
import RecommendProduct from './recommendProduct';

function Header() {
  return (
    <header className="App-header">
      <p>Project Name</p>
    </header>
  )
}

const questions = [
  { text: 'Activity Type', options: ['Hiking', 'Climbing', 'Skiing'] },
  { text: 'Intensity', options: ['Light', 'Moderate', 'Vigorous'] },
  { text: 'Product Type', options: ['Jackets', 'Pants', 'Shirts & Tops', 'Shorts', 'Bags', 'Shoes', 'Gloves', 'Hats', 'Socks', 'Climbing Gear'] },
  { text: 'Clothing Preferences', options: ['Womens', 'Mens/Unisex'] },
  { text: 'Colour Preferences', options: ['Blue', 'Black','Green', 'Natural', 'Brown', 'Grey', 'Red', 'Orange', 'Yellow', 'Purple', 'Multi', 'Pink']},
  { text: 'Size', options: ['XXS', 'XS', 'S', 'M', 'L', 'XL', 'XXL', 'XXXL']},
  // Add more questions as needed
];

const ChecklistSurvey = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [surveyCompleted, setSurveyCompleted] = useState(false);
  const [initiateBodyScan, setInitiateBodyScan] = useState(false);

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
      setSurveyCompleted(true);
    }
  };

  function BodyScan() {
    console.log("Initiate Body Scan");
  
    const [videoStart, setVideoStart] = useState(false);
    const [inputValue, setInputValue] = useState(''); // [1
    const videoRef = useRef(null);
  
    const startVideo = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      } catch (err) {
        console.error('Error accessing video stream: ', err);
      }
    };
  
    const beginScan = () => {
      startVideo();
      setVideoStart(true);
      console.log('Submitted value:', inputValue);
      // Perform any other actions with the input value
    }
  
    const handleChange = (event) => {
      setInputValue(event.target.value);
    }
  
    return (
      <div>
        {!videoStart ? (
          <>
          <div className="input-container">
            <div>
              <h3 className="survey-title">Input your Height</h3>
              <input className="input" type="text" value={inputValue} onChange={handleChange} placeholder="Enter your height in inches"/>
            </div>
            <div className="button-container">
              <button className="button" onClick={beginScan}>Begin Scan!</button>
            </div>
          </div>
          </>
        ) : (
          <>
          <div className="video">
            <div>
              <video ref={videoRef} autoPlay playsInline style={{ maxWidth: '100%' }} />
            </div>
            <div className="button-container">
              <button className="button" onClick={() => {setSurveyCompleted(true)}}>Finish</button>
            </div>
          </div>
          </>
        )
        }
      </div>
    );
  
  };  

  const runSurvey = () => {
    return (
    <div>
      {!initiateBodyScan ?
        (<div className="survey">
          <>
            <h3 className="survey-title">{questions[currentQuestion].text}</h3>
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
              <div className="button-container">
                {currentQuestion === questions.length - 2 ? (
                  <>
                    <button className="button" type="button" onClick={() => { setInitiateBodyScan(true) }}>Scan For Size!</button>
                    <button className="button" type="button" onClick={handleNextQuestion}>Input Size</button>
                  </>
                ) : (
                  <button className="button" type="button" onClick={handleNextQuestion}>Next</button>
                )}
              </div>
            </form>
          </>
        </div>
        ) : (
          <div>
            <BodyScan />
          </div>
        )}
    </div>
    )
  }

  return (
    <div>
      {!surveyCompleted ? runSurvey() : <RecommendProduct />}
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
                  <p>A product recommendation service for individuals of all experience levels seeking outdoor adventure! 
                    <br></br>
                    Use button below to receive recommendations tailored to your needs!</p>
                  <button className="button" type="button" onClick={toggleLanding}>What are you looking for today?</button>
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
    <div className="background">
      <div className="App">
        <Header />
        <Landing />
      </div>
    </div>
  )
}

export default App;
