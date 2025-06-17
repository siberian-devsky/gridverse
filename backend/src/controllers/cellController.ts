import { Request, Response } from "express";
import { PrismaClient } from "../generated/prisma";

const prisma = new PrismaClient()

// get all cells
export async function getAllCells(req: Request, res: Response) {
    try {
        const celldata = await prisma.basicCell.findMany()
        res.status(200).json(celldata)
    } catch (err) {
        console.error(err)
        res.status(500).json({ error: "Internal Server Error" })
    } finally {
        prisma.$disconnect()
    }
}

// get one cell by name
export async function getOneCellByName(req: Request, res: Response) {
    try {
        const name = req.params.name
        const cell = await prisma.basicCell.findFirst({
            where: {name: name}
        })
        if (cell) {
            res.status(200).json(cell)
        } else {
            res.status(404).json({ notfound: `${name}` })
        }

    } catch (err) {
        console.error(err)
        res.status(500).json({ error: "Internal Server Error" })
    } finally {
        prisma.$disconnect()
    }
}

// get 