import { Router } from "express";
import { getAllCells } from "../controllers/cellController";
import { getOneCellByName } from "../controllers/cellController";

const router = Router()

router.get('/cells', getAllCells)
router.get('/cells/:name', getOneCellByName)

export default router