import express from "express";
import {
    getStory,
    getStoryById,
    saveStory,
    updateStory,
    deleteStory
} from "../controllers/StoryController.js";

const router = express.Router();

router.get('/story', getStory);
router.get('/story/:id', getStoryById);
router.post('/story', saveStory);
router.patch('/story/:id', updateStory);
router.delete('/story/:id', deleteStory);

export default router;