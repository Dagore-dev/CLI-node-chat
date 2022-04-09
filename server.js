const listen = require('./helpers/listen.js')

function main () {
  const port = process.argv[2]

  if (port && !isNaN(port)) {
    listen(port)
  } else {
    listen()
  }
}

if (require.main === module) {
  main()
}
