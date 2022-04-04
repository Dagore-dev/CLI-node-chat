const { Socket } = require('net')
const socket = new Socket()

const port = 8080

// Se conecta al host y puerto especificados.
socket.connect({
  host: 'localhost',
  port: port
})

// Indicamos la codificación
socket.setEncoding('utf-8')

// Escribimos algo en el socket
socket.write('Hola desde el cliente')

// Recibe algo en este lado del socket
socket.on('data', (data) => {
  console.log(data)
})
