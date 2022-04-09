const { Server } = require('net')
const server = new Server()

const port = 8080

// Ejecuta el callback cuando le llega una nueva conexión al servidor.
server.on('connection', (socket) => {
  const clientSocket = `${socket.remoteAddress}:${socket.remotePort}`
  console.log(`New connection on ${clientSocket}`)

  // Se indica la codificación que usa la conexión. Así el buffer de bytes se parsea directamente.
  socket.setEncoding('utf8')

  // Dispara un callback con información que el cliente escribe en el socket.
  socket.on('data', (message) => {
    if (message !== 'END') {
      console.log(`${clientSocket} => ${message}`)
    } else {
      socket.end()
    }
  })

  socket.on('close', () => console.log('Closed', clientSocket))
})

server.listen({
  port: port,
  host: '0.0.0.0'
}, () => console.log(`Litening on port ${port}`))
