import express from 'express';
import { addressAutocomplete, calculateRoute, getRouteInfo } from '../controllers/distanceController';

const distanceRoutes = express.Router()
;
distanceRoutes.get('/autocomplete', addressAutocomplete);
distanceRoutes.get('/calculate-route', calculateRoute);
distanceRoutes.post('/route-info', getRouteInfo);

export default distanceRoutes;