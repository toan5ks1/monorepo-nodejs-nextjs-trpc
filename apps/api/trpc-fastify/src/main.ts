import { serverConfig } from './util/config'
import { createServer } from './server'

const server = createServer(serverConfig)

server.start()
