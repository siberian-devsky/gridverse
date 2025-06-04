"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateCell = exports.getCells = void 0;
const data_json_1 = __importDefault(require("../../db/data.json"));
const getCells = () => {
    return data_json_1.default.cells;
};
exports.getCells = getCells;
const updateCell = (id, updates) => {
    const cell = data_json_1.default.cells.find(c => c.id === id);
    if (cell) {
        Object.assign(cell, updates);
        return cell;
    }
    return null;
};
exports.updateCell = updateCell;
