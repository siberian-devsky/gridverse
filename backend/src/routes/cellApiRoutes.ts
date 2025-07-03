
import { Router } from "express";
import {
    getAllCells,
    getOneCellByName,
    createCell,
    updateCell,
    deleteCellByName
} from "../controllers/cellController";

const router = Router()

router.get('/cells', getAllCells)
router.get('/cells/:name', getOneCellByName)
router.post('/cells/create', createCell)
router.delete('/cells/delete/:name', deleteCellByName)
router.put('/cells/update/:id', updateCell)


export default router