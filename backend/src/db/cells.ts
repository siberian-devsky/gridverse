import Data from '../../db/data.json'

export const getCells = () => {
    return Data.cells
}

export const updateCell = (id: number, updates: { age?: number, bgColor?: string }) => {
    const cell = Data.cells.find(c => c.id === id)
    if (cell) {
        Object.assign(cell, updates)
        return cell
    }
    return null
} 