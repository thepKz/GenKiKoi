import express from 'express';
import { publicEnv } from '../config/publicEnv';

const router = express.Router();

router.get('/public-config', (req, res) => {
  res.json(publicEnv);
});

export default router;