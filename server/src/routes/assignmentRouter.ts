import { Router } from "express";
import { getAssignments } from "../controllers/assignmentController";
const router = Router();

router.get("/getAssignments", getAssignments);

export default router;
