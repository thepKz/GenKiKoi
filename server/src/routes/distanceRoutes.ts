import express from "express";
import {
  addressAutocomplete,
  calculateRoute,
} from "../controllers/distanceController";

const router = express.Router();

router.get("/autocomplete", addressAutocomplete);
router.get("/calculate-route", calculateRoute);

export default router;
