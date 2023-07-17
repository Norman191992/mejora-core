import express from "express";
import { createScooter, getAllScooters, getScooter, updateScooter } from "../controllers/scootersController.js";

const router = express.Router();

router.get("/", getAllScooters);
router.post("/", createScooter);
router.put("/:id", updateScooter);
router.get("/:id", getScooter);


export default router;