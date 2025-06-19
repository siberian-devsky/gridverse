import { Router } from "express";
import {
    getAllCells,
    getOneCellByName,
    createCell
} from "../controllers/cellController";

const router = Router()

router.get('/cells', getAllCells)
router.get('/cells/:name', getOneCellByName)
router.post('/cells/create', createCell)

// router.put()
// update a cell

export default router