
import React from 'react';
import { APIProvider, Map, Marker } from '@vis.gl/react-google-maps';

function MapComponent() {
  const position = { lat: 49.262481, lng: -123.244766 };

  return (
    <APIProvider apiKey={'YOUR_API_KEY'}>
      {/* <Map center={position} zoom={10}>
        <Marker position={position} />
      </Map> */}
    </APIProvider>
  );
}

export default MapComponent;


// import React from 'react';
// import GoogleMapReact from 'google-map-react';

// const MapComponent = ({ text }) => <div>{text}</div>;

// export default function SimpleMap() {
//   const defaultProps = {
//     center: {
//       lat: 49.262481,
//       lng: -123.244766
//     },
//     zoom: 11
//   };

//   // You can adjust these styles to position and size the map as you need
//   const mapStyle = {
//     height: '500px', // Adjust the height as required
//     width: '300px', // Adjust the width as required
//     position: 'absolute', // Use absolute positioning
//     top: '100px', // Distance from the top
//     left: '20px', // Distance from the right (use 'left' if you want it on the left side)
//     boxShadow: '10 2px 6px rgba(0, 0, 0, 0)' // Optional shadow for better visibility
//   };

//   return (
//     <div style={mapStyle}>
//       <GoogleMapReact
//         bootstrapURLKeys={{ key: "" }} // Replace with your API key
//         defaultCenter={defaultProps.center}
//         defaultZoom={defaultProps.zoom}
//       >
//         <MapComponent
//           lat={49.262481}
//           lng={-123.244766}
//           text="My Marker"
//         />
//       </GoogleMapReact>
//     </div>
//   );
// }
