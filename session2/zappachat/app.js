(function() {
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };
  require('zappa')('localhost', 8001, function() {
    this.enable('serve jquery');
    this.get({
      '/': function() {
        return this.render({
          index: {
            layout: false
          }
        });
      }
    });
    this.on({
      connection: function() {
        console.log("connected " + this.id);
        return this.emit({
          welcome: {
            id: this.id
          }
        });
      }
    });
    this.on({
      'set nickname': function() {
        return this.client.nickname = this.data.nickname;
      }
    });
    this.on({
      said: function() {
        this.broadcast({
          said: {
            nickname: this.client.nickname,
            text: this.data.text
          }
        });
        return this.emit({
          said: {
            nickname: this.client.nickname,
            text: this.data.text
          }
        });
      }
    });
    this.client({
      '/index.js': function() {
        this.on({
          said: function() {
            return $('#panel').append("<p>" + this.data.nickname + " said: " + this.data.text + "</p>");
          }
        });
        this.connect();
        return $(__bind(function() {
          this.emit({
            'set nickname': {
              nickname: prompt('Pick a nickname!')
            }
          });
          $('#box').focus();
          return $('button').click(__bind(function(e) {
            this.emit({
              said: {
                text: $('#box').val()
              }
            });
            $('#box').val('').focus();
            return e.preventDefault();
          }, this));
        }, this));
      }
    });
    return this.view({
      index: function() {
        doctype(5);
        return html(function() {
          head(function() {
            title('awesome-o-chat');
            script({
              src: '/socket.io/socket.io.js'
            });
            script({
              src: '/zappa/jquery.js'
            });
            script({
              src: '/zappa/zappa.js'
            });
            return script({
              src: '/index.js'
            });
          });
          return body(function() {
            div({
              id: 'panel'
            });
            return form(function() {
              input({
                id: 'box'
              });
              return button('Send');
            });
          });
        });
      }
    });
  });
}).call(this);
