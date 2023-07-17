import express from "express";
import { createQuestion, getAllQuestions, getQuestion, updateQuestion } from "../controllers/frequentQuestionsController.js";

const router = express.Router();

router.get("/", getAllQuestions);
router.post("/", createQuestion);
router.put("/:id", updateQuestion);
router.get("/:id", getQuestion);


export default router;