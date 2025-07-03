import {Request, Response } from 'express'

// logging
export default function logger(req: Request, res: Response, next: () => void) {
    const { method, url } = req
    
    console.log('')
    console.log(`[${new Date().toISOString()}] [${method}] [${url}]`)
    
    // res.on('finish', () => {
    //     console.log(`Responded with status ${res.statusCode} for ${req.method}:${req.url}`);
    // }); 
    
    next()
}