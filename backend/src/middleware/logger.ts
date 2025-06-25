import {Request, Response } from 'express'

// logging
export default function logger(req: Request, res: Response, next: () => void) {
    const { method, url, headers } = req
    
    console.log('')
    console.log(`[${new Date().toISOString()}] [${method}] [${url}]`)
    console.log('Headers: ', headers)

    res.on('finish', () => {
        console.log(`Responded with status ${res.statusCode}`);
    }); 
    
    next()
}