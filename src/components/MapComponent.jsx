import React from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';

const containerStyle = {
  width: '400px',
  height: '400px'
};

const center = {
  lat: -3.745,
  lng: -38.523
};

const MapComponent = ({ location, setLocation }) => {
  return (
    <LoadScript
      googleMapsApiKey="YOUR_API_KEY" // Replace with your actual API key
    >
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={location || center}
        zoom={10}
        onClick={(e) => setLocation({ lat: e.latLng.lat(), lng: e.latLng.lng() })}
      >
        {location && <Marker position={location} />}
      </GoogleMap>
    </LoadScript>
  );
};

export default MapComponent;
