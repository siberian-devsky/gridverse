"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cells_1 = require("../../db/cells");
const router = express_1.default.Router();
// GET all cells
router.get('/', (req, res) => {
    const cells = (0, cells_1.getCells)();
    res.json({ cells });
});
// PUT update cell
router.put('/:id', (req, res) => {
    const { id } = req.params;
    const { age, bgColor } = req.body;
    const updatedCell = (0, cells_1.updateCell)(Number(id), { age, bgColor });
    if (updatedCell) {
        res.json(updatedCell);
    }
    else {
        res.status(404).json({ error: 'Cell not found' });
    }
});
exports.default = router;
