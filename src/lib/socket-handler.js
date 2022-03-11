/**
 * @typedef { import('net').Socket & { name: string } } SocketClient
 *
 */

export default class SocketHandler {
  constructor({ nameProvider, logger }) {
    /**
     * @type { SocketClient[] }
     */
    this.clients = []
    this.nameProvider = nameProvider
    this.logger = logger
  }

  /**
   * # broadcastConnection
   *
   * Broadcasts a connection event to all connected clients.
   *
   * @param { SocketClient } client
   */
  broadcastConnection(client) {
    const clientName = this.nameProvider.generate()
    client.name = clientName

    this.logger.success(`Client ${clientName} has connected`)

    this.clients.forEach((client) => {
      client.write(`[SERVER]: Client ${clientName} has connected.`)
    })

    this.clients.push(client)
  }

  /**
   * # broadcastMessage
   *
   * Broadcasts a message event to all connected clients.
   *
   * @param { SocketClient } client
   * @param { string } message
   */
  broadcastMessage(client, message) {
    this.logger.info(`${client.name} has sent a message, broadcasting it.`)

    this.clients
      .filter((_client) => client !== _client)
      .forEach((client) => {
        console.log(`Dispatching message to ${client}`)
        client.write(`[${client.name}]: ${message}`)
      })
  }

  /**
   * # broadcastDisconnection
   *
   * Broadcasts a disconnection event of a client to all connected clients.
   *
   * @param { SocketClient } client
   */
  broadcastDisconnection(client) {
    const clientName = client.name

    this.logger.warn(
      `Client ${client.name} has disconnected, broadcasting the message.`
    )

    this.clients.splice(this.clients.indexOf(client), 1)

    this.clients.forEach((client) => {
      client.write(`[SERVER]: ${clientName} has disconnected.`)
    })
  }
}
