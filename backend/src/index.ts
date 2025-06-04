import 'dotenv/config' //dev only
import cors from 'cors'
import express from 'express'
import gridRouter from './routes/grid'

const PORT = 4000
const app = express()

app.use(cors())
app.use(express.json())
app.use('/grid', gridRouter)

app.listen(PORT, () => {
    console.log('Express listening on port ', PORT)
})
