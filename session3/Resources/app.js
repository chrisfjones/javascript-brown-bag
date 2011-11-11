(function() {
  var addChat, chatList, chatSocket, chatTextField, chatView, socket, ui, win;
  var _this = this;

  Titanium.UI.setBackgroundColor('#000');

  ui = Titanium.UI;

  socket = Titanium.Network.Socket;

  win = ui.createWindow({
    title: 'TiChat',
    backgroundColor: '#ccc'
  });

  chatView = ui.createScrollableView({
    top: 0,
    contentHeight: 'auto',
    contentWidth: 'auto',
    showHorizontalScrollIndicator: true
  });

  win.add(chatView);

  win.open();

  chatList = ui.createTableView({
    top: 0,
    height: '90%',
    width: '100%'
  });

  chatView.add(chatList);

  addChat = function(msg) {
    var label, row;
    label = ui.createLabel({
      color: '#999',
      text: "me: " + msg,
      font: {
        fontSize: 20,
        fontFamily: 'Helvetica Neue'
      },
      textAlign: 'left',
      left: '1%',
      width: '99%'
    });
    row = ui.createTableViewRow();
    row.add(label);
    return chatList.appendRow(row);
  };

  chatSocket = socket.createTCP({
    host: 'localhost',
    port: 9999,
    connected: function(event) {
      return Ti.API.info('connected');
    },
    error: function(event) {
      Ti.API.error("Socket <" + e.socket + "> encountered error when connecting");
      Ti.API.error(" error code <" + e.errorCode + ">");
      return Ti.API.error(" error description <" + e.error + ">");
    }
  });

  chatSocket.addEventListener('read', function(event) {
    return addChat(event.data.toString());
  });

  chatSocket.connect();

  chatTextField = ui.createTextField({
    bottom: '1%',
    color: '#336699',
    width: '90%',
    height: '8%',
    hintText: 'Say something',
    keyboardType: ui.KEYBOARD_DEFAULT,
    returnKeyType: ui.RETURNKEY_DEFAULT,
    borderStyle: ui.INPUT_BORDERSTYLE_ROUNDED
  });

  chatTextField.addEventListener('return', function(event) {
    var msg;
    msg = chatTextField.value;
    chatTextField.value = null;
    addChat(msg);
    return chatSocket.write(Ti.createBuffer({
      value: msg
    }));
  });

  chatView.add(chatTextField);

}).call(this);
