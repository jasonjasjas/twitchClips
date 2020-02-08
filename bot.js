const tmi = require('tmi.js');
const WebSocket = require('ws');
// Define configuration options
const opts = {
  identity: {
    username: 'jasonjasjas',
    password: 'nx9pfnquf8mpbt0o2u1j9zxgocxrm6'
  },
  channels: [
    'jasonjasjasbot'
  ]
};
const wss = new WebSocket.Server({ port: 8080 });

// Create a client with our options
const client = new tmi.client(opts);

console.log('twitch chatbot running in: ' + opts.channels);
// Register our event handlers (defined below)

wss.on('connection', function connection(ws) {
  client.on('message', function(target, context, msg, self){
    onMessageHandler(target, context, msg, self, ws);
  });
  client.on('connected', onConnectedHandler);
});
// Connect to Twitch:
client.connect();
var score = 0;
// Called every time a message comes in
function onMessageHandler (target, context, msg, self, ws) {
  if (self) { return; } // Ignore messages from the bot

  const commandName = msg.trim();
	console.log(commandName);
  ws.send(commandName);

  if (commandName === '+2') {
	  score = score + 2;
  } else if(commandName === '-2'){
	  score = score - 2;
  }
}

// Called every time the bot connects to Twitch chat
function onConnectedHandler (addr, port, ws) {
  console.log(`* Connected to ${addr}:${port}`);
}