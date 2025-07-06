
import { Router } from "express";
import {
    getAllCells,
    getOneCellByName,
    createCell,
    updateCell,
    deleteCellByName,
    deleteManyCellsByName
} from "../controllers/cellController";

const router = Router()

// static routes
router.get('/cells', getAllCells)
router.post('/cells/create', createCell)
router.delete('/cells/deletemany', deleteManyCellsByName)

// dynamic routes
router.get('/cells/:name', getOneCellByName)
router.put('/cells/update/:id', updateCell)
router.delete('/cells/delete/:name', deleteCellByName)

export default router