require('zappa') 'localhost', 8001, ->
  @enable 'serve jquery'

  @get '/': ->
    @render index: {layout: no}

  @on connection: ->
    console.log "connected #{@id}"
    @emit welcome: {@id}
    
  @on 'set nickname': ->
    @client.nickname = @data.nickname

  @on said: ->
    @broadcast said: {nickname: @client.nickname, text: @data.text}
    @emit said: {nickname: @client.nickname, text: @data.text}
    
  @client '/index.js': ->
    @on said: ->
      $('#panel').append "<p>#{@data.nickname} said: #{@data.text}</p>"

    @connect()
    
    $ =>
      @emit 'set nickname': {nickname: prompt 'Pick a nickname!'}
      $('#box').focus()
      $('button').click (e) =>
        @emit said: {text: $('#box').val()}
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
