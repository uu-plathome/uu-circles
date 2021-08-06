import http from  "http"
import { SocketIoEvent } from "@/src/lib/enum/app/SocketIoEvent"
import express, { Request, Response } from 'express'
import next from 'next'
import socketio from "socket.io"

const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()
const port = process.env.PORT || 3000

app
  .prepare()
  .then(() => {
    const server = express()
    server.use()

    server.post('/chat', (req: Request, res: Response) => {
      console.info('body', req.body)
      postIO(req.body)
      res.status(200).json({ message: 'success' })
    })

    server.all('*', async (req: Request, res: Response) => {
      return handle(req, res)
    })

    const httpServer = http.createServer(server)

    const io = new socketio.Server(httpServer)

    io.on('connection', (socket: socketio.Socket) => {
      console.info('id: ' + socket.id + ' is connected')
    })

    const postIO = (data) => {
      io.emit(SocketIoEvent.UPDATE_DATA, data)
    }

    httpServer.listen(port, (err?: any) => {
      if (err) throw err
      console.info(`> Ready on localhost:${port} - env ${process.env.NODE_ENV}`)
    })
  })
  .catch((ex) => {
    console.error(ex.stack)
    process.exit(1)
  })
