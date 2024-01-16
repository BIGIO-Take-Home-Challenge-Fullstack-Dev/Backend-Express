import express from "express";
import {
    getChapter,
    getChapterById,
    saveChapter,
    updateChapter,
    deleteChapter
} from "../controllers/ChapterController.js";

const router = express.Router();

router.get('/chapter', getChapter);
router.get('/chapter/:id', getChapterById);
router.post('/chapter', saveChapter);
router.patch('/chapter/:id', updateChapter);
router.delete('/chapter/:id', deleteChapter);

export default router;