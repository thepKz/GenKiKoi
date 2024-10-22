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

function MapController({ origin, destination, route }: MapControllerProps) {
  const map = useMap();

  useEffect(() => {
    if (origin && destination && route) {
      const bounds = L.latLngBounds([origin, destination]);
      route.forEach(point => bounds.extend(L.latLng(point)));
      map.fitBounds(bounds, { padding: [50, 50] });
    }
  }, [map, origin, destination, route]);

  return null;
}

interface MapProps {
  origin: L.LatLngExpression | null;
  destination: L.LatLngExpression | null;
  route: L.LatLngExpression[] | null;
}

function Map({ origin, destination, route }: MapProps) {
  const center: L.LatLngExpression = [10.8415, 106.8099]; // Default coordinates

  const originIcon = new L.Icon({
    iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-blue.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
  });

  const destinationIcon = new L.Icon({
    iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
  });

  return (
    <MapContainer center={center} zoom={13} style={{ height: '400px', width: '100%' }}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='This is created by Minthep'
      />
      {origin && <Marker position={origin} icon={originIcon} />}
      {destination && <Marker position={destination} icon={destinationIcon} />}
      {route && <Polyline positions={route} color="blue" />}
      <MapController origin={origin} destination={destination} route={route} />
    </MapContainer>
  );
}

export default Map;
