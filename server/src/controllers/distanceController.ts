import axios from 'axios';
import { Request, Response } from 'express';

// Constants
const NOMINATIM_BASE_URL = 'https://nominatim.openstreetmap.org';
const OSRM_BASE_URL = 'http://router.project-osrm.org/route/v1/driving';
const GENKIKOI_ADDRESS = 'Đại học FPT TP.HCM';
const GENKIKOI_NAME = 'Genkikoi - Thú y cá Koi';

// Interfaces
interface Location {
    lat: string;
    lon: string;
}

// Định nghĩa interface cho dữ liệu trả về từ Nominatim API
interface NominatimResponse {
    lat: string;
    lon: string;
}

// Tạo instance axios riêng cho Nominatim
const nominatimAxios = axios.create({
    baseURL: NOMINATIM_BASE_URL,
    headers: {
        'User-Agent': 'GenKiKoi/1.0 (https://staginggenkikoi.netlify.app)',
        'Accept-Language': 'vi,en',
        'Referer': 'https://staginggenkikoi.netlify.app'
      },
    // Thêm delay giữa các request
    timeout: 10000
});

// API Controllers
export const addressAutocomplete = async (req: Request, res: Response) => {
    try {
        const { query } = req.query;
        if (!query || typeof query !== 'string') {
            return res.status(400).json({ 
                message: "Vui lòng nhập địa chỉ để tìm kiếm" 
            });
        }

        // Thêm delay 1s giữa các request
        await new Promise(resolve => setTimeout(resolve, 1000));

        const response = await nominatimAxios.get('/search', {
            params: {
                q: query,
                format: 'json',
                limit: 5,
                countrycodes: 'vn',
                addressdetails: 1,
                'accept-language': 'vi'
            }
        });

        // Kiểm tra và chuyển đổi dữ liệu
        if (!Array.isArray(response.data)) {
            return res.json([]); // Trả về mảng rỗng nếu không phải array
        }

        const suggestions = response.data.map((item: any) => ({
            value: item.display_name,
            label: item.display_name,
            lat: item.lat,
            lon: item.lon
        }));

        return res.status(200).json({ data: suggestions });

    } catch (error: any) {
        console.error('Address Search Error:', {
            message: error.message,
            response: error.response?.data
        });

        // Xử lý các lỗi cụ thể
        if (error.response?.status === 403) {
            return res.status(429).json({
                message: "Đã vượt quá giới hạn request, vui lòng thử lại sau"
            });
        }

        if (error.response?.status === 429) {
            return res.status(429).json({
                message: "Quá nhiều yêu cầu, vui lòng thử lại sau"
            });
        }

        return res.status(500).json({
            message: "Có lỗi xảy ra khi tìm kiếm địa chỉ",
            error: error.message
        });
    }
};

export const calculateRoute = async (req: Request, res: Response) => {
    try {
        const { address } = req.query;
        if (!address) {
            return res.status(400).json({ error: 'Vui lòng nhập địa chỉ xuất phát' });
        }

        // Tìm tọa độ của địa chỉ xuất phát
        const originResponse = await axios.get<NominatimResponse[]>(`${NOMINATIM_BASE_URL}/search`, {
            params: {
                q: address,
                format: 'json',
                limit: 1
            }
        });

        if (!originResponse.data || originResponse.data.length === 0) {
            return res.status(404).json({ error: 'Không tìm thấy địa chỉ xuất phát' });
        }

        const origin = {
            lat: parseFloat(originResponse.data[0].lat),
            lon: parseFloat(originResponse.data[0].lon)
        };

        // Sử dụng tọa độ cố định cho Genkikoi
        const destination = { lat: 10.8415, lon: 106.8099 };

        // Sử dụng OSRM để tính toán tuyến đường
        const routeResponse = await axios.get<OSRMResponse>(
            `${OSRM_BASE_URL}/${origin.lon},${origin.lat};${destination.lon},${destination.lat}?overview=full&geometries=polyline`
        );
        const routeData = routeResponse.data;

        if (!routeData.routes || routeData.routes.length === 0) {
            return res.status(404).json({ error: 'Không tìm thấy tuyến đường' });
        }

        const route = routeData.routes[0];
        const distance = route.distance / 1000; // Chuyển đổi từ mét sang km

        // Điều chỉnh thời gian ước tính
        const averageSpeedKmh = 30; // Giả sử tốc độ trung bình trong đô thị là 30 km/h
        const adjustmentFactor = 1.2; // Hệ số điều chỉnh để tính đến đèn giao thông, tắc đường, etc.
        const estimatedDurationHours = (distance / averageSpeedKmh) * adjustmentFactor;
        const estimatedDurationMinutes = Math.round(estimatedDurationHours * 60);

        // Sau khi lấy route, decode geometry:
        const coordinates = decodePolyline(routeResponse.data.routes[0].geometry);

        // Cập nhật response:
        res.json({
            origin,
            destination: {
                ...destination,
                name: GENKIKOI_NAME
            },
            route: coordinates,  // Thêm coordinates vào response
            distance: distance.toFixed(2),
            duration: formatDuration(estimatedDurationMinutes),
        });
    } catch (error) {
        console.error('Lỗi khi tính toán tuyến đường:', error);
        res.status(500).json({ error: 'Đã xảy ra lỗi khi tính toán tuyến đường' });
    }
};

interface OSRMResponse {
    routes: {
        distance: number;
        duration: number;
        geometry: string;
    }[];
}

function formatDuration(minutes: number): string {
    const hours = Math.floor(minutes / 60);
    const mins = Math.round(minutes % 60);
    return `${hours} giờ ${mins} phút`;
}

// Thêm hàm decode polyline
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

        latitude_change = ((result & 1) ? ~(result >> 1) : (result >> 1));

        shift = result = 0;

        do {
            byte = str.charCodeAt(index++) - 63;
            result |= (byte & 0x1f) << shift;
            shift += 5;
        } while (byte >= 0x20);

        longitude_change = ((result & 1) ? ~(result >> 1) : (result >> 1));

        lat += latitude_change;
        lng += longitude_change;

        coordinates.push([lat / factor, lng / factor]);
    }

    return coordinates;
}
