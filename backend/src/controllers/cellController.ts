import { Request, Response } from "express";
import { PrismaClient } from "../generated/prisma";

const prisma = new PrismaClient()

// get all cells
export async function getAllCells (req: Request, res: Response): Promise<Response> {
    try {
        const celldata = await prisma.basicCell.findMany()
        return res.status(200).json(celldata)
    } catch (err) {
        console.error(err)
        return res.status(500).json({ error: "Internal Server Error" })
    }
}

// get one cell by name
export async function getOneCellByName (req: Request, res: Response): Promise<Response> {
    try {
        const name = req.params.name
        const cell = await prisma.basicCell.findFirst({
            where: {name: name}
        })
        if (cell) {
            return res.status(200).json(cell)
        } else {
            return res.status(404).json({ notfound: `${name}` })
        }

    } catch (err) {
        console.error(err)
        return res.status(500).json({ error: "Internal Server Error" })
    }
}

// create a cell
export async function createCell (req: Request, res: Response): Promise<Response> {
    // validate the form data
    const { name, icon, iconCode, currentValue } = req.body
    if (!name || !icon || !iconCode || currentValue === undefined) {
        return res.status(400).json({ error: "bad request" });
    }   

    // check for existing
    const alreadyHere = await prisma.basicCell.findFirst({ where: {name: name} })
    if (alreadyHere) return res.status(400).json({ error: `${name} already exists` });

    try {
        // create
        const newCell = await prisma.basicCell.create({
            data: {
                name: name,
                icon: icon,
                iconCode: iconCode,
                currentValue: currentValue
            }
        });
        return res.status(201).json(newCell)
    } catch (err) {
        return res.status(500).json({ error: "server error", err })
    }
}