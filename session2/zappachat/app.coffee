require('zappa') 'localhost', 8001, ->
  net = require 'net'
  @enable 'serve jquery'

  @get '/': ->
    @render index:
      layout: no

  @tcpConnection = null
  @websocket = null

  @io.sockets.on 'connection', (socket) =>
    @websocket = socket
    console.log "connected #{socket.id}"
    socket.emit welcome:
      socket.id
    socket.on 'set nickname', (name) =>
      socket.set 'nickname', name
    socket.on 'said', (msg) =>
      socket.get 'nickname', (err, nickname) =>
        socket.broadcast.emit 'said', nickname: nickname.nickname, text: msg.text
        socket.emit 'said', nickname: nickname.nickname, text: msg.text
        console.log "writing #{msg.text} to #{tcpConnection?}"
        @tcpConnection?.write "#{nickname.nickname}: #{msg.text}"

  @tcpServer = net.createServer (c) =>
    @tcpConnection = c
    @tcpConnection.write "welcome to zappachat!"
    console.log "set tcpConnection to #{c}"
    c.on 'end', =>
      console.log 'server disconnected'
    c.on 'data', (d) =>
      @websocket?.emit 'said', nickname: 'phone', text: d.toString()
  @tcpServer.listen 9999

  @client '/index.js': ->
    @on said: ->
      $('#panel').append "<p>#{@data.nickname} said: #{@data.text}</p>"

    @connect()

    $ =>
      @emit
        'set nickname':
          nickname: prompt 'Pick a nickname!'
      $('#box').focus()
      $('button').click (e) =>
        @emit
          said:
            text: $('#box').val()
        $('#box').val('').focus()
        e.preventDefault()

  @view index: ->
    doctype 5
    html ->
      head ->
        title 'awesome-o-chat'
        script src: '/socket.io/socket.io.js'
        script src: '/zappa/jquery.js'
        script src: '/zappa/zappa.js'
        script src: '/index.js'
      body ->
        div id: 'panel'
        form ->
          input id: 'box'
          button 'Send'
