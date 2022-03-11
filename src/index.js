import net from 'net'
import { Signale } from 'signale'
import NameProvider from './lib/name-provider'
import SocketHandler from './lib/socket-handler'

const nameProvider = new NameProvider()
const logger = new Signale({ scope: 'server' })

const socketHandler = new SocketHandler({
  nameProvider: nameProvider,
  logger: logger,
})

const server = net.createServer((client) => {
  socketHandler.broadcastConnection(client)

  client.on('data', (rawData) => {
    const data = rawData.toString()
    socketHandler.broadcastMessage(client, data)
  })

  client.on('close', () => {
    socketHandler.broadcastDisconnection(client)
  })
})

server.listen(1337, () => logger.success('Server started on port :1337'))
