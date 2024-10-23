import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { useEffect } from 'react';
import { MapContainer, Marker, Polyline, TileLayer, useMap } from 'react-leaflet';
import logo from '../assets/logo.jpg';

const OriginIcon = L.icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-red.png',
  iconRetinaUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png',
  shadowUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

const DestinationIcon = L.icon({
  iconUrl: logo,
  shadowUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-shadow.png',
  iconSize: [32, 32],
  iconAnchor: [16, 32],
  popupAnchor: [0, -32],
  shadowSize: [41, 41]
});

interface MapControllerProps {
  origin: L.LatLngExpression | null;
  destination: L.LatLngExpression | null;
  route: L.LatLngExpression[] | null;
}

function MapController({ origin, destination }: MapControllerProps) {
  const map = useMap();

  useEffect(() => {
    if (origin && destination) {
      const bounds = L.latLngBounds([origin, destination]);
      map.fitBounds(bounds, { 
        padding: [50, 50],
        duration: 1, // Add smooth animation duration
        animate: true // Enable animation
      });
    }
  }, [map, origin, destination]);

  return null;
}

interface MapProps {
  origin: L.LatLngExpression | null;
  destination: L.LatLngExpression;
  route: L.LatLngExpression[] | null;
}

function Map({ origin, destination, route }: MapProps) {
  return (
    <MapContainer
      center={destination}
      zoom={13}
      style={{ height: '400px', width: '100%' }}
      zoomAnimation={true}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='This is created by Meo'
      />
      
      {origin && <Marker position={origin} icon={OriginIcon} />}
      <Marker position={destination} icon={DestinationIcon} />
      
      {route && route.length > 0 && (
        <Polyline
          positions={route}
          color="blue"
          weight={3}
          opacity={0.7}
          smoothFactor={1}
        />
      )}

      <MapController origin={origin} destination={destination} route={route} />
    </MapContainer>
  );
}

export default Map;
