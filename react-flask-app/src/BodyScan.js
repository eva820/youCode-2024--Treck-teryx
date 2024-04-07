import React, { useRef } from 'react';

export function BodyScan() {
  console.log("Initiate Body Scan");

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

  return (
    <div>
      <div>
        <video ref={videoRef} autoPlay playsInline style={{ maxWidth: '100%' }} />
      </div>
      <div className="button-container">
        <button className="button" onClick={startVideo}>Begin Scan!</button>
      </div>
    </div>
  );

};
