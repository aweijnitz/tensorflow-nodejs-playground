let _io = false; // Internal singleton instance of websocket server
let clients = [];
const conslog = true;

const log = (msg) => {
  if (conslog)
    console.log(msg);
};

const addClient = (socket) => {
  log('a user connected ' + socket.id);
  clients.push(socket);
  socket.on('disconnect', () => {
    log('user disconnected');
    clients = clients.filter((client) => {
      return client.id !== socket.id
    });
  });
  log('Total connected clients: ' + clients.length);
  return socket;
};

/**
 * Mount websocket handlers to server and set internal singleton instance
 * @param webSocketServer
 */
exports.initSocketServer = (io) => {
  
  if (!_io) _io = io;
  
  _io.on('connection', function (socket) {
    addClient(socket);
    socket.emit('msg', {msg: 'Welcome!', nrClients: clients.length, clientId: socket.id});
  });
  
  return io;
};

exports.getSocketServer = () => {
  if (!_io)
    throw new Error('Websocket Server instance not initialized!');
  else
    return _io;
};

exports.connectedClients = () => {
  return clients;
};

exports.broadCastData = (dataObj) => {
  _io.emit('data', dataObj);
};

exports.broadCastMsg = (msgObj) => {
  _io.emit('msg', msgObj);
};
