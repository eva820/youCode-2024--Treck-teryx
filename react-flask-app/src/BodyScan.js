import React, { useRef, useState } from 'react';
import { RecommendProduct } from './RecommendProduct';

export function BodyScan() {
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
            <button className="button" onClick={RecommendProduct}>Finish</button>
          </div>
        </div>
        </>
      )
      }
    </div>
  );

};