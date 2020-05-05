import React, {useState} from 'react';
import {connect} from 'react-redux';
import {GoogleApiWrapper} from "google-maps-react";
import MapRenderer from './renderer';
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from 'react-places-autocomplete';

const MapComponent = ({
                        initialised,
                        apiKey,
                        selectedPoint
                      }) => {
  const [address, setAddress] = useState('');
  const [position, setPosition] = useState({
    lat: selectedPoint.lat,
    lng: selectedPoint.lng
  });

  return initialised ? (
    <>
      <PlacesAutocomplete
        value={address}
        onChange={(address) => setAddress(address)}
        onSelect={(address) => {
          setAddress(address);
          geocodeByAddress(address)
            .then(results => getLatLng(results[0]))
            .then(latLng => {
              setPosition({
                lat: latLng.lat,
                lng: latLng.lng
              })
            })
            .catch(error => console.error('Error', error));
        }}
      >
        {({getInputProps, suggestions, getSuggestionItemProps}) => {
          return (<div className="auto-wrapper">
            <input
              {...getInputProps({
                placeholder: 'Search Places ...',
                className: 'location-search-input',
              })}
            />
            <div className="autocomplete-dropdown-container">
              {suggestions.map(suggestion => {
                const className = suggestion.active
                  ? 'suggestion-item--active'
                  : 'suggestion-item';
                const style = suggestion.active
                  ? {backgroundColor: '#efeef4', cursor: 'pointer'}
                  : {backgroundColor: '#ffffff', cursor: 'pointer'};
                return (
                  <div
                    {...getSuggestionItemProps(suggestion, {
                      className,
                      style,
                    })}
                  >
                    <span>{suggestion.description}</span>
                  </div>
                );
              })}
            </div>
          </div>);
        }}
      </PlacesAutocomplete>
      <span className="close" title="Clear" onClick={() => {
        setAddress('');
        setPosition({
          lat: 0,
          lng: 0
        })
      }
      }/>
      <MapRenderer
        location={position}
        apiKey={apiKey}
        mapZoom={"17"}
        draggable={true}
        gestureHandling={'auto'}
        mapTypeControl={false}
        scaleControl={false}
        zoomControl={true}
        streetViewControl={false}
        rotateControl={true}
        fullscreenControl={false}
      />
    </>) : null;
};

export default GoogleApiWrapper(
  (props) => ({
      apiKey: props.apiKey,
    }
  ))(connect(
  state => ({
    selectedPoint: state.selectedPoint,
    SDK: state.SDK,
    initialised: state.initialised
  })
)(MapComponent))
