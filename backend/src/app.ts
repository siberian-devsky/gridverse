import express from 'express'
import initMiddleware from './middleware'
import cellApiRoutes from './routes/cellApiRoutes'

const app = express()
const port = 4000

try {
    initMiddleware(app)
} catch (err) {
    console.log('could not initialize middleware', err)
}

app.use('/api/v1', cellApiRoutes)

app.listen(port, () => {
    console.log('listening on: ', port)
})