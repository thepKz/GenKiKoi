import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { useEffect } from 'react';
import { MapContainer, Marker, Polyline, TileLayer, useMap } from 'react-leaflet';

// Xóa dòng gây lỗi
// delete L.Icon.Default.prototype._getIconUrl;

// Thay thế bằng cách định nghĩa lại các icon mặc định
L.Icon.Default.imagePath = 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/';

const DefaultIcon = L.icon({
  iconRetinaUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-blue.png',
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-blue.png',
  shadowUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

L.Marker.prototype.options.icon = DefaultIcon;

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
      zoomAnimation={true} // Enable zoom animation
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='This is created by Minthep'
      />
      
      {origin && <Marker position={origin} />}
      <Marker position={destination} />
      
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
