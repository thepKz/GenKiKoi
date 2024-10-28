import axios from "axios";
import { Request, Response } from "express";

// Constants
const NOMINATIM_BASE_URL = "https://nominatim.openstreetmap.org";
const OSRM_BASE_URL = "http://router.project-osrm.org/route/v1/driving";
const GENKIKOI_NAME = "Genkikoi - Thú y cá Koi";

// Interfaces
interface NominatimResponse {
  lat: string;
  lon: string;
  display_name: string;
}

interface OSRMResponse {
  routes: {
    distance: number;
    duration: number;
    geometry: string;
  }[];
}

export const addressAutocomplete = async (req: Request, res: Response) => {
  try {
    const { query } = req.query;
    if (!query) {
      return res
        .status(400)
        .json({ message: "Vui lòng nhập địa chỉ để tìm kiếm" });
    }

    const response = await axios.get(`${NOMINATIM_BASE_URL}/search`, {
      params: {
        q: query,
        format: "json",
        limit: 5,
        countrycodes: "vn",
      },
    });

    if (!Array.isArray(response.data)) {
      return res.status(200).json({ data: [] });
    }

    const suggestions = response.data.map((item: NominatimResponse) => ({
      value: item.display_name,
      label: item.display_name,
    }));

    return res.status(200).json({ data: suggestions });
  } catch (error: any) {
    console.log(error);
    return res
      .status(500)
      .json({ message: "Có lỗi xảy ra khi tìm kiếm địa chỉ" });
  }
};

export const calculateRoute = async (req: Request, res: Response) => {
  try {
    const { address } = req.query;
    if (!address) {
      return res
        .status(400)
        .json({ message: "Vui lòng nhập địa chỉ xuất phát" });
    }

    // Tìm tọa độ địa chỉ xuất phát
    const originResponse = await axios.get<NominatimResponse[]>(
      `${NOMINATIM_BASE_URL}/search`,
      {
        params: {
          q: address,
          format: "json",
          limit: 1,
        },
      }
    );

    if (!originResponse.data?.[0]) {
      return res
        .status(404)
        .json({ message: "Không tìm thấy địa chỉ xuất phát" });
    }

    const origin = {
      lat: parseFloat(originResponse.data[0].lat),
      lon: parseFloat(originResponse.data[0].lon),
    };

    // Tọa độ cố định của Genkikoi
    const destination = { lat: 10.8415, lon: 106.8099 };

    // Tính toán tuyến đường
    const routeResponse = await axios.get<OSRMResponse>(
      `${OSRM_BASE_URL}/${origin.lon},${origin.lat};${destination.lon},${destination.lat}?overview=full&geometries=polyline`
    );

    if (!routeResponse.data.routes?.[0]) {
      return res.status(404).json({ message: "Không tìm thấy tuyến đường" });
    }

    const route = routeResponse.data.routes[0];
    const distance = route.distance / 1000; // Chuyển từ mét sang km

    // Tính thời gian di chuyển
    const averageSpeedKmh = 30;
    const adjustmentFactor = 1.2;
    const estimatedDurationMinutes = Math.round(
      (distance / averageSpeedKmh) * adjustmentFactor * 60
    );

    const coordinates = decodePolyline(route.geometry);

    return res.status(200).json({
      data: {
        origin,
        destination: {
          ...destination,
          name: GENKIKOI_NAME,
        },
        route: coordinates,
        distance: distance.toFixed(2),
        duration: formatDuration(estimatedDurationMinutes),
      },
    });
  } catch (error: any) {
    console.log(error);
    return res
      .status(500)
      .json({ message: "Có lỗi xảy ra khi tính toán tuyến đường" });
  }
};

// Helper functions
function formatDuration(minutes: number): string {
  const hours = Math.floor(minutes / 60);
  const mins = Math.round(minutes % 60);
  return `${hours} giờ ${mins} phút`;
}

function decodePolyline(str: string, precision = 5) {
  let index = 0,
    lat = 0,
    lng = 0,
    coordinates = [],
    shift = 0,
    result = 0,
    byte = null,
    latitude_change,
    longitude_change,
    factor = Math.pow(10, precision);

  while (index < str.length) {
    byte = null;
    shift = 0;
    result = 0;

    do {
      byte = str.charCodeAt(index++) - 63;
      result |= (byte & 0x1f) << shift;
      shift += 5;
    } while (byte >= 0x20);

    latitude_change = result & 1 ? ~(result >> 1) : result >> 1;

    shift = result = 0;

    do {
      byte = str.charCodeAt(index++) - 63;
      result |= (byte & 0x1f) << shift;
      shift += 5;
    } while (byte >= 0x20);

    longitude_change = result & 1 ? ~(result >> 1) : result >> 1;

    lat += latitude_change;
    lng += longitude_change;

    coordinates.push([lat / factor, lng / factor]);
  }

  return coordinates;
}
