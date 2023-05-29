import http from 'http'
import metrics from '@overleaf/metrics'
import logger from '@overleaf/logger'
import express from 'express'
import exegesisExpress from 'exegesis-express'
import path from 'path'
import { fileURLToPath } from 'url'
import * as messagesController from './Features/Messages/MessageHttpController.js'

const __dirname = fileURLToPath(new URL('.', import.meta.url))

metrics.initialize('chat')
logger.initialize('chat')
metrics.open_sockets.monitor()

export async function createServer() {
  const app = express()

  app.use(metrics.http.monitor(logger))
  metrics.injectMetricsRoute(app)

  // See https://github.com/exegesis-js/exegesis/blob/master/docs/Options.md
  const options = {
    controllers: { messagesController },
    ignoreServers: true,
    allowMissingControllers: false,
  }

  // const exegesisMiddleware = await exegesisExpress.middleware(
  const exegesisMiddleware = await exegesisExpress.middleware(
    path.resolve(__dirname, '../../chat.yaml'),
    options
  )

  // If you have any body parsers, this should go before them.
  app.use(exegesisMiddleware)

  // Return a 404
  app.use((req, res) => {
    res.status(404).json({ message: `Not found` })
  })

  // Handle any unexpected errors
  app.use((err, req, res, next) => {
    res.status(500).json({ message: `Internal error: ${err.message}` })
  })

  const server = http.createServer(app)
  return { app, server }
}
