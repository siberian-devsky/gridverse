import express from 'express'
import cors from 'cors'
import cellApiRoutes from './routes/cellApiRoutes'

const app = express()
const port = 4000
app.use(cors())

app.use(cors())
app.use(express.json())
app.use('/api/v1', cellApiRoutes)

app.listen(port, () => {
    console.log('listening on: ', port)
})