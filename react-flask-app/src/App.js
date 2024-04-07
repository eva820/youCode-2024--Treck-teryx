import React, {useState, useRef} from 'react';
import './App.css';
// import Stores from './Stores';
import RecommendProduct from './RecommendProduct';
import axios from 'axios';
import ProductsComponent from './products';

function Header() {
  return (
    <header className="App-header">
      <p>YouCode 2024 - Treck'teryx Official Site</p>
    </header>
  )
}

const questions = [
  { 
    text: 'Activity Type', 
    options: [
      { text: 'Hiking', value: 'hiking' },
      { text: 'Climbing', value: 'climbing' },
      { text: 'Skiing', value: 'skiing' },
      { text: 'Biking', value: 'biking' },
      { text: 'Running', value: 'running' },
      // Add more activities as needed
    ]
  },
  { 
    text: 'Intensity', 
    options: [
      { text: 'Light', value: 'light' },
      { text: 'Moderate', value: 'moderate' },
      { text: 'Vigorous', value: 'vigorous' }
    ]
  },
  { 
    text: 'Product Type', 
    options: [
      { text: 'Shoes', value: 'shoes' },
      { text: 'Shell Jackets', value: 'shell-jackets' },
      { text: 'Pants', value: 'pants' },
      { text: 'Insulated Jackets', value: 'insulated-jackets' },
      { text: 'Fleece', value: 'fleece' },
      { text: 'Base Layer', value: 'base-layer' },
      { text: 'Shirts & Tops', value: 'shirts-and-tops' },
      { text: 'Shorts', value: 'shorts' },
      // Add more product types as needed
    ]
  },
  { 
    text: 'Clothing Preferences', 
    options: [
      { text: 'Women\'s', value: 'womens' },
      { text: 'Men\'s/Unisex', value: 'mens-unisex' },
      // Potentially more options could be added here
    ]
  },
  // {text: 'Size', options: [{text: 'XS'},{text: 'S'}, {text: 'M'}, {text: 'L'}, {text: 'XL'}]},
  
  { 
    text: 'Color Preferences', 
    options: [
      { text: 'Any', value: 'any' },
      { text: 'Black', value: 'black' },
      { text: 'Blue', value: 'blue' },
      { text: 'Red', value: 'red' },
      { text: 'Brown', value: 'brown' },
      { text: 'Purple', value: 'purple' },
      { text: 'Pink', value: 'pink' },
      // Add more color preferences as needed
    ]
  },
  { 
    text: 'Size', 
    options: [
      { text: 'XXS', value: 'XXS' },
      { text: 'XS', value: 'XS' },
      { text: 'S', value: 'S' },
      { text: 'M', value: 'M' },
      { text: 'L', value: 'L' },
      { text: 'XL', value: 'XL' },
      { text: 'XXL', value: 'XXL' },
      // Add more color preferences as needed
    ]
  },
  // Continue with other preferences as needed
];

const ChecklistSurvey = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [surveyCompleted, setSurveyCompleted] = useState(false);
  const [initiateBodyScan, setInitiateBodyScan] = useState(false);
  // const [filteredProducts, setFilteredProducts] = useState([]); 
  

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
      setSelectedOptions(selectedOptions);
 
    }
  };

  // const [surveyResults, setSurveyResults] = useState({});

  // const handleSurveyCompletion = (results) => {
  //   console.log('Survey Results:', results);
  //   setSurveyResults(results); // Store survey results in state
  // };


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
      const height_data = {
        height: inputValue
      }
      axios.post('http://127.0.0.1:8080/height', height_data)

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
              {surveyCompleted ? (
                <div>
                  <p>Scan completed!</p>
                </div>
              ) : (
                <>
                  <div>
                    <img src='http://127.0.0.1:8080/webcam' style={{ maxWidth: '100%' }}></img>
                  </div>
                  <div className="button-container">
                    <button className="button" onClick={() => { setSurveyCompleted(true) }}>Finish</button>
                  </div>
                </>
              )}
            </div>
          </>
        )
        }
      </div>
    );
  
  };  

  // const runSurvey = () => {
  //   return (
  //   <div>
  //     {!initiateBodyScan ?
  //       (<div className="survey">
  //         <>
  //           <h3 className="survey-title">{questions[currentQuestion].text}</h3>
  //           <form>
  //            {questions[currentQuestion].options.map((option, index) => (
  //               <div className="options" key={index}>
  //                 <label>
  //                   <input
  //                     type="checkbox"
  //                     value={option.value} // Use option.value for the value attribute
  //                     checked={selectedOptions.includes(option)}
  //                     onChange={() => handleOptionSelect(option)}
  //                   />
  //                   {option}
  //                 </label>
  //               </div>
  //             ))}
  //             <div className="button-container">
  //               {currentQuestion === questions.length - 2 ? (
  //                 <>
  //                   <button className="button" type="button" onClick={() => { setInitiateBodyScan(true) }}>Scan For Size!</button>
  //                   <button className="button" type="button" onClick={handleNextQuestion}>Input Size</button>
  //                 </>
  //               ) : (
  //                 <button className="button" type="button" onClick={handleNextQuestion}>Next</button>
  //               )}
  //             </div>
  //           </form>
  //         </>
  //       </div>
  //       ) : (
  //         <div>
  //           <BodyScan />
  //         </div>
  //       )}
  //   </div>
  //   )
  // }
  const runSurvey = () => {
    return (
      <div>
        {!initiateBodyScan ? (
          <div className="survey">
            <>
              <h3 className="survey-title">{questions[currentQuestion].text}</h3>
              <form>
                {questions[currentQuestion].options.map((option, index) => (
                  <div className="options" key={index}>
                    <label>
                      <input
                        type="checkbox"
                        value={option.value} // Use option.value for the value attribute
                        checked={selectedOptions.includes(option.value)} // Adjust this as necessary to match your state structure
                        onChange={() => handleOptionSelect(option.value)} // Pass option.value to your handler
                      />
                      {option.text} 
                    </label>
                  </div>
                ))}
                <div className="button-container">
                  {currentQuestion === questions.length - 1 ? (
                    <>
                      <button className="button" type="button" onClick={() => setInitiateBodyScan(true)}>Scan For Size!</button>
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
          <BodyScan />
        )}
      </div>
    );
  };
  

  return (
    <div>
      
       {!surveyCompleted ? runSurvey(): <ProductsComponent selection={selectedOptions}/>}

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
          <h1>Welcome to Treck'teryx!</h1>
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
  
  // const [filteredProductsInApp, setFilteredProductsInApp] = useState([]);

  const [surveyResults, setSurveyResults] = useState({});
  const [products, setProducts] = useState([]);

  const handleFilteredProducts = (filteredProducts) => {
    setProducts(filteredProducts);
  };
  
  const handleSurveyCompletion = (results) => {
    setSurveyResults(results);
  };
  

  return (
    <div className="background">
      <div className="App">
        <Header />
        {Object.keys(surveyResults).length === 0 ? (
          <Landing onSurveyComplete={handleSurveyCompletion} />
        ) : (
          null
          // onFilteredProduct = handleFilteredProducts
          // <ProductsComponent surveyResults={surveyResults} onFilteredProducts={handleFilteredProducts} />
          // <ProductsComponent onFilteredProducts={handleFilteredProducts} />
        )}
      </div>
    </div>
  );
}

export default App;
