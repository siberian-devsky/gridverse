import express from 'express'
import cors from 'cors'
import cellRoutes from './api/cells/index'

const app = express()
const port = 4000

app.use(cors())
app.use(express.json())

app.use('/api/cells', cellRoutes)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
