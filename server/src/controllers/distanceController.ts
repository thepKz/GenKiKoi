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
    // Thêm các trường khác nếu cần
}

// API Controllers
export const addressAutocomplete = async (req: Request, res: Response) => {
    try {
        const { query } = req.query;
        if (!query) {
            return res.status(400).json({ error: 'Vui lòng nhập địa chỉ để tìm kiếm' });
        }

        const response = await axios.get(`${NOMINATIM_BASE_URL}/search`, {
            params: {
                q: query,
                format: 'json',
                limit: 5,
                countrycodes: 'vn'
            }
        });

        const data = response.data;

        // Có thể thêm xử lý dữ liệu ở đây nếu cần
        // Ví dụ: lọc kết quả, định dạng lại dữ liệu, v.v.

        res.json(data);
    } catch (error) {
        console.error('Lỗi khi tìm kiếm địa chỉ:', error);
        res.status(500).json({ error: 'Đã xảy ra lỗi khi tìm kiếm địa chỉ' });
    }
};

export const calculateRoute = async (req: Request, res: Response) => {
    try {
        const { address } = req.query;
        if (!address) {
            return res.status(400).json({ error: 'Vui lòng nhập địa chỉ xuất phát' });
        }

        // Tìm tọa độ của địa chỉ xuất phát
        const originResponse = await axios.get(`${NOMINATIM_BASE_URL}/search?q=${address}&format=json&limit=1`);
        const originData: any = await originResponse.data;
        console.log(originData);
        if (originData.length === 0) {
            return res.status(404).json({ error: 'Không tìm thấy địa chỉ xuất phát' });
        }

        const origin: Location = {
            lat: originData[0].lat,
            lon: originData[0].lon
        };

        // Tìm tọa độ của Genkikoi
        const destinationResponse = await axios.get(`${NOMINATIM_BASE_URL}/search?q=${encodeURIComponent(GENKIKOI_ADDRESS)}&format=json&limit=1`);
        const destinationData: any = await destinationResponse.data;

        if (!Array.isArray(destinationData) || destinationData.length === 0) {
            return res.status(404).json({ error: 'Không tìm thy địa chỉ Genkikoi' });
        }

        const destination: Location = {
            lat: destinationData[0].lat,
            lon: destinationData[0].lon
        };

        // Tính toán tuyến đường
        const routeResponse = await axios.get(`${OSRM_BASE_URL}/${origin.lon},${origin.lat};${destination.lon},${destination.lat}`);
        const routeData: any = await routeResponse.data;

        if (!routeData || !routeData.routes || routeData.routes.length === 0) {
            return res.status(404).json({ error: 'Không tìm thấy tuyến đường' });
        }

        const route = routeData.routes[0];
        const distance = route.distance / 1000; // Chuyển đổi từ mét sang km
        const duration = Math.round(route.duration / 60); // Chuyển đổi từ giây sang phút

        res.json({
            origin,
            destination: {
                ...destination,
                name: GENKIKOI_NAME
            },
            distance,
            duration,
            route: route.geometry.coordinates
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
    }[];
}

export const getRouteInfo = async (req: Request, res: Response) => {
    try {
        const { address } = req.body;

        if (!address) {
            return res.status(400).json({ error: 'Vui lòng cung cấp địa chỉ hợp lệ' });
        }

        // Lấy tọa độ của địa chỉ đã nhập
        const originResponse = await axios.get<NominatimResponse[]>(`https://nominatim.openstreetmap.org/search`, {
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
        const routeResponse = await axios.get<OSRMResponse>(`${OSRM_BASE_URL}/${origin.lon},${origin.lat};${destination.lon},${destination.lat}`);
        const routeData = routeResponse.data;

        if (!routeData.routes || routeData.routes.length === 0) {
            return res.status(404).json({ error: 'Không tìm thấy tuyến đường' });
        }

        const route = routeData.routes[0];
        const distance = route.distance / 1000; // Chuyển đổi từ mét sang km

        // Điều chỉnh thời gian ước tính
        const averageSpeedKmh = 30; // Giả sử tốc độ trung bình trong đô thị là 25 km/h
        const adjustmentFactor = 1.2; // Hệ số điều chỉnh để tính đến đèn giao thông, tắc đường, etc.
        const estimatedDurationHours = (distance / averageSpeedKmh) * adjustmentFactor;
        const estimatedDurationMinutes = Math.round(estimatedDurationHours * 60);

        res.json({
            distance: distance.toFixed(2),
            duration: formatDuration(estimatedDurationMinutes)
        });
    } catch (error) {
        console.error('Lỗi khi tính toán thông tin tuyến đường:', error);
        res.status(500).json({ error: 'Đã xảy ra lỗi khi tính toán thông tin tuyến đường' });
    }
};

function formatDuration(minutes: number): string {
    const hours = Math.floor(minutes / 60);
    const mins = Math.round(minutes % 60);
    return `${hours} giờ ${mins} phút`;
}
