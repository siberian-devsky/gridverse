import { RequestHandler } from "express";
import { PrismaClient } from "../generated/prisma";

const prisma = new PrismaClient()

// GET /cells - get all cells
export const getAllCells: RequestHandler = async (req, res) => {
  try {
    const cellData = await prisma.basicCell.findMany()

    if (!cellData) {
      res.status(404).json({
        status: 404,
        message: 'Cells not found'
      })
    }

    res.status(200).json({
      status: 200,
      message: 'get all cells ok',
      data: cellData
    })
  } catch (err) {
    console.error("getAllCells error:", err)
    res.status(500).json({
      status: 500,
      message: "Internal Server Error"
    })
  }
}

// GET /cells/:name - get one cell by name
export const getOneCellByName: RequestHandler = async (req, res) => {
  try {
    const name = req.params.name
    const cell = await prisma.basicCell.findUnique({ where: { name } })

    if (!cell) {
      res.status(404).json({
        status: 404,
        message: `Cell '${name}' not found`
      })
    }

    res.status(200).json({
      status: 200,
      message: cell,
    })
  } catch (err) {
    console.error("getOneCellByName error:", err)
    res.status(500).json({
      status: 500,
      mesage: "Internal Server Error"
    })
  }
}

// POST /cells - add a new cell
export const createCell: RequestHandler = async (req, res) => {
  const { name, icon, iconCode, currentValue } = req.body

  // Validate payload
  if (!name || !icon || !iconCode || currentValue === undefined) {
    res.status(400).json({
      status: 400,
      message: "Missing required cell fields"
    })
  }

  try {
    // Prevent duplicate
    const exists = await prisma.basicCell.findUnique({ where: { name } })
    
    if (!exists) {
      const newCell = await prisma.basicCell.create({
        data: { name, icon, iconCode, currentValue }
      })
  
      res.status(201).json({
        status: 201,
        message: `${name} created`,
        data: newCell
      })

    } else {
      res.status(409).json({
        status: 409,
        message: `${name} already exists`
      })
    }

  } catch (err) {
    console.error("createCell error:", err)
    res.status(500).json({
      status: 500,
      message: "Internal Server Error"
    })
  }
}

// PUT /cells - update an existing cell
export const updateCell: RequestHandler = async (req, res) => {
  const { id, name, icon, iconCode, currentValue } = req.body

  if (!name || !icon || !iconCode || currentValue === undefined) {
    res.status(400).json({ error: "Missing required cell fields" })
  }

  try {
    const record = await prisma.basicCell.findUnique({ where: { id: id } })

    if (!record) {
      res.status(404).json({
        status: 404,
        message: `Cell '${name}' not found`
      })
      return
    }

    const updated = await prisma.basicCell.update({
      where: { id: record.id },
      data: {
        name: name || record.name, // fallback to whatever is in the db
        icon: icon || record.icon,
        iconCode: iconCode || record.iconCode,
        currentValue: currentValue || record.currentValue
      }
    })
      res.status(200).json({
        status: "Cell updated",
        message: {newData: updated}
      })

  } catch (err) {
    console.error("updateCell error:", err)
    res.status(500).json({
      status: 500,
      message: "Internal Server Error"
    })
  }
}

// DELETE /cells/delete/:name - delete cell by name
export const deleteCellByName: RequestHandler = async (req, res) => {
  const { name } = req.body
  console.debug(`name: ${name}`)

  if (!name) {
    res.status(400).json({
      status: 400,
      message: "no name was input for me to delete",
    })
  }

  try {
      const deleted = await prisma.basicCell.delete({
          where: { name: name }
      })

      console.log(`${name} was purged`)
      res.status(200).json({
          status: 200,
          message: `${name} deleted`,
          data: deleted
      })

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    if (err.code === 'P2025') {
        res.status(404).json({
            status: 404,
            message: `${name} does not exist`
        })
    }

      console.error(err)
      res.status(500).json({
          status: 500,
          message: 'Unexpected error during delete'
      })
  }
}