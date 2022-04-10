const { Server } = require('net')
const connections = require('../connections')
const sendMessage = require('./sendMessage')
const error = require('./error')

function listen (port = 8080) {
  const server = new Server()
  const host = '0.0.0.0'

  // Ejecuta el callback cuando le llega una nueva conexión al servidor.
  server.on('connection', (socket) => {
    const clientSocket = `${socket.remoteAddress}:${socket.remotePort}`
    let isLogged = connections.has(socket)
    console.log(`New connection on ${clientSocket}`)

    // Se indica la codificación que usa la conexión. Así el buffer de bytes se parsea directamente.
    socket.setEncoding('utf8')

    // Dispara un callback con información que el cliente escribe en el socket.
    socket.on('data', (message) => {
      if (!isLogged) {
        connections.set(socket, message)
        socket.write(`Connection succeded. Welcome to the chat ${message}`)
        isLogged = true
      } else {
        if (message !== 'END') {
          const fullMessage = `${connections.get(socket)} => ${message}`
          console.log(fullMessage)
          sendMessage(fullMessage, socket)
        } else {
          connections.delete(socket)
          socket.end()
        }
      }
    })

    socket.on('close', () => console.log('Closed', clientSocket))

    socket.on('error', (e) => error(e.message))
  })

  server.listen({
    port,
    host
  }, () => console.log(`Listening on port ${port}`))

  server.on('error', (e) => error(e.message))
}

module.exports = listen
