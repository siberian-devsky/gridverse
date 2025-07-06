import { Request, Response } from 'express'
import colors from './termColors'
import dayjs from 'dayjs'

export default function logger(req: Request, res: Response, next: () => void) {
  const timestamp = dayjs().format('ddd, MMM D YY - HH:mm:ss.SS')
  const { method, url } = req

  // reqest  
  console.log(
    // header
    `\n${colors.dim}REQ${colors.reset} ` +
    // timestamp
    `[${colors.cyan}${timestamp}${colors.reset}] ` +
    // method
    `[${colors.magenta}${method}${colors.reset}] ` +
    // url
    `[${colors.bgBlack}${colors.green}${url}${colors.reset}]`
  )

  // response
  res.on('finish', () => {
    const statusColor =
      res.statusCode >= 500 ? colors.red :
      res.statusCode >= 400 ? colors.yellow :
      res.statusCode >= 300 ? colors.magenta :
      colors.green

    console.log(
      // header 
      `${colors.dim}RES${colors.reset} ` +
      // timestamp
      `[${colors.cyan}${timestamp}${colors.reset}] ` +
      // method
      `[${colors.magenta}${method}${colors.reset}] ` +
      // status code + message
      `[${statusColor}${res.statusCode} ${res.statusMessage}${colors.reset}]`
    )
  })

  next()
}
