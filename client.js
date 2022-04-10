const joinChat = require('./helpers/joinChat')

function main () {
  const [, , host, port] = process.argv

  if (host && port && !isNaN(port)) {
    joinChat(host, port)
  } else {
    joinChat()
  }
}

if (require.main === module) {
  main()
}
