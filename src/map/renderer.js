import React, {useState, useEffect} from 'react';
import {GoogleApiWrapper, InfoWindow, Map, Marker} from 'google-maps-react';
import {setValue} from '../store/selectedPoint/selectedPoint.actions';
import {connect} from 'react-redux';
import pin from '../pin.png';

const darkStyles = [
  {
    'elementType': 'geometry',
    'stylers': [
      {
        'color': '#343333'
      }
    ]
  },
  {
    'elementType': 'labels.icon',
    'stylers': [
      {
        'visibility': 'off'
      }
    ]
  },
  {
    'elementType': 'labels.text.fill',
    'stylers': [
      {
        'color': '#757575'
      }
    ]
  },
  {
    'elementType': 'labels.text.stroke',
    'stylers': [
      {
        'color': '#212121'
      }
    ]
  },
  {
    'featureType': 'administrative',
    'elementType': 'geometry',
    'stylers': [
      {
        'color': '#454545'
      }
    ]
  },
  {
    'featureType': 'administrative.country',
    'elementType': 'labels.text.fill',
    'stylers': [
      {
        'color': '#9e9e9e'
      }
    ]
  },
  {
    'featureType': 'administrative.land_parcel',
    'stylers': [
      {
        'visibility': 'off'
      }
    ]
  },
  {
    'featureType': 'administrative.locality',
    'elementType': 'labels.text.fill',
    'stylers': [
      {
        'color': '#bdbdbd'
      }
    ]
  },
  {
    'featureType': 'poi',
    'elementType': 'labels.text.fill',
    'stylers': [
      {
        'color': '#757575'
      }
    ]
  },
  {
    'featureType': 'poi.park',
    'elementType': 'geometry',
    'stylers': [
      {
        'color': '#181818'
      }
    ]
  },
  {
    'featureType': 'poi.park',
    'elementType': 'labels.text.fill',
    'stylers': [
      {
        'color': '#616161'
      }
    ]
  },
  {
    'featureType': 'poi.park',
    'elementType': 'labels.text.stroke',
    'stylers': [
      {
        'color': '#1b1b1b'
      }
    ]
  },
  {
    'featureType': 'road',
    'elementType': 'geometry.fill',
    'stylers': [
      {
        'color': '#454545'
      }
    ]
  },
  {
    'featureType': 'road',
    'elementType': 'labels.text.fill',
    'stylers': [
      {
        'color': '#8a8a8a'
      }
    ]
  },
  {
    'featureType': 'road.arterial',
    'elementType': 'geometry',
    'stylers': [
      {
        'color': '#454545'
      }
    ]
  },
  {
    'featureType': 'road.highway',
    'elementType': 'geometry',
    'stylers': [
      {
        'color': '#3c3c3c'
      }
    ]
  },
  {
    'featureType': 'road.highway.controlled_access',
    'elementType': 'geometry',
    'stylers': [
      {
        'color': '#4e4e4e'
      }
    ]
  },
  {
    'featureType': 'road.local',
    'elementType': 'labels.text.fill',
    'stylers': [
      {
        'color': '#7e7e7e'
      }
    ]
  },
  {
    'featureType': 'transit',
    'elementType': 'labels.text.fill',
    'stylers': [
      {
        'color': '#757575'
      }
    ]
  },
  {
    'featureType': 'water',
    'elementType': 'geometry',
    'stylers': [
      {
        'color': '#181919'
      }
    ]
  },
  {
    'featureType': 'water',
    'elementType': 'labels.text.fill',
    'stylers': [
      {
        'color': '#3d3d3d'
      }
    ]
  }
];

const MapRenderer = (props) => {
  const {
    location: {
      lat = 0,
      lng = 0
    },
    locationName = '',
    locationAddress = '',
    mapZoom = '17',
    theme = 'Dark',
    gestureHandling = 'none',
    mapTypeControl = false,
    scaleControl = false,
    zoomControl = false,
    streetViewControl = false,
    rotateControl = false,
    fullscreenControl = false,
    google,
    draggable,
    setValue
  } = props;
  const [showInfo, changeShow] = useState(false);
  const [marker, setActiveMarker] = useState(null);
  const [position, setPosition] = useState({
    lat,
    lng
  });

  useEffect(() => {
    const newPosition = {
      lat: props.location.lat,
      lng: props.location.lng
    };
    setPosition(newPosition);

    draggable && setValue(newPosition)

  }, [props, draggable, setValue]);

  return (
    <Map
      gestureHandling={gestureHandling.toLowerCase() || 'none'}
      mapTypeControl={mapTypeControl}
      scaleControl={scaleControl}
      zoomControl={zoomControl}
      streetViewControl={streetViewControl}
      rotateControl={rotateControl}
      fullscreenControl={fullscreenControl}
      zoom={parseInt(mapZoom, 10)}
      containerStyle={draggable ? {
        width: '100%',
        height: '100%',
        position: 'relative',
        minHeight: '400px'
      }: {}}
      style={{
        width: '100%',
        height: '100%',
        position: 'relative',
        minHeight: '400px'
      }}
      center={{
        lat: lat,
        lng: lng
      }}
      initialCenter={{
        lat: lat,
        lng: lng
      }}
      styles={theme === 'Dark' ? darkStyles : new google.maps.StyledMapType()}
      onClick={() => {
        changeShow(false);
        setActiveMarker(null);
      }}
      google={google}
    >
      <Marker
        draggable={draggable}
        onDragend={(props, marker, e) => {
          setPosition({
            lat: e.latLng.lat(),
            lng: e.latLng.lng(),
          });

          draggable && setValue({
            lat: e.latLng.lat(),
            lng: e.latLng.lng(),
          })
        }}
        position={position}
        mapCenter={position}
        icon={{
          url: pin,
          anchor: new google.maps.Point(24, 24),
          scaledSize: new google.maps.Size(48, 48)
        }}
        onClick={(props, marker) => {
          changeShow(!showInfo);
          setActiveMarker(!showInfo ? marker : null);
        }}
      />

      {locationName || locationAddress ? (<InfoWindow
        marker={marker}
        visible={showInfo}
        onClose={() => {
          changeShow(false);
          setActiveMarker(null);
        }}
        style={{
          color: '#616161'
        }}
      >
        <div>
          <h1>{locationName}</h1>
          <p>{locationAddress}</p>
        </div>
      </InfoWindow>) : null}
    </Map>
  );
};

export default GoogleApiWrapper(
  (props) => ({
      apiKey: props.apiKey,
    }
  ))(connect(
  null,
  {
    setValue
  })(MapRenderer))

