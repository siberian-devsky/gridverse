
import { Router } from "express";
import {
    getAllCells,
    getOneCellByName,
    createCell,
    deleteCellByName
} from "../controllers/cellController";

const router = Router()

// @ts-expect-error - these routes are overloaded for some reason
router.get('/cells', getAllCells)
// @ts-expect-error - ditto
router.get('/cells/:name', getOneCellByName)
// @ts-expect-error - ditto
router.post('/cells/create', createCell)
// @ts-expect-error - ditto
router.delete('/cells/delete/:name', deleteCellByName)

// router.put()
// update a cell


export default router