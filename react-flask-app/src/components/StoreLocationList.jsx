import React from 'react';

const StoreLocation = ({ location }) => {
  const { "Location Name": name, "Store Address": address, City: city, "Postal/Zip Code": zip } = location;

  return (
    <div className="store-location">
      <h3>{name}</h3>
      <p>{address}, {city}, {zip}</p>
    </div>
  );
};

const StoreLocationsList = ({ locations }) => {
  return (
    <div className="store-locations-list">
      {locations.map((location, index) => (
        <StoreLocation key={index} location={location} />
      ))}
    </div>
  );
};

export default StoreLocationsList;
