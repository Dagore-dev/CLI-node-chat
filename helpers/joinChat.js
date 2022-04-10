const { Socket } = require('net')

function joinChat (host = 'localhost', port = 8080) {
  const socket = new Socket()

  // Para poder leer líneas desde la consola hay que crear una interfaz:
  const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
  })

  // Se conecta al host y puerto especificados.
  socket.connect({
    host,
    port
  })

  // Indicamos la codificación
  socket.setEncoding('utf-8')

  socket.on('connect', () => {
    readline.question('Choose you alias: ', (alias) => {
      socket.write(alias)
      console.log('Type any message and press enter to send it. Send "END" to disconnect.')
    })

    // Leemos una línea:
    readline.on('line', (message) => {
      // Escribimos algo en el socket
      socket.write(message)

      if (message === 'END') {
        socket.end()
      }
    })

    // Recibe algo en este lado del socket
    socket.on('data', (data) => {
      console.log(data)
    })

    // Cuando se recibe la señal de cierre del server cerramos el programa.
    socket.on('close', () => process.exit(0))
  })
}

module.exports = joinChat
