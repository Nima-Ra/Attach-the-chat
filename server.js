const net = require('net')
let clients = []

const server = net.createServer(socket => {
  console.log('Client connected')
  let client_id = clients.length
  clients.push({
    active: true,
    socket
  })

  socket.on('end', () => {
    clients[client_id].active = false
  })

  socket.on('data', chunk => {
    clients
      .filter((x, i) => x.active && i !== client_id)
      .map(client => client.socket.write(chunk))
  })
}).on('error', () => null)

server.listen(4343, () => {
  console.log(`Server started on port `, server.address().port)
})


// c2s
// first msg is user name
// [len 1byte][msg <=255byte]
// s2c
// [name len 1 byte][msg len 1 byte][name <=255byte][msg <=255byte]
