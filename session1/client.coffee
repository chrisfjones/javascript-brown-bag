udp  = require 'dgram'

socket = udp.createSocket 'udp4'

id = Math.random()

buffer = new Buffer "#{id} says: hey"
send = =>
  socket.send buffer, 0, buffer.length, 6789, '127.0.0.1'

socket.on 'message', (msg) =>
  console.log "#{msg}"
socket.bind 7001

setInterval send, 1000

