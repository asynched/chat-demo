const net = require('net')
const readline = require('readline')

const rl = readline.createInterface({
  input: process.stdin,
})

const readlineAsync = async (interface = rl, message = '> ') => {
  return new Promise((res) => {
    interface.question(message, (answer) => {
      res(answer)
    })
  })
}

const client = net.createConnection({
  port: 1337,
})

client.on('data', (data) => {
  console.log(data.toString())
})

const main = async () => {
  while (true) {
    const message = await readlineAsync(rl, '> ')

    console.log(`[You]: ${message}`)

    client.write(message)
  }
}

main()
