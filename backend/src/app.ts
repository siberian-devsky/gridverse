import express from 'express'
import initMiddleware from './middleware'
import cellApiRoutes from './routes/cellApiRoutes'

// to run debug mode
// --inspect: opens a debug port (9229 by default)
// "debug": "ts-node-dev --respawn --transpile-only --inspect src/app.ts",

const app = express()
const port = 4000

try {
    initMiddleware(app)
    console.log("MIDDLEWARE INITIALIZED")
} catch (err) {
    console.log('could not initialize middleware', err)
}

app.use('/api/v1', cellApiRoutes)

app.listen(port, () => {
    console.log('listening on: ', port)
})