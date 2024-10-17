import React from 'react';

interface RouteInfoProps {
  distance: number;
  duration: number;
}

const RouteInfo: React.FC<RouteInfoProps> = ({ distance, duration }) => {
  return (
    <div>
      <h3>Thông tin tuyến đường:</h3>
      <p>Khoảng cách: {distance.toFixed(2)} km</p>
      <p>Thời gian ước tính: {duration} phút</p>
    </div>
  );
};

export default RouteInfo;
