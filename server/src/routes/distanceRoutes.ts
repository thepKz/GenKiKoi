import express from 'express';
import { addressAutocomplete, calculateRoute } from '../controllers/distanceController';

const distanceRoutes = express.Router()
;
distanceRoutes.get('/autocomplete', addressAutocomplete);
distanceRoutes.get('/calculate-route', calculateRoute);

export default distanceRoutes;