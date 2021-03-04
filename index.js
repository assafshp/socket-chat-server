const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http, { cors: 
  { 
    
    origin: '*' ,
    // origin: 'http://localhost:3000' ,
    methods: ["GET", "POST"],
    allowedHeaders: ["my-custom-header"],
    credentials: false
} 
});
const port = process.env.PORT || 3003;

// const io = require('socket.io')(app.listen(3003));

app.all('/', function (request, response, next) {
  response.header("Access-Control-Allow-Origin", "*");
  response.header("Access-Control-Allow-Headers", "X-Requested-With");
  next();
});

// app.get('/', (req, res) => {
//   res.sendFile(__dirname + '/index.html');
// });


// app.get('/agent', (req, res) => {
//   res.sendFile(__dirname + '/agent.html');
// });

io.on('connection', (socket) => {
  socket.on('chat message', msg => {
    io.emit('chat message', msg);
  });
});

http.listen(port, () => {
  console.log(`Socket.IO server running at http://localhost:${port}/`);
});
