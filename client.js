const net = require('net')
  , rl = require('readline')
let readline = rl.createInterface({
  input: process.stdin,
  output: process.stdout
})
let client = net.createConnection({port: 4343}, () => {
  console.log('Connected to server')
  console.log('Please enter your name =>')
  process.stdout.write('> ')
  let name = null
  readline.on('line', line => {
    process.stdout.write('> ')
    line = line.trim()
    if(!name){
      name = line
      client.write(name.toString() + ' joined the chat!')
      return
    }
    client.write(name.toString() + ': ')
    client.write(line)
  })
  client.on('data', (chunk) => {
    process.stdout.write(chunk)
    console.log('')
  })
})
