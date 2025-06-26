// backend/src/controllers/cellController.ts
import { Request, Response } from "express";
import { PrismaClient } from "../generated/prisma";
// import { CellData } from "../types"; 

const prisma = new PrismaClient()

// GET /cells - get all cells
export async function getAllCells(req: Request, res: Response): Promise<Response> {
  try {
    console.debug("this is it")
    const celldata = await prisma.basicCell.findMany()
    return res.status(200).json(celldata)
  } catch (err) {
    console.error("getAllCells error:", err)
    return res.status(500).json({ error: "Internal Server Error" })
  }
}

// GET /cells/:name - get one cell by name
export async function getOneCellByName(req: Request, res: Response): Promise<Response> {
  try {
    const name = req.params.name
    const cell = await prisma.basicCell.findUnique({ where: { name } })

    if (!cell) {
      return res.status(404).json({ error: `Cell '${name}' not found` })
    }

    return res.status(200).json(cell)
  } catch (err) {
    console.error("getOneCellByName error:", err)
    return res.status(500).json({ error: "Internal Server Error" })
  }
}

// POST /cells - create a new cell
export async function createCell(req: Request, res: Response): Promise<Response> {
  const { name, icon, iconCode, currentValue } = req.body

  console.log("// POST /cells - create a new cell")

  // Validate payload
  if (!name || !icon || !iconCode || currentValue === undefined) {
    return res.status(400).json({ error: "Missing required cell fields" })
  }

  try {
    // Prevent duplicate
    const existing = await prisma.basicCell.findUnique({ where: { name } })
    if (existing) {
      return res.status(400).json({ error: `Cell '${name}' already exists` })
    }

    const newCell = await prisma.basicCell.create({
      data: { name, icon, iconCode, currentValue }
    })

    return res.status(201).json(newCell)
  } catch (err) {
    console.error("createCell error:", err)
    return res.status(500).json({ error: "Internal Server Error" })
  }
}

// PUT /cells - update an existing cell
export async function updateCell(req: Request, res: Response): Promise<Response> {
  const { name, icon, iconCode, currentValue } = req.body

  if (!name || !icon || !iconCode || currentValue === undefined) {
    return res.status(400).json({ error: "Missing required cell fields" })
  }

  try {
    const record = await prisma.basicCell.findUnique({ where: { name } })

    if (!record) {
      return res.status(404).json({ error: `Cell '${name}' not found` })
    }

    const updated = await prisma.basicCell.update({
      where: { id: record.id },
      data: { name, icon, iconCode, currentValue }
    })

    return res.status(200).json({ message: "Cell updated", cell: updated })
  } catch (err) {
    console.error("updateCell error:", err)
    return res.status(500).json({ error: "Internal Server Error" })
  }
}

// DELETE /cells/delete/:name - delete cell by name
export async function deleteCellByName(req: Request, res: Response): Promise<Response> {
  const { name } = req.body

  if (!name) {
    return res.status(400).json({
      status: res.status,
      message: "no name was input for me to delete",
    })
  }

  try {
    const deleted = await prisma.basicCell.delete({
      where: {name: name}
    })
    console.log(`${deleted} was purged`)
  } catch (err) {
    console.log(err)
    return res.status(500).json({
      status: res.status,
      message: `could not delete ${name}`
    })
  }

  return res.status(204).json({
    status: 204,
    message: `${name} deleted`
  })
}
