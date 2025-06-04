import express, { Request, Response, Router } from 'express';
import { getCells, updateCell } from '../../db/cells';

const router: Router = express.Router();

// GET all cells
router.get('/', (req: Request, res: Response) => {
    const cells = getCells()
    res.json({ cells })
});

// PUT update cell
router.put('/:id', (req: Request, res: Response) => {
    const { id } = req.params;
    const { age, bgColor } = req.body;
    const updatedCell = updateCell(Number(id), { age, bgColor })
    if (updatedCell) {
        res.json(updatedCell)
    } else {
        res.status(404).json({ error: 'Cell not found' })
    }
});

export default router;