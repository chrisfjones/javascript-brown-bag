udp  = require 'dgram'
util = require 'util'

socket = udp.createSocket 'udp4'
socket.setBroadcast true
socket.on 'listening', ->
  console.log 'listening now...'
socket.on 'message', (msg) ->
  console.log "#{msg}"
  buffer = new Buffer "#{msg}"
  socket.send buffer, 0, buffer.length, 7001, '127.0.0.1'
socket.bind 6789
