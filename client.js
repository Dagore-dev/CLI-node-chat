const { Socket } = require('net')
const socket = new Socket()

// Para poder leer líneas desde la consola hay que crear una interfaz:
const readline = require('readline').createInterface({
  input: process.stdin,
  output: process.stdout
})

const port = 8080

// Se conecta al host y puerto especificados.
socket.connect({
  host: 'localhost',
  port
})

// Indicamos la codificación
socket.setEncoding('utf-8')

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
