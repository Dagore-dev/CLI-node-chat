const connections = require('../connections')

function sendMessage (message, origin) {
  for (const [socket] of connections) {
    if (origin !== socket) {
      socket.write(message)
    }
  }
}

module.exports = sendMessage
